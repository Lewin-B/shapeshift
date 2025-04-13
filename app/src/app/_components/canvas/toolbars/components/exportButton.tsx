"use client";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
import * as THREE from "three";
import { useShapeStore } from "~/app/_components/canvas/canvasEditor";

export function ExportCornerButton() {
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const shapes = useShapeStore((state) => state.shapes);

  const handleExport = () => {
    if (shapes.length === 0) {
      alert("No shapes to export. Add some shapes to your canvas first.");
      return;
    }

    setIsExporting(true);
    const gltfExporter = new GLTFExporter();

    // Create a new scene for export
    const scene = new THREE.Scene();

    // Add lighting to make the 3D models visible
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Add all shapes from the canvas to the export scene
    shapes.forEach((shape) => {
      let geometry;
      let material = new THREE.MeshStandardMaterial({
        color: shape.color || 0xffffff
      });

      // Create appropriate geometry based on shape type
      if (shape.type === "cube") {
        geometry = new THREE.BoxGeometry(
          shape.width || 25, 
          shape.length || 25, 
          shape.depth || 25
        );
      } else if (shape.type === "sphere") {
        geometry = new THREE.SphereGeometry(
          shape.radius || 12, 
          32, 
          32
        );
      } else {
        // Handle other shape types if needed
        return;
      }

      // Create mesh and set position
      const mesh = new THREE.Mesh(geometry, material);
      if (shape.position) {
        mesh.position.set(...shape.position);
      }
      
      scene.add(mesh);
    });

    // Define export options
    const options = {
      binary: true, // Export as GLB by default
      animations: [],
      trs: false,
      onlyVisible: true,
      truncateDrawRange: true,
      embedImages: true,
      maxTextureSize: 4096
    };

    // Perform the export
    gltfExporter.parse(
      scene,
      (gltf) => {
        // Success callback
        const fileName = `shapeshift-export-${Date.now()}`;
        const fileExtension = "glb";

        // Create download - handle different return types
        let blob = new Blob([gltf as ArrayBuffer], { type: "application/octet-stream" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName}.${fileExtension}`;
        link.click();

        // Clean up
        URL.revokeObjectURL(link.href);
        setIsExporting(false);
      },
      (error) => {
        // Error callback
        console.error("An error occurred during export:", error);
        setIsExporting(false);
        alert("Export failed. See console for details.");
      },
      options
    );
  };

  return (
    <div className="absolute bottom-4 right-4 z-10">
      <Button 
        onClick={handleExport} 
        disabled={isExporting} 
        className="bg-[#F3B518] hover:bg-[#e5a916] text-black font-medium shadow-md"
      >
        {isExporting ? "Exporting..." : "Export 3D Model"}
      </Button>
    </div>
  );
}