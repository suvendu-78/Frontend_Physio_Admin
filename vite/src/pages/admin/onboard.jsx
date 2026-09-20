// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   Search,
// //   Plus,
// //   Eye,
// //   ChevronLeft,
// //   ChevronRight,
// //   UserRound,
// // } from "lucide-react";

// // export default function Onboard() {
// //   const navigate = useNavigate();

// //   const [providers, setProviders] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [typeFilter, setTypeFilter] = useState("All");
// //   const [statusFilter, setStatusFilter] = useState("All Status");

// //   const [clinicData, setClinicData] = useState([]);

// //   const Info = async () => {
// //     try {
// //       const resp = await fetch(
// //         "http://localhost:8000/api/v1/onboard/clinicpendingData",
// //       );

// //       const rep = await resp.json();

// //       console.log("clinic data", rep);

// //       if (rep.success) {
// //         setClinicData(Array.isArray(rep.data) ? rep.data : [rep.data]);
// //       } else {
// //         setClinicData([]);
// //       }
// //     } catch (error) {
// //       console.log("Clinic fetch error:", error);
// //     }
// //   };

// //   console.log(clinicData);
// //   useEffect(() => {
// //     Info();
// //   }, []);
// //   const Data = async () => {
// //     try {
// //       const response = await fetch(
// //         "http://localhost:8000/api/v1/onboard/getPendingDoctors",
// //       );

// //       const info = await response.json();

// //       console.log("Doctor Data:", info);

// //       if (info.success) {
// //         const doctors = Array.isArray(info.data) ? info.data : [info.data];

// //         const doctorData = doctors.map((item) => ({
// //           id: item._id,
// //           name: item.fullName || item.name || "N/A",
// //           subtitle:
// //             item.specialization ||
// //             item.speciality ||
// //             item.qualification ||
// //             "Doctor",
// //           email: item.email || "N/A",
// //           phone: item.phone || "N/A",
// //           type: "Doctor",
// //           status:
// //             item.isActive === true
// //               ? "Active"
// //               : item.verificationStatus === "pending"
// //                 ? "Pending"
// //                 : "Inactive",
// //           date: item.createdAt
// //             ? new Date(item.createdAt).toLocaleDateString("en-GB", {
// //                 day: "2-digit",
// //                 month: "short",
// //                 year: "numeric",
// //               })
// //             : "N/A",
// //           originalData: item,
// //         }));

// //         setProviders(doctorData);
// //       } else {
// //         setProviders([]);
// //       }
// //     } catch (error) {
// //       console.log("FETCH ERROR:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     Data();
// //   }, []);

// //   const filteredData = providers.filter((item) => {
// //     const searchText = search.toLowerCase();

// //     const matchesSearch =
// //       item.name.toLowerCase().includes(searchText) ||
// //       item.email.toLowerCase().includes(searchText) ||
// //       item.phone.includes(searchText);

// //     const matchesType = typeFilter === "All" || item.type === typeFilter;

// //     const matchesStatus =
// //       statusFilter === "All Status" || item.status === statusFilter;

// //     return matchesSearch && matchesType && matchesStatus;
// //   });

// //   return (
// //     <div className="min-h-screen bg-[#f7f9fc] text-[#14263d]">
// //       <section className="p-9">
// //         <div className="mb-6 flex items-center justify-between">
// //           <div>
// //             <h1 className="text-[32px] font-bold tracking-tight">
// //               Doctors & Clinics
// //             </h1>

// //             <p className="mt-1 text-[16px] text-[#647891]">
// //               Manage registered doctors and clinics
// //             </p>
// //           </div>

// //           <button className="flex items-center gap-2 rounded-xl bg-[#0aaab8] px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-[#0797a4]">
// //             <Plus size={21} />
// //             Add New
// //           </button>
// //         </div>

// //         <div className="mb-5 flex items-center justify-between rounded-2xl border border-[#e2e8ef] bg-white p-5 shadow-sm">
// //           <div className="relative w-[530px]">
// //             <Search
// //               size={20}
// //               className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8da0b6]"
// //             />

// //             <input
// //               type="text"
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //               placeholder="Search by name, email, phone..."
// //               className="h-12 w-full rounded-xl border border-[#dfe7ef] bg-[#fafbfd] pl-12 pr-4 text-[15px] outline-none focus:border-[#0aaab8]"
// //             />
// //           </div>

// //           <div className="flex items-center gap-2">
// //             {["All", "Doctor", "Clinic"].map((type) => (
// //               <button
// //                 key={type}
// //                 onClick={() => setTypeFilter(type)}
// //                 className={`rounded-xl px-6 py-3 text-sm font-semibold transition ${
// //                   typeFilter === type
// //                     ? "bg-[#0aaab8] text-white shadow-sm"
// //                     : "border border-[#e3e9f0] bg-[#fafbfd] text-[#63758b] hover:bg-[#f2f7f9]"
// //                 }`}
// //               >
// //                 {type === "All"
// //                   ? "All"
// //                   : type === "Doctor"
// //                     ? "Doctors"
// //                     : "Clinics"}
// //               </button>
// //             ))}

// //             <select
// //               value={statusFilter}
// //               onChange={(e) => setStatusFilter(e.target.value)}
// //               className="ml-3 h-12 rounded-xl border border-[#dfe7ef] bg-white px-5 text-sm font-medium text-[#60738b] outline-none"
// //             >
// //               <option>All Status</option>
// //               <option>Active</option>
// //               <option>Pending</option>
// //               <option>Inactive</option>
// //             </select>
// //           </div>
// //         </div>

// //         <div className="overflow-hidden rounded-2xl border border-[#e0e7ef] bg-white shadow-sm">
// //           <div className="overflow-x-auto">
// //             <table className="w-full min-w-[1150px]">
// //               <thead>
// //                 <tr className="border-b border-[#e5eaf0] bg-[#fafbfd]">
// //                   <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
// //                     #
// //                   </th>

// //                   <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
// //                     Name
// //                   </th>

// //                   <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
// //                     Email
// //                   </th>

// //                   <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
// //                     Phone
// //                   </th>

// //                   <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
// //                     Type
// //                   </th>

// //                   <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
// //                     Status
// //                   </th>

// //                   <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
// //                     Joined On
// //                   </th>

// //                   <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-[#667991]">
// //                     Action
// //                   </th>
// //                 </tr>
// //               </thead>

// //               <tbody>
// //                 {filteredData.map((item, index) => (
// //                   <tr
// //                     key={item.id}
// //                     className="border-b border-[#edf1f5] transition last:border-0 hover:bg-[#fbfdfe]"
// //                   >
// //                     <td className="px-5 py-4 text-sm text-[#4e637d]">
// //                       {index + 1}
// //                     </td>

// //                     <td className="px-5 py-4">
// //                       <div className="flex items-center gap-3">
// //                         <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8f4ff] text-[#1874d1]">
// //                           <UserRound size={21} />
// //                         </div>

// //                         <div>
// //                           <p className="whitespace-nowrap font-semibold text-[#182b42]">
// //                             {item.name}
// //                           </p>

// //                           <p className="mt-0.5 whitespace-nowrap text-sm text-[#7b8da3]">
// //                             {item.subtitle}
// //                           </p>
// //                         </div>
// //                       </div>
// //                     </td>

// //                     <td className="px-5 py-4 text-sm text-[#5c718b]">
// //                       {item.email}
// //                     </td>

// //                     <td className="px-5 py-4 text-sm text-[#5c718b]">
// //                       {item.phone}
// //                     </td>

// //                     <td className="px-5 py-4">
// //                       <span className="inline-flex items-center gap-2 rounded-xl bg-[#e9f3ff] px-3.5 py-2 text-sm font-semibold text-[#2372c8]">
// //                         <UserRound size={16} />
// //                         Doctor
// //                       </span>
// //                     </td>

// //                     <td className="px-5 py-4">
// //                       <span
// //                         className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold ${
// //                           item.status === "Active"
// //                             ? "bg-[#e2f8ee] text-[#099660]"
// //                             : item.status === "Pending"
// //                               ? "bg-[#fff4da] text-[#df9700]"
// //                               : "bg-[#ffe8e8] text-[#e43c3c]"
// //                         }`}
// //                       >
// //                         <span
// //                           className={`h-2 w-2 rounded-full ${
// //                             item.status === "Active"
// //                               ? "bg-[#0ca36a]"
// //                               : item.status === "Pending"
// //                                 ? "bg-[#f2a500]"
// //                                 : "bg-[#e53939]"
// //                           }`}
// //                         />

// //                         {item.status}
// //                       </span>
// //                     </td>

// //                     <td className="whitespace-nowrap px-5 py-4 text-sm text-[#60748d]">
// //                       {item.date}
// //                     </td>

// //                     <td className="px-5 py-4 text-right">
// //                       <button
// //                         type="button"
// //                         onClick={() =>
// //                           navigate("/providerDetails", {
// //                             state: {
// //                               provider: item.originalData,
// //                               type: "Doctor",
// //                             },
// //                           })
// //                         }
// //                         className="inline-flex items-center gap-2 rounded-xl border border-[#d5e0ea] px-5 py-2.5 text-sm font-semibold text-[#49627d] transition hover:border-[#0aaab8] hover:text-[#0aaab8]"
// //                       >
// //                         <Eye size={18} />
// //                         View
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))}

// //                 {filteredData.length === 0 && (
// //                   <tr>
// //                     <td
// //                       colSpan="8"
// //                       className="px-5 py-12 text-center text-[#71839a]"
// //                     >
// //                       No doctors found.
// //                     </td>
// //                   </tr>
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>

// //           <div className="flex items-center justify-between border-t border-[#e5eaf0] px-5 py-4">
// //             <p className="text-sm text-[#647891]">
// //               Showing{" "}
// //               <span className="font-semibold">
// //                 {filteredData.length > 0 ? 1 : 0}
// //               </span>{" "}
// //               to <span className="font-semibold">{filteredData.length}</span> of{" "}
// //               <span className="font-semibold">{filteredData.length}</span>{" "}
// //               entries
// //             </p>

// //             <div className="flex items-center gap-2">
// //               <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dfe6ee] text-[#8b9bae]">
// //                 <ChevronLeft size={18} />
// //               </button>

// //               <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0aaab8] font-semibold text-white">
// //                 1
// //               </button>

// //               <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dfe6ee] text-[#8b9bae]">
// //                 <ChevronRight size={18} />
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Search,
//   Plus,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
//   UserRound,
//   Building2,
// } from "lucide-react";

// export default function Onboard() {
//   const navigate = useNavigate();

//   const [providers, setProviders] = useState([]);
//   const [search, setSearch] = useState("");
//   const [typeFilter, setTypeFilter] = useState("All");
//   const [statusFilter, setStatusFilter] = useState("All Status");

//   const fetchDoctors = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:8000/api/v1/onboard/getPendingDoctors",
//       );

//       const info = await response.json();

//       console.log("Doctor Data:", info);

//       if (info.success) {
//         const doctors = Array.isArray(info.data)
//           ? info.data
//           : info.data
//             ? [info.data]
//             : [];

//         return doctors.map((item) => ({
//           id: item._id,
//           name: item.fullName || item.name || "N/A",
//           subtitle:
//             item.specialization ||
//             item.speciality ||
//             item.qualification ||
//             "Doctor",
//           email: item.email || "N/A",
//           phone: item.phone || "N/A",
//           type: "Doctor",
//           status:
//             item.isActive === true
//               ? "Active"
//               : item.verificationStatus === "pending"
//                 ? "Pending"
//                 : "Inactive",
//           date: item.createdAt
//             ? new Date(item.createdAt).toLocaleDateString("en-GB", {
//                 day: "2-digit",
//                 month: "short",
//                 year: "numeric",
//               })
//             : "N/A",
//           originalData: item,
//         }));
//       }

//       return [];
//     } catch (error) {
//       console.log("Doctor fetch error:", error);
//       return [];
//     }
//   };

//   const fetchClinics = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:8000/api/v1/onboard/clinicpendingData",
//       );

//       const info = await response.json();

//       console.log("Clinic Data:", info);

//       if (info.success) {
//         const clinics = Array.isArray(info.data)
//           ? info.data
//           : info.data
//             ? [info.data]
//             : [];

//         return clinics.map((item) => ({
//           id: item._id,
//           name: item.clinicName || item.name || "N/A",
//           subtitle:
//             item.clinicType || item.type || item.specialization || "Clinic",
//           email: item.email || "N/A",
//           phone: item.phone || "N/A",
//           type: "Clinic",
//           status:
//             item.isActive === true
//               ? "Active"
//               : item.verificationStatus === "pending"
//                 ? "Pending"
//                 : "Inactive",
//           date: item.createdAt
//             ? new Date(item.createdAt).toLocaleDateString("en-GB", {
//                 day: "2-digit",
//                 month: "short",
//                 year: "numeric",
//               })
//             : "N/A",
//           originalData: item,
//         }));
//       }

//       return [];
//     } catch (error) {
//       console.log("Clinic fetch error:", error);
//       return [];
//     }
//   };

//   const fetchAllProviders = async () => {
//     try {
//       const [doctorData, clinicData] = await Promise.all([
//         fetchDoctors(),
//         fetchClinics(),
//       ]);

//       const allData = [...doctorData, ...clinicData];

//       console.log("All Providers:", allData);

//       setProviders(allData);
//     } catch (error) {
//       console.log("Provider fetch error:", error);
//       setProviders([]);
//     }
//   };

//   useEffect(() => {
//     fetchAllProviders();
//   }, []);

//   const filteredData = providers.filter((item) => {
//     const searchText = search.toLowerCase();

//     const matchesSearch =
//       item.name.toLowerCase().includes(searchText) ||
//       item.email.toLowerCase().includes(searchText) ||
//       item.phone.toLowerCase().includes(searchText) ||
//       item.subtitle.toLowerCase().includes(searchText);

//     const matchesType = typeFilter === "All" || item.type === typeFilter;

//     const matchesStatus =
//       statusFilter === "All Status" || item.status === statusFilter;

//     return matchesSearch && matchesType && matchesStatus;
//   });

//   return (
//     <div className="min-h-screen bg-[#f7f9fc] text-[#14263d]">
//       <section className="p-9">
//         <div className="mb-6 flex items-center justify-between">
//           <div>
//             <h1 className="text-[32px] font-bold tracking-tight">
//               Doctors & Clinics
//             </h1>

//             <p className="mt-1 text-[16px] text-[#647891]">
//               Manage registered doctors and clinics
//             </p>
//           </div>

//           <button className="flex items-center gap-2 rounded-xl bg-[#0aaab8] px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-[#0797a4]">
//             <Plus size={21} />
//             Add New
//           </button>
//         </div>

//         <div className="mb-5 flex items-center justify-between rounded-2xl border border-[#e2e8ef] bg-white p-5 shadow-sm">
//           <div className="relative w-[530px]">
//             <Search
//               size={20}
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8da0b6]"
//             />

//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search by name, email, phone..."
//               className="h-12 w-full rounded-xl border border-[#dfe7ef] bg-[#fafbfd] pl-12 pr-4 text-[15px] outline-none focus:border-[#0aaab8]"
//             />
//           </div>

//           <div className="flex items-center gap-2">
//             {["All", "Doctor", "Clinic"].map((type) => (
//               <button
//                 key={type}
//                 onClick={() => setTypeFilter(type)}
//                 className={`rounded-xl px-6 py-3 text-sm font-semibold transition ${
//                   typeFilter === type
//                     ? "bg-[#0aaab8] text-white shadow-sm"
//                     : "border border-[#e3e9f0] bg-[#fafbfd] text-[#63758b] hover:bg-[#f2f7f9]"
//                 }`}
//               >
//                 {type === "All"
//                   ? "All"
//                   : type === "Doctor"
//                     ? "Doctors"
//                     : "Clinics"}
//               </button>
//             ))}

//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="ml-3 h-12 rounded-xl border border-[#dfe7ef] bg-white px-5 text-sm font-medium text-[#60738b] outline-none"
//             >
//               <option>All Status</option>
//               <option>Active</option>
//               <option>Pending</option>
//               <option>Inactive</option>
//             </select>
//           </div>
//         </div>

//         <div className="overflow-hidden rounded-2xl border border-[#e0e7ef] bg-white shadow-sm">
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[1150px]">
//               <thead>
//                 <tr className="border-b border-[#e5eaf0] bg-[#fafbfd]">
//                   <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
//                     #
//                   </th>

//                   <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
//                     Name
//                   </th>

//                   <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
//                     Email
//                   </th>

//                   <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
//                     Phone
//                   </th>

//                   <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
//                     Type
//                   </th>

//                   <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
//                     Status
//                   </th>

//                   <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#667991]">
//                     Joined On
//                   </th>

//                   <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-[#667991]">
//                     Action
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredData.map((item, index) => (
//                   <tr
//                     key={`${item.type}-${item.id}`}
//                     className="border-b border-[#edf1f5] transition last:border-0 hover:bg-[#fbfdfe]"
//                   >
//                     <td className="px-5 py-4 text-sm text-[#4e637d]">
//                       {index + 1}
//                     </td>

//                     <td className="px-5 py-4">
//                       <div className="flex items-center gap-3">
//                         <div
//                           className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
//                             item.type === "Doctor"
//                               ? "bg-[#e8f4ff] text-[#1874d1]"
//                               : "bg-[#e8faf7] text-[#0aaab8]"
//                           }`}
//                         >
//                           {item.type === "Doctor" ? (
//                             <UserRound size={21} />
//                           ) : (
//                             <Building2 size={21} />
//                           )}
//                         </div>

//                         <div>
//                           <p className="whitespace-nowrap font-semibold text-[#182b42]">
//                             {item.name}
//                           </p>

//                           <p className="mt-0.5 whitespace-nowrap text-sm text-[#7b8da3]">
//                             {item.subtitle}
//                           </p>
//                         </div>
//                       </div>
//                     </td>

//                     <td className="px-5 py-4 text-sm text-[#5c718b]">
//                       {item.email}
//                     </td>

//                     <td className="px-5 py-4 text-sm text-[#5c718b]">
//                       {item.phone}
//                     </td>

//                     <td className="px-5 py-4">
//                       <span
//                         className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold ${
//                           item.type === "Doctor"
//                             ? "bg-[#e9f3ff] text-[#2372c8]"
//                             : "bg-[#e8faf7] text-[#079b8a]"
//                         }`}
//                       >
//                         {item.type === "Doctor" ? (
//                           <UserRound size={16} />
//                         ) : (
//                           <Building2 size={16} />
//                         )}

//                         {item.type}
//                       </span>
//                     </td>

//                     <td className="px-5 py-4">
//                       <span
//                         className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold ${
//                           item.status === "Active"
//                             ? "bg-[#e2f8ee] text-[#099660]"
//                             : item.status === "Pending"
//                               ? "bg-[#fff4da] text-[#df9700]"
//                               : "bg-[#ffe8e8] text-[#e43c3c]"
//                         }`}
//                       >
//                         <span
//                           className={`h-2 w-2 rounded-full ${
//                             item.status === "Active"
//                               ? "bg-[#0ca36a]"
//                               : item.status === "Pending"
//                                 ? "bg-[#f2a500]"
//                                 : "bg-[#e53939]"
//                           }`}
//                         />

//                         {item.status}
//                       </span>
//                     </td>

//                     <td className="whitespace-nowrap px-5 py-4 text-sm text-[#60748d]">
//                       {item.date}
//                     </td>

//                     <td className="px-5 py-4 text-right">
//                       <button
//                         type="button"
//                         onClick={() =>
//                           navigate("/providerDetails", {
//                             state: {
//                               provider: item.originalData,
//                               type: item.type,
//                             },
//                           })
//                         }
//                         className="inline-flex items-center gap-2 rounded-xl border border-[#d5e0ea] px-5 py-2.5 text-sm font-semibold text-[#49627d] transition hover:border-[#0aaab8] hover:text-[#0aaab8]"
//                       >
//                         <Eye size={18} />
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))}

//                 {filteredData.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan="8"
//                       className="px-5 py-12 text-center text-[#71839a]"
//                     >
//                       No doctors or clinics found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div className="flex items-center justify-between border-t border-[#e5eaf0] px-5 py-4">
//             <p className="text-sm text-[#647891]">
//               Showing{" "}
//               <span className="font-semibold">
//                 {filteredData.length > 0 ? 1 : 0}
//               </span>{" "}
//               to <span className="font-semibold">{filteredData.length}</span> of{" "}
//               <span className="font-semibold">{filteredData.length}</span>{" "}
//               entries
//             </p>

//             <div className="flex items-center gap-2">
//               <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dfe6ee] text-[#8b9bae]">
//                 <ChevronLeft size={18} />
//               </button>

//               <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0aaab8] font-semibold text-white">
//                 1
//               </button>

//               <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dfe6ee] text-[#8b9bae]">
//                 <ChevronRight size={18} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
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

export default function Onboard() {
  const navigate = useNavigate();

  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const fetchDoctors = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/onboard/getPendingDoctors",
      );

      const info = await response.json();

      console.log("Doctor Data:", info);

      if (info.success) {
        const doctors = Array.isArray(info.data)
          ? info.data
          : info.data
            ? [info.data]
            : [];

        return doctors.map((item) => ({
          id: item._id,
          name: item.fullName || item.name || "N/A",
          subtitle:
            item.specialization ||
            item.speciality ||
            item.qualification ||
            "Doctor",
          email: item.email || "N/A",
          phone: item.phone || "N/A",
          type: "Doctor",
          status:
            item.isActive === true
              ? "Active"
              : item.verificationStatus === "pending"
                ? "Pending"
                : "Inactive",
          date: item.createdAt
            ? new Date(item.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "N/A",
          originalData: item,
        }));
      }

      return [];
    } catch (error) {
      console.log("Doctor fetch error:", error);
      return [];
    }
  };

  const fetchClinics = async () => {
    try {
      const response = await fetch(
        "https://physio-backend-sand.vercel.app/api/v1/onboard/clinicpendingData",
      );

      const info = await response.json();

      console.log("Clinic Data:", info);

      if (info.success) {
        const clinics = Array.isArray(info.data)
          ? info.data
          : info.data
            ? [info.data]
            : [];

        return clinics.map((item) => ({
          id: item._id,
          name: item.clinicName || item.name || "N/A",
          subtitle:
            item.clinicType || item.type || item.specialization || "Clinic",
          email: item.email || "N/A",
          phone: item.phone || "N/A",
          type: "Clinic",
          status:
            item.isActive === true
              ? "Active"
              : item.verificationStatus === "pending"
                ? "Pending"
                : "Inactive",
          date: item.createdAt
            ? new Date(item.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "N/A",
          originalData: item,
        }));
      }

      return [];
    } catch (error) {
      console.log("Clinic fetch error:", error);
      return [];
    }
  };

  const fetchAllProviders = async () => {
    try {
      const [doctorData, clinicData] = await Promise.all([
        fetchDoctors(),
        fetchClinics(),
      ]);

      const allData = [...doctorData, ...clinicData];

      console.log("All Providers:", allData);

      setProviders(allData);
    } catch (error) {
      console.log("Provider fetch error:", error);
      setProviders([]);
    }
  };

  useEffect(() => {
    fetchAllProviders();
  }, []);

  const filteredData = providers.filter((item) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      item.name.toLowerCase().includes(searchText) ||
      item.email.toLowerCase().includes(searchText) ||
      item.phone.toLowerCase().includes(searchText) ||
      item.subtitle.toLowerCase().includes(searchText);

    const matchesType = typeFilter === "All" || item.type === typeFilter;

    const matchesStatus =
      statusFilter === "All Status" || item.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleView = (item) => {
    if (item.type === "Clinic") {
      navigate("/admin/clinic", {
        state: {
          clinic: item.originalData,
        },
      });
    } else {
      navigate("/providerDetails", {
        state: {
          provider: item.originalData,
          type: "Doctor",
        },
      });
    }
  };

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
                    key={`${item.type}-${item.id}`}
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
                              : "bg-[#e8faf7] text-[#0aaab8]"
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
                            : "bg-[#e8faf7] text-[#079b8a]"
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
                        onClick={() => handleView(item)}
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
