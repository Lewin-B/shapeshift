"use client"

import { Label } from "~/components/ui/label";
import { Plus, Minus, ArrowLeftRight, ArrowUpDown, Box } from "lucide-react";
import { useShapeStore } from "~/app/_components/canvas/canvasEditor";
import { Button } from "~/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "~/components/ui/tooltip";
import { Separator } from "~/components/ui/separator";

type ScaleControlsProps = {
  selectedId: string;
  increment?: number;
}

export function ScaleControls({ 
  selectedId, 
  increment = 5 
}: ScaleControlsProps) {
  const updateShape = useShapeStore((state) => state.updateShape);
  const shapes = useShapeStore((state) => state.shapes);
  
  // Get the current shape
  const selectedShape = shapes.find(shape => shape.id === selectedId);
  if (!selectedShape) return null;
  
  // Individual dimension controls
  const adjustWidth = (amount: number) => {
    const currentWidth = selectedShape.width || 25;
    const newWidth = Math.max(5, currentWidth + amount);
    updateShape(selectedId, { width: newWidth });
  };
  
  const adjustLength = (amount: number) => {
    const currentLength = selectedShape.length || 25;
    const newLength = Math.max(5, currentLength + amount);
    updateShape(selectedId, { length: newLength });
  };
  
  const adjustDepth = (amount: number) => {
    if (selectedShape.type !== "cube") return;
    const currentDepth = selectedShape.depth || 25;
    const newDepth = Math.max(5, currentDepth + amount);
    updateShape(selectedId, { depth: newDepth });
  };
  
  const adjustRadius = (amount: number) => {
    if (selectedShape.type !== "sphere") return;
    const currentRadius = selectedShape.radius || 12;
    const newRadius = Math.max(2, currentRadius + amount);
    updateShape(selectedId, { radius: newRadius });
  };

  return (
    <div className="flex flex-col space-y-2">
      <Label className="text-xs opacity-70">Dimensions</Label>
      
      {selectedShape.type === "sphere" ? (
        <div className="flex space-x-1">
          <div className="flex items-center space-x-1">
            <span className="text-xs">R</span>
            <Button variant="ghost" size="icon" onClick={() => adjustRadius(-increment/2)}>
              <Minus className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => adjustRadius(increment/2)}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col space-y-1">
          <div className="flex items-center space-x-1">
            <span className="text-xs w-5">W</span>
            <Button variant="ghost" size="icon" onClick={() => adjustWidth(-increment)}>
              <Minus className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => adjustWidth(increment)}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-1">
            <span className="text-xs w-5">L</span>
            <Button variant="ghost" size="icon" onClick={() => adjustLength(-increment)}>
              <Minus className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => adjustLength(increment)}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          {selectedShape.type === "cube" && (
            <div className="flex items-center space-x-1">
              <span className="text-xs w-5">D</span>
              <Button variant="ghost" size="icon" onClick={() => adjustDepth(-increment)}>
                <Minus className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => adjustDepth(increment)}>
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}