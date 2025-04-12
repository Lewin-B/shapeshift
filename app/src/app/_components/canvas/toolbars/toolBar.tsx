"use client"
import { useShapeStore, useSelectionStore } from "../canvasEditor";
import { Separator } from "@radix-ui/react-separator";
import { AddCubeButton } from "./components/addCubeButton";
import { AddSphereButton } from "./components/addSphereButton";


export default function Toolbar() {
    const addShape = useShapeStore((state) => state.addShape);
    const removeShape = useShapeStore((state) => state.removeShape);
    const selectId = useSelectionStore((state) => state.selectedId);

    return (
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-10 bg-background border rounded-lg shadow-md p-2 flex flex-col gap-2">
            <AddCubeButton />     
            <AddSphereButton />
        </div>
    );
}