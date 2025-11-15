"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const steps: HowItWorksStep[] = [
  {
    number: "01",
    title: "Upload Your Image",
    description:
      "Drag and drop or click to upload your image. We support all major formats including JPG, PNG, WEBP, and more.",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
    ),
    color: "from-purple-500 to-pink-500",
  },
  {
    number: "02",
    title: "Select Transformation",
    description:
      "Choose from various AI-powered tools: background removal, object removal, restoration, generative fill, and more.",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "03",
    title: "AI Works Its Magic",
    description:
      "Our advanced AI processes your image in seconds. Watch in real-time as your transformation comes to life.",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    color: "from-green-500 to-emerald-500",
  },
  {
    number: "04",
    title: "Download & Share",
    description:
      "Download your enhanced image in high quality. Export in PNG, JPG, or WEBP format. Ready to use anywhere!",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
    ),
    color: "from-orange-500 to-red-500",
  },
];

export const HowItWorks = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-500/30 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[-8rem] h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={headerVariants}
        >
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/70 px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground/80 backdrop-blur"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Workflow
          </motion.span>
          <motion.h2
            className="mt-6 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            How It Works
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Transform any image with studio-grade results in just four intuitive
            steps.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div
                aria-hidden
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/8 via-transparent to-transparent opacity-0 blur-2xl transition group-hover:opacity-100"
              />
              <div className="relative flex h-full flex-col gap-6 rounded-3xl border border-border/40 bg-background/70 p-8 shadow-xl shadow-black/5 backdrop-blur-xl transition-transform duration-300 group-hover:-translate-y-2">
                <div className="flex items-center justify-between">
                  <motion.span
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-lg font-bold text-white shadow-lg shadow-black/20",
                      step.color
                    )}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {step.number}
                  </motion.span>
                  <motion.div
                    className={cn(
                      "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white/90 shadow-lg shadow-black/30 transition-transform duration-300 group-hover:scale-105",
                      step.color
                    )}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {step.icon}
                  </motion.div>
                </div>

                <div className="space-y-3 text-left">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="h-1 rounded-full bg-border/50">
                    <motion.div
                      className={cn(
                        "h-full w-full rounded-full bg-gradient-to-r",
                        step.color
                      )}
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    />
                  </div>
                </div>
              </div>

              {index < steps.length - 1 && (
                <motion.div
                  className="pointer-events-none absolute top-1/2 right-[-16px] hidden h-px w-1/3 -translate-y-1/2 bg-gradient-to-r from-border via-border/10 to-transparent xl:block"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 + 0.5 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-muted-foreground">
            Ready to get started? It takes less than a minute.
          </p>
          <motion.button
            className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/70 px-6 py-3 text-sm font-medium text-foreground shadow-lg shadow-black/5 backdrop-blur transition hover:border-purple-500/60 hover:text-white hover:shadow-purple-500/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore the editor
            <motion.span
              aria-hidden
              className="text-lg"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↗
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
