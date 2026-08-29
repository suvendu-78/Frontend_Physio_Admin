import { Skeleton } from "@/components/ui/skeleton";

export default function TherapistSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-4 w-72" />
        </div>

        <Skeleton className="h-10 w-40 rounded-xl" />
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
              <Skeleton className="h-4 w-16" />
            </div>

            <Skeleton className="mt-4 h-4 w-28" />
            <Skeleton className="mt-2 h-8 w-16" />
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <Skeleton
              key={item}
              className="h-10 rounded-xl"
            />
          ))}
        </div>
      </div>

      {/* Therapist cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-start gap-4">
              <Skeleton className="h-14 w-14 shrink-0 rounded-2xl" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>

              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>

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