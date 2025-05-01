"use client";
import ReactPlayground from "./react-playground";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { SidebarProvider } from "~/components/ui/sidebar";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "~/components/ui/button";
import { Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import { AppSidebar, type ExtrudeSettings } from "~/components/app-sidebar";
import { MobileControlMenu } from "~/components/mobile-menu";
import { useState, useRef, useMemo, useEffect } from "react";
import type { ReactPlaygroundHandle } from "./react-playground";
import { api } from "~/trpc/react";

export default function LoadPlaygroundMenu() {
  const params = useParams<{ id: string }>();
  const [depth, setDepth] = useState<number>(0);
  const [size, setSize] = useState<number>(25);
  const [rotateX, setRotationX] = useState<string>("");
  const [rotateY, setRotationY] = useState<string>("");
  const [rotateZ, setRotationZ] = useState<string>("");
  const [bounceX, setBounceX] = useState<string>("");
  const [bounceY, setBounceY] = useState<string>("");
  const [bounceZ, setBounceZ] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [extrudeSettings, setExtrudeSettings] = useState<ExtrudeSettings>({
    steps: 12,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 1,
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const playgroundRef = useRef<ReactPlaygroundHandle>(null);

  const {
    data: playground,
    isLoading,
    isError,
  } = api.playground.fetchPlayground.useQuery({ id: params.id });

  // whenever `playground` changes (i.e. the query returns), sync it into state
  useEffect(() => {
    if (!playground) return;
    setDepth(playground.depth);
    setSize(playground.size);
    setRotationX(playground.rotateX);
    setRotationY(playground.rotateY);
    setRotationZ(playground.rotateZ);
    setBounceX(playground.bounceX);
    setBounceY(playground.bounceY);
    setBounceZ(playground.bounceZ);
    setColor(playground.color);
    setExtrudeSettings({
      steps: playground.steps ?? 12,
      bevelEnabled: playground.bevelEnabled ?? true,
      bevelThickness: playground.bevelThickness ?? 1,
      bevelSize: playground.bevelSize ?? 1,
      bevelOffset: playground.bevelOffset ?? 0,
      bevelSegments: playground.bevelSegments ?? 1,
    });
  }, [playground]);

  useEffect(() => {
    setPlaygroundName(playground?.name ?? "hello");
  }, [playground]);

  const [playgroundName, setPlaygroundName] = useState(playground?.name ?? "");

  const settings = useMemo(
    () => ({
      color,
      setColor,
      depth,
      setDepth,
      size,
      setSize,
      svgUrl: "",
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
      extrudeSettings,
      setExtrudeSettings,
    }),
    [
      depth,
      size,
      rotateX,
      rotateY,
      rotateZ,
      bounceX,
      bounceY,
      bounceZ,
      color,
      extrudeSettings,
    ],
  );

  useEffect(() => {
    playgroundRef.current?.updateSettings(settings);
  }, [settings]);

  const playgroundElement = useMemo(
    () => (
      <ReactPlayground
        ref={playgroundRef}
        figure={playground?.figure ?? ""}
        canvas={playground?.canvas}
        app={playground?.app}
        style={playground?.style}
      />
    ),
    [
      playground?.figure,
      playground?.canvas,
      playground?.app,
      playground?.style,
    ],
  );

  const handleSave = () => {
    if (!playgroundRef.current) return;
    playgroundRef.current.handleSave(playgroundName, settings, params.id);

    setDialogOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>error</div>;
  }

  return (
    <Suspense>
      <div className="flex h-screen flex-col justify-center overflow-hidden bg-[radial-gradient(ellipse_156.03%_212.89%_at_93.68%_-5.52%,_#766251_0%,_#262013_35%,_#030303_64%,_#242015_86%)] pt-20 md:flex-row">
        <SidebarProvider>
          <div className="hidden w-80 justify-self-center md:block">
            <AppSidebar settings={settings} />
          </div>
          <Tabs defaultValue="React" className="flex md:mx-10 md:w-290">
            <TabsList className="flex w-full justify-center bg-[#262013] text-[#FFFFFF]">
              <TabsTrigger className="text-[#F3B518]" value="React">
                React
              </TabsTrigger>
            </TabsList>
            <TabsContent value="React" className="w-screen md:w-auto">
              <Card className="shadow-[inset_0px_4px_22.600000381469727px_12px_rgba(0,0,0,0.49)]">
                <CardHeader className="flex flex-row items-center justify-between text-[#F3B518]">
                  <div>
                    <CardTitle>Playground</CardTitle>
                    <CardDescription className="text-[#FFFFFF]">
                      Make changes to your react component export when done.
                    </CardDescription>
                  </div>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-[#F3B518] text-black hover:bg-[#d49d14]">
                        <Save className="h-4 w-4" /> Save
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Save Playground</DialogTitle>
                        <DialogDescription>
                          Enter a name for your playground to save it.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            value={playgroundName}
                            onChange={(e) => setPlaygroundName(e.target.value)}
                            className="col-span-3"
                            placeholder={playgroundName}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={handleSave}
                          className="bg-[#F3B518] text-black hover:bg-[#d49d14]"
                          disabled={!playgroundName.trim()}
                        >
                          Save Project
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent className="space-y-2">
                  {playgroundElement}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <div className="block w-80 justify-self-center md:hidden">
            <MobileControlMenu settings={settings} />
            <div className="mt-4 px-4">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="hidden w-full bg-[#F3B518] text-black hover:bg-[#d49d14] md:block">
                    <Save className="h-4 w-4" /> Save Settings
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Save Playground</DialogTitle>
                    <DialogDescription>
                      Enter a name for your playground to save it.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="mobile-name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="mobile-name"
                        value={playgroundName}
                        onChange={(e) => setPlaygroundName(e.target.value)}
                        className="col-span-3"
                        placeholder={playgroundName}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={handleSave}
                      className="bg-[#F3B518] text-black hover:bg-[#d49d14]"
                      disabled={!playgroundName.trim()}
                    >
                      Save Project
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </Suspense>
  );
}
