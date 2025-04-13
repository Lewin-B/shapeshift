"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Code, ExternalLink } from "lucide-react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

interface CodeSnippet {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  userId: string;
}

export default function CodeSnippetsCard() {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedSnippet, setSelectedSnippet] = useState<string | null>(null);
  const router = useRouter();

  // Fetch the code snippets using the getCodes procedure
  const { data, isLoading, isError } = api.code.getCodes.useQuery();

  useEffect(() => {
    if (data) {
      setSnippets(data);
      setLoading(false);
    }
    if (isError) {
      setError("Failed to load code snippets");
      setLoading(false);
    }
  }, [data, isLoading, isError]);

  const handleSnippetSelect = (id: string) => {
    setSelectedSnippet(id);
  };

  const handleOpenInPlayground = () => {
    if (selectedSnippet) {
      const selectedCode = snippets.find(snippet => snippet.id === selectedSnippet);
      if (selectedCode) {
        // Encode the content to safely pass as a URL parameter
        const encodedContent = encodeURIComponent(selectedCode.content);
        router.push(`/playground?code=${encodedContent}`);
      }
    }
  };

  return (
    <Card
      className="flex h-auto w-auto justify-center bg-black/5 rounded-[50px] shadow-[inset_0px_4px_41.099998474121094px_3px_rgba(253,250,250,0.50)]"
    >
      <CardContent className="flex flex-col items-center justify-center space-y-4 w-full">
        <div className="flex flex-col items-center justify-center space-y-3 px-10 pt-5 pb-6">
          <Code className="h-30 w-30 text-white-400" />
          <div className="font-['Instrument Sans'] text-[25px] leading-[30px] font-normal text-white not-italic">
            Load <span className="text-[#F3B518]">Code Snippets</span>
          </div>
        </div>

        {loading ? (
          <div className="text-white text-center">Loading your snippets...</div>
        ) : error ? (
          <div className="text-red-400 text-center">{error}</div>
        ) : snippets.length === 0 ? (
          <div className="text-white text-center">No code snippets found</div>
        ) : (
          <div className="w-full max-h-64 overflow-y-auto px-4">
            {snippets.map((snippet) => (
              <div 
                key={snippet.id}
                onClick={() => handleSnippetSelect(snippet.id)}
                className={`p-3 my-2 rounded-lg cursor-pointer ${
                  selectedSnippet === snippet.id ? 'bg-[#F3B518]/20 border border-[#F3B518]' : 'bg-black/20'
                }`}
              >
                <div className="font-medium text-white">{snippet.title || "Untitled Snippet"}</div>
                <div className="text-gray-400 text-sm">
                  {new Date(snippet.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}

        {snippets.length > 0 && (
          <Button 
            onClick={handleOpenInPlayground}
            disabled={!selectedSnippet}
            className="mt-4"
          >
            Open in Playground
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
