"use client";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "~/components/ui/sidebar";

import { Card, CardContent, CardHeader } from "~/components/ui/card";

import { Scale3D } from "lucide-react";

import { Slider } from "~/components/ui/slider";

export function AppSidebar({
  size: initialSize,
  depth: initialDepth,
}: {
  size: number;
  depth: number;
}) {
  const [size, setSize] = useState(initialSize);
  const [depth, setDepth] = useState(initialDepth);

  return (
    <Sidebar className="w-[37vh] border-r shadow-sm">
      <SidebarHeader className="border-b p-4 text-center font-semibold">
        <h1 className="text-xl">Control Panel</h1>
      </SidebarHeader>
      <SidebarContent className="w-full space-y-6 p-4">
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="pb-2">
            <h2 className="flex items-center space-x-3 text-lg font-medium">
              <Scale3D className="text-blue-500" size={20} />
              <span>Appearance</span>
            </h2>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Size Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-700">Size</h4>
                <span className="text-xs font-medium text-gray-500">
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

            {/* Depth Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-700">Depth</h4>
                <span className="text-xs font-medium text-gray-500">
                  {depth}%
                </span>
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
      </SidebarContent>
    </Sidebar>
  );
}
