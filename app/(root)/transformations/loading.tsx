import { Skeleton } from "@/components/ui/skeleton";

export default function TransformationsLoading() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-3">
            <Skeleton className="h-4 w-32 rounded-full" />
            <Skeleton className="h-8 w-72 rounded-full" />
            <Skeleton className="h-4 w-60 rounded-full" />
          </div>
          <div className="flex flex-wrap gap-3">
            {[0, 1, 2].map((chip) => (
              <Skeleton key={`filter-${chip}`} className="h-10 w-28 rounded-full" />
            ))}
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((stat) => (
            <div
              key={`stat-${stat}`}
              className="rounded-2xl border border-border bg-muted/40 p-4"
            >
              <Skeleton className="h-4 w-24 rounded-full" />
              <Skeleton className="mt-3 h-8 w-20 rounded-full" />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-card p-6 shadow-inner">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Skeleton className="h-6 w-48 rounded-full" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-28 rounded-full" />
            <Skeleton className="h-10 w-28 rounded-full" />
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((card) => (
            <div
              key={`transformation-card-${card}`}
              className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm"
            >
              <Skeleton className="h-48 w-full rounded-2xl" />
              <Skeleton className="mt-4 h-5 w-40 rounded-full" />
              <Skeleton className="mt-2 h-4 w-32 rounded-full" />
              <div className="mt-4 flex items-center justify-between">
                <Skeleton className="h-4 w-20 rounded-full" />
                <Skeleton className="h-4 w-16 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
