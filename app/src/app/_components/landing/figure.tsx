"use client"

import { useState } from "react";
import FadeinText from "./_components/landing/FadeinText";
import FadeinButton from "./_components/landing/FadeInButton";
import Block from "./_components/Block";
import Image from "next/image";
import Link from "next/link";
import { Upload, Clock, SmilePlus, Smile } from "lucide-react";


import demo from "../../public/demoGif.gif"


export default function Home() {

  const [fadeOut, setFadeOut] = useState("false");

  return (
    <>

      <div className="flex h-screen w-full items-center justify-start pl-30 space-x-64 bg-[radial-gradient(ellipse_156.03%_212.89%_at_93.68%_-5.52%,_#766251_0%,_#262013_35%,_#030303_70%,_#242015_93%)]">
        <div className="flex flex-col items-center justify-center space-y-2 space-x-12 md:w-1/2 md:items-start">
          <FadeinText text={"Take your creation to the next dimension."} className="font-instrumentsans text-center text-4xl leading-tight font-bold text-white md:text-left md:text-6xl md:leading-[84px] lg:text-[65px] max-w-[550px] mb-[20px]`" delay={0}/>
          <FadeinText text={"Easily transform your two dimensional designs into 3D Models and ThreeJS code with a click of a button."} className={"font-instrumentsans text-[22px] font-normal text-white"} delay={600}/>

          <Link href="/menu" className="font-instrumentsans font-bold">
            <FadeinButton text={"Enter Playground"} className={"mt-4 rounded-full bg-[#F3B518] px-8 py-8 text-lg"} delay={1000}/>
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

      <div className="flex h-screen w-full items-center justify-start pl-30 space-x-64 bg-linear-to-t from-[#0B0A07] to-[#D0BF9C]">
        <div className="flex flex-rox gap-20 align-content-center justify-content">
          <Block step={1} instructions="Import your SVG">
            <div className="items-center justify-center space-y-3 px-10 pt-5 pb-6 mt-12 flex h-60 w-60 justify-center">
              <Upload className="h-30 w-30 text-white-400" />
            </div>
          </Block>
          <Block step={2} instructions="Wait for ShapeShift to generate your code">
            <div className="items-center justify-center space-y-3 mt-3 flex h-60 w-60 justify-center">
              <Clock className="h-30 w-30 text-white-400" />
            </div>
          </Block>
          <Block step={3} instructions="Enjoy your new 3D Model!">
            <div className="items-center justify-center space-y-3 mt-3 flex h-60 w-60 justify-center">
              <SmilePlus className="h-30 w-30 text-white-400" />
            </div>
          </Block>
        </div>
      </div>

      <div className="flex flex-col h-screen w-full items-center pt-10 bg-[radial-gradient(ellipse_156.03%_212.89%_at_93.68%_-5.52%,_#766251_0%,_#262013_45%,_#030303_80%,_#242015_95%)]">
        <h1 className="text-[#FFFFFF] leading-tight text-4xl text-center font-bold font-['Instrument Sans'] w-[800px]">
          Choose to import any svg, OR make your very own models in our Canvas workspace!
        </h1>
        <div className="flex items-center justify-center">
            <Image className="w-[1000px] h-[500px] mt-5" src={demo} alt="Demo of the canvas feature" />
        </div>

        <Link href="/menu" className="font-instrumentsans font-bold">
            <FadeinButton text={"Get Started"} className={"mt-4 rounded-full bg-[#F3B518] px-8 py-8 text-lg"} delay={1000}/>
        </Link>
      </div>
      
    </>
  );
}
