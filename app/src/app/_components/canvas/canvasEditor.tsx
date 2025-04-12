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

import Shape from "~/app/_components/canvas/shape";

export type Shape = {
  id: string;
  type: "cube" | "sphere" | "plane";
  position?: [number, number, number];
  width?: number;
  length?: number;
  depth?: number;
  radius?: number;
  color?: string;
};

type ShapeStore = {
  shapes: Shape[];
  addShape: (type: "cube" | "sphere" | "plane") => void;
  removeShape: (id: string) => void;
  updateShape: (id: string, updates: Partial<Shape>) => void;
}

export const useShapeStore = create<ShapeStore>((set) => ({
  shapes: [],
  addShape: (type) => 
    set((state) => ({ 
      shapes: [...state.shapes, { 
        id: nanoid(), 
        type,
        position: [0, 0, 0],
        ...(type === "cube" ? { width: 25, length: 25, depth: 25 } : {}),
        ...(type === "sphere" ? { radius: 12 } : {}),
        ...(type === "plane" ? { width: 25, length: 25 } : {}),
      }] 
    })),
  removeShape: (id) => 
    set((state) => ({ 
      shapes: state.shapes.filter(shape => shape.id !== id) 
    })),
  updateShape: (id, updates) => 
    set((state) => ({ 
      shapes: state.shapes.map(shape => 
        shape.id === id ? { ...shape, ...updates } : shape
      )
    })),
}));

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
  const clearSelection = useSelectionStore((set) => set.clear);
  const shapes = useShapeStore((set) => set.shapes);

  return (
    <group onPointerMissed={() => clearSelection()}>
      <OrbitControls enableZoom={true} enablePan={false} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      {shapes.map((shape) => (
        <Shape 
          id={shape.id} 
          type={shape.type} 
          position={shape.position}
        />
      ))}
    </group>
  );
};

export default function CanvasEditor() {
  return (
    <div>
      <div className="h-dvh">
          <Canvas camera={{ position: [0, 0, 50] }}>
          <Suspense fallback={<Loading />}>
              <Scene />
          </Suspense>
          </Canvas>
      </div>
    </div>
  );
};