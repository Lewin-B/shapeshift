"use client"
import { useState, useEffect } from "react"; 
import { useSelectionStore } from "~/app/_components/canvas/canvasEditor";
import type { ThreeEvent } from "@react-three/fiber";

export type Shape = "cube" | "sphere" | "grlf";

type ShapeProps = {
    id: string;
    type: Shape;
    position?: [number, number, number];
    width?: number;
    length?: number;
    depth?: number;
    radius?: number;
    color?: string;
}

export default function Shape({ 
    id, 
    type, 
    position = [0, 0, 0],
    width: propWidth,
    length: propLength,
    depth: propDepth,
    radius: propRadius,
    color: propColor,
}: ShapeProps){
    // id of the shape for selection
    const selectedId = useSelectionStore((set) => set.selectedId);
    const select = useSelectionStore((set) => set.select);
    const isSelected = selectedId === id; // if the shape is already selected

    // properties of the shape we want to be able to change
    const [width, setWidth] = useState(propWidth || 25);
    const [length, setLength] = useState(propLength || 25);
    const [depth, setDepth] = useState(propDepth || 25);
    const [radius, setRadius] = useState(propRadius || 12);
    const [color, setColor] = useState(propColor || "white");
    
    // Update state when props change
    useEffect(() => {
        if (propWidth !== undefined) setWidth(propWidth);
        if (propLength !== undefined) setLength(propLength);
        if (propDepth !== undefined) setDepth(propDepth);
        if (propRadius !== undefined) setRadius(propRadius);
        if (propColor !== undefined) setColor(propColor);
    }, [propWidth, propLength, propDepth, propRadius, propColor]);
    
    const handleClick = (event : ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        select(id);
    }

    return(
        <mesh onClick={handleClick} position={position}>
            {type === "cube" && <boxGeometry args={[width, length, depth]} />}
            {type === "sphere" && <sphereGeometry args={[radius, 32, 32]} />}
            <meshStandardMaterial color={color} wireframe={isSelected} />
        </mesh>
    );
}