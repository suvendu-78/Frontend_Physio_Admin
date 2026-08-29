import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">

      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-44" />
          <Skeleton className="h-4 w-64" />
        </div>

        <Skeleton className="h-10 w-40 rounded-xl" />
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-11 w-11 rounded-xl" />
              <Skeleton className="h-4 w-12" />
            </div>

            <div className="mt-5 space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="mb-6 space-y-2">
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-4 w-64" />
          </div>

          <Skeleton className="h-[280px] w-full rounded-xl" />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="mb-6 space-y-2">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-4 w-56" />
          </div>

          <Skeleton className="h-[280px] w-full rounded-xl" />
        </div>

      </div>

      {/* Bottom section */}
      <div className="grid gap-6 xl:grid-cols-2">

        {/* Appointments */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">

          <div className="mb-6 flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>

          <div className="space-y-5">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4"
              >
                <Skeleton className="h-11 w-11 rounded-xl" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-40" />
                </div>

                <Skeleton className="h-7 w-20 rounded-full" />
              </div>
            ))}
          </div>

        </div>

        {/* Patients */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">

          <div className="mb-6 flex items-center justify-between">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>

          <div className="space-y-5">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4"
              >
                <Skeleton className="h-11 w-11 rounded-full" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-44" />
                </div>

                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}