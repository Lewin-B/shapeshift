import Block from "../Block";
import { Upload, Clock, SmilePlus } from "lucide-react";

export default function Steps() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-t from-[#0B0A07] to-[#D0BF9C] px-4 py-10">
      <h2 className="mb-10 text-2xl font-bold text-white md:hidden">
        How It Works
      </h2>
      <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-10 lg:gap-20">
        <Block step={1} instructions="Import your SVG">
          <div className="flex items-center justify-center sm:h-52 sm:w-52 md:h-56 md:w-56 lg:h-60 lg:w-60">
            <Upload className="text-white-400 h-20 w-20" />
          </div>
        </Block>
        <Block
          step={2}
          instructions="Wait for ShapeShift to generate your code"
        >
          <div className="flex h-48 w-48 items-center justify-center sm:h-52 sm:w-52 md:h-56 md:w-56 lg:h-60 lg:w-60">
            <Clock className="text-white-400 h-20 w-20" />
          </div>
        </Block>
        <Block step={3} instructions="Enjoy your new 3D Model!">
          <div className="flex h-48 w-48 items-center justify-center sm:h-52 sm:w-52 md:h-56 md:w-56 lg:h-60 lg:w-60">
            <SmilePlus className="text-white-400 h-20 w-20" />
          </div>
        </Block>
      </div>
    </div>
  );
}
