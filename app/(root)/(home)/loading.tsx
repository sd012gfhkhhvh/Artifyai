import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default async function Loading() {
  return (
    <>
      {/* If no user is signed in, render a minimal/simple loader for the public landing page. */}
      <SignedOut>
        <div className="flex h-screen items-center justify-center bg-gradient-to-br from-muted via-background to-muted">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border-4 border-border border-t-transparent text-muted-foreground animate-spin" />
        </div>
      </SignedOut>
      {/* If the user is signed in, render the richer skeleton layout used for the authenticated landing. */}
      <SignedIn>
        <div className="min-h-screen space-y-12">
          <section className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
            <div
              className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-transparent to-blue-500/15"
              aria-hidden
            />
            <div
              className="absolute -right-10 top-10 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl"
              aria-hidden
            />
            <div
              className="absolute -left-10 bottom-10 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"
              aria-hidden
            />
            <div className="relative space-y-10 p-8 lg:p-12">
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                  <Skeleton className="h-9 w-40 rounded-full" />
                  <Skeleton className="h-9 w-48 rounded-full" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="mx-auto h-10 w-[80%] max-w-3xl rounded-full" />
                  <Skeleton className="mx-auto h-10 w-[65%] max-w-2xl rounded-full" />
                </div>
                <Skeleton className="mx-auto h-6 w-[60%] max-w-2xl rounded-full" />
                <div className="flex flex-wrap justify-center gap-4">
                  <Skeleton className="h-12 w-40 rounded-full" />
                  <Skeleton className="h-12 w-40 rounded-full" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                {[0, 1, 2, 3].map((card) => (
                  <div
                    key={card}
                    className="relative rounded-2xl border border-border bg-card/80 p-5 shadow-inner"
                  >
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-2xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-28 rounded-full" />
                        <Skeleton className="h-3 w-20 rounded-full" />
                      </div>
                    </div>
                    <Skeleton className="absolute right-5 top-5 h-4 w-10 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <Skeleton className="mb-2 h-4 w-40 rounded-full" />
                <Skeleton className="h-8 w-56 rounded-full" />
              </div>
              <Skeleton className="h-9 w-48 rounded-full" />
            </div>
            <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-inner">
              <div className="grid gap-4 md:grid-cols-3">
                {[0, 1, 2].map((slot) => (
                  <Skeleton key={slot} className="h-48 rounded-2xl" />
                ))}
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-4">
                {[0, 1, 2, 3].map((slot) => (
                  <Skeleton key={slot} className="h-32 rounded-2xl" />
                ))}
              </div>
            </div>
          </section>
        </div>
      </SignedIn>
    </>
  );
}
