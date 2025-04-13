"use client"

import { Trash2 } from "lucide-react";
import { ToolbarButton } from "./ToolbarButton";
import { useShapeStore, useSelectionStore } from "~/app/_components/canvas/canvasEditor";

type DeleteButtonProps = {
  tooltipSide?: "top" | "right" | "bottom" | "left";
  variant?: "default" | "ghost" | "outline" | "secondary";
}

export function DeleteButton({
  tooltipSide = "top",
  variant = "ghost"
}: DeleteButtonProps) {
  const selectedId = useSelectionStore((state) => state.selectedId);
  const removeShape = useShapeStore((state) => state.removeShape);
  
  const handleDelete = () => {
    if (selectedId) {
      removeShape(selectedId);
    }
  };
  
  return (
    <ToolbarButton
      icon={Trash2}
      label="Delete Shape"
      onClick={handleDelete}
      disabled={!selectedId}
      tooltipSide={tooltipSide}
      variant={variant}
    />
  );
}