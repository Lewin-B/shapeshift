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

import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";

export function ExportDialog() {
  const [exportVersion, setExportVersion] = useState<string>("2.0");
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const handleExport = () => {
    setIsExporting(true);
    // Simulate export process

    setTimeout(() => {
      setIsExporting(false);
      // You would trigger your actual GLTF export logic here
      console.log(`Exporting as GLTF ${exportVersion}`);
    }, 1500);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Export 3D Model</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
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
