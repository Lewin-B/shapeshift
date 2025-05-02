import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      id: "item-1",
      question: "What makes your 3D modeling tool different from others?",
      answer:
        "Our platform combines intuitive design with powerful features, making it accessible for beginners- actually idk what I'm talking about this is really just a tool for convenience.",
    },
    {
      id: "item-2",
      question: "Do I need any prior experience to use your platform?",
      answer:
        "Not at all! Our platform is designed for beginner react devs who want to make use of 3d models without having to go through the pain of learning the ins and outs of threejs",
    },
    {
      id: "item-3",
      question:
        "The SVG generator isn't working properly for more complex images",
      answer: "Yeah I know it sucks. for now...",
    },
    {
      id: "item-4",
      question: "Can I collaborate with others on my 3D projects?",
      answer:
        "SandPack allows for real time collaboration. Simply export your playground to it's own sandbox and you'll be able to collaborate with others on your creation.",
    },
    {
      id: "item-5",
      question:
        "What are the system requirements for running your application?",
      answer:
        "All that is needed is to install the react three fiber dependencies onto your project",
    },
    {
      id: "item-6",
      question: "What web development platforms do you support",
      answer:
        "Currently only React. Hopefully it doesn't stay that way for long",
    },
  ];

  return (
    <section className="flex h-screen w-full items-center justify-center bg-black py-12 text-white md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Everything you need to know about Shapeshift
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border-[#F3B518]/30"
              >
                <AccordionTrigger className="text-left text-xl text-[#F3B518] hover:text-[#F3B518]/80">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-lg text-zinc-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
