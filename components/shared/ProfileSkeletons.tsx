import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCards } from "./Collection";

export function ProfileStatsskeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-14 w-14 rounded-xl" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-10 w-24" />
        </div>
      ))}
    </div>
  );
}

export function ProfileChartSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
      <Skeleton className="h-64 w-full rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-3">
            {[1, 2, 3].map((j) => (
              <div key={j} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProfileActivitySkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
      <Skeleton className="h-6 w-40 mb-4" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4 p-3 rounded-lg">
            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProfileCollectionSkeleton() {
  return (
    <ul className="mt-8 grid auto-rows-[1fr] gap-6 sm:grid-cols-2 xl:grid-cols-3">
      <SkeletonCards count={6} />
    </ul>
  );
}
