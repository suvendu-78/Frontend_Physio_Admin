import { useEffect, useMemo, useState } from "react";

import {
  Users,
  UserPlus,
  Activity,
  CircleCheck,
  Search,
  MoreHorizontal,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import PatientSkeleton from "../../components/skeletons/PatientSkeleton";

const initialPatients = [
  {
    id: "PT-1001",
    name: "Rahul Das",
    initials: "RD",
    phone: "+91 98765 43210",
    email: "rahul.das@example.com",
    gender: "Male",
    age: 34,
    treatment: "Back Pain Therapy",
    therapist: "Dr. Ankit Kumar",
    lastVisit: "29 Aug 2026",
    status: "Active",
    location: "Bhubaneswar",
  },
  {
    id: "PT-1002",
    name: "Priya Sharma",
    initials: "PS",
    phone: "+91 91234 56780",
    email: "priya.sharma@example.com",
    gender: "Female",
    age: 29,
    treatment: "Sports Rehabilitation",
    therapist: "Dr. Priya Das",
    lastVisit: "29 Aug 2026",
    status: "Active",
    location: "Bhubaneswar",
  },
  {
    id: "PT-1003",
    name: "Amit Kumar",
    initials: "AK",
    phone: "+91 99887 66554",
    email: "amit.kumar@example.com",
    gender: "Male",
    age: 41,
    treatment: "Neck Pain Therapy",
    therapist: "Dr. Ankit Kumar",
    lastVisit: "28 Aug 2026",
    status: "Active",
    location: "Cuttack",
  },
  {
    id: "PT-1004",
    name: "Sneha Patel",
    initials: "SP",
    phone: "+91 90123 45678",
    email: "sneha.patel@example.com",
    gender: "Female",
    age: 37,
    treatment: "Post-Surgery Rehabilitation",
    therapist: "Dr. Rahul Singh",
    lastVisit: "27 Aug 2026",
    status: "Active",
    location: "Bhubaneswar",
  },
  {
    id: "PT-1005",
    name: "Arjun Singh",
    initials: "AS",
    phone: "+91 93456 78901",
    email: "arjun.singh@example.com",
    gender: "Male",
    age: 24,
    treatment: "Sports Injury",
    therapist: "Dr. Priya Das",
    lastVisit: "26 Aug 2026",
    status: "Active",
    location: "Puri",
  },
  {
    id: "PT-1006",
    name: "Neha Mishra",
    initials: "NM",
    phone: "+91 97654 32109",
    email: "neha.mishra@example.com",
    gender: "Female",
    age: 45,
    treatment: "Knee Rehabilitation",
    therapist: "Dr. Rahul Singh",
    lastVisit: "25 Aug 2026",
    status: "Completed",
    location: "Bhubaneswar",
  },
  {
    id: "PT-1007",
    name: "Suresh Nayak",
    initials: "SN",
    phone: "+91 94567 81234",
    email: "suresh.nayak@example.com",
    gender: "Male",
    age: 52,
    treatment: "Shoulder Therapy",
    therapist: "Dr. Ankit Kumar",
    lastVisit: "23 Aug 2026",
    status: "Inactive",
    location: "Cuttack",
  },
  {
    id: "PT-1008",
    name: "Pooja Rout",
    initials: "PR",
    phone: "+91 92345 67890",
    email: "pooja.rout@example.com",
    gender: "Female",
    age: 31,
    treatment: "Posture Correction",
    therapist: "Dr. Priya Das",
    lastVisit: "22 Aug 2026",
    status: "Active",
    location: "Bhubaneswar",
  },
];

const genderOptions = [
  "All Gender",
  "Male",
  "Female",
  "Other",
];

const statusOptions = [
  "All Status",
  "Active",
  "Inactive",
  "Completed",
];

const treatmentOptions = [
  "All Treatments",
  "Back Pain Therapy",
  "Sports Rehabilitation",
  "Neck Pain Therapy",
  "Post-Surgery Rehabilitation",
  "Sports Injury",
  "Knee Rehabilitation",
  "Shoulder Therapy",
  "Posture Correction",
];

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
    Inactive: "bg-slate-100 text-slate-600 ring-slate-500/10",
    Completed: "bg-blue-50 text-blue-700 ring-blue-600/10",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
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
          This month
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

export default function Patients() {
  const [loading, setLoading] = useState(true);

  const [patients, setPatients] =
    useState(initialPatients);

  const [search, setSearch] = useState("");
  const [gender, setGender] =
    useState("All Gender");
  const [status, setStatus] =
    useState("All Status");
  const [treatment, setTreatment] =
    useState("All Treatments");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const searchValue = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        !searchValue ||
        patient.name
          .toLowerCase()
          .includes(searchValue) ||
        patient.id
          .toLowerCase()
          .includes(searchValue) ||
        patient.phone
          .toLowerCase()
          .includes(searchValue) ||
        patient.email
          .toLowerCase()
          .includes(searchValue);

      const matchesGender =
        gender === "All Gender" ||
        patient.gender === gender;

      const matchesStatus =
        status === "All Status" ||
        patient.status === status;

      const matchesTreatment =
        treatment === "All Treatments" ||
        patient.treatment === treatment;

      return (
        matchesSearch &&
        matchesGender &&
        matchesStatus &&
        matchesTreatment
      );
    });
  }, [
    patients,
    search,
    gender,
    status,
    treatment,
  ]);

  const activePatients = patients.filter(
    (patient) => patient.status === "Active"
  ).length;

  const completedPatients = patients.filter(
    (patient) => patient.status === "Completed"
  ).length;

  const newPatients = patients.filter(
    (patient) =>
      patient.id === "PT-1001" ||
      patient.id === "PT-1002"
  ).length;

  if (loading) {
    return <PatientSkeleton />;
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Patients
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage patient profiles, treatments and records.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#FFAA00] px-4 text-sm font-bold text-[#0B1B2A] shadow-sm transition hover:bg-[#f5a000]"
        >
          <UserPlus size={18} />
          Add Patient
        </button>

      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Patients"
          value={patients.length}
          icon={Users}
          iconClass="bg-cyan-50 text-cyan-600"
        />

        <StatCard
          title="New Patients"
          value={newPatients}
          icon={UserPlus}
          iconClass="bg-orange-50 text-orange-600"
        />

        <StatCard
          title="Active Treatments"
          value={activePatients}
          icon={Activity}
          iconClass="bg-teal-50 text-teal-600"
        />

        <StatCard
          title="Completed Treatments"
          value={completedPatients}
          icon={CircleCheck}
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
              placeholder="Search patient..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
            />

          </div>

          {/* Gender */}
          <select
            value={gender}
            onChange={(event) =>
              setGender(event.target.value)
            }
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-teal-500 focus:bg-white"
          >
            {genderOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Treatment */}
          <select
            value={treatment}
            onChange={(event) =>
              setTreatment(event.target.value)
            }
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-teal-500 focus:bg-white"
          >
            {treatmentOptions.map((item) => (
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
          gender !== "All Gender" ||
          treatment !== "All Treatments" ||
          status !== "All Status") && (
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">

            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredPatients.length}
              </span>{" "}
              patient
              {filteredPatients.length !== 1
                ? "s"
                : ""}
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setGender("All Gender");
                setTreatment("All Treatments");
                setStatus("All Status");
              }}
              className="text-xs font-semibold text-teal-600 hover:text-teal-700"
            >
              Clear filters
            </button>

          </div>
        )}

      </div>

      {/* Patient Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Desktop */}
        <div className="hidden overflow-x-auto md:block">

          <table className="w-full min-w-[1050px]">

            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70">

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Patient
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Contact
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Treatment
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Therapist
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Last Visit
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>
              {filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50/70"
                >

                  {/* Patient */}
                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0B1B2A] text-xs font-bold text-white">
                        {patient.initials}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {patient.name}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {patient.id} · {patient.age} yrs
                        </p>
                      </div>

                    </div>

                  </td>

                  {/* Contact */}
                  <td className="px-5 py-4">

                    <div className="space-y-1">

                      <p className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                        <Phone
                          size={12}
                          className="text-teal-600"
                        />
                        {patient.phone}
                      </p>

                      <p className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Mail size={12} />
                        {patient.email}
                      </p>

                    </div>

                  </td>

                  {/* Treatment */}
                  <td className="px-5 py-4">

                    <p className="max-w-[180px] text-sm font-medium text-slate-700">
                      {patient.treatment}
                    </p>

                  </td>

                  {/* Therapist */}
                  <td className="px-5 py-4">

                    <p className="text-sm font-medium text-slate-700">
                      {patient.therapist}
                    </p>

                  </td>

                  {/* Last Visit */}
                  <td className="px-5 py-4">

                    <p className="text-sm font-medium text-slate-700">
                      {patient.lastVisit}
                    </p>

                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusBadge
                      status={patient.status}
                    />
                  </td>

                  {/* Action */}
                  <td className="px-5 py-4 text-right">

                    <button
                      type="button"
                      className="inline-grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      <MoreHorizontal size={18} />
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

        {/* Mobile */}
        <div className="divide-y divide-slate-100 md:hidden">

          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              className="p-4"
            >

              <div className="flex items-start justify-between gap-3">

                <div className="flex min-w-0 items-center gap-3">

                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0B1B2A] text-xs font-bold text-white">
                    {patient.initials}
                  </div>

                  <div className="min-w-0">

                    <p className="truncate text-sm font-semibold text-slate-800">
                      {patient.name}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      {patient.id} · {patient.age} yrs
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
                >
                  <MoreHorizontal size={18} />
                </button>

              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Treatment
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-700">
                    {patient.treatment}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Therapist
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-700">
                    {patient.therapist}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Last Visit
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-700">
                    {patient.lastVisit}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Location
                  </p>

                  <p className="mt-1 flex items-center gap-1 text-xs font-medium text-slate-700">
                    <MapPin
                      size={12}
                      className="text-teal-600"
                    />
                    {patient.location}
                  </p>
                </div>

              </div>

              <div className="mt-4">
                <StatusBadge
                  status={patient.status}
                />
              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">

          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400">
            <Users size={25} />
          </div>

          <h3 className="mt-4 text-base font-bold text-slate-900">
            No patients found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Try changing your search or filters.
          </p>

        </div>
      )}

      {/* Pagination */}
      {filteredPatients.length > 0 && (
        <div className="flex items-center justify-between">

          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredPatients.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {patients.length}
            </span>{" "}
            patients
          </p>

          <button
            type="button"
            className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700"
          >
            View more
            <ChevronRight size={16} />
          </button>

        </div>
      )}

    </div>
  );
}