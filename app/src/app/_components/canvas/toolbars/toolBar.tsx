"use client"
import { useShapeStore, useSelectionStore } from "../canvasEditor";
import { Separator } from "@radix-ui/react-separator";

export default function Toolbar() {
    const addShape = useShapeStore((state) => state.addShape);
    const removeShape = useShapeStore((state) => state.removeShape);
    const selectId = useSelectionStore((state) => state.selectedId);

    return (
        <div>
            
        </div>
    );
}