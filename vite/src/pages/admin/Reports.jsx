import { useEffect, useMemo, useState } from "react";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Download,
  IndianRupee,
  MessageSquare,
  Users,
  UserRound,
  TrendingUp,
  Clock3,
  XCircle,
} from "lucide-react";

import ReportSkeleton from "../../components/skeletons/ReportSkeleton";

const revenueData = [
  { month: "Jan", revenue: 24500 },
  { month: "Feb", revenue: 31200 },
  { month: "Mar", revenue: 28600 },
  { month: "Apr", revenue: 39800 },
  { month: "May", revenue: 45200 },
  { month: "Jun", revenue: 41800 },
  { month: "Jul", revenue: 52300 },
  { month: "Aug", revenue: 58700 },
];

const appointmentData = [
  {
    name: "Completed",
    value: 186,
  },
  {
    name: "Pending",
    value: 24,
  },
  {
    name: "Cancelled",
    value: 18,
  },
  {
    name: "No Show",
    value: 20,
  },
];

const serviceData = [
  {
    name: "Back Pain Therapy",
    patients: 86,
    revenue: 52400,
  },
  {
    name: "Sports Rehabilitation",
    patients: 62,
    revenue: 44800,
  },
  {
    name: "Knee Rehabilitation",
    patients: 48,
    revenue: 39200,
  },
  {
    name: "Neck Pain Therapy",
    patients: 32,
    revenue: 26100,
  },
  {
    name: "Shoulder Therapy",
    patients: 24,
    revenue: 18900,
  },
];

const therapistData = [
  {
    name: "Dr. Ankit Kumar",
    patients: 52,
    sessions: 86,
    revenue: 52400,
  },
  {
    name: "Dr. Priya Das",
    patients: 46,
    sessions: 74,
    revenue: 44800,
  },
  {
    name: "Dr. Rahul Singh",
    patients: 38,
    sessions: 61,
    revenue: 39200,
  },
  {
    name: "Dr. Sneha Patel",
    patients: 31,
    sessions: 48,
    revenue: 28600,
  },
];

const enquiryData = [
  {
    name: "Website",
    enquiries: 48,
  },
  {
    name: "WhatsApp",
    enquiries: 35,
  },
  {
    name: "Contact Form",
    enquiries: 28,
  },
  {
    name: "Phone",
    enquiries: 13,
  },
];

const periodOptions = [
  "Today",
  "7 Days",
  "30 Days",
  "3 Months",
  "6 Months",
  "1 Year",
];

const appointmentColors = [
  "#0F766E",
  "#F59E0B",
  "#EF4444",
  "#94A3B8",
];

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  iconClass,
  positive = true,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div
          className={`grid h-10 w-10 place-items-center rounded-xl ${iconClass}`}
        >
          <Icon size={19} />
        </div>

        <TrendingUp
          size={17}
          className={
            positive
              ? "text-emerald-500"
              : "rotate-180 text-red-500"
          }
        />

      </div>

      <p className="mt-4 text-sm font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>

      <p
        className={`mt-2 text-xs font-semibold ${
          positive
            ? "text-emerald-600"
            : "text-red-600"
        }`}
      >
        {change} from previous period
      </p>

    </div>
  );
}

function SectionHeader({
  title,
  description,
}) {
  return (
    <div>
      <h2 className="text-base font-bold text-slate-900">
        {title}
      </h2>

      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}

export default function Reports() {
  const [loading, setLoading] = useState(true);

  const [period, setPeriod] =
    useState("30 Days");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const reportData = useMemo(() => {
    if (period === "Today") {
      return {
        revenue: 6800,
        appointments: 18,
        patients: 7,
        enquiries: 9,
      };
    }

    if (period === "7 Days") {
      return {
        revenue: 38200,
        appointments: 64,
        patients: 28,
        enquiries: 31,
      };
    }

    if (period === "3 Months") {
      return {
        revenue: 142800,
        appointments: 196,
        patients: 74,
        enquiries: 102,
      };
    }

    if (period === "6 Months") {
      return {
        revenue: 281500,
        appointments: 384,
        patients: 143,
        enquiries: 218,
      };
    }

    if (period === "1 Year") {
      return {
        revenue: 568400,
        appointments: 782,
        patients: 296,
        enquiries: 461,
      };
    }

    return {
      revenue: 58700,
      appointments: 248,
      patients: 86,
      enquiries: 124,
    };
  }, [period]);

  if (loading) {
    return <ReportSkeleton />;
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Reports
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Analyze clinic performance, revenue, patients and appointments.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#FFAA00] px-4 text-sm font-bold text-[#0B1B2A] shadow-sm transition hover:bg-[#f5a000]"
        >
          <Download size={17} />
          Export Report
        </button>

      </div>

      {/* Period */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">

        <div className="flex flex-wrap items-center gap-2">

          <div className="mr-2 flex items-center gap-2 text-xs font-semibold text-slate-500">
            <CalendarDays size={16} />
            Report Period
          </div>

          {periodOptions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setPeriod(item)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                period === item
                  ? "bg-[#0B1B2A] text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Revenue"
          value={formatCurrency(
            reportData.revenue
          )}
          change="+12.5%"
          icon={IndianRupee}
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Appointments"
          value={reportData.appointments}
          change="+8.4%"
          icon={CalendarDays}
          iconClass="bg-blue-50 text-blue-600"
        />

        <StatCard
          title="New Patients"
          value={reportData.patients}
          change="+15.2%"
          icon={Users}
          iconClass="bg-cyan-50 text-cyan-600"
        />

        <StatCard
          title="Enquiries"
          value={reportData.enquiries}
          change="+10.8%"
          icon={MessageSquare}
          iconClass="bg-orange-50 text-orange-600"
        />

      </div>

      {/* Revenue + Appointment */}
      <div className="grid gap-6 xl:grid-cols-3">

        {/* Revenue Chart */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">

          <SectionHeader
            title="Revenue Overview"
            description="Monthly revenue generated from physiotherapy services."
          />

          <div className="mt-6 h-[320px] w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <AreaChart
                data={revenueData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#0F766E"
                      stopOpacity={0.25}
                    />

                    <stop
                      offset="100%"
                      stopColor="#0F766E"
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
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 12,
                    fill: "#94A3B8",
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 12,
                    fill: "#94A3B8",
                  }}
                  tickFormatter={(value) =>
                    `₹${value / 1000}k`
                  }
                />

                <Tooltip
                  formatter={(value) =>
                    formatCurrency(value)
                  }
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #E2E8F0",
                    boxShadow:
                      "0 10px 30px rgba(15,23,42,0.08)",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0F766E"
                  strokeWidth={3}
                  fill="url(#revenueGradient)"
                />

              </AreaChart>
            </ResponsiveContainer>

          </div>

        </div>

        {/* Appointment Status */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <SectionHeader
            title="Appointment Overview"
            description="Breakdown of appointment statuses."
          />

          <div className="mt-5 h-[250px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>

                <Pie
                  data={appointmentData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={3}
                >
                  {appointmentData.map(
                    (entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={
                          appointmentColors[
                            index
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />

              </PieChart>
            </ResponsiveContainer>

          </div>

          <div className="space-y-3">

            {appointmentData.map(
              (item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >

                  <div className="flex items-center gap-2">

                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor:
                          appointmentColors[
                            index
                          ],
                      }}
                    />

                    <span className="text-xs font-medium text-slate-600">
                      {item.name}
                    </span>

                  </div>

                  <span className="text-xs font-bold text-slate-800">
                    {item.value}
                  </span>

                </div>
              )
            )}

          </div>

        </div>

      </div>

      {/* Services + Enquiries */}
      <div className="grid gap-6 xl:grid-cols-2">

        {/* Services */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <SectionHeader
            title="Popular Services"
            description="Services generating the most patient visits."
          />

          <div className="mt-6 space-y-5">

            {serviceData.map(
              (service, index) => {

                const maxPatients =
                  serviceData[0].patients;

                const percentage =
                  (service.patients /
                    maxPatients) *
                  100;

                return (
                  <div key={service.name}>

                    <div className="flex items-center justify-between gap-4">

                      <div className="min-w-0">

                        <p className="truncate text-sm font-semibold text-slate-700">
                          {service.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {service.patients} patients
                        </p>

                      </div>

                      <p className="shrink-0 text-sm font-bold text-slate-800">
                        {formatCurrency(
                          service.revenue
                        )}
                      </p>

                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">

                      <div
                        className="h-full rounded-full bg-[#0F766E] transition-all"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>

        {/* Enquiries */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <SectionHeader
            title="Enquiry Sources"
            description="Where your patient enquiries are coming from."
          />

          <div className="mt-6 h-[280px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={enquiryData}
                margin={{
                  top: 5,
                  right: 5,
                  left: -15,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2E8F0"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 11,
                    fill: "#94A3B8",
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 11,
                    fill: "#94A3B8",
                  }}
                />

                <Tooltip />

                <Bar
                  dataKey="enquiries"
                  fill="#0F766E"
                  radius={[
                    6,
                    6,
                    0,
                    0,
                  ]}
                  barSize={35}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* Therapist Performance */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 p-5">

          <SectionHeader
            title="Therapist Performance"
            description="Patient sessions and revenue generated by each therapist."
          />

        </div>

        {/* Desktop */}
        <div className="hidden overflow-x-auto md:block">

          <table className="w-full">

            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Therapist
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Patients
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Sessions
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Revenue
                </th>

                <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                  Performance
                </th>

              </tr>
            </thead>

            <tbody>

              {therapistData.map(
                (therapist, index) => {

                  const maxRevenue =
                    therapistData[0]
                      .revenue;

                  const percentage =
                    (therapist.revenue /
                      maxRevenue) *
                    100;

                  return (
                    <tr
                      key={therapist.name}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                    >

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#0B1B2A] text-white">
                            <UserRound
                              size={17}
                            />
                          </div>

                          <div>

                            <p className="text-sm font-semibold text-slate-800">
                              {therapist.name}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              Physiotherapist
                            </p>

                          </div>

                        </div>

                      </td>

                      <td className="px-5 py-4">

                        <span className="text-sm font-semibold text-slate-700">
                          {therapist.patients}
                        </span>

                      </td>

                      <td className="px-5 py-4">

                        <span className="text-sm font-semibold text-slate-700">
                          {therapist.sessions}
                        </span>

                      </td>

                      <td className="px-5 py-4">

                        <span className="text-sm font-bold text-slate-800">
                          {formatCurrency(
                            therapist.revenue
                          )}
                        </span>

                      </td>

                      <td className="px-5 py-4">

                        <div className="flex items-center justify-end gap-3">

                          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">

                            <div
                              className="h-full rounded-full bg-teal-600"
                              style={{
                                width: `${percentage}%`,
                              }}
                            />

                          </div>

                          <span className="w-10 text-right text-xs font-bold text-slate-600">
                            {Math.round(
                              percentage
                            )}
                            %
                          </span>

                        </div>

                      </td>

                    </tr>
                  );
                }
              )}

            </tbody>

          </table>

        </div>

        {/* Mobile */}
        <div className="divide-y divide-slate-100 md:hidden">

          {therapistData.map(
            (therapist) => (
              <div
                key={therapist.name}
                className="p-4"
              >

                <div className="flex items-center gap-3">

                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[#0B1B2A] text-white">
                    <UserRound
                      size={17}
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {therapist.name}
                    </p>

                    <p className="text-xs text-slate-400">
                      Physiotherapist
                    </p>
                  </div>

                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">

                  <div>
                    <p className="text-[10px] font-semibold uppercase text-slate-400">
                      Patients
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {therapist.patients}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase text-slate-400">
                      Sessions
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {therapist.sessions}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase text-slate-400">
                      Revenue
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {formatCurrency(
                        therapist.revenue
                      )}
                    </p>
                  </div>

                </div>

              </div>
            )
          )}

        </div>

      </div>

      {/* Bottom Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border border-slate-200 bg-white p-5">

          <div className="flex items-center gap-3">

            <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={19} />
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Completion Rate
              </p>

              <p className="text-lg font-bold text-slate-800">
                75%
              </p>
            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">

          <div className="flex items-center gap-3">

            <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-600">
              <Clock3 size={19} />
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Pending Rate
              </p>

              <p className="text-lg font-bold text-slate-800">
                9.7%
              </p>
            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">

          <div className="flex items-center gap-3">

            <div className="grid h-10 w-10 place-items-center rounded-xl bg-red-50 text-red-600">
              <XCircle size={19} />
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Cancellation Rate
              </p>

              <p className="text-lg font-bold text-slate-800">
                7.3%
              </p>
            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">

          <div className="flex items-center gap-3">

            <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-50 text-cyan-600">
              <BarChart3 size={19} />
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Avg. Revenue / Visit
              </p>

              <p className="text-lg font-bold text-slate-800">
                ₹1,185
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}