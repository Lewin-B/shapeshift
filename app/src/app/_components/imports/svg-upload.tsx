"use client";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Upload, ExternalLink } from "lucide-react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export default function SvgCard() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string>("");
  const router = useRouter();

  const uploadMutation = api.post.uploadSVG.useMutation();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0] ?? null);
    }
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (!file) {
      setUploadStatus("No file selected");
      return;
    }

    try {
      // Convert the file to base64 for tRPC transmission
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = async () => {
        if (typeof fileReader.result === "string") {
          // Upload the file using tRPC mutation
          try {
            // Upload the file using tRPC mutation
            const result = await uploadMutation.mutateAsync({
              fileName: file.name,
              contentType: file.type,
              fileData: fileReader.result.split(",")[1] ?? "", // Remove the data URL prefix
              fileSize: file.size,
            });

            // Store the fileUrl in a variable
            const uploadedFileUrl = result.fileUrl;
            console.log("Uploaded file URL:", uploadedFileUrl);

            // Update state with the file URL
            setFileUrl(uploadedFileUrl);
            setUploadStatus("Upload successful! Redirecting to playground...");

            // Navigate to the playground with the file URL as a query parameter
            // Using setTimeout to give the user a moment to see the success message
            setTimeout(() => {
              const encodedUrl = encodeURIComponent(uploadedFileUrl);
              void router.push(`/playground?fileUrl=${encodedUrl}`);
            }, 1500);
          } catch (error) {
            console.error("Upload failed:", error);
            setUploadStatus("Upload failed");
          }
        }
      };

      void router.push(`/playground?fileUrl=${fileUrl}`);
    } catch (error) {
      console.error("Error processing file:", error);
      setUploadStatus(`Error processing file: `);
    }
  };

  return (
    <Card
      onClick={() => console.log("click")}
      className="flex h-auto w-auto justify-center bg-[#030303]"
    >
      <CardContent className="flex flex-col items-center justify-center space-y-4 bg-[#030303]">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="flex w-full items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg"
            >
              <div className="flex flex-col items-center justify-center space-y-3 px-10 pt-5 pb-6">
                <Upload className="h-30 w-30 text-gray-400" />
                <div className="font-['Instrument Sans'] text-[25px] leading-[30px] font-normal text-white not-italic">
                  Import <span className="text-[#F3B518]">SVG</span>
                </div>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          {file && (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-muted-foreground text-sm">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <Button type="submit">Upload</Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
