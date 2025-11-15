"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function LiveTransformations() {
  const [activeTab, setActiveTab] = useState(0);

  const transformations = [
    {
      title: "Background Removal",
      description: "Remove backgrounds instantly with AI precision",
      before: "/assets/images/sub-compare-image-bg-remove-before.jpeg",
      after: "/assets/images/sub-compare-image-bg-remove-after.jpeg",
      stats: { time: "0.8s", accuracy: "99.2%" },
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Image Enhancement",
      description: "Restore and enhance photo quality automatically",
      before: "/assets/images/sub-compare-image-enhnace-before.jpeg",
      after: "/assets/images/sub-compare-image-enhnace-after.jpeg",
      stats: { time: "1.2s", accuracy: "98.7%" },
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Object Removal",
      description: "Erase unwanted objects seamlessly",
      before: "/assets/images/sub-compare-image-remove-before.jpeg",
      after: "/assets/images/sub-compare-image-remove-after.jpeg",
      stats: { time: "1.5s", accuracy: "97.9%" },
      color: "from-orange-500 to-red-500",
    },
  ];

  const active = transformations[activeTab];

  return (
    <div className="w-full py-20 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div 
            className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Live AI Processing
            </span>
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            See the Magic in Action
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Watch as our AI transforms images in real-time with professional results
          </motion.p>
        </div>

        {/* Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {transformations.map((transform, idx) => (
            <motion.button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={cn(
                "px-6 py-3 rounded-xl font-medium transition-all duration-300",
                activeTab === idx
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50"
                  : "bg-card/50 border border-border/50 hover:border-purple-500/50 text-muted-foreground hover:text-foreground"
              )}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {transform.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Transformation Display */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            className="grid lg:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Before/After Images */}
            <div className="space-y-4">
              <motion.div 
                className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/50 group"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={active.before}
                  alt="Before transformation"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-lg text-white text-sm font-medium">
                  Before
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>

              <motion.div 
                className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/50 group"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={active.after}
                  alt="After transformation"
                  fill
                  className="object-cover"
                />
                <motion.div 
                  className={cn(
                    "absolute top-4 left-4 px-3 py-1.5 backdrop-blur-sm rounded-lg text-white text-sm font-medium bg-gradient-to-r",
                    active.color
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  After
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </div>

            {/* Info Panel */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-3xl font-bold mb-3">{active.title}</h3>
                <p className="text-muted-foreground text-lg">
                  {active.description}
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div 
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.div 
                  className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-sm text-muted-foreground mb-2">
                    Processing Time
                  </div>
                  <motion.div 
                    className={cn(
                      "text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                      active.color
                    )}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    {active.stats.time}
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-sm text-muted-foreground mb-2">
                    AI Accuracy
                  </div>
                  <motion.div 
                    className={cn(
                      "text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                      active.color
                    )}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    {active.stats.accuracy}
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Features */}
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="font-semibold mb-3">Key Features:</div>
                {[
                  "Powered by advanced AI models",
                  "Batch processing support",
                  "High-resolution output",
                  "API access available",
                ].map((feature, idx) => (
                  <motion.div 
                    key={idx} 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 + 0.7, duration: 0.4 }}
                  >
                    <motion.div 
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-r text-white",
                        active.color
                      )}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                    <span className="text-muted-foreground">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Progress Bar Animation */}
              <motion.div 
                className="pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Processing</span>
                  <span className="font-medium">100%</span>
                </div>
                <div className="h-2 bg-border/30 rounded-full overflow-hidden">
                  <motion.div 
                    className={cn(
                      "h-full rounded-full bg-gradient-to-r",
                      active.color
                    )}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Info */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-muted-foreground mb-4">
            Try it yourself with 20 free credits - No credit card required
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              { color: "green", label: "API Available" },
              { color: "blue", label: "Batch Processing" },
              { color: "purple", label: "HD Quality Export" }
            ].map((item, idx) => (
              <motion.div 
                key={item.label}
                className="flex items-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 + 0.4, duration: 0.3 }}
              >
                <motion.div 
                  className={`w-2 h-2 bg-${item.color}-500 rounded-full`}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: idx * 0.3
                  }}
                />
                <span className="text-muted-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
