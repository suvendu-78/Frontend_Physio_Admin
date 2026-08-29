import { Skeleton } from "@/components/ui/skeleton";

export default function SettingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">

      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-80" />
      </div>

      {/* Clinic Profile */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="mt-2 h-4 w-64" />

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>
      </div>

      {/* Appointment */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="mt-2 h-4 w-72" />

        <div className="mt-6 space-y-5">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-56" />
              </div>

              <Skeleton className="h-10 w-40 rounded-xl" />
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <Skeleton className="h-5 w-44" />
        <Skeleton className="mt-2 h-4 w-72" />

        <div className="mt-6 space-y-5">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between"
            >
              <div className="space-y-2">
                <Skeleton className="h-4 w-44" />
                <Skeleton className="h-3 w-64" />
              </div>

              <Skeleton className="h-6 w-11 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Business Hours */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="mt-2 h-4 w-64" />

        <div className="mt-6 space-y-4">
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between gap-4"
            >
              <Skeleton className="h-4 w-24" />

              <div className="flex gap-2">
                <Skeleton className="h-9 w-28 rounded-lg" />
                <Skeleton className="h-9 w-28 rounded-lg" />
              </div>

              <Skeleton className="h-6 w-11 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="mt-2 h-4 w-64" />

        <div className="mt-6 flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>

          <Skeleton className="h-10 w-36 rounded-xl" />
        </div>
      </div>

    </div>
  );
}