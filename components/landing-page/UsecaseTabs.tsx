"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Tabs } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

type UseCase = {
  title: string;
  value: string;
  badge: string;
  heading: string;
  description: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  gradient: string;
  overlay: string;
};

const useCases: UseCase[] = [
  {
    title: "Photography",
    value: "photography",
    badge: "Professional Photography",
    heading: "Enhance Your Portrait & Landscape Photos",
    description:
      "Perfect for photographers who want to restore old photos, remove distractions, enhance colors, and deliver stunning client work in minutes.",
    bullets: [
      "Restore vintage & damaged photos",
      "Remove tourists from landscapes",
      "Enhance portrait details",
      "Professional color grading",
    ],
    image:
      "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1200&h=800&fit=crop",
    imageAlt: "Professional photography equipment",
    gradient: "from-purple-700 via-purple-800 to-violet-900",
    overlay: "from-purple-900/60 to-transparent",
  },
  {
    title: "E-commerce",
    value: "ecommerce",
    badge: "Online Stores",
    heading: "Perfect Product Images That Sell",
    description:
      "Remove backgrounds, create consistent product shots, and enhance every SKU to boost conversion across storefronts and marketplaces.",
    bullets: [
      "Remove & replace backgrounds",
      "Consistent white backgrounds",
      "Enhance product colors & details",
      "Batch process multiple images",
    ],
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=800&fit=crop",
    imageAlt: "E-commerce product photography",
    gradient: "from-blue-700 via-blue-800 to-cyan-900",
    overlay: "from-blue-900/60 to-transparent",
  },
  {
    title: "Social Media",
    value: "social-media",
    badge: "Content Creators",
    heading: "Create Viral-Worthy Content",
    description:
      "Stand out on Instagram, TikTok, and beyond. Remove distractions, enhance colors, and keep your feed aesthetic consistent.",
    bullets: [
      "Remove photo bombers instantly",
      "Perfect selfie enhancements",
      "Create consistent feed aesthetics",
      "Quick edits for stories & reels",
    ],
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop",
    imageAlt: "Social media content creation",
    gradient: "from-pink-700 via-pink-800 to-rose-900",
    overlay: "from-pink-900/60 to-transparent",
  },
  {
    title: "Marketing",
    value: "marketing",
    badge: "Marketing Teams",
    heading: "Professional Marketing Materials",
    description:
      "Create compelling ad creatives, banners, and promotional assets at scale with on-brand typography, palettes, and guardrails.",
    bullets: [
      "Create ad variations quickly",
      "Brand-consistent visuals",
      "A/B test different backgrounds",
      "Scale creative production",
    ],
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop",
    imageAlt: "Marketing team collaboration",
    gradient: "from-orange-700 via-orange-800 to-amber-900",
    overlay: "from-orange-900/60 to-transparent",
  },
  {
    title: "Real Estate",
    value: "real-estate",
    badge: "Real Estate Professionals",
    heading: "Showcase Properties at Their Best",
    description:
      "Enhance property photos, remove clutter, balance lighting, and publish listings that stop buyers mid-scroll.",
    bullets: [
      "Remove furniture & clutter",
      "Enhance lighting & colors",
      "Virtual staging options",
      "Professional HDR effects",
    ],
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop",
    imageAlt: "Modern real estate interior",
    gradient: "from-emerald-700 via-emerald-800 to-teal-900",
    overlay: "from-emerald-900/60 to-transparent",
  },
  {
    title: "Personal",
    value: "personal",
    badge: "Personal Use",
    heading: "Preserve & Perfect Your Memories",
    description:
      "Restore family photos, enhance vacation shots, and remove distractions to create keepsakes worth framing.",
    bullets: [
      "Restore old family photos",
      "Perfect vacation memories",
      "Remove unwanted elements",
      "Create profile pictures",
    ],
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&h=800&fit=crop",
    imageAlt: "Family photo memories",
    gradient: "from-indigo-700 via-indigo-800 to-purple-900",
    overlay: "from-indigo-900/60 to-transparent",
  },
];

const bulletIcon = (
  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/15 text-green-300 flex items-center justify-center">
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  </span>
);

const DesktopUsecasePanel = ({ useCase }: { useCase: UseCase }) => (
  <div
    className={cn(
      "w-full overflow-hidden relative h-full rounded-2xl bg-gradient-to-br",
      useCase.gradient
    )}
  >
    <div className="grid lg:grid-cols-2 gap-6 p-6 md:p-8 lg:p-10 h-full">
      <div className="flex flex-col justify-center space-y-4 lg:space-y-6">
        <motion.div
          className="inline-block w-fit px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm text-white font-medium"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          {useCase.badge}
        </motion.div>
        <motion.h3
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {useCase.heading}
        </motion.h3>
        <motion.p
          className="text-white/90 text-sm md:text-base leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {useCase.description}
        </motion.p>
        <ul className="space-y-3 text-sm md:text-base text-white">
          {useCase.bullets.map((item, idx) => (
            <motion.li
              key={item}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 + 0.3, duration: 0.3 }}
            >
              {bulletIcon}
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.div
        className="relative h-[320px] lg:h-full min-h-[260px] rounded-2xl overflow-hidden shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Image
          src={useCase.image}
          alt={useCase.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t",
            useCase.overlay
          )}
        />
      </motion.div>
    </div>
  </div>
);

const MobileUsecaseCard = ({ useCase }: { useCase: UseCase }) => (
  <div
    className={cn(
      "min-w-[85%] snap-center rounded-[1.75rem] border border-white/10 bg-gradient-to-br",
      useCase.gradient
    )}
  >
    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] mx-4 mt-4 shadow-xl">
      <Image
        src={useCase.image}
        alt={useCase.imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 85vw, 400px"
        priority={useCase.value === "photography"}
      />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t",
          useCase.overlay
        )}
      />
      <span className="absolute bottom-4 left-4 inline-flex items-center rounded-full bg-white/20 text-white text-xs font-semibold px-3 py-1 backdrop-blur">
        {useCase.badge}
      </span>
    </div>
    <div className="space-y-4 p-5 text-white">
      <div>
        <h3 className="text-xl font-semibold leading-snug">{useCase.title}</h3>
        <p className="text-sm text-white/80 mt-1">{useCase.heading}</p>
      </div>
      <p className="text-sm text-white/85 leading-relaxed">
        {useCase.description}
      </p>
      <ul className="space-y-2 text-sm text-white/90">
        {useCase.bullets.slice(0, 3).map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export function UsecaseTabs({ className }: { className?: string }) {
  const isMobile = useIsMobile();

  const desktopTabs = useCases.map((useCase) => ({
    title: useCase.title,
    value: useCase.value,
    content: <DesktopUsecasePanel key={useCase.value} useCase={useCase} />,
  }));

  if (isMobile) {
    return (
      <div className={cn("w-full max-w-5xl mx-auto", className)}>
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 no-scrollbar">
          {useCases.map((useCase) => (
            <MobileUsecaseCard key={useCase.value} useCase={useCase} />
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground uppercase tracking-[0.2em]">
          Swipe to preview each workflow
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-20 lg:my-32",
        "h-[52rem] sm:h-[46rem] md:h-[42rem] lg:h-[36rem]",
        "[perspective:1200px]",
        className
      )}
    >
      <Tabs
        tabs={desktopTabs}
        containerClassName="gap-3 flex-wrap"
        contentClassName="mt-16 md:mt-20"
      />
    </div>
  );
}
