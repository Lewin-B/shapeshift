"use client";
import FadeinText from "./FadeinText";
import FadeinButton from "./FadeInButton";
import Link from "next/link";
import { CustomCanvas } from "./canvas";

export default function Hero() {
  return (
    <div className="mt-12 flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-[#766251] via-[#262013] to-[#030303] px-4 py-8 md:flex-row md:items-center md:justify-start md:space-x-16 md:pl-10 lg:space-x-64 lg:pl-30">
      <div className="flex flex-col items-center justify-center space-y-6 text-center md:w-1/2 md:items-start md:text-left">
        <FadeinText
          text={"Take your creation to the next dimension."}
          className="font-instrumentsans mb-4 max-w-lg text-3xl leading-tight font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl lg:leading-tight"
          delay={0}
        />
        <FadeinText
          text={
            "Convert 2D assets into production-ready 3D models and Three.js code. No pipeline, no friction, just results."
          }
          className="font-instrumentsans text-base font-normal text-white sm:text-lg md:text-xl lg:text-2xl"
          delay={600}
        />

        <Link href="/menu" className="font-instrumentsans mt-6 font-bold">
          <FadeinButton
            text={"Enter Playground"}
            className="mt-4 rounded-full bg-[#F3B518] px-8 py-8 text-lg"
            delay={1000}
          />
        </Link>
      </div>
      <div className="hidden md:ml-[-175] md:block">
        <CustomCanvas className="h-3/4 w-[60vh] md:h-screen" />
      </div>
    </div>
  );
}
