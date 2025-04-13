"use client"

import { Label } from "~/components/ui/label";
import { useShapeStore } from "~/app/_components/canvas/canvasEditor";

type ColorPickerProps = {
  selectedId: string;
}

export function ColorPicker({ selectedId }: ColorPickerProps) {
  const updateShape = useShapeStore((state) => state.updateShape);
  const shapes = useShapeStore((state) => state.shapes);
  
  // Get the current shape
  const selectedShape = shapes.find(shape => shape.id === selectedId);
  if (!selectedShape) return null;
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateShape(selectedId, { color: e.target.value });
  };

  return (
    <div className="flex flex-col space-y-2">
      <Label className="text-xs opacity-70" htmlFor="color-picker">Color</Label>
      <div className="flex items-center space-x-2">
        <input 
          id="color-picker"
          type="color" 
          className="w-8 h-8 cursor-pointer border rounded p-0"
          value={selectedShape.color ?? "#ffffff"} 
          onChange={handleColorChange}
        />
        <span className="text-xs font-mono">
          {selectedShape.color ?? "#ffffff"}
        </span>
      </div>
    </div>
  );
}