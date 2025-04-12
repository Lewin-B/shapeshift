"use client";
import {
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  Sandpack,
} from "@codesandbox/sandpack-react";

import { buildFigureFile, appFile, canvasFile, appCssFile } from "./files";
import { gruvboxLight } from "@codesandbox/sandpack-themes";

type SettingsProps = {
  depth: number;
  setDepth: (value: number) => void;
  size: number;
  setSize: (value: number) => void;
};

type ReactPlaygroundProps = {
  settings: SettingsProps;
};

export default function ReactPlayground({ settings }: ReactPlaygroundProps) {
  const { depth, size } = settings;
  const figureFile = buildFigureFile({ depth, size });

  return (
    <div className="w-full">
      <Sandpack
        files={{
          "/App.js": appFile,
          "/figure.tsx": figureFile,
          "/canvas.tsx": canvasFile,
          "/App.css": appCssFile,
        }}
        theme="dark"
        template="react"
        customSetup={{
          dependencies: {
            "@react-three/drei": "^10.0.6",
            "@react-three/fiber": "^9.1.1",
          },
        }}
        options={{
          editorHeight: "100vh",
          editorWidthPercentage: 40,
        }}
      >
        <SandpackLayout>
          <SandpackCodeEditor />
          <SandpackPreview />
        </SandpackLayout>
      </Sandpack>
    </div>
  );
}
