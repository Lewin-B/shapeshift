"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
/*
    We're no longer going to use the figure that is imported

    TODO:
    Import figure from playground if available
    Transform Controls
    Other shit
    Buttons LOL
*/
// import Figure from "./figure"; 
import { Suspense } from "react";
import { create } from "zustand";
import { nanoid } from "nanoid";

import Shape from "~/app/canvas/shapes/shape";

type SelectionStore = {
    selectedId: string | null;
    select: (id: string) => void;
    clear: () => void;
}

export const useSelectionStore = create<SelectionStore>((set) => ({
    selectedId: null,
    select: (id) => set({ selectedId: id }),
    clear: () => set({ selectedId: null }),
}));

const Loading = () => {
  return <Text>Loading</Text>;
};

const Scene = () => {
  return (
    <>
      <OrbitControls enableZoom={true} enablePan={true} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      {/* <Figure /> */}
      <Shape id="urmom" type="sphere"/>
    </>
  );
};

export default function CanvasEditor() {
  return (
    <div className="h-dvh">
        <Canvas camera={{ position: [0, 0, 50] }}>
        <Suspense fallback={<Loading />}>
            <Scene />
        </Suspense>
        </Canvas>
    </div>
  );
};