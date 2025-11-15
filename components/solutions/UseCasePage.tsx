"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Camera,
  ShoppingBag,
  Megaphone,
  Code,
  Sparkles,
  Layers,
  Zap,
  Palette,
  BarChart3,
  Workflow,
  ShieldCheck,
} from "lucide-react";

import { ImageComparisonSlider } from "@/components/ui/image-comparison-slider";
import { cn } from "@/lib/utils";
import type { UseCaseContent, IconName } from "../../lib/usecase-content";

const iconMap: Record<IconName, LucideIcon> = {
  camera: Camera,
  shoppingBag: ShoppingBag,
  megaphone: Megaphone,
  code: Code,
  sparkles: Sparkles,
  layers: Layers,
  zap: Zap,
  palette: Palette,
  chart: BarChart3,
  workflow: Workflow,
  shield: ShieldCheck,
};

export const UseCasePage = ({ content }: { content: UseCaseContent }) => {
  const IconBadge = iconMap[content.hero.icon] ?? Sparkles;

  return (
    <div className="bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-20">
        {/* Hero */}
        <section className="grid gap-10 lg:grid-cols-2 items-center rounded-3xl border border-border/60 bg-gradient-to-br from-background via-background/95 to-background/60 p-8 md:p-12 shadow-xl shadow-black/5">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm font-medium tracking-wide">
              <IconBadge className="h-4 w-4 text-primary" />
              <span>{content.hero.badge}</span>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary/70 mb-2">
                {content.hero.eyebrow}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {content.hero.title}{" "}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  {content.hero.highlight}
                </span>
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {content.hero.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={content.hero.primaryCta.href}
                className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-white font-semibold shadow-lg shadow-primary/40 hover:shadow-primary/60 transition"
              >
                {content.hero.primaryCta.label}
              </Link>
              <Link
                href={content.hero.secondaryCta.href}
                className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold hover:border-primary/50 hover:text-primary transition"
              >
                {content.hero.secondaryCta.label}
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              {content.hero.supportText}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {content.hero.toolset.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium tracking-wide"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/60 shadow-2xl">
              <Image
                src={content.hero.heroImage}
                alt={content.hero.heroImageAlt}
                width={900}
                height={700}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {content.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border/50 bg-card/70 p-6 shadow-lg shadow-black/5"
            >
              <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
              <p className="text-3xl font-semibold">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-2">{stat.detail}</p>
            </div>
          ))}
        </section>

        {/* Features */}
        <section className="grid gap-6 lg:grid-cols-3">
          {content.features.map((feature) => {
            const Icon = iconMap[feature.icon as IconName] ?? Sparkles;
            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-border/50 bg-card/80 p-6 shadow-lg shadow-black/5"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>

        {/* Demos */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary/70 mb-2">
                Live demos
              </p>
              <h2 className="text-3xl font-semibold">See the transformation</h2>
              <p className="text-muted-foreground max-w-2xl">
                Every workflow includes ready-made presets you can iterate on. Drag the handle to compare.
              </p>
            </div>
            <Link href="/transformations" className="text-sm font-semibold text-primary">
              Explore all tools →
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {content.demos.map((demo) => (
              <div
                key={demo.title}
                className="rounded-3xl border border-border/50 bg-card/80 p-4 shadow-lg shadow-black/5"
              >
                <div className="rounded-2xl overflow-hidden border border-border/40 bg-background/30">
                  <ImageComparisonSlider
                    beforeImage={demo.beforeImage}
                    afterImage={demo.afterImage}
                    beforeLabel={demo.beforeLabel}
                    afterLabel={demo.afterLabel}
                    initialPosition={45}
                  />
                </div>
                <div className="space-y-3 pt-4">
                  <div className="flex flex-wrap gap-2">
                    {demo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{demo.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {demo.description}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-primary">
                    {demo.metric}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Workflow */}
        <section className="rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card/80 to-background p-8 md:p-12 shadow-xl shadow-black/5 space-y-8">
          <div className="flex flex-col gap-2">
            <p className="text-sm uppercase tracking-[0.3em] text-primary/70">
              Workflow
            </p>
            <h2 className="text-3xl font-semibold">Launch-ready in minutes</h2>
            <p className="text-muted-foreground max-w-3xl">
              {content.workflowIntro}
            </p>
          </div>
          <ol className="space-y-6">
            {content.workflow.map((step, index) => (
              <li
                key={step.title}
                className="flex flex-col gap-3 rounded-2xl border border-border/40 bg-background/70 p-6 md:flex-row md:items-center md:gap-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-xl font-semibold text-primary">
                  {index + 1}
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {step.duration}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* Testimonial + resources */}
        <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-3xl border border-border/60 bg-card/80 p-8 shadow-lg shadow-black/5">
            <p className="text-sm uppercase tracking-[0.3em] text-primary/70 mb-4">
              Trusted teams
            </p>
            <blockquote className="text-2xl font-medium leading-relaxed">
              “{content.testimonial.quote}”
            </blockquote>
            <p className="mt-4 text-sm font-semibold">
              {content.testimonial.author}
            </p>
            <p className="text-sm text-muted-foreground">
              {content.testimonial.role}
            </p>
          </div>
          <div className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-lg shadow-black/5 space-y-4">
            <p className="text-sm font-semibold">Resources</p>
            <div className="space-y-3">
              {content.resources.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between rounded-2xl border border-border/50 px-4 py-3 text-sm font-semibold hover:border-primary/50"
                >
                  {link.label}
                  <span aria-hidden>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl border border-border/60 bg-gradient-to-r from-primary to-secondary text-white p-10 md:p-14 shadow-2xl shadow-primary/30">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.4em] text-white/70">
              Ready when you are
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold">
              Ship your next project in record time
            </h2>
            <p className="max-w-3xl text-white/80">
              Start with 20 free credits. Upgrade only when you’re ready to move work into production.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/sign-up"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary shadow-lg shadow-white/30"
              >
                Create account
              </Link>
              <Link
                href="/demo"
                className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold"
              >
                Book a walkthrough
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
