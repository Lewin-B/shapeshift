"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "~/components/ui/sidebar";

import { Card, CardContent, CardHeader } from "~/components/ui/card";
import {
  Scale3D,
  Rotate3D,
  Move,
  Palette,
  RefreshCw,
  Settings,
  ChevronDown,
} from "lucide-react";
import { Slider } from "~/components/ui/slider";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { HexColorPicker } from "react-colorful";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";

import { Button } from "~/components/ui/button";

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
  color: string;
  setColor: (value: string) => void;
  extrudeSettings: ExtrudeSettings;
  setExtrudeSettings: (value: ExtrudeSettings) => void;
};

type AppSidebarProps = {
  settings: SettingsProps;
};

export type ExtrudeSettings = {
  steps: number;
  bevelEnabled: boolean;
  bevelThickness: number;
  bevelSize: number;
  bevelOffset: number;
  bevelSegments: number;
};

export function AppSidebar({ settings }: AppSidebarProps) {
  const {
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
    color,
    setColor,
    extrudeSettings,
    setExtrudeSettings,
  } = settings;

  // Predefined animation values
  const rotateXValue = "group.rotation.x = clock.elapsedTime;";
  const rotateYValue = "group.rotation.y = clock.elapsedTime;";
  const rotateZValue = "group.rotation.z = clock.elapsedTime;";

  const bounceXValue =
    "group.position.x = Math.sin(clock.elapsedTime * 5) * 1.5;";
  const bounceYValue =
    "group.position.y = Math.sin(clock.elapsedTime * 5) * 1.5;";
  const bounceZValue =
    "group.position.z = Math.sin(clock.elapsedTime * 5) * 1.5;";

  // Update a specific extrudeSettings property
  const updateExtrudeSetting = (key: string, value: number | boolean) => {
    setExtrudeSettings({
      ...extrudeSettings,
      [key]: value,
    });
  };

  return (
    <Sidebar className="w-80 pt-17">
      <SidebarHeader className="border-b border-[#F3B518] bg-gradient-to-r from-[#030303] to-[#262013] p-4 text-center font-semibold">
        <h1 className="text-xl text-[#FFFFFF]">Control Panel</h1>
      </SidebarHeader>
      <SidebarContent className="w-full space-y-6 bg-gradient-to-r from-[#262013] to-[#030303] p-4">
        {/* Appearance Card with Color Picker */}
        <Card className="border-[#F3B518] bg-[#030303] transition-all hover:shadow-md hover:shadow-[#F3B518]/20">
          <CardHeader className="pb-2">
            <h2 className="flex items-center justify-center space-x-3 text-lg font-medium">
              <Scale3D className="text-[#F3B518]" size={20} />
              <span className="text-[#F3B518]">Appearance</span>
            </h2>
          </CardHeader>
          <CardContent className="space-y-6 text-[#F3B518]">
            {/* Size Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Size</h4>
                <span className="rounded-full bg-[#F3B518]/10 px-2 py-0.5 text-xs font-medium">
                  {size}%
                </span>
              </div>
              <Slider
                value={[size]}
                onValueChange={(values) => setSize(values[0] ?? 0)}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>

            {/* Depth Slider with Extrude Settings */}
            <div className="space-y-2">
              {/* Collapsible Extrude Settings */}
              <Collapsible className="mt-2 rounded-md border border-[#F3B518]/30 bg-[#030303] p-3">
                <CollapsibleTrigger className="flex w-full items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Settings className="h-4 w-4 text-[#F3B518]" />
                    <h4 className="text-sm font-medium">Extrude Settings</h4>
                  </div>
                  <ChevronDown className="ui-expanded:rotate-180 h-4 w-4 text-[#F3B518] transition-transform duration-200" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-medium">Depth</h4>
                    <span className="rounded-full bg-[#F3B518]/10 px-2 py-0.5 text-xs font-medium">
                      {depth}
                    </span>
                  </div>
                  <Slider
                    value={[depth]}
                    onValueChange={(values) => setDepth(values[0] ?? 0)}
                    max={10}
                    step={1}
                    className="cursor-pointer"
                  />

                  {/* Steps */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Steps</Label>
                      <span className="rounded-full bg-[#F3B518]/10 px-2 py-0.5 text-xs">
                        {extrudeSettings.steps}
                      </span>
                    </div>
                    <Slider
                      value={[extrudeSettings.steps]}
                      onValueChange={(values) =>
                        updateExtrudeSetting("steps", values[0] ?? 0)
                      }
                      min={1}
                      max={24}
                      step={1}
                      className="cursor-pointer"
                    />
                  </div>

                  {/* Bevel Enabled */}
                  <div className="flex items-center justify-between rounded-md bg-[#F3B518]/5 p-2">
                    <Label
                      htmlFor="bevelEnabled"
                      className="cursor-pointer text-xs"
                    >
                      Bevel Enabled
                    </Label>
                    <Checkbox
                      id="bevelEnabled"
                      checked={extrudeSettings.bevelEnabled}
                      onCheckedChange={(checked) =>
                        updateExtrudeSetting("bevelEnabled", checked === true)
                      }
                      className="border-[#F3B518] data-[state=checked]:bg-[#F3B518] data-[state=checked]:text-black"
                    />
                  </div>

                  {/* Only show these if bevel is enabled */}
                  {extrudeSettings.bevelEnabled && (
                    <div className="space-y-4 rounded-md border border-[#F3B518]/20 bg-[#F3B518]/5 p-2">
                      {/* Bevel Thickness */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs">Bevel Thickness</Label>
                          <span className="rounded-full bg-[#F3B518]/10 px-2 py-0.5 text-xs">
                            {extrudeSettings.bevelThickness}
                          </span>
                        </div>
                        <Slider
                          value={[extrudeSettings.bevelThickness]}
                          onValueChange={(values) =>
                            updateExtrudeSetting(
                              "bevelThickness",
                              values[0] ?? 0,
                            )
                          }
                          min={0}
                          max={5}
                          step={0.1}
                          className="cursor-pointer"
                        />
                      </div>

                      {/* Bevel Size */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs">Bevel Size</Label>
                          <span className="rounded-full bg-[#F3B518]/10 px-2 py-0.5 text-xs">
                            {extrudeSettings.bevelSize}
                          </span>
                        </div>
                        <Slider
                          value={[extrudeSettings.bevelSize]}
                          onValueChange={(values) =>
                            updateExtrudeSetting("bevelSize", values[0] ?? 0)
                          }
                          min={0}
                          max={5}
                          step={0.1}
                          className="cursor-pointer"
                        />
                      </div>

                      {/* Bevel Offset */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs">Bevel Offset</Label>
                          <span className="rounded-full bg-[#F3B518]/10 px-2 py-0.5 text-xs">
                            {extrudeSettings.bevelOffset}
                          </span>
                        </div>
                        <Slider
                          value={[extrudeSettings.bevelOffset]}
                          onValueChange={(values) =>
                            updateExtrudeSetting("bevelOffset", values[0] ?? 0)
                          }
                          min={0}
                          max={5}
                          step={0.1}
                          className="cursor-pointer"
                        />
                      </div>

                      {/* Bevel Segments */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs">Bevel Segments</Label>
                          <span className="rounded-full bg-[#F3B518]/10 px-2 py-0.5 text-xs">
                            {extrudeSettings.bevelSegments}
                          </span>
                        </div>
                        <Slider
                          value={[extrudeSettings.bevelSegments]}
                          onValueChange={(values) =>
                            updateExtrudeSetting(
                              "bevelSegments",
                              values[0] ?? 0,
                            )
                          }
                          min={1}
                          max={10}
                          step={1}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Color Picker with Popover */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Color</h4>
                <span className="rounded-full bg-[#F3B518]/10 px-2 py-0.5 text-xs font-medium">
                  {color || "None"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className="h-10 w-10 rounded-md border border-[#F3B518] shadow-inner shadow-black/50"
                  style={{ backgroundColor: color }}
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-10 w-10 border-[#F3B518] bg-[#030303] p-0 hover:bg-[#262013] hover:shadow-md hover:shadow-[#F3B518]/20"
                    >
                      <Palette className="h-4 w-4 text-[#F3B518]" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto border-[#F3B518] bg-[#030303] p-3 shadow-lg shadow-[#F3B518]/20">
                    <HexColorPicker
                      color={color || "#F3B518"}
                      onChange={setColor}
                    />
                  </PopoverContent>
                </Popover>
                <Button
                  variant="outline"
                  className="h-10 border-[#F3B518] bg-[#030303] px-3 hover:bg-[#262013] hover:shadow-md hover:shadow-[#F3B518]/20"
                  onClick={() => {
                    setColor("");
                  }}
                >
                  <RefreshCw className="mr-2 h-4 w-4 text-[#F3B518]" />
                  <span className="text-xs text-[#F3B518]">Reset</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Animations Card */}
        <Card className="border-[#F3B518] bg-[#030303] transition-all hover:shadow-md hover:shadow-[#F3B518]/20">
          <CardHeader className="pb-2">
            <h2 className="flex items-center justify-center space-x-3 text-lg font-medium">
              <Rotate3D className="text-[#F3B518]" size={20} />
              <span className="text-[#F3B518]">Animations</span>
            </h2>
          </CardHeader>
          <CardContent className="space-y-6 text-[#F3B518]">
            {/* Collapsible Rotation Section */}
            <Collapsible className="space-y-2 rounded-md border border-[#F3B518]/30 bg-[#030303] p-3">
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Rotate3D className="h-4 w-4 text-[#F3B518]" />
                  <h3 className="font-medium">Rotation</h3>
                </div>
                <ChevronDown className="ui-expanded:rotate-180 h-4 w-4 text-[#F3B518] transition-transform duration-200" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div className="grid grid-cols-3 gap-4">
                  {/* X */}
                  <div className="flex flex-col items-center space-y-2 rounded-md bg-[#F3B518]/5 p-2">
                    <Label htmlFor="rotationX" className="text-sm">
                      X-Axis
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
                  {/* Y */}
                  <div className="flex flex-col items-center space-y-2 rounded-md bg-[#F3B518]/5 p-2">
                    <Label htmlFor="rotationY" className="text-sm">
                      Y-Axis
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
                  {/* Z */}
                  <div className="flex flex-col items-center space-y-2 rounded-md bg-[#F3B518]/5 p-2">
                    <Label htmlFor="rotationZ" className="text-sm">
                      Z-Axis
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
              </CollapsibleContent>
            </Collapsible>

            {/* Collapsible Bounce Section */}
            <Collapsible className="space-y-2 rounded-md border border-[#F3B518]/30 bg-[#030303] p-3">
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Move className="h-4 w-4 text-[#F3B518]" />
                  <h3 className="font-medium">Bounce</h3>
                </div>
                <ChevronDown className="ui-expanded:rotate-180 h-4 w-4 text-[#F3B518] transition-transform duration-200" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div className="grid grid-cols-3 gap-4">
                  {/* X */}
                  <div className="flex flex-col items-center space-y-2 rounded-md bg-[#F3B518]/5 p-2">
                    <Label htmlFor="bounceX" className="text-sm">
                      X-Axis
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
                  {/* Y */}
                  <div className="flex flex-col items-center space-y-2 rounded-md bg-[#F3B518]/5 p-2">
                    <Label htmlFor="bounceY" className="text-sm">
                      Y-Axis
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
                  {/* Z */}
                  <div className="flex flex-col items-center space-y-2 rounded-md bg-[#F3B518]/5 p-2">
                    <Label htmlFor="bounceZ" className="text-sm">
                      Z-Axis
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
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      </SidebarContent>
    </Sidebar>
  );
}
