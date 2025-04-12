"use client"

import { Button } from "~/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "~/components/ui/tooltip";
import { Label } from "~/components/ui/label";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { useShapeStore } from "~/app/_components/canvas/canvasEditor";

type TransformControlsProps = {
  selectedId: string;
  increment?: number; // How much to move by each click
}

export function TransformControls({ 
  selectedId, 
  increment = 5 
}: TransformControlsProps) {
  const updateShape = useShapeStore((state) => state.updateShape);
  const shapes = useShapeStore((state) => state.shapes);
  
  // Get the current shape
  const selectedShape = shapes.find(shape => shape.id === selectedId);
  if (!selectedShape) return null;
  
  // Movement handlers
  const moveLeft = () => {
    const currentPos = selectedShape.position || [0, 0, 0];
    updateShape(selectedId, { 
      position: [currentPos[0] - increment, currentPos[1], currentPos[2]] 
    });
  };
  
  const moveRight = () => {
    const currentPos = selectedShape.position || [0, 0, 0];
    updateShape(selectedId, { 
      position: [currentPos[0] + increment, currentPos[1], currentPos[2]] 
    });
  };
  
  const moveUp = () => {
    const currentPos = selectedShape.position || [0, 0, 0];
    updateShape(selectedId, { 
      position: [currentPos[0], currentPos[1] + increment, currentPos[2]] 
    });
  };
  
  const moveDown = () => {
    const currentPos = selectedShape.position || [0, 0, 0];
    updateShape(selectedId, { 
      position: [currentPos[0], currentPos[1] - increment, currentPos[2]] 
    });
  };

  return (
    <div className="flex flex-col space-y-1">
      <Label className="text-xs opacity-70">Position</Label>
      <div className="flex space-x-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={moveLeft}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move Left</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={moveRight}>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move Right</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={moveUp}>
                <ArrowUp className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move Up</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={moveDown}>
                <ArrowDown className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move Down</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}