"use client";
import { Button } from "~/components/ui/button";
import { useState, useEffect } from "react";

export default function FadeinButton({text, className, delay}: {text: string, className:string, delay:number}) {
    const [opacityTransition, setOpacityTransition] = useState("opacity-0");

    useEffect(() => {
        setTimeout(() => {
          setOpacityTransition("opacity-100");
        }, delay);
    }, []);

    return (
      <Button className={`transition-opacity ease-in-out ${className} duration-800 color-black ${opacityTransition}`}>
        {text}
      </Button>
    );

}
