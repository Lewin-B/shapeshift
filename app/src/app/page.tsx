import { Button } from "~/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <div className="flex h-screen w-full items-center justify-evenly bg-gradient-to-tr">
        <div className="flex flex-col items-center justify-center space-y-8 space-x-12 md:w-1/2 md:items-start">
          <p className="font-instrument text-center text-4xl leading-tight font-bold text-white md:text-left md:text-6xl md:leading-[104px] lg:text-[85px]">
            Take your creation to the next dimension.
          </p>
          <p className="font-instrument text-[32px] font-normal text-white">
            Easily transform your two dimensional designs into 3D Models and 3JS
            code with a click of a button
          </p>
          <Button
            size="lg"
            className="mt-4 rounded-lg bg-[#F3B518] px-8 py-6 text-lg"
          >
            <Link href="/menu">Enter Playground</Link>
          </Button>
        </div>
        <div className="mt-8 flex items-center justify-center md:mt-0">
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
