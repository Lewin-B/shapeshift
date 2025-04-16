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
    <div className="h-[30vh] w-full md:h-[65vh] md:w-full">
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
        <div className="hidden md:block">
          <SandpackLayout>
            <SandpackCodeEditor style={{ height: "65vh" }} />
            <SandpackPreview style={{ height: "65vh" }} />
          </SandpackLayout>
        </div>

        <div className="block md:hidden">
          <SandpackLayout>
            <SandpackPreview style={{ height: "30vh" }} />
          </SandpackLayout>
        </div>
      </SandpackProvider>
    </div>
  );
}
