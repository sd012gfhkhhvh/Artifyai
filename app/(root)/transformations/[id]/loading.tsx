import { Skeleton } from "@/components/ui/skeleton";

export default function TransformationDetailLoading() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10"
          aria-hidden
        />
        <div className="absolute inset-y-0 right-10 hidden w-px bg-gradient-to-b from-transparent via-white/30 to-transparent lg:block" aria-hidden />
        <div className="relative grid gap-8 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
          <div className="space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-40 rounded-full" />
              <Skeleton className="h-10 w-80 rounded-full" />
              <Skeleton className="h-4 w-72 rounded-full" />
            </div>
            <div className="flex flex-wrap gap-3">
              {[0, 1, 2].map((chip) => (
                <Skeleton key={`meta-chip-${chip}`} className="h-10 w-32 rounded-full" />
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-9 w-48 rounded-full" />
              <Skeleton className="h-9 w-56 rounded-full" />
            </div>
          </div>

          <div className="space-y-6 rounded-2xl border border-border bg-card/80 p-6 shadow-inner">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-2xl" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-24 rounded-full" />
                <Skeleton className="h-5 w-40 rounded-full" />
                <Skeleton className="h-4 w-28 rounded-full" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[0, 1].map((info) => (
                <div key={`detail-${info}`} className="rounded-xl border border-border bg-muted/40 p-4">
                  <Skeleton className="h-4 w-24 rounded-full" />
                  <Skeleton className="mt-3 h-6 w-32 rounded-full" />
                  <Skeleton className="mt-2 h-3 w-36 rounded-full" />
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-border bg-muted/40 p-4">
              <Skeleton className="h-4 w-28 rounded-full" />
              <Skeleton className="mt-2 h-4 w-full rounded-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-card shadow-sm">
        <div className="border-b border-border/70 bg-gradient-to-r from-muted/30 via-transparent to-muted/30 px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-32 rounded-full" />
                <Skeleton className="h-5 w-40 rounded-full" />
              </div>
            </div>
            <Skeleton className="h-8 w-32 rounded-full" />
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3, 4].map((card) => (
              <div
                key={`detail-card-${card}`}
                className={`rounded-2xl border border-border bg-muted/40 p-5 shadow-sm ${card === 4 ? "lg:col-span-2" : ""}`}
              >
                <Skeleton className="h-4 w-24 rounded-full" />
                <Skeleton className="mt-3 h-6 w-40 rounded-full" />
                <Skeleton className="mt-2 h-3 w-48 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-card shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 bg-gradient-to-r from-muted/30 via-transparent to-muted/30 px-6 py-5">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-2xl" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-32 rounded-full" />
              <Skeleton className="h-5 w-40 rounded-full" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-28 rounded-full" />
            <Skeleton className="h-8 w-28 rounded-full" />
          </div>
        </div>
        <div className="grid gap-6 p-6 lg:grid-cols-2">
          {[0, 1].map((column) => (
            <article key={`image-${column}`} className="space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-28 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <Skeleton className="h-80 w-full rounded-2xl border border-border" />
              <div className="flex flex-wrap gap-3">
                <Skeleton className="h-8 w-32 rounded-full" />
                <Skeleton className="h-8 w-32 rounded-full" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10"
          aria-hidden
        />
        <div className="relative space-y-6 p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/70 bg-white/80 px-5 py-4 shadow-sm backdrop-blur dark:bg-white/5">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-28 rounded-full" />
                <Skeleton className="h-5 w-48 rounded-full" />
              </div>
            </div>
            <Skeleton className="h-8 w-28 rounded-full" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-border bg-white/90 p-6 shadow-sm backdrop-blur dark:bg-white/5">
              <Skeleton className="h-4 w-36 rounded-full" />
              <Skeleton className="mt-2 h-4 w-full rounded-full" />
              <Skeleton className="mt-4 h-12 w-full rounded-2xl" />
            </div>
            <div className="grid gap-4">
              <div className="rounded-2xl border border-border bg-card/90 p-5 shadow-sm">
                <Skeleton className="h-4 w-28 rounded-full" />
                <Skeleton className="mt-3 h-4 w-full rounded-full" />
                <Skeleton className="mt-4 h-10 w-32 rounded-full" />
              </div>
              <div className="rounded-2xl border border-border bg-card/90 p-5 shadow-sm">
                <div className="grid grid-cols-2 gap-4">
                  {[0, 1].map((note) => (
                    <div key={`note-${note}`}
                      className="space-y-2"
                    >
                      <Skeleton className="h-3 w-24 rounded-full" />
                      <Skeleton className="h-5 w-28 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[0, 1, 2].map((summary) => (
              <div
                key={`summary-${summary}`}
                className="rounded-2xl border border-border bg-white/90 p-4 shadow-sm dark:bg-white/5"
              >
                <Skeleton className="h-4 w-28 rounded-full" />
                <Skeleton className="mt-3 h-5 w-24 rounded-full" />
                <Skeleton className="mt-2 h-3 w-32 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
