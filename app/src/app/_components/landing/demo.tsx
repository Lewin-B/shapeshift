import Image from "next/image";
import Link from "next/link";
import demo from "~/../public/demoGif.gif";
import FadeinButton from "./FadeInButton";

export default function Demo() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-evenly bg-[radial-gradient(ellipse_156.03%_212.89%_at_93.68%_-5.52%,_#766251_0%,_#262013_45%,_#030303_80%,_#242015_95%)] px-4 py-10">
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
  );
}
