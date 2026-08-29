import { useEffect, useMemo, useState } from "react";

import {
  UserRoundCog,
  UserPlus,
  Users,
  CalendarCheck,
  Clock3,
  Search,
  MoreHorizontal,
  MapPin,
  Star,
  Phone,
  ChevronRight,
} from "lucide-react";

import TherapistSkeleton from "../../components/skeletons/TherapistSkeleton";

const initialTherapists = [
  {
    id: "TH-1001",
    name: "Dr. Ankit Kumar",
    initials: "AK",
    qualification: "MPT, BPT",
    specialization: "Orthopedic Physiotherapy",
    experience: "8 Years",
    patients: 142,
    sessions: 28,
    rating: 4.9,
    clinic: "Bhubaneswar Main Clinic",
    phone: "+91 98765 43210",
    availability: "Available",
  },
  {
    id: "TH-1002",
    name: "Dr. Priya Das",
    initials: "PD",
    qualification: "MPT, BPT",
    specialization: "Sports Physiotherapy",
    experience: "6 Years",
    patients: 118,
    sessions: 24,
    rating: 4.8,
    clinic: "Bhubaneswar Main Clinic",
    phone: "+91 91234 56780",
    availability: "Available",
  },
  {
    id: "TH-1003",
    name: "Dr. Rahul Singh",
    initials: "RS",
    qualification: "BPT, MIAP",
    specialization: "Neurological Physiotherapy",
    experience: "10 Years",
    patients: 164,
    sessions: 31,
    rating: 4.9,
    clinic: "Cuttack Clinic",
    phone: "+91 99887 66554",
    availability: "Available",
  },
  {
    id: "TH-1004",
    name: "Dr. Sneha Mohanty",
    initials: "SM",
    qualification: "MPT",
    specialization: "Pediatric Physiotherapy",
    experience: "5 Years",
    patients: 96,
    sessions: 19,
    rating: 4.7,
    clinic: "Bhubaneswar Main Clinic",
    phone: "+91 90123 45678",
    availability: "On Leave",
  },
  {
    id: "TH-1005",
    name: "Dr. Amit Mishra",
    initials: "AM",
    qualification: "BPT",
    specialization: "Sports Rehabilitation",
    experience: "4 Years",
    patients: 87,
    sessions: 22,
    rating: 4.8,
    clinic: "Puri Clinic",
    phone: "+91 93456 78901",
    availability: "Available",
  },
  {
    id: "TH-1006",
    name: "Dr. Neha Patel",
    initials: "NP",
    qualification: "MPT, BPT",
    specialization: "Women's Health Physiotherapy",
    experience: "7 Years",
    patients: 123,
    sessions: 26,
    rating: 4.9,
    clinic: "Bhubaneswar Main Clinic",
    phone: "+91 97654 32109",
    availability: "Unavailable",
  },
];

const specializationOptions = [
  "All Specializations",
  "Orthopedic Physiotherapy",
  "Sports Physiotherapy",
  "Neurological Physiotherapy",
  "Pediatric Physiotherapy",
  "Sports Rehabilitation",
  "Women's Health Physiotherapy",
];

const clinicOptions = [
  "All Clinics",
  "Bhubaneswar Main Clinic",
  "Cuttack Clinic",
  "Puri Clinic",
];

const availabilityOptions = [
  "All Availability",
  "Available",
  "Unavailable",
  "On Leave",
];

function AvailabilityBadge({ status }) {
  const styles = {
    Available:
      "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
    Unavailable:
      "bg-slate-100 text-slate-600 ring-slate-500/10",
    "On Leave":
      "bg-amber-50 text-amber-700 ring-amber-600/10",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        styles[status] ||
        "bg-slate-100 text-slate-600"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "Available"
            ? "bg-emerald-500"
            : status === "On Leave"
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

export default function Therapists() {
  const [loading, setLoading] = useState(true);

  const [therapists, setTherapists] =
    useState(initialTherapists);

  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] =
    useState("All Specializations");
  const [clinic, setClinic] =
    useState("All Clinics");
  const [availability, setAvailability] =
    useState("All Availability");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const filteredTherapists = useMemo(() => {
    return therapists.filter((therapist) => {
      const value = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        !value ||
        therapist.name
          .toLowerCase()
          .includes(value) ||
        therapist.specialization
          .toLowerCase()
          .includes(value) ||
        therapist.id
          .toLowerCase()
          .includes(value);

      const matchesSpecialization =
        specialization ===
          "All Specializations" ||
        therapist.specialization ===
          specialization;

      const matchesClinic =
        clinic === "All Clinics" ||
        therapist.clinic === clinic;

      const matchesAvailability =
        availability ===
          "All Availability" ||
        therapist.availability ===
          availability;

      return (
        matchesSearch &&
        matchesSpecialization &&
        matchesClinic &&
        matchesAvailability
      );
    });
  }, [
    therapists,
    search,
    specialization,
    clinic,
    availability,
  ]);

  const availableCount = therapists.filter(
    (therapist) =>
      therapist.availability === "Available"
  ).length;

  const leaveCount = therapists.filter(
    (therapist) =>
      therapist.availability === "On Leave"
  ).length;

  const totalSessions = therapists.reduce(
    (total, therapist) =>
      total + therapist.sessions,
    0
  );

  if (loading) {
    return <TherapistSkeleton />;
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Therapists
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage therapists, specializations and availability.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#FFAA00] px-4 text-sm font-bold text-[#0B1B2A] shadow-sm transition hover:bg-[#f5a000]"
        >
          <UserPlus size={18} />
          Add Therapist
        </button>

      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Therapists"
          value={therapists.length}
          icon={UserRoundCog}
          iconClass="bg-cyan-50 text-cyan-600"
        />

        <StatCard
          title="Available Today"
          value={availableCount}
          icon={Users}
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="On Leave"
          value={leaveCount}
          icon={Clock3}
          iconClass="bg-amber-50 text-amber-600"
        />

        <StatCard
          title="Today's Sessions"
          value={totalSessions}
          icon={CalendarCheck}
          iconClass="bg-blue-50 text-blue-600"
        />

      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">

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
              placeholder="Search therapist..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
            />

          </div>

          {/* Specialization */}
          <select
            value={specialization}
            onChange={(event) =>
              setSpecialization(
                event.target.value
              )
            }
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-teal-500 focus:bg-white"
          >
            {specializationOptions.map(
              (item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              )
            )}
          </select>

          {/* Clinic */}
          <select
            value={clinic}
            onChange={(event) =>
              setClinic(event.target.value)
            }
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-teal-500 focus:bg-white"
          >
            {clinicOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Availability */}
          <select
            value={availability}
            onChange={(event) =>
              setAvailability(event.target.value)
            }
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-teal-500 focus:bg-white"
          >
            {availabilityOptions.map(
              (item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              )
            )}
          </select>

        </div>

        {(search ||
          specialization !==
            "All Specializations" ||
          clinic !== "All Clinics" ||
          availability !==
            "All Availability") && (
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">

            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredTherapists.length}
              </span>{" "}
              therapist
              {filteredTherapists.length !==
              1
                ? "s"
                : ""}
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSpecialization(
                  "All Specializations"
                );
                setClinic("All Clinics");
                setAvailability(
                  "All Availability"
                );
              }}
              className="text-xs font-semibold text-teal-600 hover:text-teal-700"
            >
              Clear filters
            </button>

          </div>
        )}

      </div>

      {/* Therapist Cards */}
      {filteredTherapists.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {filteredTherapists.map(
            (therapist) => (
              <div
                key={therapist.id}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >

                {/* Profile */}
                <div className="flex items-start gap-4">

                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#0B1B2A] text-sm font-bold text-white">
                    {therapist.initials}
                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex items-start justify-between gap-2">

                      <div>
                        <h3 className="truncate text-sm font-bold text-slate-900">
                          {therapist.name}
                        </h3>

                        <p className="mt-0.5 text-xs font-medium text-teal-600">
                          {therapist.qualification}
                        </p>
                      </div>

                    </div>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {therapist.specialization}
                    </p>

                  </div>

                  <button
                    type="button"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    <MoreHorizontal size={18} />
                  </button>

                </div>

                {/* Availability */}
                <div className="mt-4">
                  <AvailabilityBadge
                    status={
                      therapist.availability
                    }
                  />
                </div>

                {/* Stats */}
                <div className="mt-4 grid grid-cols-2 gap-3">

                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[11px] font-medium text-slate-400">
                      Patients
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-800">
                      {therapist.patients}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[11px] font-medium text-slate-400">
                      Sessions
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-800">
                      {therapist.sessions}
                    </p>
                  </div>

                </div>

                {/* Details */}
                <div className="mt-4 space-y-2">

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin
                      size={14}
                      className="shrink-0 text-teal-600"
                    />

                    <span className="truncate">
                      {therapist.clinic}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Phone
                      size={14}
                      className="shrink-0 text-teal-600"
                    />

                    <span>
                      {therapist.phone}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock3
                      size={14}
                      className="shrink-0 text-teal-600"
                    />

                    <span>
                      {therapist.experience} experience
                    </span>
                  </div>

                </div>

                {/* Rating */}
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">

                  <div className="flex items-center gap-1.5">

                    <Star
                      size={15}
                      className="fill-amber-400 text-amber-400"
                    />

                    <span className="text-sm font-bold text-slate-800">
                      {therapist.rating}
                    </span>

                    <span className="text-xs text-slate-400">
                      rating
                    </span>

                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700"
                  >
                    View profile
                    <ChevronRight size={14} />
                  </button>

                </div>

              </div>
            )
          )}

        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">

          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400">
            <UserRoundCog size={25} />
          </div>

          <h3 className="mt-4 text-base font-bold text-slate-900">
            No therapists found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Try changing your search or filters.
          </p>

        </div>
      )}

    </div>
  );
}