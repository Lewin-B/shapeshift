"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
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
import { Button } from "~/components/ui/button";

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

export type ExtrudeSettings = {
  steps: number;
  bevelEnabled: boolean;
  bevelThickness: number;
  bevelSize: number;
  bevelOffset: number;
  bevelSegments: number;
};

type MobileControlMenuProps = {
  settings: SettingsProps;
};

export function MobileControlMenu({ settings }: MobileControlMenuProps) {
  const [isExpanded, setIsExpanded] = useState(false);
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
    <div className="fixed right-0 bottom-0 left-0 z-50 bg-gradient-to-t from-black to-[#262013]">
      {/* Menu header */}
      <div
        className="flex items-center justify-between border-t border-[#F3B518] bg-black p-2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h1 className="flex-1 text-center text-lg font-semibold text-white">
          Control Panel
        </h1>
        <ChevronDown
          className={`text-[#F3B518] transition-transform ${isExpanded ? "rotate-180" : ""}`}
          size={20}
        />
      </div>

      {/* Expandable menu content */}
      {isExpanded && (
        <div className="max-h-96 overflow-y-auto bg-[#030303] p-3">
          <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#262013]">
              <TabsTrigger
                value="appearance"
                className="flex items-center justify-center gap-2 text-[#F3B518] data-[state=active]:bg-[#F3B518] data-[state=active]:text-black"
              >
                <Scale3D size={16} />
                <span>Appearance</span>
              </TabsTrigger>
              <TabsTrigger
                value="animations"
                className="flex items-center justify-center gap-2 text-[#F3B518] data-[state=active]:bg-[#F3B518] data-[state=active]:text-black"
              >
                <Rotate3D size={16} />
                <span>Animations</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="appearance" className="mt-3">
              <div className="space-y-5 text-[#F3B518]">
                {/* Size Slider */}
                <div className="space-y-2">
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

                {/* Extrude Settings Collapsible */}
                <Collapsible className="rounded-md border border-[#F3B518]/30 bg-[#030303] p-2">
                  <CollapsibleTrigger className="flex w-full items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-4 w-4 text-[#F3B518]" />
                      <h4 className="text-sm font-medium">Extrude Settings</h4>
                    </div>
                    <ChevronDown className="ui-expanded:rotate-180 h-4 w-4 text-[#F3B518] transition-transform duration-200" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3 space-y-4">
                    {/* Depth */}
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
                        htmlFor="bevelEnabled-mobile"
                        className="cursor-pointer text-xs"
                      >
                        Bevel Enabled
                      </Label>
                      <Checkbox
                        id="bevelEnabled-mobile"
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
                              updateExtrudeSetting(
                                "bevelOffset",
                                values[0] ?? 0,
                              )
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

                {/* Color Picker */}
                <div className="space-y-2">
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
              </div>
            </TabsContent>

            <TabsContent value="animations" className="mt-3">
              <div className="space-y-5 text-[#F3B518]">
                {/* Rotation Controls */}
                <div className="space-y-3 rounded-md border border-[#F3B518]/30 p-3">
                  <h3 className="flex items-center gap-2 text-sm font-medium">
                    <Rotate3D size={16} />
                    Rotation
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col items-center gap-1 rounded-md bg-[#F3B518]/5 p-2">
                      <Label htmlFor="rotationX-mobile" className="text-xs">
                        X-Axis
                      </Label>
                      <Checkbox
                        id="rotationX-mobile"
                        checked={rotateX !== ""}
                        onCheckedChange={() =>
                          setRotationX(rotateX ? "" : rotateXValue)
                        }
                        className="h-5 w-5 border-[#F3B518] data-[state=checked]:bg-[#F3B518] data-[state=checked]:text-black"
                      />
                    </div>
                    <div className="flex flex-col items-center gap-1 rounded-md bg-[#F3B518]/5 p-2">
                      <Label htmlFor="rotationY-mobile" className="text-xs">
                        Y-Axis
                      </Label>
                      <Checkbox
                        id="rotationY-mobile"
                        checked={rotateY !== ""}
                        onCheckedChange={() =>
                          setRotationY(rotateY ? "" : rotateYValue)
                        }
                        className="h-5 w-5 border-[#F3B518] data-[state=checked]:bg-[#F3B518] data-[state=checked]:text-black"
                      />
                    </div>
                    <div className="flex flex-col items-center gap-1 rounded-md bg-[#F3B518]/5 p-2">
                      <Label htmlFor="rotationZ-mobile" className="text-xs">
                        Z-Axis
                      </Label>
                      <Checkbox
                        id="rotationZ-mobile"
                        checked={rotateZ !== ""}
                        onCheckedChange={() =>
                          setRotationZ(rotateZ ? "" : rotateZValue)
                        }
                        className="h-5 w-5 border-[#F3B518] data-[state=checked]:bg-[#F3B518] data-[state=checked]:text-black"
                      />
                    </div>
                  </div>
                </div>

                {/* Bounce Controls */}
                <div className="space-y-3 rounded-md border border-[#F3B518]/30 p-3">
                  <h3 className="flex items-center gap-2 text-sm font-medium">
                    <Move size={16} />
                    Bounce
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col items-center gap-1 rounded-md bg-[#F3B518]/5 p-2">
                      <Label htmlFor="bounceX-mobile" className="text-xs">
                        X-Axis
                      </Label>
                      <Checkbox
                        id="bounceX-mobile"
                        checked={bounceX !== ""}
                        onCheckedChange={() =>
                          setBounceX(bounceX ? "" : bounceXValue)
                        }
                        className="h-5 w-5 border-[#F3B518] data-[state=checked]:bg-[#F3B518] data-[state=checked]:text-black"
                      />
                    </div>
                    <div className="flex flex-col items-center gap-1 rounded-md bg-[#F3B518]/5 p-2">
                      <Label htmlFor="bounceY-mobile" className="text-xs">
                        Y-Axis
                      </Label>
                      <Checkbox
                        id="bounceY-mobile"
                        checked={bounceY !== ""}
                        onCheckedChange={() =>
                          setBounceY(bounceY ? "" : bounceYValue)
                        }
                        className="h-5 w-5 border-[#F3B518] data-[state=checked]:bg-[#F3B518] data-[state=checked]:text-black"
                      />
                    </div>
                    <div className="flex flex-col items-center gap-1 rounded-md bg-[#F3B518]/5 p-2">
                      <Label htmlFor="bounceZ-mobile" className="text-xs">
                        Z-Axis
                      </Label>
                      <Checkbox
                        id="bounceZ-mobile"
                        checked={bounceZ !== ""}
                        onCheckedChange={() =>
                          setBounceZ(bounceZ ? "" : bounceZValue)
                        }
                        className="h-5 w-5 border-[#F3B518] data-[state=checked]:bg-[#F3B518] data-[state=checked]:text-black"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
