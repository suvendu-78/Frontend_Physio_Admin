import React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Stethoscope,
  CalendarDays,
  Users,
  Clock3,
  IndianRupee,
  Bell,
  Settings,
  UserCircle,
  LogOut,
  ArrowUpRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Menu,
  Activity,
  FileText,
  Phone,
  Building2,
} from "lucide-react";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const savedDoctor = localStorage.getItem(
    "libi_current_doctor"
  );

  const doctor = savedDoctor
    ? JSON.parse(savedDoctor)
    : null;

  const handleLogout = () => {
    localStorage.removeItem("libi_current_doctor");

    navigate("/doctor/login");
  };

  // If no logged-in doctor exists
  if (!doctor) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7fbfb] px-5">

        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#32838c]/10">

            <Stethoscope
              size={25}
              className="text-[#32838c]"
            />

          </div>

          <h1 className="mt-5 text-xl font-bold text-slate-900">
            Doctor Login Required
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Please login to your doctor account before
            accessing the dashboard.
          </p>

          <Link
            to="/doctor/login"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#32838c] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#286a71]"
          >
            Go to Doctor Login
            <ArrowUpRight size={16} />
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-800 bg-[#081f29] lg:block">

        {/* LOGO */}

        <div className="flex h-20 items-center border-b border-white/10 px-6">

          <div className="flex items-center gap-3">

            <div className="h-10 w-10 overflow-hidden rounded-full bg-white">

              <img
                src="/image.png"
                alt="LiBi Motion Care"
                className="h-full w-full object-cover"
              />

            </div>

            <div>

              <p className="text-sm font-bold text-white">
                LiBi{" "}
                <span className="text-cyan-400">
                  Motion Care
                </span>
              </p>

              <p className="mt-0.5 text-[10px] text-slate-400">
                Doctor Portal
              </p>

            </div>

          </div>

        </div>


        {/* DOCTOR INFO */}

        <div className="border-b border-white/10 p-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#32838c] text-sm font-bold text-white">

              {getInitials(doctor.fullName)}

            </div>

            <div className="min-w-0">

              <p className="truncate text-xs font-bold text-white">
                {doctor.fullName}
              </p>

              <p className="mt-1 truncate text-[10px] text-slate-400">
                {doctor.specialization || "Doctor"}
              </p>

            </div>

          </div>

        </div>


        {/* NAVIGATION */}

        <nav className="p-4">

          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Workspace
          </p>


          <SidebarItem
            icon={Activity}
            label="Dashboard"
            active
          />

          <SidebarItem
            icon={CalendarDays}
            label="Appointments"
          />

          <SidebarItem
            icon={Users}
            label="Patients"
          />

          <SidebarItem
            icon={FileText}
            label="Prescriptions"
          />

          <SidebarItem
            icon={IndianRupee}
            label="Payments"
          />


          <p className="mb-3 mt-8 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Account
          </p>


          <SidebarItem
            icon={Bell}
            label="Notifications"
          />

          <SidebarItem
            icon={UserCircle}
            label="Profile"
          />

          <SidebarItem
            icon={Settings}
            label="Settings"
          />

        </nav>


        {/* LOGOUT */}

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white"
          >

            <LogOut size={17} />

            Logout

          </button>

        </div>

      </aside>


      {/* =====================================================
          MAIN AREA
      ===================================================== */}

      <div className="lg:pl-64">

        {/* HEADER */}

        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">

          <div className="flex h-20 items-center justify-between px-5 sm:px-8">

            {/* MOBILE MENU */}

            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 lg:hidden"
            >
              <Menu size={19} />
            </button>


            <div className="hidden lg:block">

              <p className="text-xs font-semibold text-slate-400">
                Doctor Portal
              </p>

              <h1 className="mt-1 text-lg font-bold text-slate-900">
                Dashboard
              </h1>

            </div>


            {/* HEADER RIGHT */}

            <div className="ml-auto flex items-center gap-3">

              <button className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-[#32838c] hover:text-[#32838c]">

                <Bell size={18} />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#32838c]" />

              </button>


              <div className="hidden h-8 w-px bg-slate-200 sm:block" />


              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#32838c] text-xs font-bold text-white">

                  {getInitials(doctor.fullName)}

                </div>

                <div className="hidden sm:block">

                  <p className="max-w-[150px] truncate text-xs font-bold text-slate-800">
                    {doctor.fullName}
                  </p>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Doctor
                  </p>

                </div>

              </div>

            </div>

          </div>

        </header>


        {/* =====================================================
            CONTENT
        ===================================================== */}

        <main className="p-5 sm:p-8">

          <div className="mx-auto max-w-7xl">

            {/* WELCOME */}

            <div className="mb-8">

              <p className="text-sm text-slate-500">
                Good to see you,
              </p>

              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">

                Dr. {doctor.fullName}

              </h2>

              <div className="mt-2 flex flex-wrap items-center gap-2">

                {doctor.specialization && (
                  <span className="rounded-full bg-[#32838c]/10 px-3 py-1 text-[11px] font-semibold text-[#32838c]">
                    {doctor.specialization}
                  </span>
                )}

                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                    doctor.status === "APPROVED"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {doctor.status === "APPROVED"
                    ? "Verified"
                    : "Verification Pending"}
                </span>

              </div>

            </div>


            {/* =================================================
                VERIFICATION NOTICE
            ================================================= */}

            {doctor.status !== "APPROVED" && (
              <div className="mb-8 flex items-start gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-amber-600">

                  <ShieldCheck size={20} />

                </div>

                <div>

                  <h3 className="text-sm font-bold text-amber-900">
                    Account Verification Pending
                  </h3>

                  <p className="mt-1 max-w-2xl text-xs leading-5 text-amber-700">
                    Your doctor profile has been created successfully.
                    LiBi Motion Care administration may need to verify
                    your professional information before enabling all
                    partner features.
                  </p>

                </div>

              </div>
            )}


            {/* =================================================
                STAT CARDS
            ================================================= */}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              <StatCard
                icon={CalendarDays}
                label="Today's Appointments"
                value="8"
                change="+12%"
              />

              <StatCard
                icon={Users}
                label="Total Patients"
                value="124"
                change="+8%"
              />

              <StatCard
                icon={Clock3}
                label="Pending Appointments"
                value="12"
                change="+4%"
              />

              <StatCard
                icon={IndianRupee}
                label="This Month"
                value="₹48,750"
                change="+15%"
              />

            </div>


            {/* =================================================
                LOWER GRID
            ================================================= */}

            <div className="mt-8 grid gap-6 xl:grid-cols-3">

              {/* APPOINTMENTS */}

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white xl:col-span-2">

                <div className="flex items-center justify-between border-b border-slate-100 p-5">

                  <div>

                    <h3 className="text-sm font-bold text-slate-900">
                      Today's Appointments
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Your upcoming patient appointments
                    </p>

                  </div>

                  <button className="inline-flex items-center gap-1 text-xs font-bold text-[#32838c] hover:underline">
                    View All
                    <ChevronRight size={14} />
                  </button>

                </div>


                <div className="divide-y divide-slate-100">

                  <AppointmentRow
                    time="09:00 AM"
                    patient="Rahul Kumar"
                    type="Physiotherapy"
                    status="Confirmed"
                  />

                  <AppointmentRow
                    time="10:30 AM"
                    patient="Priya Sharma"
                    type="Follow-up"
                    status="Confirmed"
                  />

                  <AppointmentRow
                    time="12:00 PM"
                    patient="Amit Das"
                    type="Consultation"
                    status="Pending"
                  />

                  <AppointmentRow
                    time="03:30 PM"
                    patient="Sneha Patnaik"
                    type="Physiotherapy"
                    status="Confirmed"
                  />

                </div>

              </div>


              {/* QUICK ACTIONS */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5">

                <h3 className="text-sm font-bold text-slate-900">
                  Quick Actions
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Frequently used tools
                </p>


                <div className="mt-5 space-y-3">

                  <QuickAction
                    icon={CalendarDays}
                    title="Manage Appointments"
                  />

                  <QuickAction
                    icon={Users}
                    title="View Patients"
                  />

                  <QuickAction
                    icon={FileText}
                    title="Create Prescription"
                  />

                  <QuickAction
                    icon={UserCircle}
                    title="Update Profile"
                  />

                </div>

              </div>

            </div>


            {/* =================================================
                PROFILE SUMMARY
            ================================================= */}

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#32838c]/10 text-[#32838c]">

                    <Stethoscope size={25} />

                  </div>

                  <div>

                    <h3 className="text-sm font-bold text-slate-900">
                      Professional Profile
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {doctor.qualification || "Professional"}
                      {doctor.experience
                        ? ` • ${doctor.experience} years experience`
                        : ""}
                    </p>

                    {doctor.clinicName && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">

                        <Building2 size={12} />

                        {doctor.clinicName}

                      </p>
                    )}

                  </div>

                </div>


                <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:border-[#32838c] hover:text-[#32838c]">

                  Edit Profile

                  <ArrowUpRight size={14} />

                </button>

              </div>

            </div>


            {/* =================================================
                CONTACT
            ================================================= */}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              <div className="rounded-xl border border-slate-200 bg-white p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#32838c]/10 text-[#32838c]">

                    <Phone size={17} />

                  </div>

                  <div>

                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Phone
                    </p>

                    <p className="mt-1 text-xs font-bold text-slate-700">
                      {doctor.phone || "Not provided"}
                    </p>

                  </div>

                </div>

              </div>


              <div className="rounded-xl border border-slate-200 bg-white p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#32838c]/10 text-[#32838c]">

                    <CheckCircle2 size={17} />

                  </div>

                  <div>

                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Registration
                    </p>

                    <p className="mt-1 text-xs font-bold text-slate-700">
                      {doctor.registrationNumber ||
                        "Not provided"}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};


/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({
  icon: Icon,
  label,
  value,
  change,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#32838c]/10 text-[#32838c]">

          <Icon size={19} />

        </div>

        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
          {change}
        </span>

      </div>


      <p className="mt-5 text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
        {value}
      </p>

    </div>
  );
};


/* =========================================================
   SIDEBAR ITEM
========================================================= */

const SidebarItem = ({
  icon: Icon,
  label,
  active = false,
}) => {
  return (
    <button
      className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
        active
          ? "bg-[#32838c] text-white"
          : "text-slate-400 hover:bg-white/5 hover:text-white"
      }`}
    >

      <Icon size={17} />

      {label}

    </button>
  );
};


/* =========================================================
   APPOINTMENT ROW
========================================================= */

const AppointmentRow = ({
  time,
  patient,
  type,
  status,
}) => {
  return (
    <div className="flex items-center gap-4 p-4 transition hover:bg-slate-50">

      <div className="w-20 shrink-0">

        <p className="text-xs font-bold text-slate-800">
          {time}
        </p>

      </div>


      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#32838c]/10 text-[#32838c]">

        <UserCircle size={17} />

      </div>


      <div className="min-w-0 flex-1">

        <p className="truncate text-xs font-bold text-slate-800">
          {patient}
        </p>

        <p className="mt-1 truncate text-[10px] text-slate-400">
          {type}
        </p>

      </div>


      <span
        className={`hidden rounded-full px-2.5 py-1 text-[10px] font-bold sm:block ${
          status === "Confirmed"
            ? "bg-emerald-50 text-emerald-600"
            : "bg-amber-50 text-amber-600"
        }`}
      >
        {status}
      </span>

      <ChevronRight
        size={15}
        className="text-slate-300"
      />

    </div>
  );
};


/* =========================================================
   QUICK ACTION
========================================================= */

const QuickAction = ({
  icon: Icon,
  title,
}) => {
  return (
    <button className="group flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-left transition hover:border-[#32838c]/20 hover:bg-[#32838c]/5">

      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#32838c] shadow-sm">

        <Icon size={17} />

      </div>


      <span className="flex-1 text-xs font-bold text-slate-700">
        {title}
      </span>


      <ArrowUpRight
        size={15}
        className="text-slate-300 transition group-hover:text-[#32838c]"
      />

    </button>
  );
};


/* =========================================================
   INITIALS
========================================================= */

const getInitials = (name = "") => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
};


export default DoctorDashboard;