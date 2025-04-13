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
import { useThree } from "@react-three/fiber";

import Shape from "~/app/_components/canvas/shape";
import Toolbar from "./toolbars/toolBar";
import PropertyBar from "./toolbars/propBar";
import GLTFImporter from "~/components/gltf-importer";

export type Shape = {
  id: string;
  type: "cube" | "sphere" | "grlf";
  position?: [number, number, number];
  width?: number;
  length?: number;
  depth?: number;
  radius?: number;
  color?: string;
};

type ShapeStore = {
  shapes: Shape[];
  addShape: (type: "cube" | "sphere" | "grlf") => void;
  removeShape: (id: string) => void;
  updateShape: (id: string, updates: Partial<Shape>) => void;
}

function getAvailablePosition(shapes: Shape[], type: "cube" | "sphere" | "grlf"): [number, number, number] {
  // If no shapes exist, return default position
  if (shapes.length === 0) {
    return [0, 0, 0];
  }

    // Calculate the size of the new shape
    const newShapeSize = type === "sphere" 
    ? 24 // Diameter for sphere
    : 25; // Width/length for cube
  
  // Start with a position to the right of all existing shapes
  let maxX = 0;
  
  shapes.forEach(shape => {
    // Get the rightmost edge of the shape
    const shapeX = (shape.position?.[0] || 0);
    const shapeSize = shape.type === "sphere" 
      ? (shape.radius || 12) * 2
      : (shape.width || 25);
    
    const rightEdge = shapeX + shapeSize/2;
    maxX = Math.max(maxX, rightEdge);
  });
  
  // Position the new shape to the right with a small gap
  return [maxX + newShapeSize/2 + 5, 0, 0];
}

export const useShapeStore = create<ShapeStore>((set) => ({
  shapes: [],
  addShape: (type) => 
    set((state) => {
      const newPosition = getAvailablePosition(state.shapes, type);
      
      return { 
        shapes: [...state.shapes, { 
          id: nanoid(), 
          type,
          position: newPosition,
          ...(type === "cube" ? { width: 25, length: 25, depth: 25 } : {}),
          ...(type === "sphere" ? { radius: 12 } : {}),
          ...(type === "grlf" ? { width: 25, length: 25 } : {}),
        }]
      };
    }),
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
  const { scene } = useThree();

  return (
    <group onPointerMissed={() => clearSelection()}>
      <OrbitControls enableZoom={true} enablePan={true} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      {shapes.map((shape) => (
        <Shape 
          key={shape.id}
          id={shape.id} 
          type={shape.type} 
          position={shape.position}
          width={shape.width}
          length={shape.length}
          depth={shape.depth}
          radius={shape.radius}
          color={shape.color}
        />
      ))}
      {/* UNCOMMENT FOR GLTF IMPORTER, SET URL TO WHATEVER YOU WANT IMPORTED
      <GLTFImporter 
        scene={scene} 
        url="/models/Duck.gltf" 
      />
      */}
    </group>
  );
};

export default function CanvasEditor() {
  return (
    <div className="h-dvh">
        <Toolbar />
        <PropertyBar />
        <Canvas camera={{ position: [0, 0, 50] }}>
        <Suspense fallback={<Loading />}>
            <Scene />
        </Suspense>
        </Canvas>
    </div>
  );
};