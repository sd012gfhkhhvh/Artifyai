import { navLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

import { LandingPage } from "@/components/landing-page/LandingPage";
import { ProfileCollectionSkeleton } from "@/components/shared/ProfileSkeletons";
import { Suspense } from "react";
import { AllImagesCollection } from "@/components/shared/all-images-collection";

const Home = async ({ searchParams }: SearchParamProps) => {
  const user = await currentUser();
  if (!user) {
    return <LandingPage />;
  }

  const searchQuery = (searchParams?.query as string) || "";

  return (
    <div className="min-h-screen space-y-12">
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-transparent to-blue-500/15" aria-hidden />
        <div className="absolute -right-10 top-10 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl" aria-hidden />
        <div className="absolute -left-10 bottom-10 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" aria-hidden />
        <div className="relative p-8 lg:p-12 space-y-10">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
              <span className="rounded-full border border-border bg-muted/60 px-4 py-1.5">
                AI creative suite
              </span>
              <span className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-1.5 text-white">
                New workflows shipped
              </span>
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Unleash your studio-ready transformations in seconds
            </h1>
            <p className="max-w-3xl text-base text-muted-foreground sm:text-lg">
              Restore, recolor, relight, and remix every asset with precise controls and a polished dashboard designed for creators and teams.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={navLinks[5]?.route || "#"}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:shadow-purple-500/40"
              >
                Get started
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/transformations"
                className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3 text-sm font-semibold text-foreground/80 transition hover:text-foreground"
              >
                Browse workflows
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {navLinks.slice(1, 5).map((link) => (
              <Link
                key={link.route}
                href={link.route}
                className="group relative rounded-2xl border border-border bg-card/80 p-5 shadow-inner transition hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30 transition group-hover:scale-105">
                    <Image src={link.icon} alt={link.label} width={22} height={22} className="brightness-0 invert" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{link.label}</p>
                    <p className="text-xs text-muted-foreground">Open tool</p>
                  </div>
                </div>
                <span className="absolute right-5 top-5 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                  Go
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">Live gallery</p>
            <h3 className="text-2xl font-semibold text-foreground">Community creations</h3>
          </div>
          <div className="rounded-full border border-border px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Updated in real-time
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-inner">
          <Suspense fallback={<ProfileCollectionSkeleton />}>
            <AllImagesCollection searchQuery={searchQuery} />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default Home;
