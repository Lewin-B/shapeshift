"use client";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

import { figureFile, appFile, canvasFile } from "./files";

export default function ReactPlayground() {
  return (
    <SandpackProvider
      template="react"
      customSetup={{
        dependencies: {
          "@react-three/drei": "^10.0.6",
          "@react-three/fiber": "^9.1.1",
        },
      }}
      files={{
        "/App.js": appFile,
        "/figure.tsx": figureFile,
        "/canvas.tsx": canvasFile,
        // "/node_module/@react-three/fiber/package.json": pack,
        // "/node_module/@react-three/drei/index.cjs.js": {
        //   hidden: true,
        //   code: dsRaw,
        // },
        // "/node_module/@react-three/fiber/dist/react-three-fiber.cjs.js": {
        //   hidden: true,
        //   code: fiber,
        // },
      }}
    >
      <SandpackLayout>
        <SandpackCodeEditor />
        <SandpackPreview />
      </SandpackLayout>
    </SandpackProvider>
  );
}
