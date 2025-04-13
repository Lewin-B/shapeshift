"use client";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { useState, useEffect, useRef, useMemo } from "react";
import { api } from "~/trpc/react";
import {
  buildFigureFile,
  appFile,
  canvasFile,
  appCssFile,
} from "./files";
import type { SettingsProps } from "~/components/app-sidebar";

export type CodeSnippetType = {
  codeId?: string;
  appFile: string;
  figureFile: string;
  canvasFile: string;
  appCssFile: string;
};

type ReactPlaygroundProps = {
  settings: SettingsProps;
};

function SandpackUpdater({
  createCodeMutation,
  updateCodeMutation,
  codeSnippet,
  setCodeSnippet,
  regularSave,
  setRegularSave,
}: {
  createCodeMutation: ReturnType<typeof api.code.createCode.useMutation>;
  updateCodeMutation: ReturnType<typeof api.code.updateCode.useMutation>;
  codeSnippet: CodeSnippetType;
  setCodeSnippet: React.Dispatch<React.SetStateAction<CodeSnippetType>>;
  regularSave: boolean;
  setRegularSave: (value: boolean) => void;
}) {
  const { sandpack } = useSandpack();
  const hasCreatedRef = useRef(false);

  // Handle save functionality
  useEffect(() => {
    if (regularSave) {
      const files = sandpack.files;
      const codes = {
        appFile: files["/App.js"]?.code ?? "",
        figureFile: files["/figure.tsx"]?.code ?? "",
        canvasFile: files["/canvas.tsx"]?.code ?? "",
        appCssFile: files["/App.css"]?.code ?? "",
      };

      if (!hasCreatedRef.current) {
        // Create new code
        createCodeMutation.mutate(codes, {
          onSuccess: (data) => {
            setCodeSnippet((prev) => ({ ...prev, codeId: data.id }));
            hasCreatedRef.current = true;
            console.log("Code snippet created!");
            setRegularSave(false);
          },
          onError: (error) => {
            console.error("Error creating code snippet!", error);
            setRegularSave(false);
          },
        });
      } else if (codeSnippet.codeId) {
        // Update existing code
        updateCodeMutation.mutate({ ...codes, codeId: codeSnippet.codeId }, {
          onSuccess: () => {
            console.log("Code snippet updated!");
            setRegularSave(false);
          },
          onError: (error) => {
            console.error("Error updating code snippet", error);
            setRegularSave(false);
          },
        });
      }
    }
  }, [regularSave]);

  return null;
}

export default function ReactPlayground({ settings }: ReactPlaygroundProps) {
  const {
    depth,
    size,
    svgUrl,
    rotateX,
    rotateY,
    rotateZ,
    bounceX,
    bounceY,
    bounceZ,
    regularSave,
    setRegularSave,
  } = settings;

  // Generate the figure file dynamically based on settings.
  const figureFileContent = useMemo(() => buildFigureFile({
    depth,
    size,
    svgUrl,
    rotateX,
    rotateY,
    rotateZ,
    bounceX,
    bounceY,
    bounceZ,
  }), [
    depth, size, svgUrl, rotateX, rotateY, rotateZ, bounceX, bounceY, bounceZ
  ]);

  const createCodeMutation = api.code.createCode.useMutation();
  const updateCodeMutation = api.code.updateCode.useMutation();

  // Local state to hold the current code snippet.
  const [codeSnippet, setCodeSnippet] = useState<CodeSnippetType>({
    appFile,
    figureFile: figureFileContent,
    canvasFile,
    appCssFile,
  });

  // Memoize the files object to prevent constant re-renders
  const sandpackFiles = useMemo(() => ({
    "/App.js": codeSnippet.appFile,
    "/figure.tsx": codeSnippet.figureFile,
    "/canvas.tsx": codeSnippet.canvasFile,
    "/App.css": codeSnippet.appCssFile,
  }), [codeSnippet]);

  return (
    <div className="w-full h-[65vh]">
      <SandpackProvider
        files={sandpackFiles}
        theme="dark"
        template="react"
        customSetup={{
          dependencies: {
            "@react-three/drei": "^10.0.6",
            "@react-three/fiber": "^9.1.1",
          },
        }}
        options={{
          activeFile: "/App.js",
          visibleFiles: ["/App.js", "/figure.tsx", "/canvas.tsx", "/App.css"],
        }}
      >
        <SandpackUpdater
          createCodeMutation={createCodeMutation}
          updateCodeMutation={updateCodeMutation}
          codeSnippet={codeSnippet}
          setCodeSnippet={setCodeSnippet}
          regularSave={regularSave}
          setRegularSave={setRegularSave}
        />
        <SandpackLayout>
          <SandpackCodeEditor 
            style={{ height: "65vh" }}
            showLineNumbers
            showInlineErrors
            wrapContent
          />
          <SandpackPreview style={{ height: "65vh" }} />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}