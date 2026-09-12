import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Building2,
  LayoutDashboard,
  CalendarDays,
  Users,
  UserRound,
  IndianRupee,
  Bell,
  Settings,
  UserCircle,
  LogOut,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Menu,
  Phone,
  MapPin,
  Clock3,
  Stethoscope,
  FileText,
} from "lucide-react";

export default function ClinicDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const clinic = {
    clinicName: "LiBi Motion Care Clinic",
    city: "Bhubaneswar",
    state: "Odisha",
    ownerName: "Suvendu Behera",
    phone: "+91 9876543210",
    status: "APPROVED",
    clinicType: "Physiotherapy Clinic",
  };

  const stats = [
    {
      title: "Total Patients",
      value: "248",
      change: "+12.5%",
      icon: Users,
    },
    {
      title: "Today's Appointments",
      value: "18",
      change: "+8.2%",
      icon: CalendarDays,
    },
    {
      title: "Active Doctors",
      value: "06",
      change: "+1",
      icon: Stethoscope,
    },
    {
      title: "Monthly Revenue",
      value: "₹1.82L",
      change: "+14.8%",
      icon: IndianRupee,
    },
  ];

  const appointments = [
    {
      patient: "Rahul Das",
      doctor: "Dr. Ankit Sharma",
      time: "09:30 AM",
      type: "Physiotherapy",
      status: "Confirmed",
    },
    {
      patient: "Priya Singh",
      doctor: "Dr. Neha Patel",
      time: "10:30 AM",
      type: "Rehabilitation",
      status: "Confirmed",
    },
    {
      patient: "Amit Kumar",
      doctor: "Dr. Ankit Sharma",
      time: "12:00 PM",
      type: "Follow-up",
      status: "Pending",
    },
    {
      patient: "Sneha Mishra",
      doctor: "Dr. Rahul Das",
      time: "03:30 PM",
      type: "Physiotherapy",
      status: "Confirmed",
    },
  ];

  const doctors = [
    {
      name: "Dr. Ankit Sharma",
      specialty: "Orthopedic Physiotherapy",
      patients: 46,
    },
    {
      name: "Dr. Neha Patel",
      specialty: "Sports Rehabilitation",
      patients: 39,
    },
    {
      name: "Dr. Rahul Das",
      specialty: "Neurological Physiotherapy",
      patients: 31,
    },
  ];

  const handleLogout = () => {
    window.location.href = "/clinic/login";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {mobileOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center border-b border-slate-100 px-5">
            <Link
              to="/clinic/dashboard"
              className="flex items-center gap-3"
              onClick={() => setMobileOpen(false)}
            >
              <img
                src="/image.png"
                alt="LiBi Motion Care"
                className="h-10 w-10 object-contain"
              />

              <div>
                <p className="text-sm font-bold text-slate-900">
                  LiBi Motion Care
                </p>

                <p className="text-[10px] text-slate-400">Clinic Portal</p>
              </div>
            </Link>
          </div>

          <div className="mx-4 mt-5 rounded-2xl bg-[#32838c]/5 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#32838c] text-white">
                <Building2 className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">
                  {clinic.clinicName}
                </p>

                <p className="truncate text-xs text-slate-500">{clinic.city}</p>
              </div>
            </div>
          </div>

          <nav className="mt-6 flex-1 space-y-1 px-3">
            <SidebarItem
              icon={LayoutDashboard}
              label="Dashboard"
              active
              to="/clinic/dashboard"
              onClick={() => setMobileOpen(false)}
            />

            <SidebarItem
              icon={CalendarDays}
              label="Appointments"
              to="/clinic/appointments"
              onClick={() => setMobileOpen(false)}
            />

            <SidebarItem
              icon={Users}
              label="Patients"
              to="/clinic/patients"
              onClick={() => setMobileOpen(false)}
            />

            <SidebarItem
              icon={Stethoscope}
              label="Doctors"
              to="/clinic/doctors"
              onClick={() => setMobileOpen(false)}
            />

            <SidebarItem
              icon={IndianRupee}
              label="Payments"
              to="/clinic/payments"
              onClick={() => setMobileOpen(false)}
            />

            <SidebarItem
              icon={FileText}
              label="Notifications"
              to="/clinic/documents"
              onClick={() => setMobileOpen(false)}
            />

            <div className="my-4 border-t border-slate-100" />

            <SidebarItem
              icon={Building2}
              label="Clinic Profile"
              to="/clinic/profile"
              onClick={() => setMobileOpen(false)}
            />

            <SidebarItem
              icon={Settings}
              label="Settings"
              to="/clinic/settings"
              onClick={() => setMobileOpen(false)}
            />
          </nav>

          <div className="border-t border-slate-100 p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div>
              <p className="text-xs font-medium text-slate-400">
                Clinic Portal
              </p>

              <h1 className="text-lg font-bold text-slate-900">Dashboard</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50">
              <Bell className="h-5 w-5" />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="hidden h-8 w-px bg-slate-200 sm:block" />

            <div className="hidden items-center gap-3 sm:flex">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#32838c]/10">
                <Building2 className="h-5 w-5 text-[#32838c]" />
              </div>

              <div className="max-w-40">
                <p className="truncate text-sm font-bold text-slate-900">
                  {clinic.clinicName}
                </p>

                <p className="text-xs text-slate-400">Clinic Admin</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <section className="mb-8 overflow-hidden rounded-3xl bg-[#32838c] p-6 text-white shadow-xl shadow-[#32838c]/15 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm text-white/70">
                  <Building2 className="h-4 w-4" />
                  Welcome back
                </div>

                <h2 className="text-2xl font-bold sm:text-3xl">
                  {clinic.clinicName}
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-white/75">
                  Here's what's happening at your clinic today. Manage your
                  appointments, doctors, patients and clinic operations.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {clinic.status}
                  </span>

                  <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold">
                    {clinic.clinicType}
                  </span>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="grid h-32 w-32 place-items-center rounded-full border border-white/20 bg-white/10">
                  <Building2 className="h-14 w-14 text-white/90" />
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#32838c]/10">
                      <Icon className="h-5 w-5 text-[#32838c]" />
                    </div>

                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-600">
                      <ArrowUpRight className="h-3 w-3" />
                      {stat.change}
                    </span>
                  </div>

                  <p className="mt-5 text-sm text-slate-500">{stat.title}</p>

                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">
                <div>
                  <h2 className="font-bold text-slate-900">
                    Today's Appointments
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Upcoming clinic appointments
                  </p>
                </div>

                <Link
                  to="/clinic/appointments"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#32838c]"
                >
                  View All
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="divide-y divide-slate-100">
                {appointments.map((appointment) => (
                  <div
                    key={`${appointment.patient}-${appointment.time}`}
                    className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-100">
                        <UserRound className="h-5 w-5 text-slate-500" />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {appointment.patient}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {appointment.doctor}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                          <span className="inline-flex items-center gap-1">
                            <Clock3 className="h-3 w-3" />
                            {appointment.time}
                          </span>

                          <span>•</span>

                          <span>{appointment.type}</span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`self-start rounded-full px-3 py-1.5 text-[11px] font-bold sm:self-auto ${
                        appointment.status === "Confirmed"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <div>
                  <h2 className="font-bold text-slate-900">Clinic Doctors</h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Active healthcare professionals
                  </p>
                </div>

                <Link
                  to="/clinic/doctors"
                  className="grid h-9 w-9 place-items-center rounded-xl bg-slate-50 text-slate-500 hover:text-[#32838c]"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="divide-y divide-slate-100">
                {doctors.map((doctor) => (
                  <div key={doctor.name} className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#32838c]/10">
                        <Stethoscope className="h-5 w-5 text-[#32838c]" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-900">
                          {doctor.name}
                        </p>

                        <p className="truncate text-xs text-slate-500">
                          {doctor.specialty}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Active Patients</span>

                      <span className="font-bold text-slate-700">
                        {doctor.patients}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 p-4">
                <Link
                  to="/clinic/doctors"
                  className="flex items-center justify-center gap-2 rounded-xl bg-slate-50 py-3 text-xs font-bold text-slate-600 transition hover:bg-[#32838c]/10 hover:text-[#32838c]"
                >
                  Manage Doctors
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <h2 className="font-bold text-slate-900">Quick Actions</h2>

                <p className="mt-1 text-xs text-slate-400">
                  Frequently used clinic actions
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <QuickAction
                  icon={CalendarDays}
                  label="Appointments"
                  to="/clinic/appointments"
                />

                <QuickAction
                  icon={Users}
                  label="Patients"
                  to="/clinic/patients"
                />

                <QuickAction
                  icon={Stethoscope}
                  label="Doctors"
                  to="/clinic/doctors"
                />

                <QuickAction
                  icon={IndianRupee}
                  label="Payments"
                  to="/clinic/payments"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-slate-900">Clinic Profile</h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Your registered clinic information
                  </p>
                </div>

                <Link
                  to="/clinic/profile"
                  className="grid h-9 w-9 place-items-center rounded-xl bg-slate-50 text-slate-500 hover:text-[#32838c]"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-5 space-y-4">
                <ProfileRow
                  icon={Building2}
                  label="Clinic"
                  value={clinic.clinicName}
                />

                <ProfileRow
                  icon={UserCircle}
                  label="Administrator"
                  value={clinic.ownerName}
                />

                <ProfileRow icon={Phone} label="Phone" value={clinic.phone} />

                <ProfileRow
                  icon={MapPin}
                  label="Location"
                  value={`${clinic.city}, ${clinic.state}`}
                />
              </div>
            </div>
          </section>

          <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-start gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white">
                <ShieldCheck className="h-5 w-5 text-amber-600" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-amber-900">
                  Clinic Verification Status
                </h3>

                <p className="mt-1 text-xs leading-5 text-amber-700">
                  Your clinic account is currently{" "}
                  <strong>{clinic.status}</strong>. Admin verification may be
                  required before all clinic features become available.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active = false, to, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
        active
          ? "bg-[#32838c]/10 text-[#32838c]"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  );
}

function QuickAction({ icon: Icon, label, to }) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-[#32838c]/20 hover:bg-[#32838c]/5"
    >
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[#32838c] shadow-sm">
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0">
        <p className="truncate text-xs font-bold text-slate-700 group-hover:text-[#32838c]">
          {label}
        </p>
      </div>

      <ChevronRight className="ml-auto h-4 w-4 text-slate-300 group-hover:text-[#32838c]" />
    </Link>
  );
}

function ProfileRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-50">
        <Icon className="h-4 w-4 text-slate-400" />
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="truncate text-sm font-semibold text-slate-700">{value}</p>
      </div>
    </div>
  );
}
