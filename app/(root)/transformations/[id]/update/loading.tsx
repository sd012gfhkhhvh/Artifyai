import { Skeleton } from "@/components/ui/skeleton";

export default function TransformationUpdateLoading() {
  const steps = Array.from({ length: 4 });

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10" aria-hidden />
        <div className="relative flex flex-col gap-6 p-6 lg:p-8">
          <div className="space-y-3">
            <Skeleton className="h-4 w-40 rounded-full" />
            <Skeleton className="h-9 w-80 rounded-full" />
            <Skeleton className="h-4 w-72 rounded-full" />
          </div>
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-9 w-36 rounded-full" />
            <Skeleton className="h-9 w-48 rounded-full" />
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_1.95fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 rounded-full" />
                <Skeleton className="h-7 w-48 rounded-full" />
                <Skeleton className="h-4 w-40 rounded-full" />
              </div>
              <Skeleton className="h-10 w-24 rounded-2xl" />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[0, 1].map((metric) => (
                <div
                  key={`metric-${metric}`}
                  className="rounded-2xl border border-border/60 bg-muted/50 p-4"
                >
                  <Skeleton className="h-4 w-32 rounded-full" />
                  <Skeleton className="mt-3 h-8 w-20 rounded-full" />
                  <Skeleton className="mt-2 h-3 w-28 rounded-full" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-slate-900/90 p-6 text-white shadow-xl">
            <Skeleton className="h-4 w-32 rounded-full" />
            <Skeleton className="mt-2 h-6 w-60 rounded-full" />
            <ol className="mt-6 space-y-4">
              {steps.map((_, index) => (
                <li
                  key={`step-${index}`}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-white/10 p-4"
                >
                  <Skeleton className="h-10 w-10 rounded-2xl" />
                  <Skeleton className="h-4 flex-1 rounded-full" />
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-2xl" />
              <Skeleton className="h-4 w-32 rounded-full" />
            </div>
            <Skeleton className="mt-4 h-4 w-full rounded-full" />
            <Skeleton className="mt-2 h-4 w-5/6 rounded-full" />
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card shadow-lg">
          <div className="border-b border-border/60 bg-muted/40 px-6 py-5">
            <div className="flex items-center gap-3">
              <Skeleton className="h-11 w-11 rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-24 rounded-full" />
                <Skeleton className="h-5 w-40 rounded-full" />
              </div>
            </div>
          </div>
          <div className="space-y-6 p-6 lg:p-10">
            <Skeleton className="h-12 w-full rounded-2xl" />
            <Skeleton className="h-72 w-full rounded-3xl border border-dashed border-border" />
            <div className="grid gap-4 md:grid-cols-2">
              <Skeleton className="h-12 rounded-2xl" />
              <Skeleton className="h-12 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
