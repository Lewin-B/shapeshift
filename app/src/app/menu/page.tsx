import SvgCard from "../_components/imports/svg-upload";

export default function Menu() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-6 bg-[radial-gradient(ellipse_156.03%_212.89%_at_93.68%_-5.52%,_#766251_0%,_#262013_35%,_#030303_77%,_#2F2817_100%)]">
      <h1 className="font-['Instrument Sans'] text-5xl leading-[59px] font-bold text-[#FFFFFF] not-italic">
        Upload Your File
      </h1>
      <SvgCard />
    </div>
  );
}
