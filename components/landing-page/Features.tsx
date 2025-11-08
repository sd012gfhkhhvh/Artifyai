import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

export const Features = () => {
  return (
    <div className="space-y-24 md:space-y-32 xl:space-y-36">
      {/* Feature 1 - Image Restore */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
          <div className="inline-block">
            <span className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm font-medium text-purple-600 dark:text-purple-400">
              AI-Powered
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Restore Old Photos{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Instantly
            </span>
          </h3>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Bring damaged or faded photos back to life with our advanced AI
            restoration technology. Remove scratches, enhance details, and
            restore colors automatically.
          </p>
          <ul className="space-y-3">
            {[
              "Remove scratches and damage",
              "Enhance facial details",
              "Restore faded colors",
              "Upscale to HD quality",
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
          <Button className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            Try Image Restore
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Button>
        </div>
        <div className="relative order-1 lg:order-2">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-20"></div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop"
              alt="Image Restore Demo"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Feature 2 - Generative Fill */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="relative order-1">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur-2xl opacity-20"></div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=600&fit=crop"
              alt="Generative Fill Demo"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="space-y-4 md:space-y-6 order-2">
          <div className="inline-block">
            <span className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm font-medium text-blue-600 dark:text-blue-400">
              Magic Fill
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Generative Fill for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Perfect Edits
            </span>
          </h3>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Add or extend content seamlessly with AI-powered generative fill.
            Perfect for expanding backgrounds, filling gaps, or creating new
            elements that blend naturally.
          </p>
          <ul className="space-y-3">
            {[
              "Extend image boundaries",
              "Fill removed objects naturally",
              "Match existing style & lighting",
              "Generate missing elements",
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
          <Button className="mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
            Try Generative Fill
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Feature 3 - Background Removal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
          <div className="inline-block">
            <span className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-sm font-medium text-green-600 dark:text-green-400">
              One-Click Magic
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Remove Backgrounds{" "}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Perfectly
            </span>
          </h3>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Remove backgrounds instantly with AI precision. Perfect for product
            photos, portraits, or creating transparent PNGs. No manual selection
            needed.
          </p>
          <ul className="space-y-3">
            {[
              "Instant background removal",
              "Preserve fine details & edges",
              "Smart subject detection",
              "Export as PNG with transparency",
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
          <Button className="mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
            Remove Background
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Button>
        </div>
        <div className="relative order-1 lg:order-2">
          <div className="absolute -inset-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur-2xl opacity-20"></div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800&h=600&fit=crop"
              alt="Background Removal Demo"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Feature 4 - Object Removal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="relative order-1">
          <div className="absolute -inset-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl blur-2xl opacity-20"></div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
              alt="Object Removal Demo"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="space-y-4 md:space-y-6 order-2">
          <div className="inline-block">
            <span className="px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-sm font-medium text-orange-600 dark:text-orange-400">
              Smart Removal
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Remove Unwanted{" "}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Objects
            </span>
          </h3>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Erase unwanted objects, people, or blemishes from your photos
            effortlessly. AI intelligently fills the space to make it look like
            they were never there.
          </p>
          <ul className="space-y-3">
            {[
              "Remove people & objects",
              "Erase watermarks & text",
              "Clean up photo imperfections",
              "Intelligent content-aware fill",
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-orange-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
          <Button className="mt-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
            Remove Objects
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Feature 5 - Image Resize */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
          <div className="inline-block">
            <span className="px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-sm font-medium text-violet-600 dark:text-violet-400">
              Smart Scaling
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Intelligent Image{" "}
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Resizing
            </span>
          </h3>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Resize images to any dimension without losing quality. Our AI
            upscaling technology enhances details and maintains clarity at any
            size.
          </p>
          <ul className="space-y-3">
            {[
              "AI-powered upscaling",
              "Maintain aspect ratio or crop",
              "Batch resize multiple images",
              "Export in various formats",
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-violet-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
          <Button className="mt-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
            Resize Images
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Button>
        </div>
        <div className="relative order-1 lg:order-2">
          <div className="absolute -inset-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl blur-2xl opacity-20"></div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop"
              alt="Image Resize Demo"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
