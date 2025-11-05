"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import { LandingNav } from "./shared/LandingNav";
import { Button } from "./ui/button";
import LiquidEther from "./shared/Hero";
import { Marquee } from "./ui/marquee";
import Image from "next/image";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";
import { BentoCard, BentoGrid } from "../components/ui/bento-grid";
import { MarqueeDemo } from "./shared/MarqueeDemo";
import Masonry from "./Masonry";
import { useIsMobile } from "@/hooks/use-mobile";
import ScrollStack, { ScrollStackItem } from "./ui/ScrollStack";
import { TabsDemo } from "./TabsDemo";
import { FileUpload } from "./ui/file-upload";
import Brand from "./shared/Brand";

const features = [
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -top-20 -right-20 opacity-60" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: InputIcon,
    name: "Full text search",
    description: "Search through all your files in one place.",
    href: "/",
    cta: "Learn more",
    background: (
      <img
        src="https://imgs.search.brave.com/g6vele790Z8F74QlGF8reljgCUiLqxtiA05BcaS_aEg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvcHJvZHVjdC1k/ZW1vLWNsaWVudHNf/MTA4MDYxLTIyNDEu/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MCZxPTgw"
        className="absolute -top-0 -right-0 opacity-60"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Multilingual",
    description: "Supports 100+ languages and counting.",
    href: "/",
    cta: "Learn more",
    background: (
      <img
        src="https://imgs.search.brave.com/g6vele790Z8F74QlGF8reljgCUiLqxtiA05BcaS_aEg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvcHJvZHVjdC1k/ZW1vLWNsaWVudHNf/MTA4MDYxLTIyNDEu/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MCZxPTgw"
        className="absolute -top-0 -right-0 opacity-60"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -top-20 -right-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description:
      "Get notified when someone shares a file or mentions you in a comment.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -top-20 -right-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

const items = [
  {
    id: "1",
    img: "https://picsum.photos/id/1015/600/900?grayscale",
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "2",
    img: "https://picsum.photos/id/1011/600/750?grayscale",
    url: "https://example.com/two",
    height: 250,
  },
  {
    id: "3",
    img: "https://picsum.photos/id/1020/600/800?grayscale",
    url: "https://example.com/three",
    height: 600,
  },
  {
    id: "4",
    img: "https://picsum.photos/id/1035/600/900?grayscale",
    url: "https://example.com/four",
    height: 400,
  },
  {
    id: "5",
    img: "https://picsum.photos/id/1045/600/900?grayscale",
    url: "https://example.com/five",
    height: 250,
  },
  {
    id: "6",
    img: "https://picsum.photos/id/1055/600/900?grayscale",
    url: "https://example.com/six",
    height: 600,
  },
  {
    id: "7",
    img: "https://picsum.photos/id/1065/600/900?grayscale",
    url: "https://example.com/seven",
    height: 400,
  },
  {
    id: "8",
    img: "https://picsum.photos/id/1075/600/900?grayscale",
    url: "https://example.com/eight",
    height: 250,
  },
  {
    id: "9",
    img: "https://picsum.photos/id/1075/600/900?grayscale",
    url: "https://example.com/nine",
    height: 400,
  },
  {
    id: "10",
    img: "https://picsum.photos/id/1065/600/900?grayscale",
    url: "https://example.com/ten",
    height: 600,
  },
  {
    id: "11",
    img: "https://picsum.photos/id/1065/600/900?grayscale",
    url: "https://example.com/ten",
    height: 400,
  },
];

export const LandingPage = () => {
  const [currItems, setCurrItems] = useState(items);
  const isMobile = useIsMobile();
  const [isScrollComplete, setIsScrollComplete] = useState(false);
  const [windowScroll, setWindowScroll] = useState(false);

  useEffect(() => {
    if (isMobile) setCurrItems(items.slice(0, 7));
    else setCurrItems(items.slice(0, 12));
  }, [isMobile, items, setCurrItems]);

  const onStackComplete = () => {
    console.log("stack completed");

    // setIsScrollComplete(true);
    // setWindowScroll(true);
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    let touchStartY = 0;
    let lastTouchY = 0;

    const handleWheel = (event: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;

      // When at top and scrolling up OR at bottom and scrolling down:
      if ((isAtTop && event.deltaY < 0) || (isAtBottom && event.deltaY > 0)) {
        setWindowScroll(true);
      } else {
        setWindowScroll(false);
        event.preventDefault(); // Prevent default scroll for smoothness
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0].clientY;
      lastTouchY = touchStartY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touchCurrentY = event.touches[0].clientY;
      const deltaY = lastTouchY - touchCurrentY; // Positive for scrolling down, negative for up
      const { scrollTop, scrollHeight, clientHeight } = el;
      const isAtTop = scrollTop <= 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

      // When at top and scrolling up (deltaY < 0) OR at bottom and scrolling down (deltaY > 0):
      if ((isAtTop && deltaY < 0) || (isAtBottom && deltaY > 0)) {
        setWindowScroll(true);
      } else {
        setWindowScroll(false);
        event.preventDefault(); // Prevent default scroll for smoothness
      }

      lastTouchY = touchCurrentY;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, [setWindowScroll]);

  return (
    <>
      <div className="h-full w-full">
        <LandingNav />
        <main className="py-4 md:py-4 space-y-4">
          {/* background effect */}
          {/* <div className="fixed inset-0 w-screen h-screen -z-10">
            <LiquidEther
              colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
              mouseForce={20}
              cursorSize={100}
              isViscous={false}
              viscous={30}
              iterationsViscous={32}
              iterationsPoisson={32}
              resolution={0.5}
              isBounce={false}
              autoDemo={true}
              autoSpeed={0.5}
              autoIntensity={2.2}
              takeoverDuration={0.25}
              autoResumeDelay={3000}
              autoRampDuration={0.6}
            />
          </div> */}

          {/* hero section pitch + cta */}
          <section className="px-4">
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
                    <SignUpButton>
                      <Button
                        size="lg"
                        className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all text-sm md:text-base"
                      >
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
                      </Button>
                    </SignUpButton>
                    <SignInButton>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto border-2 hover:bg-accent/50 text-sm md:text-base"
                      >
                        Sign In
                      </Button>
                    </SignInButton>
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
                        . To learn more about how we handle your personal data,
                        check our{" "}
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
          </section>

          {/* masonry demo */}
          <section className="relative px-8 md:px-0 pb-[800px] md:pb-[700px]">
            <div className="container py-10 md:py-20"></div>
            <div className="absolute inset-x-0 top-10 md:top-25 h-80 bg-gradient-to-b from-background via-background/70 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-x-0 bottom-0 md:bottom-10 h-80 bg-gradient-to-t from-background via-background/70 to-transparent z-10 pointer-events-none"></div>

            <Masonry
              items={currItems}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover={true}
              hoverScale={0.95}
              blurToFocus={true}
              colorShiftOnHover={false}
            />
          </section>

          {/* Hero Image Showcase */}
          <section className="px-8">
            <div className="container py-10 md:py-20"></div>
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8 md:mb-12 max-w-4xl mx-auto">
                <p className="text-h1">
                  <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    You bring the vision. We help you go further.
                  </span>
                </p>
                <p className="text-sm md:text-base lg:text-lg text-muted-foreground mt-4 font-light">
                  Join{" "}
                  <span className="font-semibold text-foreground">
                    700,000+
                  </span>{" "}
                  creative teams, worldwide.
                </p>
              </div>
              <div className="relative h-[50vh] md:h-[80vh] w-full mx-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
                <div className="relative h-full w-full aspect-auto rounded-3xl overflow-hidden border-2 border-purple-500/30 shadow-2xl">
                  <HeroVideoDialog
                    className="flex items-center justify-center h-full"
                    animationStyle="from-center"
                    videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I"
                    thumbnailSrc="https://webinarninja.com/solutions/product-demos/img/why-use-demo.png"
                    thumbnailAlt="Dummy Video Thumbnail"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <span className="text-white text-sm font-medium">
                        AI Generated
                      </span>
                    </div>
                    <p className="text-white/90 text-xs md:text-sm font-light">
                      Created in seconds with Artify AI
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* tabs */}
          <section className="px-8">
            <div className="container py-10 md:py-20"></div>
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-h1">
                  The features you need, the simplicity you want
                </h2>
              </div>
              <div className="">
                <TabsDemo className="mt-0 w-full" />
              </div>
            </div>
          </section>

          {/* feature showcase */}
          <section className="px-8">
            <div className="container py-10 md:py-20"></div>
            <div className="max-w-7xl mx-auto space-y-24 md:space-y-32">
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
                    Bring damaged or faded photos back to life with our advanced
                    AI restoration technology. Remove scratches, enhance
                    details, and restore colors automatically.
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
                    Add or extend content seamlessly with AI-powered generative
                    fill. Perfect for expanding backgrounds, filling gaps, or
                    creating new elements that blend naturally.
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
                    Remove backgrounds instantly with AI precision. Perfect for
                    product photos, portraits, or creating transparent PNGs. No
                    manual selection needed.
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
                    Erase unwanted objects, people, or blemishes from your
                    photos effortlessly. AI intelligently fills the space to
                    make it look like they were never there.
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
                    Resize images to any dimension without losing quality. Our
                    AI upscaling technology enhances details and maintains
                    clarity at any size.
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
          </section>

          {/* product demo bento -magicui */}
          {/* <section className="px-6 md:px-40">
            <div className="container py-10 md:py-20"></div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-muted-foreground text-lg">
                Everything you need to create stunning AI-generated images
              </p>
            </div>
            <BentoGrid className="lg:grid-rows-3 md:h-[75vh]">
              {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
              ))}
            </BentoGrid>
          </section> */}

          {/* product demo bento */}
          <section className="px-8">
            <div className="container py-10 md:py-20"></div>
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
                <p className="text-muted-foreground text-lg">
                  Everything you need to create stunning AI-generated images
                </p>
              </div>
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
                        Generate high-quality images in seconds with our
                        advanced AI models. No waiting, just creating.
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
                  <h3 className="text-xl font-semibold mb-2">
                    Multiple Styles
                  </h3>
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
                  <h3 className="text-xl font-semibold mb-2">
                    Community Gallery
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Share your creations and get inspired by others. Join a
                    thriving community of AI artists.
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
            </div>
          </section>

          {/* scrollstack demo */}
          <section className="px-8">
            <div className="container py-20 md:py-10"></div>
            <div className="max-w-7xl mx-auto">
              <div className="text-center md:mb-12">
                <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
                <p className="text-muted-foreground text-lg">
                  Everything you need to create stunning AI-generated images
                </p>
              </div>
              <div className="h-[500px]">
                <ScrollStack
                  scrollRef={ref}
                  className=""
                  onStackComplete={onStackComplete}
                  useWindowScroll={windowScroll}
                >
                  <ScrollStackItem itemClassName="border-2">
                    <h2>Card 1</h2>
                    <p>This is the first card in the stack</p>
                  </ScrollStackItem>
                  <ScrollStackItem itemClassName="border-2">
                    <h2>Card 2</h2>
                    <p>This is the second card in the stack</p>
                  </ScrollStackItem>
                  <ScrollStackItem itemClassName="border-2">
                    <h2>Card 3</h2>
                    <p>This is the third card in the stack</p>
                  </ScrollStackItem>
                </ScrollStack>
              </div>
            </div>
          </section>

          {/* marquee demo */}
          <section>
            <div className="container py-10 md:py-20"></div>
            <MarqueeDemo />
          </section>

          {/* footer */}
          <section>
            <div className="container py-10 md:py-20"></div>
            <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container px-8">
                <div className="grid grid-cols-2 gap-8 py-12 lg:grid-cols-4 lg:gap-12 lg:py-16">
                  {/* Brand Section */}
                  <div className="space-y-4">
                    <Brand />
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Transform your ideas into stunning visuals with AI-powered
                      image generation and editing tools.
                    </p>
                    <div className="flex gap-4">
                      {[
                        {
                          icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
                          label: "Facebook",
                        },
                        {
                          icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
                          label: "Twitter",
                        },
                        {
                          icon: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01",
                          label: "Instagram",
                        },
                      ].map((social, idx) => (
                        <a
                          key={idx}
                          href="#"
                          className="w-9 h-9 rounded-lg border border-border/50 flex items-center justify-center hover:bg-accent hover:border-purple-500/50 transition-all"
                          aria-label={social.label}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d={social.icon}
                            />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Product Links */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider">
                      Product
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Features",
                        "Pricing",
                        "API Access",
                        "Use Cases",
                        "Integrations",
                        "Changelog",
                      ].map((item) => (
                        <li key={item}>
                          <a
                            href="#"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Resources Links */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider">
                      Resources
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Documentation",
                        "Tutorials",
                        "Blog",
                        "Community",
                        "Help Center",
                        "Status",
                      ].map((item) => (
                        <li key={item}>
                          <a
                            href="#"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Company Links */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider">
                      Company
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "About Us",
                        "Careers",
                        "Contact",
                        "Privacy Policy",
                        "Terms of Service",
                        "Cookie Policy",
                      ].map((item) => (
                        <li key={item}>
                          <a
                            href="#"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border/40 py-6">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground text-center md:text-left">
                      © {new Date().getFullYear()} Artify AI. All rights
                      reserved.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                      {["Terms", "Privacy", "Cookies", "Security"].map(
                        (item) => (
                          <a
                            key={item}
                            href="#"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {item}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </section>
        </main>
      </div>
    </>
  );
};
