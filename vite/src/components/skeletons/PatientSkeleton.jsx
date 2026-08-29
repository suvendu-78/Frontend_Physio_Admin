import { Skeleton } from "@/components/ui/skeleton";

export default function PatientSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-72" />
        </div>

        <Skeleton className="h-10 w-36 rounded-xl" />
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-4 w-12" />
            </div>

            <Skeleton className="mt-4 h-4 w-28" />
            <Skeleton className="mt-2 h-8 w-20" />
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <Skeleton className="h-10 rounded-xl" />
          <Skeleton className="h-10 rounded-xl" />
          <Skeleton className="h-10 rounded-xl" />
          <Skeleton className="h-10 rounded-xl" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

        {/* Desktop */}
        <div className="hidden md:block">

          <div className="grid grid-cols-7 gap-4 border-b p-5">
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
              <Skeleton key={item} className="h-4 w-20" />
            ))}
          </div>

          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="grid grid-cols-7 items-center gap-4 border-b p-5 last:border-0"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />

                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>

              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-7 w-20 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
          ))}

        </div>

        {/* Mobile */}
        <div className="space-y-4 p-4 md:hidden">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />

                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-7 w-20 rounded-full" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}