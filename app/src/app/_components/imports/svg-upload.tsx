"use client";
import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "~/components/ui/card";
import { Upload, Loader2, AlertCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { Progress } from "~/components/ui/progress";

export default function SvgCard() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const uploadMutation = api.svg.uploadSVG.useMutation();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setError("");

    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      if (!selectedFile) {
        setError("Error uplaoding file");
        return;
      }

      // Check if the file is an SVG
      if (selectedFile.type !== "image/svg+xml") {
        setError("Only SVG files are allowed");
        setFile(null);
        return;
      }

      // Additional validation: check file extension as well
      if (!selectedFile.name.toLowerCase().endsWith(".svg")) {
        setError("Only files with .svg extension are allowed");
        setFile(null);
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (!file) {
      setUploadStatus("No file selected");
      return;
    }

    setIsLoading(true); // Start loading

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
            setIsLoading(false); // End loading on error
          }
        }
      };
    } catch (error) {
      console.error("Error processing file:", error);
      setUploadStatus(`Error processing file: `);
      setIsLoading(false); // End loading on error
    }
  };

  // If loading, display the loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex w-screen items-center justify-center bg-black/80 backdrop-blur-sm">
        <Card className="w-80 border-none bg-[#262013] shadow-xl">
          <CardHeader className="pb-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#1a160d]">
              <Loader2 className="h-10 w-10 animate-spin text-[#F3B518]" />
            </div>
          </CardHeader>
          <CardContent className="pb-2 text-center">
            <h3 className="font-['Instrument Sans'] text-xl font-medium text-white">
              Transforming your SVG
            </h3>
            <Progress
              className="mt-4 h-2 bg-[#3a3420]"
              value={typeof uploadStatus === "number" ? uploadStatus : 75}
            />
          </CardContent>
          <CardFooter className="pt-2 text-center">
            <p className="w-full text-sm text-[#F3B518]">
              {typeof uploadStatus === "string"
                ? uploadStatus
                : "Processing..."}
            </p>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <Card
      onClick={() => console.log("click")}
      className="flex h-auto w-auto justify-center rounded-[50px] bg-black/5 shadow-[inset_0px_4px_41.099998474121094px_3px_rgba(253,250,250,0.50)]"
    >
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="flex w-full items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg"
            >
              <div className="flex flex-col items-center justify-center space-y-3 px-10 pt-5 pb-6">
                <Upload className="text-white-400 h-30 w-30" />
                <div className="font-['Instrument Sans'] text-[25px] leading-[30px] font-normal text-white not-italic">
                  Import <span className="text-[#F3B518]">SVG</span>
                </div>
                <p className="text-sm text-white/70">
                  Only SVG files are allowed
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".svg,image/svg+xml"
              />
            </label>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-md bg-red-500/20 p-2 text-red-400">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {file && !error && (
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
