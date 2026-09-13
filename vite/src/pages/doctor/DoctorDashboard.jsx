// import React from "react";
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import {
//   Stethoscope,
//   CalendarDays,
//   Users,
//   Clock3,
//   IndianRupee,
//   Bell,
//   Settings,
//   UserCircle,
//   LogOut,
//   ArrowUpRight,
//   ArrowLeft,
//   CheckCircle2,
//   ShieldCheck,
//   ChevronRight,
//   Menu,
//   Activity,
//   FileText,
//   Phone,
//   Building2,
//   FileCheck,
// } from "lucide-react";

// const DoctorDashboard = () => {
//   const navigate = useNavigate();

//   const doctor = {
//     fullName: "Doctor",
//     specialization: "Doctor",
//     qualification: "Professional",
//     experience: "",
//     clinicName: "",
//     phone: "",
//     registrationNumber: "",
//     status: "APPROVED",
//   };

//   const data = async () => {
//     const response = await fetch(
//       "http://localhost:8000/api/v1/pattner/finddoctor",
//       {
//         method: "GET",
//         credentials: "include",
//       },
//     );
//     const resp = await response.json();
//     console.log("doctor data:;", resp);
//   };

//   useEffect(() => {
//     data();
//     return () => {};
//   }, []);
//   const handleLogout = () => {
//     navigate("/doctor/login");
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-800 bg-[#081f29] lg:block">
//         <div className="flex h-20 items-center border-b border-white/10 px-6">
//           <div className="flex items-center gap-3">
//             <div className="h-10 w-10 overflow-hidden rounded-full bg-white">
//               <img
//                 src="/image.png"
//                 alt="LiBi Motion Care"
//                 className="h-full w-full object-cover"
//               />
//             </div>

//             <div>
//               <p className="text-sm font-bold text-white">
//                 LiBi <span className="text-cyan-400">Motion Care</span>
//               </p>

//               <p className="mt-0.5 text-[10px] text-slate-400">Doctor Portal</p>
//             </div>
//           </div>
//         </div>

//         <div className="border-b border-white/10 p-5">
//           <div className="flex items-center gap-3">
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#32838c] text-sm font-bold text-white">
//               {getInitials(doctor.fullName)}
//             </div>

//             <div className="min-w-0">
//               <p className="truncate text-xs font-bold text-white">
//                 {doctor.fullName}
//               </p>

//               <p className="mt-1 truncate text-[10px] text-slate-400">
//                 {doctor.specialization || "Doctor"}
//               </p>
//             </div>
//           </div>
//         </div>

//         <nav className="p-4">
//           <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
//             Workspace
//           </p>

//           <SidebarItem icon={Activity} label="Dashboard" active />

//           <SidebarItem icon={CalendarDays} label="Appointments" />

//           <SidebarItem icon={Users} label="Patients" />

//           <SidebarItem icon={FileText} label="Prescriptions" />

//           <SidebarItem icon={IndianRupee} label="Payments" />

//           <SidebarItem
//             icon={FileCheck}
//             label="Document Verification"
//             onClick={() => navigate("/doctor/documents")}
//           />

//           <p className="mb-3 mt-8 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
//             Account
//           </p>

//           <SidebarItem icon={Bell} label="Notifications" />

//           <SidebarItem icon={UserCircle} label="Profile" />

//           <SidebarItem icon={Settings} label="Settings" />
//         </nav>

//         <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">
//           <button
//             onClick={handleLogout}
//             className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white"
//           >
//             <LogOut size={17} />
//             Logout
//           </button>
//         </div>
//       </aside>

//       <div className="lg:pl-64">
//         <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
//           <div className="flex h-20 items-center justify-between px-5 sm:px-8">
//             <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 lg:hidden">
//               <Menu size={19} />
//             </button>

//             <div className="hidden lg:block">
//               <p className="text-xs font-semibold text-slate-400">
//                 Doctor Portal
//               </p>

//               <h1 className="mt-1 text-lg font-bold text-slate-900">
//                 Dashboard
//               </h1>
//             </div>

//             <div className="ml-auto flex items-center gap-3">
//               <button className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-[#32838c] hover:text-[#32838c]">
//                 <Bell size={18} />

//                 <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#32838c]" />
//               </button>

//               <div className="hidden h-8 w-px bg-slate-200 sm:block" />

//               <div className="flex items-center gap-3">
//                 <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#32838c] text-xs font-bold text-white">
//                   {getInitials(doctor.fullName)}
//                 </div>

//                 <div className="hidden sm:block">
//                   <p className="max-w-[150px] truncate text-xs font-bold text-slate-800">
//                     {doctor.fullName}
//                   </p>

//                   <p className="mt-0.5 text-[10px] text-slate-400">Doctor</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         <main className="p-5 sm:p-8">
//           <div className="mx-auto max-w-7xl">
//             <div className="mb-8">
//               <p className="text-sm text-slate-500">Good to see you,</p>

//               <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
//                 Dr. {doctor.fullName}
//               </h2>

//               <div className="mt-2 flex flex-wrap items-center gap-2">
//                 {doctor.specialization && (
//                   <span className="rounded-full bg-[#32838c]/10 px-3 py-1 text-[11px] font-semibold text-[#32838c]">
//                     {doctor.specialization}
//                   </span>
//                 )}

//                 <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-600">
//                   Verified
//                 </span>
//               </div>
//             </div>

//             <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//               <StatCard
//                 icon={CalendarDays}
//                 label="Today's Appointments"
//                 value="8"
//                 change="+12%"
//               />

//               <StatCard
//                 icon={Users}
//                 label="Total Patients"
//                 value="124"
//                 change="+8%"
//               />

//               <StatCard
//                 icon={Clock3}
//                 label="Pending Appointments"
//                 value="12"
//                 change="+4%"
//               />

//               <StatCard
//                 icon={IndianRupee}
//                 label="This Month"
//                 value="₹48,750"
//                 change="+15%"
//               />
//             </div>

//             <div className="mt-8 grid gap-6 xl:grid-cols-3">
//               <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white xl:col-span-2">
//                 <div className="flex items-center justify-between border-b border-slate-100 p-5">
//                   <div>
//                     <h3 className="text-sm font-bold text-slate-900">
//                       Today's Appointments
//                     </h3>

//                     <p className="mt-1 text-xs text-slate-400">
//                       Your upcoming patient appointments
//                     </p>
//                   </div>

//                   <button className="inline-flex items-center gap-1 text-xs font-bold text-[#32838c] hover:underline">
//                     View All
//                     <ChevronRight size={14} />
//                   </button>
//                 </div>

//                 <div className="divide-y divide-slate-100">
//                   <AppointmentRow
//                     time="09:00 AM"
//                     patient="Rahul Kumar"
//                     type="Physiotherapy"
//                     status="Confirmed"
//                   />

//                   <AppointmentRow
//                     time="10:30 AM"
//                     patient="Priya Sharma"
//                     type="Follow-up"
//                     status="Confirmed"
//                   />

//                   <AppointmentRow
//                     time="12:00 PM"
//                     patient="Amit Das"
//                     type="Consultation"
//                     status="Pending"
//                   />

//                   <AppointmentRow
//                     time="03:30 PM"
//                     patient="Sneha Patnaik"
//                     type="Physiotherapy"
//                     status="Confirmed"
//                   />
//                 </div>
//               </div>

//               <div className="rounded-2xl border border-slate-200 bg-white p-5">
//                 <h3 className="text-sm font-bold text-slate-900">
//                   Quick Actions
//                 </h3>

//                 <p className="mt-1 text-xs text-slate-400">
//                   Frequently used tools
//                 </p>

//                 <div className="mt-5 space-y-3">
//                   <QuickAction
//                     icon={CalendarDays}
//                     title="Manage Appointments"
//                   />

//                   <QuickAction icon={Users} title="View Patients" />

//                   <QuickAction icon={FileText} title="Create Prescription" />

//                   <QuickAction icon={UserCircle} title="Update Profile" />
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
//               <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#32838c]/10 text-[#32838c]">
//                     <Stethoscope size={25} />
//                   </div>

//                   <div>
//                     <h3 className="text-sm font-bold text-slate-900">
//                       Professional Profile
//                     </h3>

//                     <p className="mt-1 text-xs text-slate-500">
//                       {doctor.qualification || "Professional"}
//                       {doctor.experience
//                         ? ` • ${doctor.experience} years experience`
//                         : ""}
//                     </p>

//                     {doctor.clinicName && (
//                       <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
//                         <Building2 size={12} />
//                         {doctor.clinicName}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:border-[#32838c] hover:text-[#32838c]">
//                   Edit Profile
//                   <ArrowUpRight size={14} />
//                 </button>
//               </div>
//             </div>

//             <div className="mt-6 grid gap-4 sm:grid-cols-2">
//               <div className="rounded-xl border border-slate-200 bg-white p-4">
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#32838c]/10 text-[#32838c]">
//                     <Phone size={17} />
//                   </div>

//                   <div>
//                     <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
//                       Phone
//                     </p>

//                     <p className="mt-1 text-xs font-bold text-slate-700">
//                       {doctor.phone || "Not provided"}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="rounded-xl border border-slate-200 bg-white p-4">
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#32838c]/10 text-[#32838c]">
//                     <CheckCircle2 size={17} />
//                   </div>

//                   <div>
//                     <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
//                       Registration
//                     </p>

//                     <p className="mt-1 text-xs font-bold text-slate-700">
//                       {doctor.registrationNumber || "Not provided"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ icon: Icon, label, value, change }) => {
//   return (
//     <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
//       <div className="flex items-start justify-between">
//         <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#32838c]/10 text-[#32838c]">
//           <Icon size={19} />
//         </div>

//         <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
//           {change}
//         </span>
//       </div>

//       <p className="mt-5 text-xs font-medium text-slate-400">{label}</p>

//       <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
//         {value}
//       </p>
//     </div>
//   );
// };

// const SidebarItem = ({ icon: Icon, label, active = false, onClick }) => {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
//         active
//           ? "bg-[#32838c] text-white"
//           : "text-slate-400 hover:bg-white/5 hover:text-white"
//       }`}
//     >
//       <Icon size={17} />
//       {label}
//     </button>
//   );
// };

// const AppointmentRow = ({ time, patient, type, status }) => {
//   return (
//     <div className="flex items-center gap-4 p-4 transition hover:bg-slate-50">
//       <div className="w-20 shrink-0">
//         <p className="text-xs font-bold text-slate-800">{time}</p>
//       </div>

//       <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#32838c]/10 text-[#32838c]">
//         <UserCircle size={17} />
//       </div>

//       <div className="min-w-0 flex-1">
//         <p className="truncate text-xs font-bold text-slate-800">{patient}</p>

//         <p className="mt-1 truncate text-[10px] text-slate-400">{type}</p>
//       </div>

//       <span
//         className={`hidden rounded-full px-2.5 py-1 text-[10px] font-bold sm:block ${
//           status === "Confirmed"
//             ? "bg-emerald-50 text-emerald-600"
//             : "bg-amber-50 text-amber-600"
//         }`}
//       >
//         {status}
//       </span>

//       <ChevronRight size={15} className="text-slate-300" />
//     </div>
//   );
// };

// const QuickAction = ({ icon: Icon, title }) => {
//   return (
//     <button className="group flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-left transition hover:border-[#32838c]/20 hover:bg-[#32838c]/5">
//       <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#32838c] shadow-sm">
//         <Icon size={17} />
//       </div>

//       <span className="flex-1 text-xs font-bold text-slate-700">{title}</span>

//       <ArrowUpRight
//         size={15}
//         className="text-slate-300 transition group-hover:text-[#32838c]"
//       />
//     </button>
//   );
// };

// const getInitials = (name = "") => {
//   return name
//     .split(" ")
//     .filter(Boolean)
//     .slice(0, 2)
//     .map((word) => word[0]?.toUpperCase())
//     .join("");
// };

// export default DoctorDashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  ChevronRight,
  Menu,
  Phone,
  Building2,
  FileCheck,
  Mail,
  MapPin,
  GraduationCap,
  BadgeCheck,
  XCircle,
  Send,
} from "lucide-react";

import DashboardSkeleton from "../../components/skeletons/DashboardSkeleton";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDoctor = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:8000/api/v1/pattner/finddoctor",
        {
          method: "GET",
          credentials: "include",
        },
      );

      const resp = await response.json();

      console.log("DOCTOR DATA:", resp);

      if (!response.ok) {
        setError(resp?.message || "Unable to fetch doctor data");
        return;
      }

      const doctorData = resp?.data?.doctor || resp?.doctor;

      if (!doctorData) {
        setError("Doctor data not found");
        return;
      }

      setDoctor(doctorData);
    } catch (error) {
      console.log("DOCTOR FETCH ERROR:", error);
      setError("Something went wrong while fetching doctor data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

  const handleLogout = () => {
    navigate("/doctor/login");
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  const getValue = (value) => {
    if (value === null || value === undefined || String(value).trim() === "") {
      return "Not provided";
    }

    return value;
  };

  const getVerificationStatus = () => {
    const status = doctor?.verificationStatus;

    if (!status) {
      return {
        label: "Not provided",
        className: "bg-slate-100 text-slate-600",
        icon: FileCheck,
      };
    }

    const normalizedStatus = String(status).toLowerCase().trim();

    if (
      normalizedStatus === "approved" ||
      normalizedStatus === "approve" ||
      normalizedStatus === "verified"
    ) {
      return {
        label: "Approved",
        className: "bg-emerald-50 text-emerald-700",
        icon: BadgeCheck,
      };
    }

    if (normalizedStatus === "rejected" || normalizedStatus === "reject") {
      return {
        label: "Rejected",
        className: "bg-red-50 text-red-700",
        icon: XCircle,
      };
    }

    if (
      normalizedStatus === "submitted" ||
      normalizedStatus === "submit" ||
      normalizedStatus === "submint"
    ) {
      return {
        label: "Submitted",
        className: "bg-blue-50 text-blue-700",
        icon: Send,
      };
    }

    if (normalizedStatus === "pending") {
      return {
        label: "Pending",
        className: "bg-amber-50 text-amber-700",
        icon: Clock3,
      };
    }

    return {
      label: status,
      className: "bg-slate-100 text-slate-600",
      icon: FileCheck,
    };
  };

  const verification = getVerificationStatus();
  const VerificationIcon = verification.icon;

  const doctorName = getValue(doctor?.fullName);
  const initials =
    doctorName !== "Not provided"
      ? doctorName
          .split(" ")
          .filter(Boolean)
          .slice(0, 2)
          .map((word) => word[0]?.toUpperCase())
          .join("")
      : "DR";

  const location = [doctor?.city, doctor?.state]
    .filter(
      (value) =>
        value !== null && value !== undefined && String(value).trim() !== "",
    )
    .join(", ");

  const address = [doctor?.address, location, doctor?.pincode]
    .filter(
      (value) =>
        value !== null && value !== undefined && String(value).trim() !== "",
    )
    .join(", ");

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-800 bg-[#081f29] lg:block">
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
                LiBi <span className="text-cyan-400">Motion Care</span>
              </p>

              <p className="mt-0.5 text-[10px] text-slate-400">Doctor Portal</p>
            </div>
          </div>
        </div>

        <div className="border-b border-white/10 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#32838c] text-sm font-bold text-white">
              {initials}
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-white">
                {doctorName}
              </p>

              <p className="mt-1 truncate text-[10px] text-slate-400">
                {getValue(doctor?.specialization)}
              </p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Workspace
          </p>

          <SidebarItem icon={Stethoscope} label="Dashboard" active />

          <SidebarItem icon={CalendarDays} label="Appointments" />

          <SidebarItem icon={Users} label="Patients" />

          <SidebarItem
            icon={FileCheck}
            label="Document Verification"
            onClick={() => navigate("/doctor/documents")}
          />

          <p className="mb-3 mt-8 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Account
          </p>

          <SidebarItem icon={Bell} label="Notifications" />

          <SidebarItem icon={UserCircle} label="Profile" />

          <SidebarItem icon={Settings} label="Settings" />
        </nav>

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

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex h-20 items-center justify-between px-5 sm:px-8">
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 lg:hidden">
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

            <div className="ml-auto flex items-center gap-3">
              <button className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-[#32838c] hover:text-[#32838c]">
                <Bell size={18} />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#32838c]" />
              </button>

              <div className="hidden h-8 w-px bg-slate-200 sm:block" />

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#32838c] text-xs font-bold text-white">
                  {initials}
                </div>

                <div className="hidden sm:block">
                  <p className="max-w-[150px] truncate text-xs font-bold text-slate-800">
                    {doctorName}
                  </p>

                  <p className="mt-0.5 text-[10px] text-slate-400">Doctor</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-5 sm:p-8">
          <div className="mx-auto max-w-7xl">
            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4">
                <p className="text-sm font-semibold text-red-700">{error}</p>
              </div>
            )}

            <div className="overflow-hidden rounded-3xl bg-[#32838c] p-6 text-white shadow-sm sm:p-8">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                    <Stethoscope size={18} />
                    Welcome back
                  </div>

                  <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                    Dr. {doctorName}
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
                    Manage your professional profile, appointments, patients and
                    verification status from your doctor portal.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${verification.className}`}
                    >
                      <VerificationIcon size={15} />
                      {verification.label.toUpperCase()}
                    </span>

                    {doctor?.specialization && (
                      <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white">
                        {doctor.specialization}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex h-32 w-32 shrink-0 items-center justify-center self-center rounded-full border border-white/20 bg-white/10 lg:self-auto">
                  <Stethoscope size={58} />
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <InfoCard
                icon={UserCircle}
                label="Full Name"
                value={getValue(doctor?.fullName)}
              />

              <InfoCard
                icon={Mail}
                label="Email"
                value={getValue(doctor?.email)}
              />

              <InfoCard
                icon={Phone}
                label="Phone"
                value={getValue(doctor?.phone)}
              />

              <InfoCard
                icon={BadgeCheck}
                label="Verification"
                value={verification.label}
                statusClass={verification.className}
              />
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-3">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white xl:col-span-2">
                <div className="border-b border-slate-100 p-5">
                  <h3 className="text-lg font-bold text-slate-900">
                    Professional Profile
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Your registered professional information
                  </p>
                </div>

                <div className="grid gap-5 p-5 sm:grid-cols-2">
                  <ProfileItem
                    icon={GraduationCap}
                    label="Qualification"
                    value={getValue(doctor?.qualification)}
                  />

                  <ProfileItem
                    icon={Stethoscope}
                    label="Specialization"
                    value={getValue(doctor?.specialization)}
                  />

                  <ProfileItem
                    icon={Clock3}
                    label="Experience"
                    value={
                      doctor?.experience !== null &&
                      doctor?.experience !== undefined &&
                      String(doctor?.experience).trim() !== ""
                        ? `${doctor.experience} years`
                        : "Not provided"
                    }
                  />

                  <ProfileItem
                    icon={Building2}
                    label="Clinic"
                    value={getValue(doctor?.clinicName)}
                  />

                  <ProfileItem
                    icon={FileCheck}
                    label="Registration Number"
                    value={getValue(doctor?.registrationNumber)}
                  />

                  <ProfileItem
                    icon={MapPin}
                    label="Location"
                    value={address || "Not provided"}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-bold text-slate-900">
                  Verification Status
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Current document verification status
                </p>

                <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${verification.className}`}
                    >
                      <VerificationIcon size={24} />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Status
                      </p>

                      <p className="mt-1 text-lg font-extrabold text-slate-900">
                        {verification.label}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-slate-200 pt-4">
                    <p className="text-xs leading-5 text-slate-500">
                      Your current document verification status is shown here
                      using the information saved in your account.
                    </p>
                  </div>

                  <button
                    onClick={() => navigate("/doctor/documents")}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#32838c] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#286f77]"
                  >
                    View Documents
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Quick Actions
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Frequently used doctor actions
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <QuickAction icon={CalendarDays} title="Appointments" />

                  <QuickAction icon={Users} title="Patients" />

                  <QuickAction
                    icon={FileCheck}
                    title="Documents"
                    onClick={() => navigate("/doctor/documents")}
                  />

                  <QuickAction icon={UserCircle} title="Profile" />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Account Information
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Your registered doctor account information
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#32838c]/10 text-[#32838c]">
                    <UserCircle size={20} />
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <AccountRow
                    icon={UserCircle}
                    label="Name"
                    value={getValue(doctor?.fullName)}
                  />

                  <AccountRow
                    icon={Mail}
                    label="Email"
                    value={getValue(doctor?.email)}
                  />

                  <AccountRow
                    icon={Phone}
                    label="Phone"
                    value={getValue(doctor?.phone)}
                  />

                  <AccountRow
                    icon={Building2}
                    label="Clinic"
                    value={getValue(doctor?.clinicName)}
                  />
                </div>
              </div>
            </div>

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
                      {getValue(doctor?.qualification)}
                      {doctor?.experience !== null &&
                      doctor?.experience !== undefined &&
                      String(doctor?.experience).trim() !== ""
                        ? ` • ${doctor.experience} years experience`
                        : ""}
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                      <Building2 size={12} />
                      {getValue(doctor?.clinicName)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/doctor/documents")}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:border-[#32838c] hover:text-[#32838c]"
                >
                  Document Verification
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const InfoCard = ({ icon: Icon, label, value, statusClass }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#32838c]/10 text-[#32838c]">
          <Icon size={20} />
        </div>

        {label === "Verification" && (
          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusClass}`}
          >
            STATUS
          </span>
        )}
      </div>

      <p className="mt-5 text-xs font-medium text-slate-400">{label}</p>

      <p className="mt-1 truncate text-lg font-extrabold tracking-tight text-slate-900">
        {value}
      </p>
    </div>
  );
};

const ProfileItem = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#32838c] shadow-sm">
        <Icon size={18} />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-bold text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
};

const AccountRow = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#32838c]/10 text-[#32838c]">
        <Icon size={17} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="mt-1 truncate text-xs font-bold text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, active = false, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
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

const QuickAction = ({ icon: Icon, title, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-left transition hover:border-[#32838c]/20 hover:bg-[#32838c]/5"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#32838c] shadow-sm">
        <Icon size={17} />
      </div>

      <span className="flex-1 text-xs font-bold text-slate-700">{title}</span>

      <ArrowUpRight
        size={15}
        className="text-slate-300 transition group-hover:text-[#32838c]"
      />
    </button>
  );
};

export default DoctorDashboard;
