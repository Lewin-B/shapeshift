"use client";

import { useState } from "react";
import FadeinText from "./_components/landing/FadeinText";
import FadeinButton from "./_components/landing/FadeInButton";
import Block from "./_components/Block";
import Image from "next/image";
import Link from "next/link";
import { Upload, Clock, SmilePlus, Smile } from "lucide-react";

import demo from "../../public/demoGif.gif";

export default function Home() {
  const [fadeOut, setFadeOut] = useState("false");

  return (
    <>
      <div className="flex h-screen w-full items-center justify-start space-x-64 bg-[radial-gradient(ellipse_156.03%_212.89%_at_93.68%_-5.52%,_#766251_0%,_#262013_35%,_#030303_70%,_#242015_93%)] pl-30">
        <div className="flex flex-col items-center justify-center space-y-2 space-x-12 md:w-1/2 md:items-start">
          <FadeinText
            text={"Take your creation to the next dimension."}
            className="font-instrumentsans mb-[20px]` max-w-[550px] text-center text-4xl leading-tight font-bold text-white md:text-left md:text-6xl md:leading-[84px] lg:text-[65px]"
            delay={0}
          />
          <FadeinText
            text={
              "Convert 2D assets into production-ready 3D models and Three.js code — no pipeline, no friction, just results."
            }
            className={"font-instrumentsans text-[22px] font-normal text-white"}
            delay={600}
          />

          <Link href="/menu" className="font-instrumentsans font-bold">
            <FadeinButton
              text={"Enter Playground"}
              className={"mt-4 rounded-full bg-[#F3B518] px-8 py-8 text-lg"}
              delay={1000}
            />
          </Link>
        </div>
        <div className="mt-8 flex items-center self-auto justify-self-center md:mt-0">
          <Image
            src="/logo.svg"
            width={216}
            height={376}
            alt="shapeshift logo"
            className="w-48 md:w-[216px]"
          />
        </div>
      </div>

      <div className="flex h-screen w-full items-center justify-start space-x-64 bg-linear-to-t from-[#0B0A07] to-[#D0BF9C] pl-30">
        <div className="flex-rox align-content-center justify-content flex gap-20">
          <Block step={1} instructions="Import your SVG">
            <div className="mt-12 flex h-60 w-60 items-center justify-center space-y-3 px-10 pt-5 pb-6">
              <Upload className="text-white-400 h-30 w-30" />
            </div>
          </Block>
          <Block
            step={2}
            instructions="Wait for ShapeShift to generate your code"
          >
            <div className="mt-3 flex h-60 w-60 items-center justify-center space-y-3">
              <Clock className="text-white-400 h-30 w-30" />
            </div>
          </Block>
          <Block step={3} instructions="Enjoy your new 3D Model!">
            <div className="mt-3 flex h-60 w-60 items-center justify-center space-y-3">
              <SmilePlus className="text-white-400 h-30 w-30" />
            </div>
          </Block>
        </div>
      </div>

      <div className="flex h-screen w-full flex-col items-center bg-[radial-gradient(ellipse_156.03%_212.89%_at_93.68%_-5.52%,_#766251_0%,_#262013_45%,_#030303_80%,_#242015_95%)] pt-10">
        <h1 className="font-['Instrument Sans'] w-[800px] text-center text-4xl leading-tight font-bold text-[#FFFFFF]">
          Choose to import any svg, OR make your very own models in our Canvas
          workspace!
        </h1>
        <div className="flex items-center justify-center">
          <Image
            className="mt-5 h-[500px] w-[1000px]"
            src={demo}
            alt="Demo of the canvas feature"
          />
        </div>

        <Link href="/menu" className="font-instrumentsans font-bold">
          <FadeinButton
            text={"Get Started"}
            className={"mt-4 rounded-full bg-[#F3B518] px-8 py-8 text-lg"}
            delay={1000}
          />
        </Link>
      </div>
    </>
  );
}
