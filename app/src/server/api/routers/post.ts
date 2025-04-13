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

void bucket.setMetadata({
  iamConfiguration: {
    uniformBucketLevelAccess: {
      enabled: false,
    },
  },
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
      try {
        console.log("hello");
        void bucket.setCorsConfiguration([
          {
            origin: ["*"],
            method: ["GET", "HEAD", "PUT", "POST", "DELETE"], // Allow these HTTP methods
            responseHeader: ["Content-Type", "x-goog-meta-*"], // Allow these headers to be returned
            maxAgeSeconds: 3600, // Cache preflight response for 1 hour
          },
        ]);

        console.log("hello 1");

        // Decode base64 data
        const fileBuffer = Buffer.from(input.fileData, "base64");

        console.log("hello 2");

        // Create a unique filename to prevent overwrites
        const timestamp = Date.now();
        const originalName = input.fileName.replace(/\s+/g, "-").toLowerCase();
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

          // Store the file reference in your database if needed
          // await prisma.uploadedFile.create({
          //   data: {
          //     fileName,
          //     url: publicUrl,
          //     contentType: input.contentType,
          //     size: input.fileSize || 0,
          //     createdAt: new Date(),
          //   },
          // });

          return {
            success: true,
            fileName,
            fileUrl: publicUrl,
            isPublic: true,
          };
        } catch (error) {
          console.log("Error");
          console.error("Error making file public:", error);

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
        console.error("Error uploading file to Google Cloud Storage:", error);
        console.log("No Error Here");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to upload file: `,
        });
      }
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
