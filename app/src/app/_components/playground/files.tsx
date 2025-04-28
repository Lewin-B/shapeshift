"use client";

import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

export function buildFigureGroup({
  depth,
  size,
  svgUrl,
  rotateX,
  rotateY,
  rotateZ,
  bounceX,
  bounceY,
  bounceZ,
}: {
  depth: number;
  size: number;
  svgUrl: string;
  rotateX: string;
  rotateY: string;
  rotateZ: string;
  bounceX: string;
  bounceY: string;
  bounceZ: string;
}) {
  // Create an empty group that will contain the meshes.
  const group = new THREE.Group();

  // Create an instance of the SVGLoader
  const loader = new SVGLoader();

  // Load the SVG data asynchronously.
  loader.load(
    svgUrl,
    (svgData) => {
      // --- First pass: Compute a global bounding box for all paths ---
      const globalBox = new THREE.Box2(
        new THREE.Vector2(Infinity, Infinity),
        new THREE.Vector2(-Infinity, -Infinity),
      );

      svgData.paths.forEach((path) => {
        const shapes = SVGLoader.createShapes(path);
        shapes.forEach((shape) => {
          // Create a shape geometry to measure its bounds.
          const geom = new THREE.ShapeGeometry(shape);
          geom.computeBoundingBox();
          if (geom.boundingBox) {
            globalBox.min.x = Math.min(globalBox.min.x, geom.boundingBox.min.x);
            globalBox.min.y = Math.min(globalBox.min.y, geom.boundingBox.min.y);
            globalBox.max.x = Math.max(globalBox.max.x, geom.boundingBox.max.x);
            globalBox.max.y = Math.max(globalBox.max.y, geom.boundingBox.max.y);
          }
          // Dispose if you are not reusing the geometry.
          geom.dispose();
        });
      });

      // Compute the center and size of the global bounding box.
      const globalCenter = new THREE.Vector2();
      globalBox.getCenter(globalCenter);
      const globalSize = new THREE.Vector2();
      globalBox.getSize(globalSize);
      const maxDim = Math.max(globalSize.x, globalSize.y);
      const scale = maxDim > 0 ? size / maxDim : 1;

      // --- Second pass: Create meshes for each path and add them to the group ---
      svgData.paths.forEach((path) => {
        const shapes = SVGLoader.createShapes(path);
        const material = new THREE.MeshBasicMaterial({
          color: path.color,
          side: THREE.DoubleSide,
          depthWrite: false,
        });

        shapes.forEach((shape) => {
          // Extrude the shape with the given settings.
          const extrudeSettings = { depth: depth };
          const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
          geometry.computeBoundingBox();

          // Center the geometry around (0,0) based on the global center.
          geometry.translate(-globalCenter.x, -globalCenter.y, 0);

          // Scale the geometry to fit within the desired size.
          geometry.scale(scale, scale, 1);

          // Optionally flip the geometry.
          geometry.rotateX(Math.PI);

          // Create a mesh from the geometry and material.
          const mesh = new THREE.Mesh(geometry, material);
          group.add(mesh);
        });
      });
    },
    // onProgress callback (optional)
    undefined,
    // onError callback
    (error) => {
      console.error("Error loading SVG:", error);
    },
  );

  // Attach an update function to the group for animation.
  // You can call this function in your main animation loop.
  group.userData.update = function (elapsedTime: number) {
    if (rotateX) group.rotation.x = elapsedTime;
    if (rotateY) group.rotation.y = elapsedTime;
    if (rotateZ) group.rotation.z = elapsedTime;
    if (bounceX) group.position.x = Math.sin(elapsedTime) * 2;
    if (bounceY) group.position.y = Math.sin(elapsedTime) * 2;
    if (bounceZ) group.position.z = Math.sin(elapsedTime) * 2;
  };

  return group;
}

export const buildFigureFile = ({
  depth,
  size,
  svgUrl,
  rotateX,
  rotateY,
  rotateZ,
  bounceX,
  bounceY,
  bounceZ,
}: {
  depth: number;
  size: number;
  svgUrl: string;
  rotateX: string;
  rotateY: string;
  rotateZ: string;
  bounceX: string;
  bounceY: string;
  bounceZ: string;
}) => {
  const figureFile = `
"use client";
import React, { useRef, useMemo, useState } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { useFrame } from "@react-three/fiber";
import { group } from "console";

const SvgFigure = () => {
  const groupRef = useRef<THREE.Group | null>(null);
  const svgData = useLoader(SVGLoader,"${svgUrl}");

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (group) {
      ${rotateX}
      ${rotateY}
      ${rotateZ}
      
      ${bounceX}
      ${bounceY}
      ${bounceZ}
    }
  });

  const meshes = useMemo(() => {
    const globalBox = new THREE.Box2(
      new THREE.Vector2(+Infinity, +Infinity),
      new THREE.Vector2(-Infinity, -Infinity),
    );

    svgData.paths.forEach((path) => {
      const shapes = SVGLoader.createShapes(path);
      shapes.forEach((shape) => {
        const geom = new THREE.ShapeGeometry(shape);
        geom.computeBoundingBox();
        if (geom.boundingBox) {
          globalBox.min.x = Math.min(globalBox.min.x, geom.boundingBox.min.x);
          globalBox.min.y = Math.min(globalBox.min.y, geom.boundingBox.min.y);
          globalBox.max.x = Math.max(globalBox.max.x, geom.boundingBox.max.x);
          globalBox.max.y = Math.max(globalBox.max.y, geom.boundingBox.max.y);
        }
        geom.dispose();
      });
    });

    const globalCenter = new THREE.Vector2();
    globalBox.getCenter(globalCenter);
    const globalSize = new THREE.Vector2();
    globalBox.getSize(globalSize);

    const desiredSize = ${size}; // or any other dimension
    const maxDim = Math.max(globalSize.x, globalSize.y);
    const scale = maxDim > 0 ? desiredSize / maxDim : 1;

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
          depth: ${depth},
        };

        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        geometry.computeBoundingBox();
        geometry.translate(-globalCenter.x, -globalCenter.y, 0);
        geometry.scale(scale, scale, 1);
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

  return figureFile;
};

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
    import "./App.css";

    export default function App() {
    return (
        <>
          <div id="canvas-container">
              <CustomCanvas />
          </div>
        </>
      );
    }
    `;

export const appCssFile = `
    #canvas-container {
        height: 500px;
    }
`;
