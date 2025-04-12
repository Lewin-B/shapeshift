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
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { AppSidebar } from "~/components/app-sidebar";
import { useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const fileUrl = searchParams.get("fileUrl");
  const [depth, setDepth] = useState<number>(0);
  const [size, setSize] = useState<number>(0);

  const settings = {
    depth,
    setDepth,
    size,
    setSize,
    svgUrl: fileUrl ?? "",
  };

  return (
    <Suspense>
      <div className="flex h-screen justify-center pt-20 bg-[radial-gradient(ellipse_156.03%_212.89%_at_93.68%_-5.52%,_#766251_0%,_#262013_35%,_#030303_64%,_#242015_86%)] overflow-hidden">
        <SidebarProvider>
          <div className="w-80 justify-self-center">
            <AppSidebar settings={settings} />
          </div>
          <Tabs defaultValue="React" className="ml-10 mr-10 w-290 flex">
            <TabsList className="text-[#FFFFFF] flex w-full justify-center bg-[#262013]">
              <TabsTrigger
                className="text-[#F3B518]"
                value="React"
              >
                React
              </TabsTrigger>
              <TabsTrigger
                value="Vanilla"
                className="text-[#F3B518]"
              >
                Vanilla
              </TabsTrigger>
            </TabsList>
            <TabsContent value="React">
              <Card className="shadow-[inset_0px_4px_22.600000381469727px_12px_rgba(0,0,0,0.49)]">
                <CardHeader className="text-[#F3B518]">
                  <CardTitle>Playground</CardTitle>
                  <CardDescription className="text-[#FFFFFF]">
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
    </Suspense>
  );
}
