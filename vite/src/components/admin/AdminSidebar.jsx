import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  UserRoundCog,
  Building2,
  Stethoscope,
  MessageSquare,
  CreditCard,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const menuGroups = [
  {
    title: "MAIN",
    items: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin",
      },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      {
        name: "Appointments",
        icon: CalendarDays,
        path: "/admin/appointments",
      },
      {
        name: "Patients",
        icon: Users,
        path: "/admin/patients",
      },
      {
        name: "Therapists",
        icon: UserRoundCog,
        path: "/admin/therapists",
      },
      {
        name: "Clinics",
        icon: Building2,
        path: "/admin/clinics",
      },
      {
        name: "Services",
        icon: Stethoscope,
        path: "/admin/services",
      },
    ],
  },
  {
    title: "COMMUNICATION",
    items: [
      {
        name: "Enquiries",
        icon: MessageSquare,
        path: "/admin/enquiries",
      },
      {
        name: "Notifications",
        icon: Bell,
        path: "/admin/notifications",
      },
    ],
  },
  {
    title: "FINANCE",
    items: [
      {
        name: "Payments",
        icon: CreditCard,
        path: "/admin/payments",
      },
      {
        name: "Reports",
        icon: BarChart3,
        path: "/admin/reports",
      },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      {
        name: "Settings",
        icon: Settings,
        path: "/admin/settings",
      },
    ],
  },
];

function SidebarContent({ onNavigate }) {
  return (
    <div className="flex h-full flex-col">

      {/* Logo */}
      <div className="flex h-20 items-center border-b border-white/10 px-6">
        <div>
          <h1 className="text-lg font-bold tracking-tight">
            LiBi{" "}
            <span className="text-cyan-400">
              Motion Care
            </span>
          </h1>

          <p className="mt-1 text-xs text-slate-400">
            Admin Portal
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-5">

        {menuGroups.map((group) => (
          <div key={group.title} className="mb-6">

            <p className="mb-2 px-3 text-[10px] font-bold tracking-[0.16em] text-slate-500">
              {group.title}
            </p>

            <div className="space-y-1">

              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={onNavigate}
                    end={item.path === "/admin"}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                        isActive
                          ? "bg-cyan-400/10 text-cyan-300 shadow-sm"
                          : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={18}
                          className={
                            isActive
                              ? "text-cyan-400"
                              : "text-slate-400 group-hover:text-cyan-400"
                          }
                        />

                        <span>{item.name}</span>
                      </>
                    )}
                  </NavLink>
                );
              })}

            </div>
          </div>
        ))}

      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </div>
  );
}

export default function AdminSidebar({
  mobileOpen,
  setMobileOpen,
}) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/10 bg-[#0B1B2A] text-white lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0B1B2A] text-white shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Close */}
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="absolute right-4 top-5 z-10 grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>

        <SidebarContent
          onNavigate={() => setMobileOpen(false)}
        />
      </aside>
    </>
  );
}