import React from "react";
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
