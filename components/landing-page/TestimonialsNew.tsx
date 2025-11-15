"use client";

import { Children, cloneElement, isValidElement } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { TwitterLogoIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { Marquee } from "../ui/marquee";

type Testimonial = {
  name: string;
  username: string;
  avatar: string;
  content: string;
  likes: string;
  retweets: string;
  verified: boolean;
};

type MarqueeDirection = "left" | "right";

type MarqueeProps = {
  children: React.ReactNode;
  direction?: MarqueeDirection;
  speed?: number;
  itemWidth?: number;
  gap?: number;
  showGradient?: boolean;
  pauseOnHover?: boolean;
  className?: string;
};

type CSSVariables = React.CSSProperties & {
  "--marquee-distance"?: string;
  "--marquee-duration"?: string;
};

const TestimonialCard = ({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) => (
  <div
    className={cn(
      "w-[360px] flex-shrink-0 p-5 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300",
      className
    )}
  >
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-2">
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          width={40}
          height={40}
          className="rounded-full ring-2 ring-border/30"
        />
        <div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-sm">{testimonial.name}</span>
            {testimonial.verified && (
              <CheckCircledIcon className="w-3.5 h-3.5 text-blue-500" />
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            @{testimonial.username}
          </div>
        </div>
      </div>
      <TwitterLogoIcon className="w-4 h-4 text-[#1DA1F2]" />
    </div>

    <p className="text-sm leading-relaxed mb-3 text-foreground/90">
      {testimonial.content}
    </p>

    <div className="flex items-center gap-4 pt-2 border-t border-border/30 text-xs text-muted-foreground">
      <div className="flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span className="font-medium">{testimonial.likes}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
        </svg>
        <span className="font-medium">{testimonial.retweets}</span>
      </div>
    </div>
  </div>
);

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    username: "sarahj_photo",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    content:
      "Just restored a 50-year-old family photo using @ArtifyAI and I'm blown away! 🤯 The AI brought back details I thought were lost forever. ✨📸",
    likes: "2.4K",
    retweets: "856",
    verified: true,
  },
  {
    name: "Michael Chen",
    username: "mchen_ecommerce",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    content:
      "Our product photos looked amateur until we found @ArtifyAI. Background removal in ONE CLICK?! 🎯 Our conversion rate jumped 35%! 💰",
    likes: "5.1K",
    retweets: "1.2K",
    verified: true,
  },
  {
    name: "Emma Williams",
    username: "emmawilliams",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    content:
      "Creating viral content just got SO much easier! @ArtifyAI helps me edit 100+ photos in minutes. My engagement has never been higher! 📈🔥",
    likes: "12.8K",
    retweets: "3.4K",
    verified: true,
  },
  {
    name: "David Martinez",
    username: "davidm_creative",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    content:
      "Been using @ArtifyAI for client campaigns. The batch processing is INSANE - edited 500 images overnight! 🌙 Game changer! 🚀",
    likes: "3.7K",
    retweets: "982",
    verified: false,
  },
  {
    name: "Lisa Anderson",
    username: "lisa_realestate",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
    content:
      "Property listings look STUNNING with @ArtifyAI! 🏡 Enhanced lighting + clutter removal = faster sales. My clients love it! 😄",
    likes: "4.2K",
    retweets: "1.1K",
    verified: true,
  },
  {
    name: "James Taylor",
    username: "jtaylor_design",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    content:
      "As a designer, I'm VERY picky about quality. @ArtifyAI exceeded expectations! 👏 The AI understands composition like a pro. This is the future! 🎨✨",
    likes: "6.9K",
    retweets: "2.3K",
    verified: true,
  },
];

const firstRow = testimonials.slice(0, testimonials.length / 2);
const secondRow = testimonials.slice(testimonials.length / 2);

export function TestimonialsNew() {
  return (
    <div className="w-full py-16">
      <div className="max-w-7xl mx-auto px-8 mb-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by Creators Worldwide
          </h2>
          <p className="text-muted-foreground text-lg">
            See what people are saying on social media
          </p>
        </div>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:30s]">
          {firstRow.map((testimonial) => (
            <TestimonialCard
              key={testimonial.username}
              testimonial={testimonial}
            />
          ))}
        </Marquee>

        <Marquee reverse pauseOnHover className="[--duration:30s]">
          {secondRow.map((testimonial) => (
            <TestimonialCard
              key={`reverse-${testimonial.username}`}
              testimonial={testimonial}
            />
          ))}
        </Marquee>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
      </div>
    </div>
  );
}
