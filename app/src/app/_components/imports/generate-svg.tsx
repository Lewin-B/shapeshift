"use client";
import { useState, type FormEvent } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Wand2, ExternalLink } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export default function SvgGeneratorCard() {
  const [prompt, setPrompt] = useState<string>("");
  const [generationStatus, setGenerationStatus] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string>("");
  const router = useRouter();

  const generateMutation = api.post.generateSvg.useMutation();

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (!prompt.trim()) {
      setGenerationStatus("No prompt entered");
      return;
    }

    try {
      // Call the tRPC procedure to generate the SVG
      const result = await generateMutation.mutateAsync({
        prompt: prompt.trim(),
        filename: `generated-${Date.now()}.svg`,
      });

      // Store the fileUrl in a variable
      const generatedFileUrl = result.publicUrl;
      console.log("Generated SVG URL:", generatedFileUrl);

      // Update state with the file URL
      setFileUrl(generatedFileUrl);
      setGenerationStatus(
        "Generation successful! Redirecting to playground...",
      );

      // Navigate to the playground with the file URL as a query parameter
      // Using setTimeout to give the user a moment to see the success message
      setTimeout(() => {
        const encodedUrl = encodeURIComponent(generatedFileUrl);
        void router.push(`/playground?fileUrl=${encodedUrl}`);
      }, 1500);
    } catch (error) {
      console.error("SVG generation failed:", error);
      setGenerationStatus("Generation failed");
    }
  };

  return (
    <Card
      onClick={() => console.log("click")}
      className="flex h-auto w-auto justify-center rounded-[50px] bg-black/5 shadow-[inset_0px_4px_41.099998474121094px_3px_rgba(253,250,250,0.50)]"
    >
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="flex w-full items-center justify-center">
            <div className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg">
              <div className="flex flex-col items-center justify-center space-y-3 px-10 pt-5 pb-6">
                <Wand2 className="text-white-400 h-30 w-30" />
                <div className="font-['Instrument Sans'] text-[25px] leading-[30px] font-normal text-white not-italic">
                  Generate <span className="text-[#F3B518]">SVG</span>
                </div>
              </div>
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your SVG..."
                className="mt-2 mb-2 max-w-xs bg-black/20 text-white placeholder:text-gray-400"
              />
            </div>
          </div>
          {prompt && (
            <div className="flex flex-col items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">
                  Generate SVG from prompt
                </p>
              </div>
              <Button type="submit" disabled={generateMutation.isPending}>
                {generateMutation.isPending ? "Generating..." : "Generate"}
              </Button>
            </div>
          )}
          {generationStatus && (
            <p
              className={`text-center text-sm ${generationStatus.includes("failed") ? "text-red-400" : "text-green-400"}`}
            >
              {generationStatus}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
