"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { buildFigureGroup } from "./files";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
import * as THREE from "three";

type SVGAnimationProps = {
  depth: number;
  size: number;
  svgUrl: string;
  rotateX: string;
  rotateY: string;
  rotateZ: string;
  bounceX: string;
  bounceY: string;
  bounceZ: string;
};

type ExportDialogProps = {
  values: SVGAnimationProps;
};

export function ExportDialog({ values }: ExportDialogProps) {
  const [exportVersion, setExportVersion] = useState<string>("2.0");
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const {
    depth,
    size,
    svgUrl,
    rotateX,
    rotateY,
    rotateZ,
    bounceX,
    bounceY,
    bounceZ,
  } = values;

  const handleExport = () => {
    setIsExporting(true);
    // Simulate export process
    const gltfExporter = new GLTFExporter();

    const figure = buildFigureGroup({
      depth,
      size,
      svgUrl,
      rotateX,
      rotateY,
      rotateZ,
      bounceX,
      bounceY,
      bounceZ,
    });

    console.log("Hello: ");

    const scene = new THREE.Scene();

    // Add the square mesh to the scene
    scene.add(figure);

    // Define export options based on version
    const options = {
      binary: true, // Set to false for .gltf, true for .glb
      animations: [], // Add any animations if needed
      trs: false, // Transform, rotation, scale
      onlyVisible: true, // Export only visible objects
      truncateDrawRange: true,
      embedImages: true,
      maxTextureSize: 4096, // or specify another max texture size
    };

    console.log("Check: ", scene);

    // Perform the actual export
    gltfExporter.parse(
      scene,
      (gltf) => {
        console.log("Check: ");
        // Success callback
        const fileName = `figure-export-${Date.now()}`;
        const fileExtension = options.binary ? "glb" : "gltf";

        // Create download
        const blob = new Blob([gltf], { type: "application/octet-stream" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName}.${fileExtension}`;
        link.click();

        // Clean up
        URL.revokeObjectURL(link.href);

        setIsExporting(false);
        console.log(`Exported as GLTF ${exportVersion}`);
      },
      (error) => {
        // Error callback
        console.error("An error occurred during export:", error);
        setIsExporting(false);
      },
      // options,
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-[#F3B518] text-[#F3B518]">
          Export 3D Model
        </Button>
      </DialogTrigger>
      <DialogContent className="border-[#F3B518] sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export to GLTF/GLB</DialogTitle>
          <DialogDescription>
            Configure your 3D model export settings
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="version" className="text-sm font-medium">
                GLTF Version
              </label>
              <Select value={exportVersion} onValueChange={setExportVersion}>
                <SelectTrigger id="version">
                  <SelectValue placeholder="Select version" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2.0">GLTF 2.0 (Standard)</SelectItem>
                  <SelectItem value="1.0">GLTF 1.0 (Legacy)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between sm:justify-end">
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? "Exporting..." : "Export GLTF"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
