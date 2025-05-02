import Hero from "./_components/landing/hero";
import Steps from "./_components/landing/steps";
import Demo from "./_components/landing/demo";
import FAQSection from "./_components/landing/faq";
import AboutSection from "./_components/landing/about";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <Steps />
      <FAQSection />
      <Demo />
    </>
  );
}
