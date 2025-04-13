import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

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
          void bucket.setCorsConfiguration([
            {
              origin: ["*"],
              method: ["GET", "HEAD", "PUT", "POST", "DELETE"],
              responseHeader: ["Content-Type", "x-goog-meta-*"],
              maxAgeSeconds: 3600,
            },
          ]);

          try {
            await bucket.setMetadata({
              iamConfiguration: {
                uniformBucketLevelAccess: {
                  enabled: false,
                },
              },
            });
            console.log("hello 0.5");
          } catch (err) {
            console.log("hello 0");
            console.log("Err: ", err);
          }

          console.log("hello 1");

          // Decode base64 data
          const fileBuffer = Buffer.from(input.fileData, "base64");
          console.log("hello 2");

          // Create a unique filename to prevent overwrites
          const timestamp = Date.now();
          const originalName = input.fileName
            .replace(/\s+/g, "-")
            .toLowerCase();
          const fileName = `uploads/${timestamp}-${originalName}`;

          // Create a reference to the file in the bucket
          const blob = bucket.file(fileName);
          console.log("hello 3");

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

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });

    return post ?? null;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
