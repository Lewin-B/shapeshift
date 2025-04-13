"use client"

import { Circle } from "lucide-react";
import { ToolbarButton } from "./ToolbarButton";
import { useShapeStore } from "~/app/_components/canvas/canvasEditor";

type AddSphereButtonProps = {
  tooltipSide?: "top" | "right" | "bottom" | "left";
  variant?: "default" | "ghost" | "outline" | "secondary";
  active?: boolean;
}

export function AddSphereButton({
  tooltipSide = "right",
  variant = "ghost",
  active = false
}: AddSphereButtonProps) {
  const addShape = useShapeStore((state) => state.addShape);

  const handleAddSphere = () => {
    addShape("sphere");
  };
  
  return (
    <ToolbarButton
      icon={Circle}
      label="Add Sphere"
      onClick={handleAddSphere}
      tooltipSide={tooltipSide}
      variant={variant}
      active={active}
    />
  );
}