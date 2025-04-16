"use client";
import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Scale3D, Rotate3D, Move, ChevronDown } from "lucide-react";
import { Slider } from "~/components/ui/slider";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

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

type MobileControlMenuProps = {
  settings: SettingsProps;
};

export function MobileControlMenu({ settings }: MobileControlMenuProps) {
  const [isExpanded, setIsExpanded] = useState(false);
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
        <div className="max-h-64 overflow-y-auto bg-[#030303] p-3">
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
              </div>
            </TabsContent>

            <TabsContent value="animations" className="mt-3">
              <div className="space-y-5 text-[#F3B518]">
                {/* Rotation Controls */}
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-sm font-medium">
                    <Rotate3D size={16} />
                    Rotation
                  </h3>
                  <div className="flex justify-around">
                    <div className="flex flex-col items-center gap-1">
                      <Label htmlFor="rotationX" className="text-xs">
                        X-Axis
                      </Label>
                      <Checkbox
                        id="rotationX"
                        checked={rotateX !== ""}
                        onCheckedChange={() =>
                          setRotationX(rotateX ? "" : rotateXValue)
                        }
                        className="h-5 w-5 border-[#F3B518] data-[state=checked]:bg-[#F3B518] data-[state=checked]:text-black"
                      />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Label htmlFor="rotationY" className="text-xs">
                        Y-Axis
                      </Label>
                      <Checkbox
                        id="rotationY"
                        checked={rotateY !== ""}
                        onCheckedChange={() =>
                          setRotationY(rotateY ? "" : rotateYValue)
                        }
                        className="h-5 w-5 border-[#F3B518] data-[state=checked]:bg-[#F3B518] data-[state=checked]:text-black"
                      />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Label htmlFor="rotationZ" className="text-xs">
                        Z-Axis
                      </Label>
                      <Checkbox
                        id="rotationZ"
                        checked={rotateZ !== ""}
                        onCheckedChange={() =>
                          setRotationZ(rotateZ ? "" : rotateZValue)
                        }
                        className="h-5 w-5 border-[#F3B518] data-[state=checked]:bg-[#F3B518] data-[state=checked]:text-black"
                      />
                    </div>
                  </div>
                </div>

                <Separator className="bg-[#F3B518]/30" />

                {/* Bounce Controls */}
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-sm font-medium">
                    <Move size={16} />
                    Bounce
                  </h3>
                  <div className="flex justify-around">
                    <div className="flex flex-col items-center gap-1">
                      <Label htmlFor="bounceX" className="text-xs">
                        X-Axis
                      </Label>
                      <Checkbox
                        id="bounceX"
                        checked={bounceX !== ""}
                        onCheckedChange={() =>
                          setBounceX(bounceX ? "" : bounceXValue)
                        }
                        className="h-5 w-5 border-[#F3B518] data-[state=checked]:bg-[#F3B518] data-[state=checked]:text-black"
                      />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Label htmlFor="bounceY" className="text-xs">
                        Y-Axis
                      </Label>
                      <Checkbox
                        id="bounceY"
                        checked={bounceY !== ""}
                        onCheckedChange={() =>
                          setBounceY(bounceY ? "" : bounceYValue)
                        }
                        className="h-5 w-5 border-[#F3B518] data-[state=checked]:bg-[#F3B518] data-[state=checked]:text-black"
                      />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Label htmlFor="bounceZ" className="text-xs">
                        Z-Axis
                      </Label>
                      <Checkbox
                        id="bounceZ"
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
