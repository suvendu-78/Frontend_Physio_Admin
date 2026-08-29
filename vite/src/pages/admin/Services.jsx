import { useEffect, useMemo, useState } from "react";

import {
  Activity,
  Plus,
  Search,
  MoreHorizontal,
  Clock3,
  IndianRupee,
  Users,
  Building2,
  CircleCheck,
  CircleX,
  ChevronRight,
} from "lucide-react";

import ServiceSkeleton from "../../components/skeletons/ServiceSkeleton";

const initialServices = [
  {
    id: "SV-1001",
    name: "Back Pain Therapy",
    category: "Orthopedic",
    description:
      "Personalized physiotherapy treatment for back pain, stiffness and mobility problems.",
    duration: 45,
    price: 800,
    therapists: 6,
    clinics: 4,
    sessions: 124,
    status: "Active",
  },
  {
    id: "SV-1002",
    name: "Sports Rehabilitation",
    category: "Sports",
    description:
      "Recovery and rehabilitation programs for sports injuries and performance-related problems.",
    duration: 60,
    price: 1200,
    therapists: 5,
    clinics: 3,
    sessions: 98,
    status: "Active",
  },
  {
    id: "SV-1003",
    name: "Neck Pain Therapy",
    category: "Orthopedic",
    description:
      "Targeted therapy for neck pain, stiffness and posture-related discomfort.",
    duration: 45,
    price: 750,
    therapists: 6,
    clinics: 4,
    sessions: 86,
    status: "Active",
  },
  {
    id: "SV-1004",
    name: "Post-Surgery Rehabilitation",
    category: "Rehabilitation",
    description:
      "Structured physiotherapy programs designed to support recovery after surgery.",
    duration: 60,
    price: 1500,
    therapists: 4,
    clinics: 3,
    sessions: 71,
    status: "Active",
  },
  {
    id: "SV-1005",
    name: "Home Physiotherapy",
    category: "Home Care",
    description:
      "Professional physiotherapy sessions delivered at the patient's home.",
    duration: 60,
    price: 1400,
    therapists: 8,
    clinics: 5,
    sessions: 113,
    status: "Active",
  },
  {
    id: "SV-1006",
    name: "Knee Rehabilitation",
    category: "Rehabilitation",
    description:
      "Exercise-based rehabilitation for knee pain, injury and post-operative recovery.",
    duration: 45,
    price: 900,
    therapists: 5,
    clinics: 4,
    sessions: 92,
    status: "Active",
  },
  {
    id: "SV-1007",
    name: "Posture Correction",
    category: "Wellness",
    description:
      "Assessment and exercises to improve posture, balance and movement patterns.",
    duration: 40,
    price: 700,
    therapists: 4,
    clinics: 3,
    sessions: 65,
    status: "Inactive",
  },
  {
    id: "SV-1008",
    name: "Women's Health Physiotherapy",
    category: "Specialized",
    description:
      "Specialized physiotherapy support for women's health and pelvic rehabilitation.",
    duration: 60,
    price: 1300,
    therapists: 3,
    clinics: 2,
    sessions: 48,
    status: "Active",
  },
];

const categoryOptions = [
  "All Categories",
  "Orthopedic",
  "Sports",
  "Rehabilitation",
  "Home Care",
  "Wellness",
  "Specialized",
];

const statusOptions = [
  "All Status",
  "Active",
  "Inactive",
];

function StatusBadge({ status }) {
  const isActive = status === "Active";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        isActive
          ? "bg-emerald-50 text-emerald-700 ring-emerald-600/10"
          : "bg-slate-100 text-slate-600 ring-slate-500/10"
      }`}
    >
      {isActive ? (
        <CircleCheck size={13} />
      ) : (
        <CircleX size={13} />
      )}

      {status}
    </span>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  iconClass,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div
          className={`grid h-10 w-10 place-items-center rounded-xl ${iconClass}`}
        >
          <Icon size={19} />
        </div>

        <span className="text-xs font-medium text-slate-400">
          Current
        </span>
      </div>

      <p className="mt-4 text-sm font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

export default function Services() {
  const [loading, setLoading] = useState(true);

  const [services, setServices] =
    useState(initialServices);

  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState("All Categories");

  const [status, setStatus] =
    useState("All Status");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const value = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        !value ||
        service.name
          .toLowerCase()
          .includes(value) ||
        service.category
          .toLowerCase()
          .includes(value) ||
        service.description
          .toLowerCase()
          .includes(value) ||
        service.id
          .toLowerCase()
          .includes(value);

      const matchesCategory =
        category === "All Categories" ||
        service.category === category;

      const matchesStatus =
        status === "All Status" ||
        service.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [services, search, category, status]);

  const activeServices = services.filter(
    (service) => service.status === "Active"
  ).length;

  const totalSessions = services.reduce(
    (total, service) =>
      total + service.sessions,
    0
  );

  const averagePrice =
    services.length > 0
      ? Math.round(
          services.reduce(
            (total, service) =>
              total + service.price,
            0
          ) / services.length
        )
      : 0;

  if (loading) {
    return <ServiceSkeleton />;
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Services
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage physiotherapy services, pricing and availability.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#FFAA00] px-4 text-sm font-bold text-[#0B1B2A] shadow-sm transition hover:bg-[#f5a000]"
        >
          <Plus size={18} />
          Add Service
        </button>

      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Services"
          value={services.length}
          icon={Activity}
          iconClass="bg-cyan-50 text-cyan-600"
        />

        <StatCard
          title="Active Services"
          value={activeServices}
          icon={CircleCheck}
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Total Sessions"
          value={totalSessions}
          icon={Users}
          iconClass="bg-blue-50 text-blue-600"
        />

        <StatCard
          title="Average Price"
          value={`₹${averagePrice}`}
          icon={IndianRupee}
          iconClass="bg-orange-50 text-orange-600"
        />

      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">

          {/* Search */}
          <div className="relative">

            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search service..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
            />

          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-teal-500 focus:bg-white"
          >
            {categoryOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-teal-500 focus:bg-white"
          >
            {statusOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

        </div>

        {(search ||
          category !== "All Categories" ||
          status !== "All Status") && (
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">

            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredServices.length}
              </span>{" "}
              service
              {filteredServices.length !== 1
                ? "s"
                : ""}
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All Categories");
                setStatus("All Status");
              }}
              className="text-xs font-semibold text-teal-600 hover:text-teal-700"
            >
              Clear filters
            </button>

          </div>
        )}

      </div>

      {/* Service Cards */}
      {filteredServices.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >

              {/* Top */}
              <div className="flex items-start justify-between gap-3">

                <div className="flex min-w-0 items-center gap-3">

                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cyan-50 text-cyan-600">
                    <Activity size={21} />
                  </div>

                  <div className="min-w-0">

                    <h3 className="truncate text-sm font-bold text-slate-900">
                      {service.name}
                    </h3>

                    <p className="mt-0.5 text-xs text-slate-400">
                      {service.id}
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <MoreHorizontal size={18} />
                </button>

              </div>

              {/* Category + Status */}
              <div className="mt-4 flex flex-wrap items-center gap-2">

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  {service.category}
                </span>

                <StatusBadge status={service.status} />

              </div>

              {/* Description */}
              <p className="mt-4 min-h-[40px] text-xs leading-5 text-slate-500">
                {service.description}
              </p>

              {/* Main stats */}
              <div className="mt-5 grid grid-cols-2 gap-3">

                <div className="rounded-xl bg-slate-50 p-3">

                  <div className="flex items-center gap-1.5">
                    <Clock3
                      size={14}
                      className="text-teal-600"
                    />

                    <p className="text-[11px] font-medium text-slate-400">
                      Duration
                    </p>
                  </div>

                  <p className="mt-1 text-lg font-bold text-slate-800">
                    {service.duration}
                    <span className="ml-1 text-xs font-medium text-slate-400">
                      min
                    </span>
                  </p>

                </div>

                <div className="rounded-xl bg-slate-50 p-3">

                  <div className="flex items-center gap-1.5">
                    <IndianRupee
                      size={14}
                      className="text-teal-600"
                    />

                    <p className="text-[11px] font-medium text-slate-400">
                      Price
                    </p>
                  </div>

                  <p className="mt-1 text-lg font-bold text-slate-800">
                    ₹{service.price}
                  </p>

                </div>

              </div>

              {/* Availability */}
              <div className="mt-4 grid grid-cols-2 gap-3">

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Users
                    size={14}
                    className="text-teal-600"
                  />

                  <span>
                    {service.therapists} therapists
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Building2
                    size={14}
                    className="text-teal-600"
                  />

                  <span>
                    {service.clinics} clinics
                  </span>
                </div>

              </div>

              {/* Footer */}
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

                <span className="text-xs font-medium text-slate-400">
                  {service.sessions} sessions
                </span>

                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700"
                >
                  View service
                  <ChevronRight size={14} />
                </button>

              </div>

            </div>
          ))}

        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">

          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400">
            <Activity size={25} />
          </div>

          <h3 className="mt-4 text-base font-bold text-slate-900">
            No services found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Try changing your search or filters.
          </p>

        </div>
      )}

    </div>
  );
}