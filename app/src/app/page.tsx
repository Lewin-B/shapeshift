import { Button } from "~/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <div className="flex h-screen w-full items-center justify-start pl-30 space-x-64 bg-[radial-gradient(ellipse_156.03%_212.89%_at_93.68%_-5.52%,_#867A5B_0%,_#2F2817_50%,_#030303_85%,_#2F2817_100%)]">
        <div className="flex flex-col items-center justify-center space-y-2 space-x-12 md:w-1/2 md:items-start">
          <p className="font-instrumentsans text-center text-4xl leading-tight font-bold text-white md:text-left md:text-6xl md:leading-[84px] lg:text-[65px] max-w-[550px] mb-[20px]">
            Take your creation to the next dimension.
          </p>
          <p className="font-instrumentsans text-[22px] font-normal text-white">
            Easily transform your two dimensional designs into 3D Models and 3JS
            code with a click of a button.
          </p>
          <Button
            size="lg"
            className="mt-4 rounded-full bg-[#F3B518] px-8 py-8 text-lg"
          >
            <Link href="/menu" className="font-instrumentsans font-bold">Enter Playground</Link>
          </Button>
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
    </>
  );
}
