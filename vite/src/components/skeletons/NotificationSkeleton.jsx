import { Skeleton } from "@/components/ui/skeleton";

export default function NotificationSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-80" />
        </div>

        <Skeleton className="h-10 w-36 rounded-xl" />
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-4 w-14" />
            </div>

            <Skeleton className="mt-4 h-4 w-28" />
            <Skeleton className="mt-2 h-8 w-16" />
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <Skeleton className="h-10 rounded-xl" />
          <Skeleton className="h-10 rounded-xl" />
          <Skeleton className="h-10 rounded-xl" />
        </div>
      </div>

      {/* Notifications */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <div
            key={item}
            className="flex items-start gap-4 border-b border-slate-100 p-5 last:border-0"
          >
            <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />

            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-full max-w-xl" />
              <Skeleton className="h-3 w-28" />
            </div>

            <Skeleton className="h-8 w-8 shrink-0 rounded-lg" />
          </div>
        ))}

      </div>

    </div>
  );
}