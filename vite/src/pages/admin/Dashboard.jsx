// import { useEffect, useState } from "react";
// import {
//   CalendarDays,
//   Users,
//   UserRoundCog,
//   IndianRupee,
//   ArrowUpRight,
//   Plus,
//   Clock3,
//   ChevronRight,
//   UserCircle,
//   Mail,
//   Phone,
//   ShieldCheck,
// } from "lucide-react";

// import {
//   AreaChart,
//   Area,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// import DashboardSkeleton from "../../components/skeletons/DashboardSkeleton";

// function StatCard({ item }) {
//   const Icon = item.icon;

//   return (
//     <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
//       <div className="flex items-start justify-between">
//         <div
//           className={`grid h-11 w-11 place-items-center rounded-xl ${item.iconClass}`}
//         >
//           <Icon size={21} />
//         </div>

//         <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
//           <ArrowUpRight size={14} />
//           {item.change}
//         </div>
//       </div>

//       <div className="mt-5">
//         <p className="text-sm font-medium text-slate-500">{item.title}</p>

//         <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
//           {item.value}
//         </h3>
//       </div>
//     </div>
//   );
// }

// function StatusBadge({ status }) {
//   const styles = {
//     Confirmed: "bg-emerald-50 text-emerald-700",
//     Pending: "bg-amber-50 text-amber-700",
//   };

//   return (
//     <span
//       className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
//         styles[status] || "bg-slate-100 text-slate-600"
//       }`}
//     >
//       {status}
//     </span>
//   );
// }

// export default function Dashboard() {
//   const [loading, setLoading] = useState(true);
//   const [admin, setAdmin] = useState(null);
//   const [error, setError] = useState("");

//   const fetchAdmin = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await fetch(
//         "http://localhost:8000/api/v1/onboard/findAdmin",
//         {
//           method: "GET",
//           credentials: "include",
//         },
//       );

//       const resp = await response.json();

//       console.log("ADMIN RESPONSE:", resp);

//       if (!response.ok) {
//         setError(resp.message || "Unable to fetch admin data");
//         return;
//       }

//       const adminData = resp?.data?.admin || resp?.admin;

//       if (!adminData) {
//         setError("Admin data not found");
//         return;
//       }

//       setAdmin(adminData);
//     } catch (error) {
//       console.log("ADMIN FETCH ERROR:", error);

//       setError("Something went wrong while fetching admin data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAdmin();
//   }, []);

//   if (loading) {
//     return <DashboardSkeleton />;
//   }

//   const stats = [
//     {
//       title: "Total Patients",
//       value: "-",
//       change: "-",
//       icon: Users,
//       iconClass: "bg-cyan-50 text-cyan-600",
//     },
//     {
//       title: "Today's Appointments",
//       value: "-",
//       change: "-",
//       icon: CalendarDays,
//       iconClass: "bg-teal-50 text-teal-600",
//     },
//     {
//       title: "Active Therapists",
//       value: "-",
//       change: "-",
//       icon: UserRoundCog,
//       iconClass: "bg-orange-50 text-orange-600",
//     },
//     {
//       title: "Monthly Revenue",
//       value: "-",
//       change: "-",
//       icon: IndianRupee,
//       iconClass: "bg-emerald-50 text-emerald-600",
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
//             Dashboard
//           </h1>

//           <p className="mt-1 text-sm text-slate-500">
//             Welcome back! Here's what's happening today.
//           </p>
//         </div>

//         <button
//           type="button"
//           className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#FFAA00] px-4 text-sm font-bold text-[#0B1B2A] shadow-sm transition hover:bg-[#f5a000]"
//         >
//           <Plus size={18} />
//           Add Appointment
//         </button>
//       </div>

//       {error && (
//         <div className="rounded-xl border border-red-200 bg-red-50 p-4">
//           <p className="text-sm font-semibold text-red-600">{error}</p>
//         </div>
//       )}

//       <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
//         <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
//               Admin Account
//             </p>

//             <h2 className="mt-1 text-2xl font-bold text-slate-900">
//               {admin?.Name || "Not provided"}
//             </h2>

//             <p className="mt-1 text-sm text-slate-500">
//               {admin?.Email || "Not provided"}
//             </p>
//           </div>

//           <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0B1B2A] text-lg font-bold text-white">
//             {(admin?.Name || "A")
//               .split(" ")
//               .filter(Boolean)
//               .slice(0, 2)
//               .map((word) => word[0]?.toUpperCase())
//               .join("")}
//           </div>
//         </div>

//         <div className="mt-6 grid gap-4 sm:grid-cols-3">
//           <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
//             <div className="flex items-center gap-3">
//               <div className="grid h-9 w-9 place-items-center rounded-lg bg-white text-teal-600 shadow-sm">
//                 <UserCircle size={18} />
//               </div>

//               <div>
//                 <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
//                   Name
//                 </p>

//                 <p className="mt-1 text-xs font-bold text-slate-700">
//                   {admin?.Name || "Not provided"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
//             <div className="flex items-center gap-3">
//               <div className="grid h-9 w-9 place-items-center rounded-lg bg-white text-teal-600 shadow-sm">
//                 <Mail size={18} />
//               </div>

//               <div>
//                 <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
//                   Email
//                 </p>

//                 <p className="mt-1 truncate text-xs font-bold text-slate-700">
//                   {admin?.Email || "Not provided"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
//             <div className="flex items-center gap-3">
//               <div className="grid h-9 w-9 place-items-center rounded-lg bg-white text-teal-600 shadow-sm">
//                 <Phone size={18} />
//               </div>

//               <div>
//                 <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
//                   Mobile
//                 </p>

//                 <p className="mt-1 text-xs font-bold text-slate-700">
//                   {admin?.Mobile || "Not provided"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         {stats.map((item) => (
//           <StatCard key={item.title} item={item} />
//         ))}
//       </div>

//       <div className="grid gap-6 xl:grid-cols-2">
//         <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
//           <div className="mb-6">
//             <h2 className="text-lg font-bold text-slate-900">
//               Appointment Overview
//             </h2>

//             <p className="mt-1 text-sm text-slate-500">
//               Appointments over the last 7 days
//             </p>
//           </div>

//           <div className="flex h-[280px] w-full items-center justify-center">
//             <div className="text-center">
//               <CalendarDays size={35} className="mx-auto text-slate-300" />

//               <p className="mt-3 text-sm font-semibold text-slate-500">
//                 No appointment data available
//               </p>

//               <p className="mt-1 text-xs text-slate-400">
//                 Appointment data will appear here when available.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
//           <div className="mb-6">
//             <h2 className="text-lg font-bold text-slate-900">
//               Revenue Overview
//             </h2>

//             <p className="mt-1 text-sm text-slate-500">
//               Daily revenue for the last 7 days
//             </p>
//           </div>

//           <div className="flex h-[280px] w-full items-center justify-center">
//             <div className="text-center">
//               <IndianRupee size={35} className="mx-auto text-slate-300" />

//               <p className="mt-3 text-sm font-semibold text-slate-500">
//                 No revenue data available
//               </p>

//               <p className="mt-1 text-xs text-slate-400">
//                 Revenue data will appear here when available.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid gap-6 xl:grid-cols-2">
//         <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
//           <div className="mb-6 flex items-center justify-between">
//             <div>
//               <h2 className="text-lg font-bold text-slate-900">
//                 Today's Appointments
//               </h2>

//               <p className="mt-1 text-sm text-slate-500">
//                 Your upcoming appointments
//               </p>
//             </div>

//             <button
//               type="button"
//               className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700"
//             >
//               View all
//               <ChevronRight size={16} />
//             </button>
//           </div>

//           <div className="flex min-h-[220px] items-center justify-center">
//             <div className="text-center">
//               <Clock3 size={35} className="mx-auto text-slate-300" />

//               <p className="mt-3 text-sm font-semibold text-slate-500">
//                 No appointments available
//               </p>

//               <p className="mt-1 text-xs text-slate-400">
//                 Real appointment data will appear here.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
//           <div className="mb-6 flex items-center justify-between">
//             <div>
//               <h2 className="text-lg font-bold text-slate-900">
//                 Recent Patients
//               </h2>

//               <p className="mt-1 text-sm text-slate-500">
//                 Recently added patients
//               </p>
//             </div>

//             <button
//               type="button"
//               className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700"
//             >
//               View all
//               <ChevronRight size={16} />
//             </button>
//           </div>

//           <div className="flex min-h-[220px] items-center justify-center">
//             <div className="text-center">
//               <Users size={35} className="mx-auto text-slate-300" />

//               <p className="mt-3 text-sm font-semibold text-slate-500">
//                 No patient data available
//               </p>

//               <p className="mt-1 text-xs text-slate-400">
//                 Real patient data will appear here.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";

import {
  CalendarDays,
  Users,
  UserRoundCog,
  IndianRupee,
  ArrowUpRight,
  Plus,
  Clock3,
  ChevronRight,
  UserCircle,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import DashboardSkeleton from "../../components/skeletons/DashboardSkeleton";

function StatCard({ item }) {
  const Icon = item.icon;

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div
          className={`grid h-11 w-11 place-items-center rounded-xl ${item.iconClass}`}
        >
          <Icon size={21} />
        </div>

        <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
          <ArrowUpRight size={14} />
          {item.change}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium text-slate-500">{item.title}</p>

        <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          {item.value}
        </h3>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Confirmed: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState("");

  const fetchAdmin = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://physio-backend-sand.vercel.app/api/v1/onboard/findAdmin",
        {
          method: "GET",
          credentials: "include",
        },
      );

      const resp = await response.json();

      console.log("ADMIN RESPONSE:", resp);

      if (!response.ok) {
        setError(resp.message || "Unable to fetch admin data");
        return;
      }

      const adminData = resp?.data?.admin || resp?.admin;

      if (!adminData) {
        setError("Admin data not found");
        return;
      }

      setAdmin(adminData);
    } catch (error) {
      console.log("ADMIN FETCH ERROR:", error);
      setError("Something went wrong while fetching admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmin();

    const handleFocus = () => {
      fetchAdmin();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  const stats = [
    {
      title: "Total Patients",
      value: "-",
      change: "-",
      icon: Users,
      iconClass: "bg-cyan-50 text-cyan-600",
    },
    {
      title: "Today's Appointments",
      value: "-",
      change: "-",
      icon: CalendarDays,
      iconClass: "bg-teal-50 text-teal-600",
    },
    {
      title: "Active Therapists",
      value: "-",
      change: "-",
      icon: UserRoundCog,
      iconClass: "bg-orange-50 text-orange-600",
    },
    {
      title: "Monthly Revenue",
      value: "-",
      change: "-",
      icon: IndianRupee,
      iconClass: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#FFAA00] px-4 text-sm font-bold text-[#0B1B2A] shadow-sm transition hover:bg-[#f5a000]"
        >
          <Plus size={18} />
          Add Appointment
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-600">{error}</p>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Admin Account
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {admin?.Name || "Not provided"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {admin?.Email || "Not provided"}
            </p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0B1B2A] text-lg font-bold text-white">
            {(admin?.Name || "A")
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((word) => word[0]?.toUpperCase())
              .join("")}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-white text-teal-600 shadow-sm">
                <UserCircle size={18} />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Name
                </p>

                <p className="mt-1 text-xs font-bold text-slate-700">
                  {admin?.Name || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-white text-teal-600 shadow-sm">
                <Mail size={18} />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Email
                </p>

                <p className="mt-1 truncate text-xs font-bold text-slate-700">
                  {admin?.Email || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-white text-teal-600 shadow-sm">
                <Phone size={18} />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Mobile
                </p>

                <p className="mt-1 text-xs font-bold text-slate-700">
                  {admin?.Mobile || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.title} item={item} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Appointment Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Appointments over the last 7 days
            </p>
          </div>

          <div className="flex h-[280px] w-full items-center justify-center">
            <div className="text-center">
              <CalendarDays size={35} className="mx-auto text-slate-300" />

              <p className="mt-3 text-sm font-semibold text-slate-500">
                No appointment data available
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Appointment data will appear here when available.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Revenue Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Daily revenue for the last 7 days
            </p>
          </div>

          <div className="flex h-[280px] w-full items-center justify-center">
            <div className="text-center">
              <IndianRupee size={35} className="mx-auto text-slate-300" />

              <p className="mt-3 text-sm font-semibold text-slate-500">
                No revenue data available
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Revenue data will appear here when available.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Today's Appointments
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your upcoming appointments
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700"
            >
              View all
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="flex min-h-[220px] items-center justify-center">
            <div className="text-center">
              <Clock3 size={35} className="mx-auto text-slate-300" />

              <p className="mt-3 text-sm font-semibold text-slate-500">
                No appointments available
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Real appointment data will appear here.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recent Patients
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Recently added patients
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700"
            >
              View all
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="flex min-h-[220px] items-center justify-center">
            <div className="text-center">
              <Users size={35} className="mx-auto text-slate-300" />

              <p className="mt-3 text-sm font-semibold text-slate-500">
                No patient data available
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Real patient data will appear here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
