import { Skeleton } from "@/components/ui/skeleton";

export default function CreditsLoading() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10"
          aria-hidden
        />
        <div className="relative grid gap-8 p-6 lg:grid-cols-[1.3fr_0.7fr] lg:p-10">
          <div className="space-y-6">
            <Skeleton className="h-4 w-40 rounded-full" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-60 rounded-full" />
              <Skeleton className="h-6 w-80 rounded-full" />
            </div>
            <Skeleton className="h-4 w-72 rounded-full" />
            <Skeleton className="h-4 w-60 rounded-full" />
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-9 w-40 rounded-full" />
              <Skeleton className="h-9 w-48 rounded-full" />
            </div>
          </div>

          <div className="rounded-3xl border border-border/70 bg-muted/50 p-6 shadow-inner">
            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-card/80 p-4">
                <Skeleton className="h-4 w-32 rounded-full" />
                <Skeleton className="mt-4 h-10 w-24 rounded-full" />
                <Skeleton className="mt-2 h-4 w-48 rounded-full" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[0, 1].map((card) => (
                  <div
                    key={`credit-metric-${card}`}
                    className="rounded-2xl border border-border bg-card/80 p-4"
                  >
                    <Skeleton className="h-4 w-32 rounded-full" />
                    <Skeleton className="mt-3 h-8 w-20 rounded-full" />
                    <Skeleton className="mt-2 h-3 w-28 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-3 text-center">
          <Skeleton className="mx-auto h-4 w-32 rounded-full" />
          <Skeleton className="mx-auto h-8 w-80 max-w-xl rounded-full" />
          <Skeleton className="mx-auto h-4 w-96 max-w-2xl rounded-full" />
        </div>

        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((card) => (
            <li
              key={`plan-card-${card}`}
              className="relative flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-sm"
            >
              <Skeleton className="h-4 w-24 rounded-full" />
              <div className="mt-4 flex items-center gap-3">
                <Skeleton className="h-14 w-14 rounded-2xl" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32 rounded-full" />
                  <Skeleton className="h-3 w-24 rounded-full" />
                </div>
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <Skeleton className="h-10 w-24 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="mt-4 h-9 w-32 rounded-full" />
              <div className="mt-6 flex flex-1 flex-col gap-3">
                {[0, 1, 2, 3].map((line) => (
                  <div key={`plan-line-${card}-${line}`} className="flex items-center gap-3">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-4 flex-1 rounded-full" />
                  </div>
                ))}
              </div>
              <Skeleton className="mt-6 h-11 w-full rounded-2xl" />
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((benefit) => (
          <div
            key={`benefit-${benefit}`}
            className="rounded-3xl border border-border bg-card p-6 shadow-sm"
          >
            <Skeleton className="mb-4 h-16 w-16 rounded-2xl" />
            <Skeleton className="h-5 w-32 rounded-full" />
            <Skeleton className="mt-3 h-4 w-48 rounded-full" />
            <Skeleton className="mt-2 h-4 w-40 rounded-full" />
          </div>
        ))}
      </section>
    </div>
  );
}
