import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { env } from "~/env";

import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: env.GCP_PROJECT_ID,
  credentials: {
    client_email: env.GCP_CLIENT_EMAIL,
    private_key: env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

const bucketName = env.GCP_BUCKET_NAME;
const bucket = storage.bucket(bucketName);

const genAI = new GoogleGenerativeAI(env.GEMINI_KEY ?? "c");
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp-image-generation",
});

export const postRouter = createTRPCRouter({
  uploadSVG: publicProcedure
    .input(
      z.object({
        fileName: z.string(),
        contentType: z.string(),
        fileData: z.string(), // Base64 encoded file data
        fileSize: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let attempt = 0;
      let lastError;

      while (attempt < 10) {
        try {
          console.log("hello");

          // Set CORS configuration (this is run every time, consider moving outside loop if needed)
          // void bucket.setCorsConfiguration([
          //   {
          //     origin: ["*"],
          //     method: ["GET", "HEAD", "PUT", "POST", "DELETE"],
          //     responseHeader: ["Content-Type", "x-goog-meta-*"],
          //     maxAgeSeconds: 3600,
          //   },
          // ]);

          console.log("hello 1");

          // Decode base64 data
          const fileBuffer = Buffer.from(input.fileData, "base64");

          // Create a unique filename to prevent overwrites
          const timestamp = Date.now();
          const originalName = input.fileName
            .replace(/\s+/g, "-")
            .toLowerCase();
          const fileName = `uploads/${timestamp}-${originalName}`;

          // Create a reference to the file in the bucket
          const blob = bucket.file(fileName);

          // Set file metadata
          const metadata = {
            contentType: input.contentType,
            metadata: {
              originalName: input.fileName,
              uploadedAt: new Date().toISOString(),
            },
            iamConfiguration: {
              uniformBucketLevelAccess: {
                enabled: false,
              },
            },
          };

          console.log("hello 4");

          // Upload the file
          await blob.save(fileBuffer, {
            metadata,
            resumable: false,
          });
          console.log("hello 5");

          // Make the file public
          try {
            await blob.makePublic();
            console.log("hello 6");

            // Generate the public URL
            const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
            console.log("Hello 7");

            // Optionally store the file reference in your database here

            return {
              success: true,
              fileName,
              fileUrl: publicUrl,
              isPublic: true,
            };
          } catch (error) {
            console.log("Error making file public:", error);

            // If making public fails, generate a signed URL instead
            const [signedUrl] = await blob.getSignedUrl({
              action: "read",
              expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
            });

            return {
              success: true,
              fileName,
              fileUrl: signedUrl,
              isPublic: false,
              expiresAt: new Date(
                Date.now() + 1000 * 60 * 60 * 24 * 7,
              ).toISOString(),
            };
          }
        } catch (error) {
          attempt++;
          lastError = error;
          console.error(`Attempt ${attempt} failed with error:`, error);
          // Optionally add a delay before next retry:
          // await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      console.error("Failed after 10 attempts:", lastError);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to upload file after 10 attempts",
      });
    }),
  generateSvg: publicProcedure
    .input(
      z.object({
        prompt: z.string().min(1, "Prompt cannot be empty"),
        filename: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        // Generate SVG using Gemini API
        const result = await model.generateContent(`
          Generate an SVG image based on the following prompt: "${input.prompt}".
          Return only the SVG code without any explanation or markdown formatting.
          Make sure the SVG has proper viewBox attribute and is valid XML.
        `);

        const response = result.response;
        const text = response.text();

        // Extract SVG code from the response (in case there's any extra text)
        const svgMatch = /<svg[\s\S]*<\/svg>/.exec(text);
        if (!svgMatch) {
          throw new Error("Failed to extract valid SVG from Gemini response");
        }

        const svgContent = svgMatch[0];

        // Generate a unique filename if not provided
        const filename =
          input.filename ??
          `generated-svg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.svg`;

        // Upload SVG to Google Cloud Storage
        const file = bucket.file(filename);
        await file.save(svgContent, {
          contentType: "image/svg+xml",
          metadata: {
            cacheControl: "public, max-age=31536000",
          },
        });

        // Generate a public URL for the uploaded file
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;

        return {
          success: true,
          filename,
          publicUrl,
          svgContent,
        };
      } catch (error) {
        console.error("Error generating or uploading SVG:", error);
        throw new Error(`Failed to generate or upload SVG: `);
      }
    }),
});
