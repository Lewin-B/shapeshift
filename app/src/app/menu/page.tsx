import SvgCard from "../_components/imports/svg-upload";
import SvgGeneratorCard from "../_components/imports/generate-svg";
import LoadSVG from "../_components/imports/load-svg";

export default function Menu() {
  return (
    <div className="mt-14 flex h-screen flex-col items-center justify-center space-y-6 bg-[radial-gradient(ellipse_156.03%_212.89%_at_93.68%_-5.52%,_#766251_0%,_#262013_35%,_#030303_77%,_#2F2817_100%)] p-4 md:mt-0">
      <h1 className="font-['Instrument Sans'] text-center text-3xl leading-[40px] font-bold text-[#FFFFFF] not-italic md:text-5xl md:leading-[59px]">
        Upload Your File
      </h1>
      <div className="flex flex-col space-y-7 md:flex-row md:justify-center md:space-y-0 md:space-x-7">
        <SvgCard />
        <SvgGeneratorCard />
        <LoadSVG />
      </div>
    </div>
  );
}
