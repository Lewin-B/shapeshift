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

export default function page() {
  return (
    <div className="flex items-center justify-center">
      <SidebarProvider>
        <div className="w-1/4">
          <AppSidebar />
        </div>
        <Tabs defaultValue="React" className="w-full">
          <TabsList>
            <TabsTrigger value="React">React</TabsTrigger>
            <TabsTrigger value="Vanilla">Vanilla</TabsTrigger>
          </TabsList>
          <TabsContent value="React">
            <Card>
              <CardHeader>
                <CardTitle>Playground</CardTitle>
                <CardDescription>
                  Make changes to your react component export when done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <ReactPlayground />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="Vanilla">soon</TabsContent>
        </Tabs>
      </SidebarProvider>
    </div>
  );
}
