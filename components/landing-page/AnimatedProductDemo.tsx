"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Sparkles, Zap, Image as ImageIcon, Wand2 } from "lucide-react";

export function AnimatedProductDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -50]);

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered",
      description: "Advanced algorithms",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant processing",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: ImageIcon,
      title: "HD Quality",
      description: "Crystal clear output",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Wand2,
      title: "Smart Edits",
      description: "Professional results",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div ref={containerRef} className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]) }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full"
          >
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              ✨ See It In Action
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Transform Images Like Magic
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Watch how our AI transforms ordinary images into extraordinary results in seconds
          </motion.p>
        </motion.div>

        {/* Video Container with Scroll Animation */}
        <motion.div
          style={{ opacity, scale, y }}
          className="relative"
        >
          <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl">
            {/* Animated Border Glow */}
            <motion.div
              animate={{
                opacity: isInView ? [0.3, 0.6, 0.3] : 0.3,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-2xl"
            />

            {/* Video */}
            <motion.video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              onLoadedData={() => {
                if (videoRef.current && isInView) {
                  videoRef.current.play().catch(() => {
                    // Autoplay was prevented
                  });
                }
              }}
            >
              <source src="/assets/videos/v4-home-video-with-logos.webm" type="video/webm" />
              Your browser does not support the video tag.
            </motion.video>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none z-20" />
          </div>

          {/* Floating Feature Cards */}
          <div className="absolute inset-0 pointer-events-none">
            {features.map((feature, idx) => {
              const positions = [
                { top: "10%", left: "-5%", delay: 0.6 },
                { top: "15%", right: "-5%", delay: 0.8 },
                { bottom: "15%", left: "-5%", delay: 1.0 },
                { bottom: "10%", right: "-5%", delay: 1.2 },
              ];

              const pos = positions[idx];
              const Icon = feature.icon;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1,
                    x: 0,
                    y: 0,
                  }}
                  transition={{ 
                    duration: 0.6, 
                    delay: pos.delay,
                    type: "spring",
                    stiffness: 100,
                  }}
                  viewport={{ once: true }}
                  className="absolute hidden lg:block"
                  style={pos}
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.5,
                    }}
                    className="p-4 rounded-xl border border-border/50 bg-background/90 backdrop-blur-xl shadow-xl pointer-events-auto hover:scale-110 transition-transform"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${feature.color}`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{feature.title}</div>
                        <div className="text-xs text-muted-foreground">{feature.description}</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "0.8s", label: "Average Processing Time" },
            { value: "99.2%", label: "Accuracy Rate" },
            { value: "50M+", label: "Images Processed" },
            { value: "4.9/5", label: "User Rating" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 + idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-colors"
            >
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
