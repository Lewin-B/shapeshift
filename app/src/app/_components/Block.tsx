"use client"

import React, { type ReactNode } from "react";

export default function Block({step, instructions, children}: {step:number, instructions:string, children: ReactNode}){
    return(
        <div className="bg-card bg-[#FFFFFF] w-[25vw] h-[70vh] rounded-lg shadow-[inset_0px_4px_22.600000381469727px_12px_rgba(0,0,0,0.89)] justify-items-center">
            <h1 className="text-[#F2B417] text-4xl font-bold font-['Instrument Sans'] text-center pt-9">
                STEP {step}
            </h1>
            <p className="text-[#FFFFFF] text-xl font-['Instrument Sans'] text-center pt-9 w-[15vw]">
                {instructions}
            </p> 
            {children}
        </div>
    );
}