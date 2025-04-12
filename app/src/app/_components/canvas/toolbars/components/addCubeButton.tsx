"use client"

import { Square } from "lucide-react";
import { ToolbarButton } from "./ToolbarButton";
import { useShapeStore } from "~/app/_components/canvas/canvasEditor";

type AddCubeButtonProps = {
  tooltipSide?: "top" | "right" | "bottom" | "left";
  variant?: "default" | "ghost" | "outline" | "secondary";
  active?: boolean;
}

export function AddCubeButton({
  tooltipSide = "right",
  variant = "ghost",
  active = false
}: AddCubeButtonProps) {
  const addShape = useShapeStore((state) => state.addShape);
  
  const handleAddCube = () => {
    addShape("cube");
  };
  
  return (
    <ToolbarButton
      icon={Square}
      label="Add Cube"
      onClick={handleAddCube}
      tooltipSide={tooltipSide}
      variant={variant}
      active={active}
    />
  );
}