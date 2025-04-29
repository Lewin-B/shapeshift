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
  handleSave: (
    playgroundName: string,
    settings: SettingsProps,
    id?: string,
  ) => void;
  updateSettings: (settings: SettingsProps) => void;
};

type EditorProps = {
  svgUrl: string;
};

const Editor = forwardRef<ReactPlaygroundHandle, EditorProps>(
  ({ svgUrl }, ref) => {
    const { sandpack } = useSandpack();
    const { updateFile } = sandpack;

    const createPlayground = api.playground.savePlayground.useMutation({
      onSuccess: () => toast.success("Successfully Saved Playground"),
      onError: () => toast.error("Error Saving Playground"),
    });

    // expose save handler
    useImperativeHandle(ref, () => ({
      handleSave: (playgroundName, settings, id) => {
        const figureCode = sandpack.files["/figure.tsx"]?.code;
        const canvasCode = sandpack.files["/canvas.tsx"]?.code;

        const {
          depth,
          size,
          rotateX,
          rotateY,
          rotateZ,
          bounceX,
          bounceY,
          bounceZ,
        } = settings;

        createPlayground.mutate({
          playgroundId: id,
          name: playgroundName,
          figureCode: figureCode ?? "",
          canvasCode: canvasCode ?? "",
          depth,
          size,
          rotateX,
          rotateY,
          rotateZ,
          bounceX,
          bounceY,
          bounceZ,
        });
      },
      updateSettings: (settings) => {
        const {
          depth,
          size,
          rotateX,
          rotateY,
          rotateZ,
          bounceX,
          bounceY,
          bounceZ,
        } = settings;

        const newCode = buildFigureFile({
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
        updateFile("/figure.tsx", newCode);
      },
    }));

    // mobile detection
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
    useEffect(() => {
      const onResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
      <Fragment>
        <SandpackLayout>
          {!isMobile && <SandpackCodeEditor style={{ height: "65vh" }} />}
          <SandpackPreview style={{ height: isMobile ? "30vh" : "65vh" }} />
        </SandpackLayout>
      </Fragment>
    );
  },
);
Editor.displayName = "Editor";

type ReactPlaygroundProps = {
  id?: string;
  figure: string;
};

const ReactPlayground = forwardRef<ReactPlaygroundHandle, ReactPlaygroundProps>(
  ({ figure }, ref) => {
    const urlRegex = /(https:\/\/storage\.googleapis\.com\/[^"']+\.svg)/;
    const match = urlRegex.exec(figure);

    let svgUrl = "";
    if (match) {
      svgUrl = match[1] ?? "";
    }

    return (
      <SandpackProvider
        files={{
          "/App.js": appFile,
          "/figure.tsx": figure,
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
        <Editor ref={ref} svgUrl={svgUrl} />
      </SandpackProvider>
    );
  },
);
ReactPlayground.displayName = "ReactPlayground";

export default ReactPlayground;
