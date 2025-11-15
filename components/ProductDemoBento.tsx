import React from "react";
import Image from "next/image";
import { BentoCard, BentoGrid } from "./ui/bento-grid";
// icon imports
import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";

const features = [
  {
    Icon: FileTextIcon,
    name: "AI-Powered Transformations",
    description: "Watch your images transform in real-time with cutting-edge AI technology.",
    href: "/transformations/add/restore",
    cta: "Try Now",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-violet-600/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Animated gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-6xl animate-bounce">✨</div>
                <div className="text-sm text-white/60 font-semibold">AI Magic in Action</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: InputIcon,
    name: "Lightning Fast Processing",
    description: "Get professional results in seconds, not hours.",
    href: "/",
    cta: "See Speed",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {/* Speed lines animation */}
          <div className="relative w-full h-full">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"
                style={{
                  top: `${15 + i * 15}%`,
                  left: '-100%',
                  width: '200%',
                  animation: `slideRight 2s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                  opacity: 0.6 - i * 0.1,
                }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-5xl">⚡</div>
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes slideRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(50%); }
          }
        `}</style>
      </div>
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Batch Processing",
    description: "Transform multiple images at once with our bulk tools.",
    href: "/",
    cta: "Learn More",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-600/20">
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="grid grid-cols-3 gap-3 w-full max-w-[200px]">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div
                key={i}
                className="aspect-square bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-lg border border-green-500/30"
                style={{
                  animation: `fadeInScale 0.5s ease-out forwards`,
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0,
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-xs text-white/40">
                  {i}
                </div>
              </div>
            ))}
          </div>
        </div>
        <style jsx>{`
          @keyframes fadeInScale {
            0% {
              opacity: 0;
              transform: scale(0.5);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}</style>
      </div>
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: CalendarIcon,
    name: "Export Options",
    description: "Download in any format with customizable quality settings.",
    href: "/",
    cta: "Explore",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-red-600/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3">
              {['PNG', 'JPG', 'WEBP'].map((format, i) => (
                <div
                  key={format}
                  className="px-4 py-2 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-lg border border-orange-500/30 text-xs font-semibold text-white"
                  style={{
                    animation: 'float 3s ease-in-out infinite',
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  {format}
                </div>
              ))}
            </div>
            <div className="text-center">
              <div className="text-3xl">📥</div>
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </div>
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BellIcon,
    name: "API Integration",
    description: "Integrate our powerful AI into your own applications.",
    href: "/",
    cta: "View Docs",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-purple-600/20">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {/* Code-like animation */}
          <div className="space-y-2 w-full px-6">
            {[
              'POST /api/transform',
              'Authorization: Bearer ***',
              'Content-Type: image/jpeg',
              '{ "action": "restore" }',
              '✓ Success: 200 OK',
            ].map((line, i) => (
              <div
                key={i}
                className="text-[10px] font-mono text-white/40 bg-black/20 px-3 py-2 rounded border border-purple-500/20"
                style={{
                  animation: 'slideInLeft 0.5s ease-out forwards',
                  animationDelay: `${i * 0.2}s`,
                  opacity: 0,
                }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
        <style jsx>{`
          @keyframes slideInLeft {
            0% {
              opacity: 0;
              transform: translateX(-20px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </div>
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export const ProductDemoBento = ({
  variant = "default",
}: {
  variant?: "default" | "magicui";
}) => {
  if (variant === "magicui") {
    return (
      <BentoGrid className="lg:grid-rows-3 md:h-[75vh]">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
      <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-border/50 backdrop-blur-sm hover:border-purple-500/50 transition-all">
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-purple-500"
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
            </div>
            <h3 className="text-2xl font-semibold mb-3">
              Lightning Fast Generation
            </h3>
            <p className="text-muted-foreground">
              Generate high-quality images in seconds with our advanced AI
              models. No waiting, just creating.
            </p>
          </div>
          <div className="mt-6 aspect-video bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl flex items-center justify-center">
            <span className="text-5xl">⚡</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-border/50 backdrop-blur-sm hover:border-blue-500/50 transition-all">
        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3">
          <svg
            className="w-5 h-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Multiple Styles</h3>
        <p className="text-sm text-muted-foreground">
          Choose from dozens of artistic styles
        </p>
      </div>

      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-border/50 backdrop-blur-sm hover:border-green-500/50 transition-all">
        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-3">
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Fine Control</h3>
        <p className="text-sm text-muted-foreground">
          Adjust every parameter to perfection
        </p>
      </div>

      <div className="md:col-span-2 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-border/50 backdrop-blur-sm hover:border-orange-500/50 transition-all">
        <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-3">
          <svg
            className="w-5 h-5 text-orange-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Community Gallery</h3>
        <p className="text-sm text-muted-foreground">
          Share your creations and get inspired by others. Join a thriving
          community of AI artists.
        </p>
      </div>

      <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-2xl p-6 border border-border/50 backdrop-blur-sm hover:border-violet-500/50 transition-all">
        <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center mb-3">
          <svg
            className="w-5 h-5 text-violet-500"
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
        </div>
        <h3 className="text-xl font-semibold mb-2">HD Export</h3>
        <p className="text-sm text-muted-foreground">
          Download in high resolution
        </p>
      </div>
    </div>
  );
};
