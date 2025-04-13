"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "~/components/ui/sidebar";

import { Card, CardContent, CardHeader } from "~/components/ui/card";

import { Scale3D, Rotate3D, Move } from "lucide-react";

import { Slider } from "~/components/ui/slider";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { ExportDialog } from "../app/_components/playground/export-modal";

export type SettingsProps = {
  depth: number;
  setDepth: (value: number) => void;
  size: number;
  setSize: (value: number) => void;
  svgUrl: string;
  rotateX: string;
  setRotationX: (value: string) => void;
  rotateY: string;
  setRotationY: (value: string) => void;
  rotateZ: string;
  setRotationZ: (value: string) => void;
  bounceX: string;
  setBounceX: (value: string) => void;
  bounceY: string;
  setBounceY: (value: string) => void;
  bounceZ: string;
  setBounceZ: (value: string) => void;
};

type AppSidebarProps = {
  settings: SettingsProps;
};

export function AppSidebar({ settings }: AppSidebarProps) {
  const {
    svgUrl,
    depth,
    setDepth,
    size,
    setSize,
    rotateX,
    setRotationX,
    rotateY,
    setRotationY,
    rotateZ,
    setRotationZ,
    bounceX,
    setBounceX,
    bounceY,
    setBounceY,
    bounceZ,
    setBounceZ,
  } = settings;

  const values = {
    depth,
    size,
    rotateX,
    rotateY,
    rotateZ,
    bounceX,
    bounceY,
    bounceZ,
    svgUrl,
  };

  const rotateXValue = "group.rotation.x = clock.elapsedTime;";
  const rotateYValue = "group.rotation.y = clock.elapsedTime;";
  const rotateZValue = "group.rotation.z = clock.elapsedTime;";

  const bounceXValue =
    "group.position.x = Math.sin(clock.elapsedTime * 5) * 1.5;";
  const bounceYValue =
    "group.position.y = Math.sin(clock.elapsedTime * 5) * 1.5;";
  const bounceZValue =
    "group.position.z = Math.sin(clock.elapsedTime * 5) * 1.5;";

  return (
    <Sidebar className="w-80 pt-17">
      <SidebarHeader className="border-b border-[#F3B518] p-4 text-center font-semibold bg-linear-to-r from-[#030303] to-[#262013]">
        <h1 className="text-xl text-[#FFFFFF]">Control Panel</h1>
      </SidebarHeader>
      <SidebarContent className="w-full space-y-6 p-4 bg-linear-to-r from-[#262013] to-[#030303]">
        <Card className="border-[#F3B518] transition-all hover:shadow-md">
          <CardHeader className="pb-2">
            <h2 className="flex items-center justify-center space-x-3 text-lg font-medium">
              <Scale3D className="text-[#FFD874]" size={20} />
              <span className="text-[#FFD874]">Appearance</span>
            </h2>
          </CardHeader>
          <CardContent className="space-y-6 text-[#F3B518]">
            {/* Size Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Size</h4>
                <span className="text-xs font-medium">{size}%</span>
              </div>
              <Slider
                value={[size]}
                onValueChange={(values) => setSize(values[0] ?? 0)}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>

            {/* Depth Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Depth</h4>
                <span className="text-xs font-medium">{depth}%</span>
              </div>
              <Slider
                value={[depth]}
                onValueChange={(values) => setDepth(values[0] ?? 0)}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>
          </CardContent>
        </Card>

        {/* New Animation Card */}
        <Card className="border-[#F3B518] bg-[#030303] transition-all hover:shadow-md">
          <CardHeader className="pb-2">
            <h2 className="flex items-center justify-center space-x-3 text-lg font-medium">
              <Rotate3D className="text-[#F3B518]" size={20} />
              <span className="text-[#F3B518]">Animations</span>
            </h2>
          </CardHeader>
          <CardContent className="space-y-6 text-[#F3B518]">
            {/* Rotation Section */}
            <div className="space-y-4">
              <h3 className="font-medium">Rotation</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center space-y-2">
                  <Label htmlFor="rotationX" className="text-sm">
                    X
                  </Label>
                  <Checkbox
                    id="rotationX"
                    checked={rotateX !== ""}
                    onCheckedChange={() =>
                      setRotationX(rotateX ? "" : rotateXValue)
                    }
                    className="border-[#F3B518] data-[state=checked]:bg-[#F3B518] data-[state=checked]:text-black"
                  />
                </div>

                <div className="flex flex-col items-center space-y-2">
                  <Label htmlFor="rotationY" className="text-sm">
                    Y
                  </Label>
                  <Checkbox
                    id="rotationY"
                    checked={rotateY !== ""}
                    onCheckedChange={() =>
                      setRotationY(rotateY ? "" : rotateYValue)
                    }
                    className="border-[#F3B518] data-[state=checked]:bg-[#F3B518] data-[state=checked]:text-black"
                  />
                </div>

                <div className="flex flex-col items-center justify-center space-y-2">
                  <Label htmlFor="rotationZ" className="text-sm">
                    Z
                  </Label>
                  <Checkbox
                    id="rotationZ"
                    checked={rotateZ !== ""}
                    onCheckedChange={() =>
                      setRotationZ(rotateZ ? "" : rotateZValue)
                    }
                    className="border-[#F3B518] data-[state=checked]:bg-[#F3B518] data-[state=checked]:text-black"
                  />
                </div>
              </div>
            </div>

            <Separator className="bg-[#F3B518]/30" />

            {/* Bounce Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Move className="text-[#F3B518]" size={16} />
                <h3 className="font-medium">Bounce</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center space-y-2">
                  <Label htmlFor="bounceX" className="text-sm">
                    X
                  </Label>
                  <Checkbox
                    id="bounceX"
                    checked={bounceX !== ""}
                    onCheckedChange={() =>
                      setBounceX(bounceX ? "" : bounceXValue)
                    }
                    className="border-[#F3B518] data-[state=checked]:bg-[#F3B518] data-[state=checked]:text-black"
                  />
                </div>

                <div className="flex flex-col items-center space-y-2">
                  <Label htmlFor="bounceY" className="text-sm">
                    Y
                  </Label>
                  <Checkbox
                    id="bounceY"
                    checked={bounceY !== ""}
                    onCheckedChange={() =>
                      setBounceY(bounceY ? "" : bounceYValue)
                    }
                    className="border-[#F3B518] data-[state=checked]:bg-[#F3B518] data-[state=checked]:text-black"
                  />
                </div>

                <div className="flex flex-col items-center space-y-2">
                  <Label htmlFor="bounceZ" className="text-sm">
                    Z
                  </Label>
                  <Checkbox
                    id="bounceZ"
                    checked={bounceZ !== ""}
                    onCheckedChange={() =>
                      setBounceZ(bounceZ ? "" : bounceZValue)
                    }
                    className="border-[#F3B518] data-[state=checked]:bg-[#F3B518] data-[state=checked]:text-black"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <ExportDialog values={values} />
      </SidebarContent>
    </Sidebar>
  );
}
