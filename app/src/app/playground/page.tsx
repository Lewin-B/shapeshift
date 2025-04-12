"use client";
import ReactPlayground from "../_components/playground/react-playground";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { SidebarProvider } from "~/components/ui/sidebar";

import { AppSidebar } from "~/components/app-sidebar";
import { useState } from "react";

export default function Page() {
  const [depth, setDepth] = useState<number>(0);
  const [size, setSize] = useState<number>(0);

  const settings = {
    depth,
    setDepth,
    size,
    setSize,
  };

  return (
    <div className="flex items-center justify-center">
      <SidebarProvider>
        <div className="w-1/4">
          <AppSidebar settings={settings} />
        </div>
        <Tabs defaultValue="React" className="w-full bg-[#030303]">
          <TabsList className="bg-[#030303] text-[#F3B518]">
            <TabsTrigger className="bg-[#030303] text-[#F3B518]" value="React">
              React
            </TabsTrigger>
            <TabsTrigger
              value="Vanilla"
              className="bg-[#030303] text-[#F3B518]"
            >
              Vanilla
            </TabsTrigger>
          </TabsList>
          <TabsContent value="React">
            <Card className="border-[#F3B518] bg-[#030303]">
              <CardHeader className="bg-[#030303] text-[#F3B518]">
                <CardTitle>Playground</CardTitle>
                <CardDescription className="text-[#F3B518]">
                  Make changes to your react component export when done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <ReactPlayground settings={settings} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="Vanilla">soon</TabsContent>
        </Tabs>
      </SidebarProvider>
    </div>
  );
}
