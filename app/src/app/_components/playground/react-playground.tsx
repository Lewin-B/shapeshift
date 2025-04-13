"use client";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

import { buildFigureFile, appFile, canvasFile, appCssFile } from "./files";

type SettingsProps = {
  depth: number;
  setDepth: (value: number) => void;
  size: number;
  setSize: (value: number) => void;
  svgUrl: string;
};

type ReactPlaygroundProps = {
  settings: SettingsProps;
};

export default function ReactPlayground({ settings }: ReactPlaygroundProps) {
  const { depth, size, svgUrl } = settings;
  const figureFile = buildFigureFile({ depth, size, svgUrl });

  return (
    <div className="w-full h-[65vh] ">
      <SandpackProvider
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
      >
        <SandpackLayout>
          <SandpackCodeEditor style={{ height: "65vh" }} />
          <SandpackPreview style={{ height: "65vh" }} />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
