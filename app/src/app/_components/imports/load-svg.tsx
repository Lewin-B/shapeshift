"use client";
import { Card, CardContent } from "~/components/ui/card";
import { redirect } from "next/navigation";
import { MonitorUp } from "lucide-react";

export default function LoadSVG() {
  return (
    <Card
      onClick={() => redirect("/profile")}
      className="flex h-auto w-auto justify-center rounded-[50px] bg-black/5 shadow-[inset_0px_4px_41.099998474121094px_3px_rgba(253,250,250,0.50)]"
    >
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <div className="flex flex-col items-center justify-center space-y-3 px-10 pt-5 pb-6">
          <MonitorUp className="text-white-400 h-30 w-30" />
          <div className="font-['Instrument Sans'] text-[25px] leading-[30px] font-normal text-white not-italic">
            Load <span className="text-[#F3B518]">SVG</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
