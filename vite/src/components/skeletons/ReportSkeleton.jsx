import { Skeleton } from "@/components/ui/skeleton";

export default function ReportSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-80" />
        </div>

        <Skeleton className="h-10 w-36 rounded-xl" />
      </div>

      {/* Date filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((item) => (
            <Skeleton
              key={item}
              className="h-9 w-20 rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="mt-4 h-4 w-28" />
            <Skeleton className="mt-2 h-8 w-28" />
            <Skeleton className="mt-2 h-3 w-20" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 xl:col-span-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="mt-2 h-4 w-64" />
          <Skeleton className="mt-6 h-[300px] w-full rounded-xl" />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="mt-2 h-4 w-56" />
          <Skeleton className="mx-auto mt-6 h-56 w-56 rounded-full" />
        </div>

      </div>

      {/* Tables */}
      <div className="grid gap-6 xl:grid-cols-2">

        {[1, 2].map((card) => (
          <div
            key={card}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <Skeleton className="h-5 w-44" />
            <Skeleton className="mt-2 h-4 w-60" />

            <div className="mt-6 space-y-5">
              {[1, 2, 3, 4, 5].map((row) => (
                <div
                  key={row}
                  className="flex items-center justify-between"
                >
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>

                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}