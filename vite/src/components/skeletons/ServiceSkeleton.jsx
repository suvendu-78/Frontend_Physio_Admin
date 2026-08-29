import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-28" />
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

      {/* Services */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-xl" />

                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>

              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>

            <Skeleton className="mt-5 h-10 w-full" />

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Skeleton className="h-16 rounded-xl" />
              <Skeleton className="h-16 rounded-xl" />
            </div>

            <Skeleton className="mt-4 h-9 w-full rounded-xl" />
          </div>
        ))}
      </div>

    </div>
  );
}