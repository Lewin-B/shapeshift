"use client";

import { useState } from "react";
import FadeinText from "./_components/landing/FadeinText";
import FadeinButton from "./_components/landing/FadeInButton";
import Block from "./_components/Block";
import Image from "next/image";
import Link from "next/link";
import { Upload, Clock, SmilePlus, Smile } from "lucide-react";
import { CustomCanvas } from "./_components/landing/canvas";

import demo from "../../public/demoGif.gif";

export default function Home() {
  const [fadeOut, setFadeOut] = useState("false");

  return (
    <>
      {/* Hero Section */}
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[radial-gradient(ellipse_156.03%_212.89%_at_93.68%_-5.52%,_#766251_0%,_#262013_35%,_#030303_70%,_#242015_93%)] px-4 py-8 md:flex-row md:items-center md:justify-start md:space-x-16 md:pl-10 lg:space-x-64 lg:pl-30">
        <div className="flex flex-col items-center justify-center space-y-6 text-center md:w-1/2 md:items-start md:text-left">
          <FadeinText
            text={"Take your creation to the next dimension."}
            className="font-instrumentsans mb-4 max-w-lg text-3xl leading-tight font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl lg:leading-tight"
            delay={0}
          />
          <FadeinText
            text={
              "Convert 2D assets into production-ready 3D models and Three.js code — no pipeline, no friction, just results."
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
        <div className="ml-[-175]">
          <CustomCanvas />
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

      {/* Steps Section */}
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-t from-[#0B0A07] to-[#D0BF9C] px-4 py-10">
        <h2 className="mb-10 text-2xl font-bold text-white md:hidden">
          How It Works
        </h2>
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-10 lg:gap-20">
          <Block step={1} instructions="Import your SVG">
            <div className="flex h-48 w-48 items-center justify-center sm:h-52 sm:w-52 md:h-56 md:w-56 lg:h-60 lg:w-60">
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

      {/* Demo Section */}
      <div className="flex min-h-screen w-full flex-col items-center bg-[radial-gradient(ellipse_156.03%_212.89%_at_93.68%_-5.52%,_#766251_0%,_#262013_45%,_#030303_80%,_#242015_95%)] px-4 py-10">
        <h1 className="font-['Instrument Sans'] max-w-xs text-center text-2xl leading-tight font-bold text-white sm:max-w-md sm:text-3xl md:max-w-lg md:text-4xl lg:max-w-2xl">
          Choose to import any svg, OR make your very own models in our Canvas
          workspace!
        </h1>
        <div className="mt-6 flex w-full items-center justify-center">
          <Image
            className="h-auto w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl"
            src={demo}
            alt="Demo of the canvas feature"
          />
        </div>

        <Link href="/menu" className="font-instrumentsans mt-8 font-bold">
          <FadeinButton
            text={"Get Started"}
            className="rounded-full bg-[#F3B518] px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg"
            delay={1000}
          />
        </Link>
      </div>
    </>
  );
}