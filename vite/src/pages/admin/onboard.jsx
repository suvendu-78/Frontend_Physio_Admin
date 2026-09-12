// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Search,
//   Plus,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
//   UserRound,
//   Building2,
//   CalendarDays,
//   UsersRound,
//   Stethoscope,
//   Bell,
//   LogOut,
//   LayoutDashboard,
//   MessageSquare,
//   CreditCard,
//   HeartPulse,
// } from "lucide-react";

// const providers = [
//   {
//     id: 1,
//     name: "Dr. Rahul Sharma",
//     subtitle: "Orthopedic Specialist",
//     email: "rahul.sharma@gmail.com",
//     phone: "9876543210",
//     type: "Doctor",
//     status: "Active",
//     date: "10 Sep 2026",
//   },
//   {
//     id: 2,
//     name: "City Care Clinic",
//     subtitle: "Multi-Speciality Clinic",
//     email: "care@cityclinic.com",
//     phone: "9876543211",
//     type: "Clinic",
//     status: "Active",
//     date: "08 Sep 2026",
//   },
//   {
//     id: 3,
//     name: "Dr. Priya Mehta",
//     subtitle: "Physiotherapist",
//     email: "priya.mehta@gmail.com",
//     phone: "9876543212",
//     type: "Doctor",
//     status: "Pending",
//     date: "07 Sep 2026",
//   },
// ];

// export default function Onboard() {
//   const navigate = useNavigate();

//   const [search, setSearch] = useState("");
//   const [typeFilter, setTypeFilter] = useState("All");
//   const [statusFilter, setStatusFilter] = useState("All Status");

//   const filteredData = providers.filter((item) => {
//     const searchText = search.toLowerCase();

//     const matchesSearch =
//       item.name.toLowerCase().includes(searchText) ||
//       item.email.toLowerCase().includes(searchText) ||
//       item.phone.includes(searchText);

//     const matchesType = typeFilter === "All" || item.type === typeFilter;

//     const matchesStatus =
//       statusFilter === "All Status" || item.status === statusFilter;

//     return matchesSearch && matchesType && matchesStatus;
//   });

//   return (
//     <div className="min-h-screen bg-[#f7f9fc] text-[#14263d]">
//       <div className="flex min-h-screen">
//         {/* Sidebar */}
//         <aside className="fixed left-0 top-0 flex h-screen w-[280px] flex-col bg-[#081b2b] text-white">
//           {/* Logo */}
//           <div className="flex h-[88px] items-center gap-3 border-b border-white/10 px-7">
//             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#51bdf5]">
//               <HeartPulse size={27} />
//             </div>

//             <div>
//               <h2 className="text-[20px] font-bold">
//                 LiBi <span className="text-[#09c4e8]">Motion Care</span>
//               </h2>

//               <p className="mt-1 text-sm text-[#91a4b9]">Admin Portal</p>
//             </div>
//           </div>

//           {/* Sidebar Navigation */}
//           <div className="flex-1 overflow-y-auto px-4 py-6">
//             <p className="mb-3 px-3 text-[11px] font-semibold tracking-[2px] text-[#66809a]">
//               MAIN
//             </p>

//             <SidebarItem
//               icon={<LayoutDashboard size={20} />}
//               text="Dashboard"
//               onClick={() => navigate("/admin")}
//             />

//             <p className="mb-3 mt-7 px-3 text-[11px] font-semibold tracking-[2px] text-[#66809a]">
//               MANAGEMENT
//             </p>

//             <SidebarItem
//               icon={<CalendarDays size={20} />}
//               text="Appointments"
//             />

//             <SidebarItem icon={<UsersRound size={20} />} text="Patients" />

//             <SidebarItem icon={<UserRound size={20} />} text="Therapists" />

//             <SidebarItem icon={<Building2 size={20} />} text="Clinics" />

//             <SidebarItem icon={<Stethoscope size={20} />} text="Services" />

//             <p className="mb-3 mt-7 px-3 text-[11px] font-semibold tracking-[2px] text-[#66809a]">
//               COMMUNICATION
//             </p>

//             <SidebarItem icon={<MessageSquare size={20} />} text="Enquiries" />

//             <SidebarItem icon={<Bell size={20} />} text="Notifications" />

//             <p className="mb-3 mt-7 px-3 text-[11px] font-semibold tracking-[2px] text-[#66809a]">
//               FINANCE
//             </p>

//             <SidebarItem icon={<CreditCard size={20} />} text="Payments" />
//           </div>

//           {/* Logout */}
//           <div className="border-t border-white/10 p-4">
//             <SidebarItem icon={<LogOut size={20} />} text="Logout" />
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="ml-[280px] w-[calc(100%-280px)]">
//           {/* Top Header */}
//           <header className="flex h-[88px] items-center justify-between border-b border-[#e5eaf0] bg-white px-9">
//             <div className="relative w-[565px]">
//               <Search
//                 size={21}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8ea0b5]"
//               />

//               <input
//                 type="text"
//                 placeholder="Search patients, appointments..."
//                 className="h-12 w-full rounded-xl border border-[#dce5ee] bg-[#f8fafc] pl-12 pr-5 text-[15px] outline-none focus:border-[#0db3c0]"
//               />
//             </div>

//             <div className="flex items-center gap-5">
//               <button className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-[#e0e7ef] bg-white">
//                 <Bell size={21} className="text-[#40566f]" />

//                 <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#ff6b00]" />
//               </button>

//               <div className="flex items-center gap-3">
//                 <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d7f8f3] font-semibold text-[#129e9d]">
//                   A
//                 </div>

//                 <div>
//                   <p className="font-semibold">Admin</p>

//                   <p className="text-sm text-[#71839a]">Administrator</p>
//                 </div>

//                 <ChevronRight size={18} className="rotate-90 text-[#8191a5]" />
//               </div>
//             </div>
//           </header>

//           {/* Page Content */}
//           <section className="p-9">
//             {/* Page Heading */}
//             <div className="mb-6 flex items-center justify-between">
//               <div>
//                 <h1 className="text-[32px] font-bold tracking-tight">
//                   Doctors & Clinics
//                 </h1>

//                 <p className="mt-1 text-[16px] text-[#647891]">
//                   Manage registered doctors and clinics
//                 </p>
//               </div>

//               <button className="flex items-center gap-2 rounded-xl bg-[#0aaab8] px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-[#0797a4]">
//                 <Plus size={21} />
//                 Add New
//               </button>
//             </div>

//             {/* Filters */}
//             <div className="mb-5 flex items-center justify-between rounded-2xl border border-[#e2e8ef] bg-white p-5 shadow-sm">
//               {/* Search */}
//               <div className="relative w-[530px]">
//                 <Search
//                   size={20}
//                   className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8da0b6]"
//                 />

//                 <input
//                   type="text"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   placeholder="Search by name, email, phone..."
//                   className="h-12 w-full rounded-xl border border-[#dfe7ef] bg-[#fafbfd] pl-12 pr-4 text-[15px] outline-none focus:border-[#0aaab8]"
//                 />
//               </div>

//               {/* Type Filters */}
//               <div className="flex items-center gap-2">
//                 {["All", "Doctor", "Clinic"].map((type) => (
//                   <button
//                     key={type}
//                     onClick={() => setTypeFilter(type)}
//                     className={`rounded-xl px-6 py-3 text-sm font-semibold transition ${
//                       typeFilter === type
//                         ? "bg-[#0aaab8] text-white shadow-sm"
//                         : "border border-[#e3e9f0] bg-[#fafbfd] text-[#63758b] hover:bg-[#f2f7f9]"
//                     }`}
//                   >
//                     {type === "All"
//                       ? "All"
//                       : type === "Doctor"
//                         ? "Doctors"
//                         : "Clinics"}
//                   </button>
//                 ))}

//                 {/* Status */}
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="ml-3 h-12 rounded-xl border border-[#dfe7ef] bg-white px-5 text-sm font-medium text-[#60738b] outline-none"
//                 >
//                   <option>All Status</option>
//                   <option>Active</option>
//                   <option>Pending</option>
//                   <option>Inactive</option>
//                 </select>
//               </div>
//             </div>

//             {/* Table */}
//             <div className="overflow-hidden rounded-2xl border border-[#e0e7ef] bg-white shadow-sm">
//               <div className="overflow-x-auto">
//                 <table className="w-full min-w-[1150px]">
//                   {/* Table Header */}
//                   <thead>
//                     <tr className="border-b border-[#e5eaf0] bg-[#fafbfd]">
//                       <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
//                         #
//                       </th>

//                       <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
//                         Name
//                       </th>

//                       <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
//                         Email
//                       </th>

//                       <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
//                         Phone
//                       </th>

//                       <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
//                         Type
//                       </th>

//                       <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
//                         Status
//                       </th>

//                       <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
//                         Joined On
//                       </th>

//                       <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-[#667991]">
//                         Action
//                       </th>
//                     </tr>
//                   </thead>

//                   {/* Table Body */}
//                   <tbody>
//                     {filteredData.map((item, index) => (
//                       <tr
//                         key={item.id}
//                         className="border-b border-[#edf1f5] transition last:border-0 hover:bg-[#fbfdfe]"
//                       >
//                         {/* Number */}
//                         <td className="px-5 py-4 text-sm text-[#4e637d]">
//                           {index + 1}
//                         </td>

//                         {/* Name */}
//                         <td className="px-5 py-4">
//                           <div className="flex items-center gap-3">
//                             <div
//                               className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
//                                 item.type === "Doctor"
//                                   ? "bg-[#e8f4ff] text-[#1874d1]"
//                                   : "bg-[#f0e9ff] text-[#7441ce]"
//                               }`}
//                             >
//                               {item.type === "Doctor" ? (
//                                 <UserRound size={21} />
//                               ) : (
//                                 <Building2 size={21} />
//                               )}
//                             </div>

//                             <div>
//                               <p className="whitespace-nowrap font-semibold text-[#182b42]">
//                                 {item.name}
//                               </p>

//                               <p className="mt-0.5 whitespace-nowrap text-sm text-[#7b8da3]">
//                                 {item.subtitle}
//                               </p>
//                             </div>
//                           </div>
//                         </td>

//                         {/* Email */}
//                         <td className="px-5 py-4 text-sm text-[#5c718b]">
//                           {item.email}
//                         </td>

//                         {/* Phone */}
//                         <td className="px-5 py-4 text-sm text-[#5c718b]">
//                           {item.phone}
//                         </td>

//                         {/* Type */}
//                         <td className="px-5 py-4">
//                           <span
//                             className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold ${
//                               item.type === "Doctor"
//                                 ? "bg-[#e9f3ff] text-[#2372c8]"
//                                 : "bg-[#f0eaff] text-[#7041c9]"
//                             }`}
//                           >
//                             {item.type === "Doctor" ? (
//                               <UserRound size={16} />
//                             ) : (
//                               <Building2 size={16} />
//                             )}

//                             {item.type}
//                           </span>
//                         </td>

//                         {/* Status */}
//                         <td className="px-5 py-4">
//                           <span
//                             className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold ${
//                               item.status === "Active"
//                                 ? "bg-[#e2f8ee] text-[#099660]"
//                                 : item.status === "Pending"
//                                   ? "bg-[#fff4da] text-[#df9700]"
//                                   : "bg-[#ffe8e8] text-[#e43c3c]"
//                             }`}
//                           >
//                             <span
//                               className={`h-2 w-2 rounded-full ${
//                                 item.status === "Active"
//                                   ? "bg-[#0ca36a]"
//                                   : item.status === "Pending"
//                                     ? "bg-[#f2a500]"
//                                     : "bg-[#e53939]"
//                               }`}
//                             />

//                             {item.status}
//                           </span>
//                         </td>

//                         {/* Date */}
//                         <td className="whitespace-nowrap px-5 py-4 text-sm text-[#60748d]">
//                           {item.date}
//                         </td>

//                         {/* View */}
//                         <td className="px-5 py-4 text-right">
//                           <button
//                             onClick={() => navigate("/providerDetails")}
//                             // onClick={() =>
//                             //   navigate(`/admin/providers/${item.id}`)
//                             // }
//                             className="inline-flex items-center gap-2 rounded-xl border border-[#d5e0ea] px-5 py-2.5 text-sm font-semibold text-[#49627d] transition hover:border-[#0aaab8] hover:text-[#0aaab8]"
//                           >
//                             <Eye size={18} />
//                             View
//                           </button>
//                         </td>
//                       </tr>
//                     ))}

//                     {/* Empty State */}
//                     {filteredData.length === 0 && (
//                       <tr>
//                         <td
//                           colSpan="8"
//                           className="px-5 py-12 text-center text-[#71839a]"
//                         >
//                           No doctors or clinics found.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Pagination */}
//               <div className="flex items-center justify-between border-t border-[#e5eaf0] px-5 py-4">
//                 <p className="text-sm text-[#647891]">
//                   Showing{" "}
//                   <span className="font-semibold">
//                     {filteredData.length > 0 ? 1 : 0}
//                   </span>{" "}
//                   to{" "}
//                   <span className="font-semibold">{filteredData.length}</span>{" "}
//                   of{" "}
//                   <span className="font-semibold">{filteredData.length}</span>{" "}
//                   entries
//                 </p>

//                 <div className="flex items-center gap-2">
//                   <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dfe6ee] text-[#8b9bae]">
//                     <ChevronLeft size={18} />
//                   </button>

//                   <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0aaab8] font-semibold text-white">
//                     1
//                   </button>

//                   <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dfe6ee] text-[#8b9bae]">
//                     <ChevronRight size={18} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// }

// function SidebarItem({ icon, text, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`mb-1 flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition ${
//         text === "Dashboard"
//           ? "bg-[#0b4054] text-[#10d0e2]"
//           : "text-[#d6e0eb] hover:bg-[#102c40]"
//       }`}
//     >
//       {icon}

//       <span className="text-[15px] font-medium">{text}</span>
//     </button>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Eye,
  ChevronLeft,
  ChevronRight,
  UserRound,
  Building2,
} from "lucide-react";

const providers = [
  {
    id: 1,
    name: "Dr. Rahul Sharma",
    subtitle: "Orthopedic Specialist",
    email: "rahul.sharma@gmail.com",
    phone: "9876543210",
    type: "Doctor",
    status: "Active",
    date: "10 Sep 2026",
  },
  {
    id: 2,
    name: "City Care Clinic",
    subtitle: "Multi-Speciality Clinic",
    email: "care@cityclinic.com",
    phone: "9876543211",
    type: "Clinic",
    status: "Active",
    date: "08 Sep 2026",
  },
  {
    id: 3,
    name: "Dr. Priya Mehta",
    subtitle: "Physiotherapist",
    email: "priya.mehta@gmail.com",
    phone: "9876543212",
    type: "Doctor",
    status: "Pending",
    date: "07 Sep 2026",
  },
];

export default function Onboard() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const filteredData = providers.filter((item) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      item.name.toLowerCase().includes(searchText) ||
      item.email.toLowerCase().includes(searchText) ||
      item.phone.includes(searchText);

    const matchesType = typeFilter === "All" || item.type === typeFilter;

    const matchesStatus =
      statusFilter === "All Status" || item.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#14263d]">
      <section className="p-9">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-[32px] font-bold tracking-tight">
              Doctors & Clinics
            </h1>

            <p className="mt-1 text-[16px] text-[#647891]">
              Manage registered doctors and clinics
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-[#0aaab8] px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-[#0797a4]">
            <Plus size={21} />
            Add New
          </button>
        </div>

        <div className="mb-5 flex items-center justify-between rounded-2xl border border-[#e2e8ef] bg-white p-5 shadow-sm">
          <div className="relative w-[530px]">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8da0b6]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, phone..."
              className="h-12 w-full rounded-xl border border-[#dfe7ef] bg-[#fafbfd] pl-12 pr-4 text-[15px] outline-none focus:border-[#0aaab8]"
            />
          </div>

          <div className="flex items-center gap-2">
            {["All", "Doctor", "Clinic"].map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`rounded-xl px-6 py-3 text-sm font-semibold transition ${
                  typeFilter === type
                    ? "bg-[#0aaab8] text-white shadow-sm"
                    : "border border-[#e3e9f0] bg-[#fafbfd] text-[#63758b] hover:bg-[#f2f7f9]"
                }`}
              >
                {type === "All"
                  ? "All"
                  : type === "Doctor"
                    ? "Doctors"
                    : "Clinics"}
              </button>
            ))}

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="ml-3 h-12 rounded-xl border border-[#dfe7ef] bg-white px-5 text-sm font-medium text-[#60738b] outline-none"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#e0e7ef] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1150px]">
              <thead>
                <tr className="border-b border-[#e5eaf0] bg-[#fafbfd]">
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
                    #
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
                    Name
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
                    Email
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
                    Phone
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
                    Type
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
                    Joined On
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-[#667991]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#edf1f5] transition last:border-0 hover:bg-[#fbfdfe]"
                  >
                    <td className="px-5 py-4 text-sm text-[#4e637d]">
                      {index + 1}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                            item.type === "Doctor"
                              ? "bg-[#e8f4ff] text-[#1874d1]"
                              : "bg-[#f0e9ff] text-[#7441ce]"
                          }`}
                        >
                          {item.type === "Doctor" ? (
                            <UserRound size={21} />
                          ) : (
                            <Building2 size={21} />
                          )}
                        </div>

                        <div>
                          <p className="whitespace-nowrap font-semibold text-[#182b42]">
                            {item.name}
                          </p>

                          <p className="mt-0.5 whitespace-nowrap text-sm text-[#7b8da3]">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-[#5c718b]">
                      {item.email}
                    </td>

                    <td className="px-5 py-4 text-sm text-[#5c718b]">
                      {item.phone}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold ${
                          item.type === "Doctor"
                            ? "bg-[#e9f3ff] text-[#2372c8]"
                            : "bg-[#f0eaff] text-[#7041c9]"
                        }`}
                      >
                        {item.type === "Doctor" ? (
                          <UserRound size={16} />
                        ) : (
                          <Building2 size={16} />
                        )}

                        {item.type}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold ${
                          item.status === "Active"
                            ? "bg-[#e2f8ee] text-[#099660]"
                            : item.status === "Pending"
                              ? "bg-[#fff4da] text-[#df9700]"
                              : "bg-[#ffe8e8] text-[#e43c3c]"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            item.status === "Active"
                              ? "bg-[#0ca36a]"
                              : item.status === "Pending"
                                ? "bg-[#f2a500]"
                                : "bg-[#e53939]"
                          }`}
                        />

                        {item.status}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-[#60748d]">
                      {item.date}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => navigate("/providerDetails")}
                        className="inline-flex items-center gap-2 rounded-xl border border-[#d5e0ea] px-5 py-2.5 text-sm font-semibold text-[#49627d] transition hover:border-[#0aaab8] hover:text-[#0aaab8]"
                      >
                        <Eye size={18} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredData.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-5 py-12 text-center text-[#71839a]"
                    >
                      No doctors or clinics found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-[#e5eaf0] px-5 py-4">
            <p className="text-sm text-[#647891]">
              Showing{" "}
              <span className="font-semibold">
                {filteredData.length > 0 ? 1 : 0}
              </span>{" "}
              to <span className="font-semibold">{filteredData.length}</span> of{" "}
              <span className="font-semibold">{filteredData.length}</span>{" "}
              entries
            </p>

            <div className="flex items-center gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dfe6ee] text-[#8b9bae]">
                <ChevronLeft size={18} />
              </button>

              <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0aaab8] font-semibold text-white">
                1
              </button>

              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dfe6ee] text-[#8b9bae]">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
