"use client";

import React, { type ReactNode } from "react";

export default function Block({
  step,
  instructions,
  children,
}: {
  step: number;
  instructions: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-card h-auto w-auto min-w-[375px] items-center justify-center justify-items-center rounded-lg bg-[#FFFFFF] p-5 shadow-[inset_0px_4px_22.600000381469727px_12px_rgba(0,0,0,0.89)] md:min-h-[500px] md:w-[25vw]">
      <h1 className="font-['Instrument Sans'] pt-9 text-center text-4xl font-bold text-[#F2B417]">
        STEP {step}
      </h1>
      <p className="font-['Instrument Sans'] w-auto pt-9 text-center text-xl text-[#FFFFFF]">
        {instructions}
      </p>
      {children}
    </div>
  );
}
