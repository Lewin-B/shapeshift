import SvgCard from "../_components/imports/svg-upload";

export default function Menu() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-6 bg-gradient-to-tr from-[#030303] via-[#030303] to-[#f8df98]">
      <h1 className="font-['Instrument Sans'] text-5xl leading-[59px] font-bold text-[#F3B518] not-italic">
        Upload Your File
      </h1>
      <SvgCard />
    </div>
  );
}
