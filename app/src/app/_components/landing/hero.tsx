"use client";
import FadeinText from "./FadeinText";
import FadeinButton from "./FadeInButton";
import Link from "next/link";
import { CustomCanvas } from "./canvas";

export default function Hero() {
  return (
    <div className="mt-12 flex min-h-screen w-full flex-col items-center justify-center bg-[radial-gradient(ellipse_156.03%_212.89%_at_93.68%_-5.52%,_#766251_0%,_#262013_35%,_#030303_70%,_#242015_93%)] px-4 py-8 md:flex-row md:items-center md:justify-start md:space-x-16 md:pl-10 lg:space-x-64 lg:pl-30">
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
        {/*
          <Image
            src="/logo.svg"
            width={216}
            height={376}
            alt="shapeshift logo"
            className="w-36 sm:w-40 md:w-48 lg:w-[216px]"
          />
          */}
      </div>
    </div>
  );
}
