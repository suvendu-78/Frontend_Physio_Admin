import { useEffect, useMemo, useState } from "react";

import {
  CalendarDays,
  Clock3,
  Plus,
  Search,
  MoreHorizontal,
  Users,
  CircleCheck,
  CircleAlert,
  CircleDashed,
  Home,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import AppointmentSkeleton from "../../components/skeletons/AppointmentSkeleton";

const initialAppointments = [
  {
    id: "APT-1001",
    patient: "Rahul Das",
    patientInitials: "RD",
    therapist: "Dr. Ankit Kumar",
    service: "Back Pain Therapy",
    date: "2026-08-29",
    time: "10:00 AM",
    type: "Clinic Visit",
    status: "Confirmed",
  },
  {
    id: "APT-1002",
    patient: "Priya Sharma",
    patientInitials: "PS",
    therapist: "Dr. Priya Das",
    service: "Sports Rehabilitation",
    date: "2026-08-29",
    time: "11:30 AM",
    type: "Home Visit",
    status: "Confirmed",
  },
  {
    id: "APT-1003",
    patient: "Amit Kumar",
    patientInitials: "AK",
    therapist: "Dr. Ankit Kumar",
    service: "Neck Pain Therapy",
    date: "2026-08-29",
    time: "01:00 PM",
    type: "Clinic Visit",
    status: "Pending",
  },
  {
    id: "APT-1004",
    patient: "Sneha Patel",
    patientInitials: "SP",
    therapist: "Dr. Rahul Singh",
    service: "Post-Surgery Rehabilitation",
    date: "2026-08-30",
    time: "03:30 PM",
    type: "Clinic Visit",
    status: "Confirmed",
  },
  {
    id: "APT-1005",
    patient: "Arjun Singh",
    patientInitials: "AS",
    therapist: "Dr. Priya Das",
    service: "Sports Injury",
    date: "2026-08-30",
    time: "05:00 PM",
    type: "Home Visit",
    status: "Pending",
  },
  {
    id: "APT-1006",
    patient: "Neha Mishra",
    patientInitials: "NM",
    therapist: "Dr. Rahul Singh",
    service: "Knee Rehabilitation",
    date: "2026-08-28",
    time: "09:30 AM",
    type: "Clinic Visit",
    status: "Completed",
  },
  {
    id: "APT-1007",
    patient: "Suresh Nayak",
    patientInitials: "SN",
    therapist: "Dr. Ankit Kumar",
    service: "Shoulder Therapy",
    date: "2026-08-28",
    time: "12:00 PM",
    type: "Clinic Visit",
    status: "Cancelled",
  },
  {
    id: "APT-1008",
    patient: "Pooja Rout",
    patientInitials: "PR",
    therapist: "Dr. Priya Das",
    service: "Posture Correction",
    date: "2026-08-29",
    time: "04:00 PM",
    type: "Home Visit",
    status: "Confirmed",
  },
];

const therapists = [
  "All Therapists",
  "Dr. Ankit Kumar",
  "Dr. Priya Das",
  "Dr. Rahul Singh",
];

const statusOptions = [
  "All Status",
  "Pending",
  "Confirmed",
  "In Progress",
  "Completed",
  "Cancelled",
  "No Show",
];

const typeOptions = [
  "All Types",
  "Clinic Visit",
  "Home Visit",
  "Online Consultation",
];

function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-amber-50 text-amber-700 ring-amber-600/10",
    Confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
    "In Progress": "bg-cyan-50 text-cyan-700 ring-cyan-600/10",
    Completed: "bg-blue-50 text-blue-700 ring-blue-600/10",
    Cancelled: "bg-red-50 text-red-700 ring-red-600/10",
    "No Show": "bg-slate-100 text-slate-600 ring-slate-500/10",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

function TypeBadge({ type }) {
  const isHome = type === "Home Visit";

  return (
    <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
      {isHome ? (
        <Home size={15} className="text-teal-600" />
      ) : (
        <Building2 size={15} className="text-slate-500" />
      )}

      <span>{type}</span>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, iconClass }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div
          className={`grid h-10 w-10 place-items-center rounded-xl ${iconClass}`}
        >
          <Icon size={19} />
        </div>

        <span className="text-xs font-medium text-slate-400">
          Today
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

function EmptyState() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400">
        <CalendarDays size={25} />
      </div>

      <h3 className="mt-4 text-base font-bold text-slate-900">
        No appointments found
      </h3>

      <p className="mt-1 max-w-sm text-sm text-slate-500">
        Try changing your filters or create a new appointment.
      </p>
    </div>
  );
}

export default function Appointments() {
  const [loading, setLoading] = useState(true);

  const [appointments, setAppointments] =
    useState(initialAppointments);

  const [search, setSearch] = useState("");
  const [therapist, setTherapist] =
    useState("All Therapists");
  const [status, setStatus] =
    useState("All Status");
  const [type, setType] =
    useState("All Types");

  const [showDialog, setShowDialog] = useState(false);

  const [newAppointment, setNewAppointment] = useState({
    patient: "",
    therapist: "",
    service: "",
    date: "",
    time: "",
    type: "Clinic Visit",
    notes: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        appointment.patient
          .toLowerCase()
          .includes(searchValue) ||
        appointment.service
          .toLowerCase()
          .includes(searchValue) ||
        appointment.id
          .toLowerCase()
          .includes(searchValue);

      const matchesTherapist =
        therapist === "All Therapists" ||
        appointment.therapist === therapist;

      const matchesStatus =
        status === "All Status" ||
        appointment.status === status;

      const matchesType =
        type === "All Types" ||
        appointment.type === type;

      return (
        matchesSearch &&
        matchesTherapist &&
        matchesStatus &&
        matchesType
      );
    });
  }, [
    appointments,
    search,
    therapist,
    status,
    type,
  ]);

  const totalAppointments = appointments.length;

  const pendingAppointments = appointments.filter(
    (item) => item.status === "Pending"
  ).length;

  const confirmedAppointments = appointments.filter(
    (item) => item.status === "Confirmed"
  ).length;

  const completedAppointments = appointments.filter(
    (item) => item.status === "Completed"
  ).length;

  function handleCreateAppointment(event) {
    event.preventDefault();

    if (
      !newAppointment.patient ||
      !newAppointment.therapist ||
      !newAppointment.service ||
      !newAppointment.date ||
      !newAppointment.time
    ) {
      return;
    }

    const initials = newAppointment.patient
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const appointment = {
      id: `APT-${1000 + appointments.length + 1}`,
      patient: newAppointment.patient,
      patientInitials: initials,
      therapist: newAppointment.therapist,
      service: newAppointment.service,
      date: newAppointment.date,
      time: newAppointment.time,
      type: newAppointment.type,
      status: "Pending",
    };

    setAppointments((current) => [
      appointment,
      ...current,
    ]);

    setNewAppointment({
      patient: "",
      therapist: "",
      service: "",
      date: "",
      time: "",
      type: "Clinic Visit",
      notes: "",
    });

    setShowDialog(false);
  }

  if (loading) {
    return <AppointmentSkeleton />;
  }

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Appointments
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage patient appointments and schedules.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowDialog(true)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#FFAA00] px-4 text-sm font-bold text-[#0B1B2A] shadow-sm transition hover:bg-[#f5a000]"
        >
          <Plus size={18} />
          New Appointment
        </button>

      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Appointments"
          value={totalAppointments}
          icon={CalendarDays}
          iconClass="bg-cyan-50 text-cyan-600"
        />

        <StatCard
          title="Pending"
          value={pendingAppointments}
          icon={CircleDashed}
          iconClass="bg-amber-50 text-amber-600"
        />

        <StatCard
          title="Confirmed"
          value={confirmedAppointments}
          icon={CircleCheck}
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Completed"
          value={completedAppointments}
          icon={CircleAlert}
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

          {/* Therapist */}
          <select
            value={therapist}
            onChange={(event) =>
              setTherapist(event.target.value)
            }
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
          >
            {therapists.map((item) => (
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
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
          >
            {statusOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Type */}
          <select
            value={type}
            onChange={(event) =>
              setType(event.target.value)
            }
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
          >
            {typeOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

        </div>

        {/* Filter info */}
        {(search ||
          therapist !== "All Therapists" ||
          status !== "All Status" ||
          type !== "All Types") && (
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredAppointments.length}
              </span>{" "}
              appointment
              {filteredAppointments.length !== 1
                ? "s"
                : ""}
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setTherapist("All Therapists");
                setStatus("All Status");
                setType("All Types");
              }}
              className="text-xs font-semibold text-teal-600 hover:text-teal-700"
            >
              Clear filters
            </button>
          </div>
        )}

      </div>

      {/* Appointment Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {filteredAppointments.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto md:block">

              <table className="w-full min-w-[950px]">

                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70">

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Patient
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Therapist
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Service
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Date & Time
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Type
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
                  {filteredAppointments.map(
                    (appointment) => (
                      <tr
                        key={appointment.id}
                        className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50/70"
                      >

                        {/* Patient */}
                        <td className="px-5 py-4">

                          <div className="flex items-center gap-3">

                            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0B1B2A] text-xs font-bold text-white">
                              {appointment.patientInitials}
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-slate-800">
                                {appointment.patient}
                              </p>

                              <p className="mt-0.5 text-xs text-slate-400">
                                {appointment.id}
                              </p>
                            </div>

                          </div>

                        </td>

                        {/* Therapist */}
                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-slate-700">
                            {appointment.therapist}
                          </p>
                        </td>

                        {/* Service */}
                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-slate-700">
                            {appointment.service}
                          </p>
                        </td>

                        {/* Date */}
                        <td className="px-5 py-4">
                          <div>
                            <p className="text-sm font-semibold text-slate-700">
                              {formatDate(
                                appointment.date
                              )}
                            </p>

                            <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                              <Clock3 size={12} />
                              {appointment.time}
                            </p>
                          </div>
                        </td>

                        {/* Type */}
                        <td className="px-5 py-4">
                          <TypeBadge
                            type={appointment.type}
                          />
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <StatusBadge
                            status={appointment.status}
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
                    )
                  )}
                </tbody>

              </table>

            </div>

            {/* Mobile Cards */}
            <div className="divide-y divide-slate-100 md:hidden">

              {filteredAppointments.map(
                (appointment) => (
                  <div
                    key={appointment.id}
                    className="p-4"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0B1B2A] text-xs font-bold text-white">
                          {appointment.patientInitials}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-800">
                            {appointment.patient}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400">
                            {appointment.id}
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

                    <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4">

                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                          Therapist
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-700">
                          {appointment.therapist}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                          Service
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-700">
                          {appointment.service}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                          Date & Time
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-700">
                          {formatDate(
                            appointment.date
                          )}
                          {" · "}
                          {appointment.time}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                          Type
                        </p>

                        <div className="mt-1">
                          <TypeBadge
                            type={appointment.type}
                          />
                        </div>
                      </div>

                    </div>

                    <div className="mt-4">
                      <StatusBadge
                        status={appointment.status}
                      />
                    </div>

                  </div>
                )
              )}

            </div>
          </>
        )}

      </div>

      {/* Pagination */}
      {filteredAppointments.length > 0 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              1
            </span>{" "}
            to{" "}
            <span className="font-semibold text-slate-700">
              {filteredAppointments.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {filteredAppointments.length}
            </span>{" "}
            appointments
          </p>

          <div className="flex items-center gap-1">

            <button
              type="button"
              disabled
              className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-300"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              className="grid h-8 w-8 place-items-center rounded-lg bg-[#0B1B2A] text-xs font-semibold text-white"
            >
              1
            </button>

            <button
              type="button"
              className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50"
            >
              2
            </button>

            <button
              type="button"
              className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50"
            >
              <ChevronRight size={16} />
            </button>

          </div>

        </div>
      )}

      {/* New Appointment Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1B2A]/50 p-4 backdrop-blur-sm">

          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-appointment-title"
          >

            {/* Dialog Header */}
            <div className="border-b border-slate-200 px-5 py-4 sm:px-6">

              <div className="flex items-start justify-between gap-4">

                <div>
                  <h2
                    id="new-appointment-title"
                    className="text-lg font-bold text-slate-900"
                  >
                    New Appointment
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Schedule a new patient appointment.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowDialog(false)}
                  className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Close dialog"
                >
                  ×
                </button>

              </div>

            </div>

            {/* Form */}
            <form
              onSubmit={handleCreateAppointment}
              className="max-h-[75vh] overflow-y-auto"
            >

              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">

                {/* Patient */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Patient
                  </label>

                  <input
                    type="text"
                    value={newAppointment.patient}
                    onChange={(event) =>
                      setNewAppointment({
                        ...newAppointment,
                        patient: event.target.value,
                      })
                    }
                    placeholder="Enter patient name"
                    className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
                  />
                </div>

                {/* Therapist */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Therapist
                  </label>

                  <select
                    value={newAppointment.therapist}
                    onChange={(event) =>
                      setNewAppointment({
                        ...newAppointment,
                        therapist: event.target.value,
                      })
                    }
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
                  >
                    <option value="">
                      Select therapist
                    </option>

                    {therapists
                      .filter(
                        (item) =>
                          item !== "All Therapists"
                      )
                      .map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Service */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Service
                  </label>

                  <input
                    type="text"
                    value={newAppointment.service}
                    onChange={(event) =>
                      setNewAppointment({
                        ...newAppointment,
                        service: event.target.value,
                      })
                    }
                    placeholder="e.g. Back Pain Therapy"
                    className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Date
                  </label>

                  <input
                    type="date"
                    value={newAppointment.date}
                    onChange={(event) =>
                      setNewAppointment({
                        ...newAppointment,
                        date: event.target.value,
                      })
                    }
                    className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Time
                  </label>

                  <input
                    type="time"
                    value={newAppointment.time}
                    onChange={(event) =>
                      setNewAppointment({
                        ...newAppointment,
                        time: event.target.value,
                      })
                    }
                    className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Appointment Type
                  </label>

                  <select
                    value={newAppointment.type}
                    onChange={(event) =>
                      setNewAppointment({
                        ...newAppointment,
                        type: event.target.value,
                      })
                    }
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
                  >
                    {typeOptions
                      .filter(
                        (item) => item !== "All Types"
                      )
                      .map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Notes */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Notes
                    <span className="ml-1 font-normal text-slate-400">
                      (optional)
                    </span>
                  </label>

                  <textarea
                    value={newAppointment.notes}
                    onChange={(event) =>
                      setNewAppointment({
                        ...newAppointment,
                        notes: event.target.value,
                      })
                    }
                    rows={3}
                    placeholder="Add any appointment notes..."
                    className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
                  />
                </div>

              </div>

              {/* Footer */}
              <div className="flex flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">

                <button
                  type="button"
                  onClick={() => setShowDialog(false)}
                  className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="h-10 rounded-xl bg-[#FFAA00] px-5 text-sm font-bold text-[#0B1B2A] hover:bg-[#f5a000]"
                >
                  Create Appointment
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}