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

type SettingsProps = {
  depth: number;
  setDepth: (value: number) => void;
  size: number;
  setSize: (value: number) => void;
};

type AppSidebarProps = {
  settings: SettingsProps;
};

export function AppSidebar({ settings }: AppSidebarProps) {
  const { depth, setDepth, size, setSize } = settings;

  return (
    <Sidebar className="w-[37vh] border-r border-[#F3B518] shadow-sm">
      <SidebarHeader className="border-b border-[#F3B518] bg-[#030303] p-4 text-center font-semibold">
        <h1 className="text-xl text-[#F3B518]">Control Panel</h1>
      </SidebarHeader>
      <SidebarContent className="w-full space-y-6 bg-[#030303] p-4">
        <Card className="border-[#F3B518] bg-[#030303] transition-all hover:shadow-md">
          <CardHeader className="pb-2">
            <h2 className="flex items-center justify-center space-x-3 text-lg font-medium">
              <Scale3D className="text-[#F3B518]" size={20} />
              <span className="text-[#F3B518]">Appearance</span>
            </h2>
          </CardHeader>
          <CardContent className="space-y-6 text-[#F3B518]">
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
          </CardContent>
        </Card>
      </SidebarContent>
    </Sidebar>
  );
}
