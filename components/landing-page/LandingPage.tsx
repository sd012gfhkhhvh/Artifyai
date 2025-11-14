"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

// clerk imports
import { SignInButton, SignUpButton } from "@clerk/nextjs";

// hook imports
import { useIsMobile, useIsTablet } from "@/hooks/use-mobile";

// component imports
import { LandingNav } from "@/components/landing-page/LandingNav";
import { MarqueeDemo } from "@/components/landing-page/MarqueeDemo";
import { UsecaseTabs } from "@/components/landing-page/UsecaseTabs";
import Brand from "@/components/shared/Brand";

// UI imports
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";
import LiquidEther from "@/components/shared/Hero";

// icon imports
import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";
import { LandingHero } from "./LandingHero";
import { ProductDemoVideo } from "./ProductDemoVIdeo";
import LandingMasonry from "./LandingMasonry";
import { Features } from "./Features";
import { ProductDemoBento } from "../ProductDemoBento";

export const LandingPage = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [isScrollComplete, setIsScrollComplete] = useState(false);
  const [windowScroll, setWindowScroll] = useState(false);

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
          <div className="fixed inset-0 w-screen h-screen -z-10">
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
          </div>

          {/* hero section pitch + cta */}
          <section className="px-4">
            <LandingHero />
          </section>

          {/* masonry demo */}
          <section className="relative px-8 md:px-0 pb-[800px] md:pb-[700px]">
            <div className="container py-10 md:py-20"></div>
            <div className="absolute inset-x-0 top-10 md:top-25 h-80 bg-gradient-to-b from-background via-background/70 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-x-0 bottom-0 md:bottom-10 h-80 bg-gradient-to-t from-background via-background/70 to-transparent z-10 pointer-events-none"></div>

            <LandingMasonry itemsToShow={isMobile ? 7 : (isTablet ? 8 : 10)} />
          </section>

          {/* product demo video */}
          <section className="px-8">
            <div className="container py-10 md:py-20"></div>
            <div className="max-w-7xl mx-auto">
              {/* heading */}
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
              <ProductDemoVideo />
            </div>
          </section>

          {/* usecases tabs */}
          <section className="px-8">
            <div className="container py-10 md:py-20"></div>
            <div className="max-w-7xl mx-auto">
              {/* header */}
              <div className="text-center mb-12">
                <h2 className="text-h1">
                  AI Handles Photo Editing For Any Cases
                </h2>
              </div>
              <UsecaseTabs className="mt-0 w-full" />
            </div>
          </section>

          {/* feature showcase */}
          <section className="px-8">
            <div className="container py-10 md:py-20"></div>
            <div className="max-w-7xl mx-auto space-y-24 md:space-y-32">
              <Features />
            </div>
          </section>

          {/* product demo bento */}
          <section className="px-8">
            <div className="container py-10 md:py-20"></div>
            <div className="max-w-7xl mx-auto">
              {/* heading */}
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
                <p className="text-muted-foreground text-lg">
                  Everything you need to create stunning AI-generated images
                </p>
              </div>
              <ProductDemoBento variant="magicui" />
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
