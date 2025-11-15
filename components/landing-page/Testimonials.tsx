"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "E-commerce Manager",
    company: "StyleHub",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    content:
      "Artify AI has transformed how we handle product photography. We can now remove backgrounds and enhance images in seconds instead of hours. It's saved us thousands in editing costs!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Professional Photographer",
    company: "Chen Studios",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    content:
      "As a photographer, I was skeptical about AI editing tools. But Artify AI blew me away. The restoration feature brought my client's vintage family photos back to life beautifully.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Social Media Manager",
    company: "BrandFlow",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    content:
      "Creating consistent, professional content for our social media has never been easier. The batch processing feature is a game-changer for managing multiple brand accounts.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Marketing Director",
    company: "TechVision",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    content:
      "We use Artify AI for all our marketing materials. The speed and quality are unmatched. Our ad creatives look more professional, and we can iterate much faster than before.",
    rating: 5,
  },
  {
    name: "Jessica Taylor",
    role: "Real Estate Agent",
    company: "Premium Properties",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop",
    content:
      "Property photos can make or break a sale. Artify AI helps me showcase listings at their absolute best. Removing clutter and enhancing lighting has definitely increased buyer interest.",
    rating: 5,
  },
  {
    name: "Alex Thompson",
    role: "Content Creator",
    company: "@alexcreates",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    content:
      "My Instagram feed has never looked better! Artify AI helps me maintain a consistent aesthetic and remove photo bombers from my travel shots. My engagement has increased by 40%!",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Loved by Professionals Worldwide
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Join thousands of happy users who have transformed their workflow with
          Artify AI
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={cn(
              "relative rounded-2xl border border-border/50 p-6 md:p-8 bg-background/50 backdrop-blur-sm hover:border-purple-500/50 transition-all hover:shadow-lg",
              "flex flex-col"
            )}
          >
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>

            {/* Content */}
            <p className="text-sm md:text-base text-muted-foreground mb-6 flex-grow leading-relaxed">
              &ldquo;{testimonial.content}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-border/50">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-sm md:text-base">
                  {testimonial.name}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
                <p className="text-xs text-muted-foreground/60">
                  {testimonial.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            700K+
          </p>
          <p className="text-sm text-muted-foreground mt-2">Active Users</p>
        </div>
        <div>
          <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            50M+
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Images Processed
          </p>
        </div>
        <div>
          <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            4.9/5
          </p>
          <p className="text-sm text-muted-foreground mt-2">Average Rating</p>
        </div>
        <div>
          <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            150+
          </p>
          <p className="text-sm text-muted-foreground mt-2">Countries</p>
        </div>
      </div>
    </div>
  );
};
