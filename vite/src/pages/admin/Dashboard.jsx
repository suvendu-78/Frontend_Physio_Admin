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

const appointmentData = [
  { day: "Mon", appointments: 24 },
  { day: "Tue", appointments: 31 },
  { day: "Wed", appointments: 28 },
  { day: "Thu", appointments: 36 },
  { day: "Fri", appointments: 32 },
  { day: "Sat", appointments: 42 },
  { day: "Sun", appointments: 18 },
];

const revenueData = [
  { day: "Mon", revenue: 8200 },
  { day: "Tue", revenue: 10400 },
  { day: "Wed", revenue: 9200 },
  { day: "Thu", revenue: 12800 },
  { day: "Fri", revenue: 11600 },
  { day: "Sat", revenue: 15200 },
  { day: "Sun", revenue: 6400 },
];

const appointments = [
  {
    id: 1,
    patient: "Rahul Das",
    service: "Back Pain Therapy",
    time: "10:00 AM",
    therapist: "Dr. Ankit",
    status: "Confirmed",
  },
  {
    id: 2,
    patient: "Priya Sharma",
    service: "Sports Rehabilitation",
    time: "11:30 AM",
    therapist: "Dr. Priya",
    status: "Confirmed",
  },
  {
    id: 3,
    patient: "Amit Kumar",
    service: "Neck Pain Therapy",
    time: "01:00 PM",
    therapist: "Dr. Ankit",
    status: "Pending",
  },
  {
    id: 4,
    patient: "Sneha Patel",
    service: "Post-Surgery Rehab",
    time: "03:30 PM",
    therapist: "Dr. Rahul",
    status: "Confirmed",
  },
  {
    id: 5,
    patient: "Arjun Singh",
    service: "Sports Injury",
    time: "05:00 PM",
    therapist: "Dr. Priya",
    status: "Pending",
  },
];

const patients = [
  {
    id: 1,
    name: "Rahul Das",
    problem: "Lower Back Pain",
    date: "Today",
    initials: "RD",
  },
  {
    id: 2,
    name: "Priya Sharma",
    problem: "Knee Rehabilitation",
    date: "Today",
    initials: "PS",
  },
  {
    id: 3,
    name: "Amit Kumar",
    problem: "Neck Pain",
    date: "Yesterday",
    initials: "AK",
  },
  {
    id: 4,
    name: "Sneha Patel",
    problem: "Post Surgery",
    date: "Yesterday",
    initials: "SP",
  },
  {
    id: 5,
    name: "Arjun Singh",
    problem: "Sports Injury",
    date: "Aug 26",
    initials: "AS",
  },
];

const stats = [
  {
    title: "Total Patients",
    value: "1,248",
    change: "+12.5%",
    icon: Users,
    iconClass: "bg-cyan-50 text-cyan-600",
  },
  {
    title: "Today's Appointments",
    value: "36",
    change: "+8.2%",
    icon: CalendarDays,
    iconClass: "bg-teal-50 text-teal-600",
  },
  {
    title: "Active Therapists",
    value: "24",
    change: "+3",
    icon: UserRoundCog,
    iconClass: "bg-orange-50 text-orange-600",
  },
  {
    title: "Monthly Revenue",
    value: "₹2,48,500",
    change: "+14.8%",
    icon: IndianRupee,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
];

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
        <p className="text-sm font-medium text-slate-500">
          {item.title}
        </p>

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">

      {/* Header */}
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

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.title} item={item} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-2">

        {/* Appointments */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Appointment Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Appointments over the last 7 days
            </p>
          </div>

          <div className="h-[280px] w-full">

            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={appointmentData}>

                <defs>
                  <linearGradient
                    id="appointmentGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#0F8B8D"
                      stopOpacity={0.2}
                    />

                    <stop
                      offset="95%"
                      stopColor="#0F8B8D"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2E8F0"
                />

                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748B", fontSize: 12 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748B", fontSize: 12 }}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="appointments"
                  stroke="#0F8B8D"
                  strokeWidth={3}
                  fill="url(#appointmentGradient)"
                />

              </AreaChart>
            </ResponsiveContainer>

          </div>
        </div>

        {/* Revenue */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Revenue Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Daily revenue for the last 7 days
            </p>
          </div>

          <div className="h-[280px] w-full">

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2E8F0"
                />

                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748B", fontSize: 12 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748B", fontSize: 12 }}
                />

                <Tooltip
                  formatter={(value) => [
                    `₹${value.toLocaleString("en-IN")}`,
                    "Revenue",
                  ]}
                />

                <Bar
                  dataKey="revenue"
                  fill="#19D3C5"
                  radius={[6, 6, 0, 0]}
                  barSize={28}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="grid gap-6 xl:grid-cols-2">

        {/* Today's appointments */}
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

          <div className="space-y-1">

            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-slate-50"
              >

                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-600">
                  <Clock3 size={19} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {appointment.patient}
                  </p>

                  <p className="truncate text-xs text-slate-500">
                    {appointment.service} · {appointment.therapist}
                  </p>
                </div>

                <div className="hidden text-right sm:block">
                  <p className="text-xs font-semibold text-slate-700">
                    {appointment.time}
                  </p>
                </div>

                <StatusBadge status={appointment.status} />

              </div>
            ))}

          </div>

        </div>

        {/* Recent patients */}
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

          <div className="space-y-1">

            {patients.map((patient) => (
              <div
                key={patient.id}
                className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-slate-50"
              >

                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#0B1B2A] text-xs font-bold text-white">
                  {patient.initials}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {patient.name}
                  </p>

                  <p className="truncate text-xs text-slate-500">
                    {patient.problem}
                  </p>
                </div>

                <span className="text-xs font-medium text-slate-400">
                  {patient.date}
                </span>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}