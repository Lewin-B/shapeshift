"use client";
import React, {
  Fragment,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { amethyst } from "@codesandbox/sandpack-themes";
import { buildFigureFile, appFile, canvasFile, appCssFile } from "./files";
import type { SettingsProps } from "~/components/app-sidebar";
import { api } from "~/trpc/react";
import { toast } from "sonner";

// shape of the handle
export type ReactPlaygroundHandle = {
  handleSave: (playgroundName: string) => void;
};

type ReactPlaygroundProps = {
  settings: SettingsProps;
};

const Editor = forwardRef<ReactPlaygroundHandle>((_, ref) => {
  const { sandpack } = useSandpack();
  const createPlayground = api.playground.savePlayground.useMutation({
    onSuccess: () => {
      toast.success("Succesfully Saved Playground");
    },
    onError: () => {
      toast.error("Error Saving Playground");
    },
  });

  // expose handleSave
  useImperativeHandle(ref, () => ({
    handleSave: (playgroundName) => {
      console.log("Please: ", sandpack.files);
      const figureCode = sandpack.files["/figure.tsx"]?.code;
      const canvasCode = sandpack.files["/canvas.tsx"]?.code;

      createPlayground.mutate({
        name: playgroundName,
        figureCode: figureCode ?? "",
        canvasCode: canvasCode ?? "",
      });
    },
  }));

  // mobile detection
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    console.log("Current files:", sandpack.files);
  }, [sandpack.files]);

  return (
    <Fragment>
      <SandpackLayout>
        {!isMobile && <SandpackCodeEditor style={{ height: "65vh" }} />}
        <SandpackPreview style={{ height: isMobile ? "30vh" : "65vh" }} />
      </SandpackLayout>
    </Fragment>
  );
});
Editor.displayName = "Editor";

// ─── WRAPPER ────────────────────────────────────────────────────────────
const ReactPlayground = forwardRef<ReactPlaygroundHandle, ReactPlaygroundProps>(
  ({ settings }, ref) => {
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
      <SandpackProvider
        files={{
          "/App.js": appFile,
          "/figure.tsx": figureFile,
          "/canvas.tsx": canvasFile,
          "/App.css": appCssFile,
        }}
        template="react"
        theme={amethyst}
        customSetup={{
          dependencies: {
            "@react-three/drei": "^10.0.6",
            "@react-three/fiber": "^9.1.1",
          },
        }}
      >
        <Editor ref={ref} />
      </SandpackProvider>
    );
  },
);
ReactPlayground.displayName = "ReactPlayground";

export default ReactPlayground;
