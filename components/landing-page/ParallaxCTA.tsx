"use client";

import { useEffect, useRef, useState } from "react";
import { SignUpButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

export function ParallaxCTA() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full py-24 overflow-hidden" ref={containerRef}>
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/40 rounded-full filter blur-3xl" />
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-pink-500/40 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500/40 rounded-full filter blur-3xl" />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translate(${mousePosition.x * (i * 2)}px, ${mousePosition.y * (i * 2)}px)`,
              transition: "transform 0.3s ease-out",
              animationDelay: `${i * 0.1}s`,
            }}
          >
            <div className="w-full h-full animate-ping bg-white/40 rounded-full" />
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-8 relative z-10">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div 
            className="inline-block"
            style={{
              transform: `translateY(${mousePosition.y * -10}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-white">
                Join 700,000+ creators already transforming images
              </span>
            </div>
          </div>

          {/* Headline */}
          <div 
            className="space-y-4"
            style={{
              transform: `translateY(${mousePosition.y * -5}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Transform Your Images
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                With AI Magic
              </span>
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Start your creative journey today. No credit card required. 
              Get 20 free credits instantly.
            </p>
          </div>

          {/* Features Grid */}
          <div 
            className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8"
            style={{
              transform: `translateY(${mousePosition.y * 5}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            {[
              { icon: "⚡", text: "Instant Processing" },
              { icon: "🎨", text: "Professional Quality" },
              { icon: "🔒", text: "100% Secure" },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all"
              >
                <span className="text-2xl">{feature.icon}</span>
                <span className="text-sm font-medium text-white">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{
              transform: `scale(${1 + mousePosition.y * 0.05})`,
              transition: "transform 0.3s ease-out",
            }}
          >
            <SignUpButton mode="modal">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                <span className="relative z-10">Start Creating for Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </SignUpButton>
            
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold text-white hover:bg-white/20 transition-all duration-300 hover:scale-105">
              View Pricing
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 opacity-70">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm text-white">4.9/5 rating</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-white">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-white">Enterprise-grade security</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
