"use client"
import { useState } from "react"; 
import { useSelectionStore } from "~/app/_components/canvas/canvasEditor";
import type { ThreeEvent } from "@react-three/fiber";

export type Shape = "cube" | "sphere" | "plane";

type ShapeProps = {
    id: string;
    type: Shape;
    position?: [number, number, number];
}

export default function Shape({ id, type, position = [0, 0, 0] }: ShapeProps){
    // id of the hshape for selection
    const selectedId = useSelectionStore((set) => set.selectedId);
    const select = useSelectionStore((set) => set.select);
    const isSelected = selectedId === id; // if the shape is already selected

    // properties of the shape we want to be able to change
    const [width, setWidth] = useState(25);
    const [length, setLength] = useState(25);
    const [depth, setDepth] = useState(25);
    const [color, setColor] = useState();

    const [radius, setRadius] = useState(12);
    
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