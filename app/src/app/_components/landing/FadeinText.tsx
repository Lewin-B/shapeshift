"use client";

import { useState, useEffect } from "react";

export default function FadeinText({text, className, delay}: {text: string, className:string, delay:number}) {
    const [opacityTransition, setOpacityTransition] = useState("opacity-0");

    useEffect(() => {
        setTimeout(() => {
          setOpacityTransition("opacity-100");
        }, delay);
    }, []);

    return (
      <p className={`transition-opacity ease-in-out ${className} duration-1000 ${opacityTransition}`}>
        {text}
      </p>
    );
}
