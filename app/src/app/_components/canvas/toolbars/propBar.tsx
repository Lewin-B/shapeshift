"use client"

import { useShapeStore, useSelectionStore } from "../canvasEditor";
import { Separator } from "~/components/ui/separator";
import { TransformControls } from "./components/transformControls";
import { DeleteButton } from "./components/deleteButton";
import { ScaleControls } from "./components/scaleControls";
import { ColorPicker } from "./components/colorPicker";

export default function PropertyBar() {
  const selectedId = useSelectionStore((state) => state.selectedId);
  const shapes = useShapeStore((state) => state.shapes);
  
  // If no shape is selected, don't render the toolbar
  if (!selectedId) return null;
  
  // Make sure the shape exists
  const selectedShape = shapes.find(shape => shape.id === selectedId);
  if (!selectedShape) return null;
  
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-background border rounded-lg shadow-md p-2 flex items-center space-x-2 z-10">
      {/* Shape Type Label */}
      <div className="px-2 py-1 bg-muted rounded text-sm capitalize font-medium">
        {selectedShape.type}
      </div>
      
      <Separator orientation="vertical" className="h-8" />
      
      <TransformControls selectedId={selectedId} />
      <Separator orientation="vertical" className="h-8" />
      <ScaleControls selectedId={selectedId}/>
      <Separator orientation="vertical" className="h-8" />
      <DeleteButton tooltipSide="top"/>
      <Separator orientation="vertical" className="h-8" />
      <ColorPicker selectedId={selectedId}/>
    </div>
  );
}