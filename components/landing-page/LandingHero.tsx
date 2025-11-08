import Image from "next/image";
import React from "react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

// UI imports
import { FileUpload } from "@components/ui/file-upload";
import { Button } from "@components/ui/button";
import Link from "next/link";

export const LandingHero = () => {
  return (
    <div className="container flex min-h-[70vh] md:min-h-[85vh] items-stretch justify-center px-4 sm:px-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12 items-stretch w-full max-w-7xl">
        {/* Left side - Hero content */}
        <div className="flex flex-col items-center xl:items-start justify-center text-left space-y-4 md:space-y-6">
          {/* image */}
          <div className="w-[20rem] sm:w-[28rem] md:w-[32rem] lg:w-[36rem] xl:w-[28rem]">
            <Image
              src="/assets/images/hero.webp"
              alt="dummy image"
              width={300}
              height={300}
              className="w-full"
            />
          </div>

          <h1 className="text-3xl text-center xl:text-left sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
            Unleash Your{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Creativity
            </span>{" "}
            with AI
          </h1>
          {/* <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                    Transform your ideas into stunning visuals in seconds.
                    Professional-grade AI image generation at your fingertips.
                  </p> */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 pt-2 md:pt-4 w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all text-sm md:text-base"
            >
              <Link href="/sign-up" className="flex items-center">
                {" "}
                Get Started Free
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 ml-2"
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
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-2 hover:bg-accent/50 text-sm md:text-base"
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 pt-2 md:pt-4 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Free trial available</span>
            </div>
          </div>
        </div>

        {/* Right side - Image upload area */}
        <div className="flex items-end justify-center mt-8 lg:mt-0">
          <div className="w-full max-w-md px-4 sm:px-0">
            <div className="inline-block pb-10 w-full text-center">
              <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-xs md:text-sm font-medium text-purple-600 dark:text-purple-400">
                ✨ AI-Powered Creativity
              </span>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative backdrop-blur-md bg-card/40 border-2 border-dashed border-border rounded-2xl p-8 sm:p-10 md:p-12 hover:border-purple-500/50 transition-all duration-300">
                {/* <div className="flex flex-col items-center justify-center space-y-3 md:space-y-4 text-center">
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                            <svg
                              className="w-8 h-8 md:w-10 md:h-10 text-purple-500"
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
                          <div>
                            <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">
                              Drop your image here
                            </h3>
                            <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                              or click to browse from your device
                            </p>
                          </div>
                          <Button variant="outline" className="mt-2 text-sm">
                            <svg
                              className="w-4 h-4 mr-2"
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
                            Choose File
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            Supports: JPG, PNG, WebP (Max 10MB)
                          </p>
                        </div> */}
                <FileUpload className="p-0" onChange={() => {}} />
              </div>
            </div>

            <div className="mt-6 md:mt-8 text-center text-xs md:text-sm text-muted-foreground">
              <div className="my-2 grid gap-2 grid-cols-5">
                <div className="font-bold col-span-full md:col-span-2 text-base text-start flex gap-2 md:block">
                  <p className="mb-1">No image?</p>
                  <p className="mb-1">Try one of these:</p>
                </div>
                <div className="col-span-full md:col-span-3 flex flex-wrap justify-between md:justify-end gap-2">
                  {[
                    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=60&h=60&fit=crop",
                    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=60&h=60&fit=crop",
                    "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=60&h=60&fit=crop",
                    "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=60&h=60&fit=crop",
                  ].map((src, idx) => (
                    <div key={idx} className="relative group/img">
                      <Image
                        src={src}
                        alt={`Example ${idx + 1}`}
                        width={60}
                        height={60}
                        className="rounded-2xl border border-border hover:border-purple-500/50 transition-all cursor-pointer hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <p className="my-2 text-start text-xs text-muted-foreground">
                By uploading an image or URL you agree to our{" "}
                <span className="underline cursor-pointer hover:text-purple-500 transition-colors">
                  Terms of Service
                </span>
                . To learn more about how we handle your personal data, check
                our{" "}
                <span className="underline cursor-pointer hover:text-purple-500 transition-colors">
                  Privacy Policy
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
