"use client";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

import { buildFigureFile, appFile, canvasFile, appCssFile } from "./files";

import type { SettingsProps } from "~/components/app-sidebar";

type ReactPlaygroundProps = {
  settings: SettingsProps;
};

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
  } = settings;
  const figureFile = buildFigureFile({
    depth,
    size,
    svgUrl,
    rotateX,
    rotateY,
    rotateZ,
    bounceX,
    bounceY,
    bounceZ,
  });

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
