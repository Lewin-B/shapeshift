"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";
import { ChevronRight, Code, Layers, Zap } from "lucide-react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CustomCanvas } from "./canvas";
import Link from "next/link";

const CodeBlock = ({
  code,
  className,
  language = "jsx",
}: {
  code: string;
  className: string;
  language?: string;
}) => {
  return (
    <div
      className={
        `relative overflow-hidden rounded-lg border border-[#F3B518] bg-black p-1 ` +
        className
      }
    >
      <div className="flex items-center justify-between bg-zinc-950 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-[#F3B518]"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-zinc-400">{language}</div>
      </div>
      <pre className="overflow-x-auto p-4 text-sm text-zinc-100">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const SVGTo3DDemo = ({ className = "" }) => {
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModel(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`relative flex w-full justify-center overflow-hidden rounded-lg border border-yellow-500 bg-black ${className}`}
    >
      {showModel ? (
        <CustomCanvas className="h-auto" />
      ) : (
        <div className="flex h-64 flex-col items-center justify-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-yellow-500"></div>
          <p className="text-sm text-yellow-500">Transforming SVG to 3D...</p>
        </div>
      )}
    </div>
  );
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon: React.JSX.ElementType;
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn(
        "flex flex-col gap-2 rounded-xl border border-[#F3B518]/50 bg-black p-6 shadow-sm transition-all hover:border-[#F3B518] hover:shadow-md",
        className,
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3B518]/10 p-2">
        <Icon className="h-5 w-5 text-[#F3B518]" />
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </motion.div>
  );
};

export default function AboutSection() {
  const sampleCode = `// Transform SVG to 3D model
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { Canvas } from '@react-three/fiber'

function SVGTo3D({ svgPath }) {
  const { paths } = useSVGLoader(svgPath)
  
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} />
      {paths.map((path, i) => (
        <mesh key={i}>
          <extrudeGeometry 
            args={[path.toShapes(true)[0], { 
              depth: 20,
              bevelEnabled: true 
            }]} 
          />
          <meshPhongMaterial color="#F3B518" />
        </mesh>
      ))}
      <OrbitControls />
    </Canvas>
  )
}`;

  return (
    <section className="flex w-full justify-center bg-black py-12 text-white md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <div className="inline-block rounded-lg bg-[#F3B518]/10 px-3 py-1 text-sm text-[#F3B518]">
              About Shapeshift
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">
              Transform 2D SVGs into Interactive 3D Models
            </h2>
            <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Shapeshift uses React Three Fiber to convert your flat SVG designs
              into fully interactive 3D models with just a few lines of code.
            </p>
          </motion.div>
        </div>

        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="px-4 py-12 sm:px-6 lg:px-8"
            >
              <div className="mx-auto flex items-center justify-center gap-8 sm:grid-cols-5">
                {/* Logo */}
                <div className="flex justify-center">
                  <Image
                    src="/logo.svg"
                    width={120}
                    height={120}
                    alt="shapeshift logo"
                    className="h-32 w-auto md:h-48"
                  />
                </div>
                <ArrowRight className="mx-auto text-2xl text-[#F3B518]" />
                <div className="h-48 w-auto">
                  <CodeBlock code={sampleCode} className="h-48 w-[400px]" />
                </div>
                <ArrowRight className="mx-auto text-2xl text-[#F3B518]" />
                <div className="w-32">
                  <SVGTo3DDemo className="h-48 w-32" />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="hidden space-y-2 md:block">
              <h3 className="text-2xl font-bold text-white">
                See It In Action
              </h3>
              <p className="text-zinc-400">
                Watch as our 2d logo created in figma is transformed into an
                interactive 3d model in realtime.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <FeatureCard
                icon={Zap}
                title="Instant Conversion"
                description="Transform SVGs to 3D models with a single function call"
              />
              <FeatureCard
                icon={Layers}
                title="Depth Control"
                description="Fine-tune extrusion depth and bevel settings"
              />
              <FeatureCard
                icon={Code}
                title="Simple API"
                description="Easy-to-use React components with minimal configuration"
              />
              <FeatureCard
                icon={ChevronRight}
                title="Get Started Fast"
                description="Import your SVGs and start creating in minutes"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mt-8 flex max-w-md flex-col items-center justify-center space-y-4 text-center"
        >
          <h3 className="text-2xl font-bold text-white">
            Ready to transform your designs?
          </h3>
          <p className="text-zinc-400">
            Enter the Playground and start building your 3d models.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href={"/menu"}
              className="inline-flex h-10 items-center justify-center rounded-md bg-[#F3B518] px-8 text-sm font-medium text-black shadow transition-colors hover:bg-[#F3B518]/90"
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
