"use client"
import { useState } from "react"; 
import { useSelectionStore } from "~/app/_components/canvas/editor";
import { Edges } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";

type Shape = "cube" | "sphere" | "plane";

type ShapeProps = {
    id: string;
    type: Shape;
}

export default function Shape({ id, type }: ShapeProps){
    // id of the hshape for selection
    const selectedId = useSelectionStore((set) => set.selectedId);
    const select = useSelectionStore((set) => set.select);
    const isSelected = selectedId === id; // if the shape is already selected

    // properties of the shape we want to be able to change
    const [width, setWidth] = useState(25);
    const [length, setLength] = useState(25);
    const [depth, setDepth] = useState(25);
    const [radius, setRadius] = useState(12);
    
    const handleClick = (event : ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        select(id);
    }

    return(
        <mesh onClick={handleClick}>
            {type === "cube" && <boxGeometry args={[width, length, depth]} />}
            {type === "sphere" && <sphereGeometry args={[radius, 32, 32]} />}
            {type === "plane" && <planeGeometry args={[width, length]} />}  
            <meshStandardMaterial />

            <Edges
                visible={isSelected}
                scale={1.01}
                threshold={15}
                color="#ff9900"
                lineWidth={3}
            />


        </mesh>
    );
}