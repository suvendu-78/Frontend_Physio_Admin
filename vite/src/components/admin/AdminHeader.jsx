import {
  Menu,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

export default function AdminHeader({
  setMobileOpen,
}) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">

      {/* Mobile Menu */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="mr-3 grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="relative hidden w-full max-w-md md:block">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="search"
          placeholder="Search patients, appointments..."
          className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
        />
      </div>

      {/* Right */}
      <div className="ml-auto flex items-center gap-2 sm:gap-3">

        {/* Mobile Search */}
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 md:hidden"
        >
          <Search size={18} />
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
          aria-label="Notifications"
        >
          <Bell size={19} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white" />
        </button>

        {/* Admin Profile */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl p-1.5 pr-2 transition hover:bg-slate-50 sm:gap-3"
        >
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-teal-100 font-semibold text-teal-700">
            A
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold leading-tight text-slate-800">
              Admin
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              Administrator
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-slate-400 sm:block"
          />
        </button>

      </div>
    </header>
  );
}