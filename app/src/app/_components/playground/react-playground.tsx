"use client";
import {
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  Sandpack,
} from "@codesandbox/sandpack-react";

import { figureFile, appFile, canvasFile, appCssFile } from "./files";

export default function ReactPlayground() {
  return (
    <div className="w-full">
      <Sandpack
        files={{
          "/App.js": appFile,
          "/figure.tsx": figureFile,
          "/canvas.tsx": canvasFile,
          "/App.css": appCssFile,
        }}
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
