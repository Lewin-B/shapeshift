export const figureFile = `"use client";
    import React, { useRef, useMemo, useState } from "react";
    import { useLoader } from "@react-three/fiber";
    import * as THREE from "three";
    import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
    import { useFrame } from "@react-three/fiber";
    import { group } from "console";
    
    const SvgFigure = () => {
      const groupRef = useRef<THREE.Group | null>(null);
    
      // Load the SVG data from the provided path
      const svgData = useLoader(SVGLoader, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvuLix8QUIJctPlef32v01kWOf4gRghVyPlg&s");
      const [idx, setIdx] = useState<number>(100);
    
      useFrame(({ clock }) => {
        const group = groupRef.current;
        if (group) {
          // group.rotation.x = clock.elapsedTime;
          // group.rotation.y = clock.elapsedTime;
          // group.rotation.z = clock.elapsedTime;
          const cosValue = Math.abs(Math.cos(clock.elapsedTime * idx));
          const sinValue = Math.abs(Math.sin(clock.elapsedTime * 2));
          // if (idx == 0) {
          //   setIdx(20);
          // }
          // if (Math.abs(sinValue - 0) <= 0.01) {
          //   console.log("sub");
          //   setIdx(idx - 10);
          // }
          // group.position.y = 0.5 + sinValue * idx;
          // group.position.z = Math.cos(clock.elapsedTime) * 10;
        }
      });
    
      const meshes = useMemo(() => {
        // We’ll gather a bounding box that encloses *all* paths in the SVG
        const globalBox = new THREE.Box2(
          new THREE.Vector2(+Infinity, +Infinity),
          new THREE.Vector2(-Infinity, -Infinity),
        );
    
        // First pass: expand globalBox to contain every shape’s bounding box
        svgData.paths.forEach((path) => {
          const shapes = SVGLoader.createShapes(path);
          shapes.forEach((shape) => {
            const geom = new THREE.ShapeGeometry(shape);
            geom.computeBoundingBox();
            if (geom.boundingBox) {
              // Expand our global bounding box with this shape’s corners
              globalBox.min.x = Math.min(globalBox.min.x, geom.boundingBox.min.x);
              globalBox.min.y = Math.min(globalBox.min.y, geom.boundingBox.min.y);
              globalBox.max.x = Math.max(globalBox.max.x, geom.boundingBox.max.x);
              globalBox.max.y = Math.max(globalBox.max.y, geom.boundingBox.max.y);
            }
            geom.dispose(); // free memory
          });
        });
    
        // Compute the global center and size
        const globalCenter = new THREE.Vector2();
        globalBox.getCenter(globalCenter); // overall center
        const globalSize = new THREE.Vector2();
        globalBox.getSize(globalSize);
    
        // Optionally compute a scale if you want to fit the SVG into a given size (e.g., 10x10)
        // If you don't need it, just use scale = 1
        const desiredSize = 150; // or any other dimension
        const maxDim = Math.max(globalSize.x, globalSize.y);
        const scale = maxDim > 0 ? desiredSize / maxDim : 1;
    
        // Second pass: create the final geometry for each path
        const elements: React.JSX.Element[] = [];
        svgData.paths.forEach((path, pathIndex) => {
          const shapes = SVGLoader.createShapes(path);
    
          // Basic material
          const material = new THREE.MeshBasicMaterial({
            color: path.color,
            side: THREE.DoubleSide,
            depthWrite: false,
          });
    
          shapes.forEach((shape, shapeIndex) => {
            const extrudeSettings = {
              depth: 3,
            };
            // const geometry = new THREE.ShapeGeometry(shape);
            const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    
            geometry.computeBoundingBox();
    
            // Translate so globalCenter goes to (0, 0)
            geometry.translate(-globalCenter.x, -globalCenter.y, 0);
    
            // Scale if you want everything to fit e.g. 10×10
            geometry.scale(scale, scale, 1);
    
            // flip image
            geometry.rotateX(Math.PI);
    
            elements.push(
              <mesh
                geometry={geometry}
                material={material}
              />,
            );
          });
        });
    
        return elements;
      }, [svgData]);
    
      return <group ref={groupRef}>{meshes}</group>;
    };
    
    export default SvgFigure;
    `;

export const canvasFile = `
    "use client";
    import { Canvas } from "@react-three/fiber";
    import { OrbitControls, Text } from "@react-three/drei";
    import Figure from "./figure";
    import { Suspense } from "react";
  
    const Loading = () => {
      return <Text>Loading</Text>;
    };
  
    const Scene = () => {
      return (
        <>
          <OrbitControls enableZoom={true} enablePan={true} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Figure />
        </>
      );
    };
  
    export const CustomCanvas = () => {
      return (
        <Canvas camera={{ position: [0, 0, 50] }}>
          <Suspense fallback={<Loading />}>
            <Scene />
          </Suspense>
        </Canvas>
      );
    };
  
    `;

export const appFile = `
    import { CustomCanvas } from "./canvas.tsx"
    export default function App() {
      return <CustomCanvas />
    }
    `;
