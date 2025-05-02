import Hero from "./_components/landing/hero";
import Steps from "./_components/landing/steps";
import Demo from "./_components/landing/demo";
import FAQ from "./_components/landing/faq";
import About from "./_components/landing/about";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Steps />
      <FAQ />
      <Demo />
    </>
  );
}
