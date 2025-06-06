"use client";
import { useState, type FormEvent } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "~/components/ui/card";
import { Wand2, Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export default function SvgGeneratorCard() {
  const [prompt, setPrompt] = useState<string>("");
  const [generationStatus, setGenerationStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const generateMutation = api.svg.generateSvg.useMutation();

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    setIsLoading(true);

    if (!prompt.trim()) {
      setGenerationStatus("No prompt entered");
      setIsLoading(false);
      return;
    }

    try {
      const result = await generateMutation.mutateAsync({
        prompt: prompt.trim(),
        filename: `generated-${Date.now()}.svg`,
      });

      const generatedFileUrl = result.publicUrl;
      console.log("Generated SVG URL:", generatedFileUrl);

      setGenerationStatus(
        "Generation successful! Redirecting to playground...",
      );

      setTimeout(() => {
        const encodedUrl = encodeURIComponent(generatedFileUrl);
        void router.push(`/playground?fileUrl=${encodedUrl}`);
      }, 1500);
    } catch (error) {
      console.error("SVG generation failed:", error);
      setGenerationStatus("Generation failed");
    } finally {
      setIsLoading(false);
    }
  };

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
          </CardContent>
          <CardFooter className="pt-2 text-center">
            <p className="w-full text-sm text-[#F3B518]">
              {typeof generationStatus === "string"
                ? generationStatus
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
        {/* Warning about experimental status */}
        <p className="max-w-xs text-center text-sm text-yellow-400 italic">
          ⚠️ This SVG generator is experimental and may not work reliably. Use
          it only for very basic drawings.
        </p>
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
              className={`text-center text-sm ${
                generationStatus.includes("failed")
                  ? "text-red-400"
                  : "text-green-400"
              }`}
            >
              {generationStatus}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
