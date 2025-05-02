"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Block from "../Block";
import { Upload, Clock, SmilePlus } from "lucide-react";

export default function Steps() {
  const [activeStep, setActiveStep] = useState(0);

  // Auto-cycle through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      step: 1,
      instructions: "Install React Three Fiber to your workspace",
      icon: (
        <div className="rounded-md bg-black/80 p-3 font-mono text-sm text-[#F3B518] shadow-lg">
          <div>npm install three @react-three/fiber</div>
          <div>npm install @react-three/drei</div>
        </div>
      ),
    },
    {
      step: 2,
      instructions: "Import your SVG",
      icon: <Upload className="h-20 w-20 text-white" />,
    },
    {
      step: 3,
      instructions: "Wait for ShapeShift to generate your code",
      icon: <Clock className="h-20 w-20 text-white" />,
    },
    {
      step: 4,
      instructions: "Enjoy your new 3D Model!",
      icon: <SmilePlus className="h-20 w-20 text-white" />,
    },
  ];

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const blockVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  const iconVariants = {
    initial: { scale: 0.8, opacity: 0.7 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        yoyo: Infinity,
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-4 py-10">
      <motion.h2
        className="mb-10 text-3xl font-bold text-white md:text-4xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        How It Works
      </motion.h2>

      <motion.div
        className="flex flex-col items-center justify-center gap-8 md:flex-row md:flex-wrap md:gap-10 lg:gap-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {steps.map((item, index) => (
          <motion.div
            key={item.step}
            variants={blockVariants}
            whileHover="hover"
            className={`relative ${activeStep === index ? "z-10" : "z-0"}`}
          >
            <motion.div
              animate={activeStep === index ? { scale: 1.05 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Block step={item.step} instructions={item.instructions}>
                <div className="flex h-48 w-48 flex-col items-center justify-center rounded-lg shadow-lg sm:h-52 sm:w-52 md:h-56 md:w-56 lg:h-60 lg:w-60">
                  <motion.div
                    variants={iconVariants}
                    initial="initial"
                    animate={activeStep === index ? "animate" : "initial"}
                  >
                    {item.icon}
                  </motion.div>
                </div>
              </Block>
            </motion.div>

            {activeStep === index && (
              <motion.div
                className="absolute -inset-2 -z-10 rounded-lg bg-gradient-to-r from-[#F3B518]/40 to-[#F3B518]/20 blur-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
