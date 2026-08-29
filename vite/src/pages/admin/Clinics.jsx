import { useEffect, useMemo, useState } from "react";

import {
  Building2,
  Plus,
  Search,
  MoreHorizontal,
  MapPin,
  Phone,
  Clock3,
  Users,
  CalendarDays,
  CircleCheck,
  ChevronRight,
} from "lucide-react";

import ClinicSkeleton from "../../components/skeletons/ClinicSkeleton";

const initialClinics = [
  {
    id: "CL-1001",
    name: "Bhubaneswar Main Clinic",
    city: "Bhubaneswar",
    address: "K7, Kalinga Nagar, Bhubaneswar",
    phone: "+91 81178 12565",
    therapists: 8,
    todayAppointments: 24,
    hours: "08:00 AM - 08:00 PM",
    status: "Open",
  },
  {
    id: "CL-1002",
    name: "Cuttack Physiotherapy Center",
    city: "Cuttack",
    address: "College Square, Cuttack, Odisha",
    phone: "+91 73777 47575",
    therapists: 5,
    todayAppointments: 16,
    hours: "09:00 AM - 07:00 PM",
    status: "Open",
  },
  {
    id: "CL-1003",
    name: "Puri Rehabilitation Clinic",
    city: "Puri",
    address: "Grand Road, Puri, Odisha",
    phone: "+91 98765 43210",
    therapists: 4,
    todayAppointments: 11,
    hours: "09:00 AM - 06:00 PM",
    status: "Open",
  },
  {
    id: "CL-1004",
    name: "Sambalpur Motion Care",
    city: "Sambalpur",
    address: "Ainthapali, Sambalpur, Odisha",
    phone: "+91 99887 66554",
    therapists: 3,
    todayAppointments: 8,
    hours: "10:00 AM - 06:00 PM",
    status: "Closed",
  },
  {
    id: "CL-1005",
    name: "Rourkela Physiotherapy Center",
    city: "Rourkela",
    address: "Civil Township, Rourkela, Odisha",
    phone: "+91 90123 45678",
    therapists: 4,
    todayAppointments: 13,
    hours: "09:00 AM - 07:00 PM",
    status: "Open",
  },
  {
    id: "CL-1006",
    name: "Berhampur Motion Care",
    city: "Berhampur",
    address: "Gandhi Nagar, Berhampur, Odisha",
    phone: "+91 93456 78901",
    therapists: 3,
    todayAppointments: 7,
    hours: "10:00 AM - 06:00 PM",
    status: "Maintenance",
  },
];

const cityOptions = [
  "All Cities",
  "Bhubaneswar",
  "Cuttack",
  "Puri",
  "Sambalpur",
  "Rourkela",
  "Berhampur",
];

const statusOptions = [
  "All Status",
  "Open",
  "Closed",
  "Maintenance",
];

function StatusBadge({ status }) {
  const styles = {
    Open: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
    Closed: "bg-slate-100 text-slate-600 ring-slate-500/10",
    Maintenance: "bg-amber-50 text-amber-700 ring-amber-600/10",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "Open"
            ? "bg-emerald-500"
            : status === "Maintenance"
            ? "bg-amber-500"
            : "bg-slate-400"
        }`}
      />

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

export default function Clinics() {
  const [loading, setLoading] = useState(true);

  const [clinics, setClinics] =
    useState(initialClinics);

  const [search, setSearch] = useState("");
  const [city, setCity] =
    useState("All Cities");
  const [status, setStatus] =
    useState("All Status");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const filteredClinics = useMemo(() => {
    return clinics.filter((clinic) => {
      const value = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        !value ||
        clinic.name
          .toLowerCase()
          .includes(value) ||
        clinic.address
          .toLowerCase()
          .includes(value) ||
        clinic.city
          .toLowerCase()
          .includes(value) ||
        clinic.id
          .toLowerCase()
          .includes(value);

      const matchesCity =
        city === "All Cities" ||
        clinic.city === city;

      const matchesStatus =
        status === "All Status" ||
        clinic.status === status;

      return (
        matchesSearch &&
        matchesCity &&
        matchesStatus
      );
    });
  }, [clinics, search, city, status]);

  const openClinics = clinics.filter(
    (clinic) => clinic.status === "Open"
  ).length;

  const totalTherapists = clinics.reduce(
    (total, clinic) =>
      total + clinic.therapists,
    0
  );

  const totalAppointments = clinics.reduce(
    (total, clinic) =>
      total + clinic.todayAppointments,
    0
  );

  if (loading) {
    return <ClinicSkeleton />;
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Clinics
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage clinic locations, therapists and daily operations.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#FFAA00] px-4 text-sm font-bold text-[#0B1B2A] shadow-sm transition hover:bg-[#f5a000]"
        >
          <Plus size={18} />
          Add Clinic
        </button>

      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Clinics"
          value={clinics.length}
          icon={Building2}
          iconClass="bg-cyan-50 text-cyan-600"
        />

        <StatCard
          title="Open Today"
          value={openClinics}
          icon={CircleCheck}
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Total Therapists"
          value={totalTherapists}
          icon={Users}
          iconClass="bg-orange-50 text-orange-600"
        />

        <StatCard
          title="Today's Visits"
          value={totalAppointments}
          icon={CalendarDays}
          iconClass="bg-blue-50 text-blue-600"
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
              placeholder="Search clinic..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
            />

          </div>

          {/* City */}
          <select
            value={city}
            onChange={(event) =>
              setCity(event.target.value)
            }
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-teal-500 focus:bg-white"
          >
            {cityOptions.map((item) => (
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
          city !== "All Cities" ||
          status !== "All Status") && (
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">

            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredClinics.length}
              </span>{" "}
              clinic
              {filteredClinics.length !== 1
                ? "s"
                : ""}
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCity("All Cities");
                setStatus("All Status");
              }}
              className="text-xs font-semibold text-teal-600 hover:text-teal-700"
            >
              Clear filters
            </button>

          </div>
        )}

      </div>

      {/* Clinics */}
      {filteredClinics.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {filteredClinics.map((clinic) => (
            <div
              key={clinic.id}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >

              {/* Top */}
              <div className="flex items-start justify-between gap-3">

                <div className="flex min-w-0 items-center gap-3">

                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cyan-50 text-cyan-600">
                    <Building2 size={21} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold text-slate-900">
                      {clinic.name}
                    </h3>

                    <p className="mt-0.5 text-xs text-slate-400">
                      {clinic.id}
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

              {/* Status */}
              <div className="mt-4">
                <StatusBadge
                  status={clinic.status}
                />
              </div>

              {/* Details */}
              <div className="mt-5 space-y-3">

                <div className="flex items-start gap-2.5">
                  <MapPin
                    size={15}
                    className="mt-0.5 shrink-0 text-teal-600"
                  />

                  <p className="text-xs leading-5 text-slate-600">
                    {clinic.address}
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone
                    size={15}
                    className="shrink-0 text-teal-600"
                  />

                  <p className="text-xs text-slate-600">
                    {clinic.phone}
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock3
                    size={15}
                    className="shrink-0 text-teal-600"
                  />

                  <p className="text-xs text-slate-600">
                    {clinic.hours}
                  </p>
                </div>

              </div>

              {/* Stats */}
              <div className="mt-5 grid grid-cols-2 gap-3">

                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="flex items-center gap-1.5">
                    <Users
                      size={14}
                      className="text-teal-600"
                    />

                    <p className="text-[11px] font-medium text-slate-400">
                      Therapists
                    </p>
                  </div>

                  <p className="mt-1 text-lg font-bold text-slate-800">
                    {clinic.therapists}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays
                      size={14}
                      className="text-teal-600"
                    />

                    <p className="text-[11px] font-medium text-slate-400">
                      Today's Visits
                    </p>
                  </div>

                  <p className="mt-1 text-lg font-bold text-slate-800">
                    {clinic.todayAppointments}
                  </p>
                </div>

              </div>

              {/* Footer */}
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

                <span className="text-xs font-medium text-slate-400">
                  {clinic.city}
                </span>

                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700"
                >
                  View clinic
                  <ChevronRight size={14} />
                </button>

              </div>

            </div>
          ))}

        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">

          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400">
            <Building2 size={25} />
          </div>

          <h3 className="mt-4 text-base font-bold text-slate-900">
            No clinics found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Try changing your search or filters.
          </p>

        </div>
      )}

    </div>
  );
}