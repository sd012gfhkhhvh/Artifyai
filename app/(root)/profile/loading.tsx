import { Skeleton } from "@/components/ui/skeleton";
import {
  ProfileStatsskeleton,
  ProfileChartSkeleton,
  ProfileActivitySkeleton,
  ProfileCollectionSkeleton,
} from "@/components/shared/ProfileSkeletons";

export default function ProfileLoading() {
  return (
    <main className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/15 via-transparent to-blue-500/15"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[url('/assets/images/hero.webp')] opacity-5 bg-cover bg-center"
          aria-hidden
        />
        <div className="relative grid gap-8 p-6 lg:p-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 text-white shadow-xl">
                <Skeleton className="h-10 w-10 rounded-2xl bg-white/40" />
                <div
                  className="absolute inset-0 rounded-3xl border border-white/20"
                  aria-hidden
                />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-28 rounded-full" />
                <Skeleton className="h-9 w-56 rounded-full" />
                <Skeleton className="h-4 w-40 rounded-full" />
                <Skeleton className="h-4 w-48 rounded-full" />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-9 w-40 rounded-full" />
              <Skeleton className="h-9 w-32 rounded-full" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[0, 1, 2].map((card) => (
              <div
                key={`hero-card-${card}`}
                className={`rounded-2xl border border-border bg-card/80 p-4 shadow-sm ${
                  card === 2 ? "sm:col-span-2" : ""
                }`}
              >
                <Skeleton className="h-4 w-32 rounded-full" />
                <Skeleton className="mt-3 h-10 w-24 rounded-full" />
                <Skeleton className="mt-2 h-3 w-32 rounded-full" />
              </div>
            ))}
            <div className="sm:col-span-2 flex flex-wrap gap-3">
              <Skeleton className="h-12 flex-1 rounded-2xl" />
              <Skeleton className="h-12 flex-1 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      <ProfileStatsskeleton />
      <ProfileChartSkeleton />
      <ProfileActivitySkeleton />

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-slate-900/5 via-purple-500/5 to-blue-500/5 p-6 shadow-sm">
          <Skeleton className="h-4 w-24 rounded-full" />
          <Skeleton className="mt-2 h-6 w-52 rounded-full" />
          <div className="mt-6 space-y-4">
            {[0, 1, 2].map((item) => (
              <div key={`digest-${item}`} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32 rounded-full" />
                  <Skeleton className="h-5 w-40 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 rounded-full" />
              <Skeleton className="h-5 w-48 rounded-full" />
            </div>
            <Skeleton className="h-8 w-32 rounded-full" />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[0, 1].map((card) => (
              <div
                key={`workflow-${card}`}
                className="rounded-2xl border border-border bg-muted/40 p-5 shadow-inner"
              >
                <Skeleton className="h-4 w-24 rounded-full" />
                <Skeleton className="mt-3 h-5 w-40 rounded-full" />
                <Skeleton className="mt-2 h-4 w-48 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded-full" />
            <Skeleton className="h-6 w-48 rounded-full" />
          </div>
          <Skeleton className="h-10 w-48 rounded-full" />
        </div>
        <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-inner">
          <ProfileCollectionSkeleton />
        </div>
      </section>
    </main>
  );
}
