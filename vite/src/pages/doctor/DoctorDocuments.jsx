// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   LayoutDashboard,
//   CalendarDays,
//   Users,
//   IndianRupee,
//   Bell,
//   Settings,
//   LogOut,
//   Stethoscope,
//   ChevronDown,
//   ChevronUp,
//   CheckCircle2,
//   Circle,
//   FileText,
//   UserCircle,
//   Image as ImageIcon,
//   Upload,
//   X,
//   RefreshCw,
//   MapPin,
//   Mail,
//   Phone,
//   ShieldCheck,
//   Info,
//   HelpCircle,
//   Send,
//   Clock3,
//   ArrowLeft,
//   Building2,
// } from "lucide-react";

// export default function DoctorDocuments() {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const [sections, setSections] = useState({
//     information: true,
//     professional: true,
//     photo: true,
//     documents: true,
//     clinic: true,
//   });

//   const [doctorForm, setDoctorForm] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     dateOfBirth: "",
//     gender: "",
//     address: "",
//     specialization: "",
//     experience: "",
//     consultationFee: "",
//     clinicName: "",
//     availableDays: "",
//     about: "",
//     clinicAddress: "",
//     clinicPhone: "",
//     workingHours: "",
//     consultationMode: "In-clinic",
//   });

//   const [profilePhoto, setProfilePhoto] = useState(null);

//   const [documents, setDocuments] = useState({
//     medicalLicense: null,
//     identityProof: null,
//     degreeCertificate: null,
//     experienceCertificate: null,
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const toggleSection = (section) => {
//     setSections((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   const updateDoctorForm = (field, value) => {
//     setDoctorForm((prev) => ({
//       ...prev,
//       [field]: value,
//     }));

//     setIsSubmitted(false);
//   };

//   const handlePhotoUpload = (event) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     if (file.size > 5 * 1024 * 1024) {
//       alert("Maximum file size is 5 MB");
//       event.target.value = "";
//       return;
//     }

//     if (!["image/jpeg", "image/png"].includes(file.type)) {
//       alert("Only JPG and PNG images are allowed");
//       event.target.value = "";
//       return;
//     }

//     setProfilePhoto(file);
//     setIsSubmitted(false);
//     event.target.value = "";
//   };

//   const removePhoto = () => {
//     setProfilePhoto(null);
//     setIsSubmitted(false);
//   };

//   const handleDocumentUpload = (name, event) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     if (file.size > 5 * 1024 * 1024) {
//       alert("Maximum file size is 5 MB");
//       event.target.value = "";
//       return;
//     }

//     const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];

//     if (!allowedTypes.includes(file.type)) {
//       alert("Only PDF, JPG and PNG files are allowed");
//       event.target.value = "";
//       return;
//     }

//     setDocuments((prev) => ({
//       ...prev,
//       [name]: file,
//     }));

//     setIsSubmitted(false);
//     event.target.value = "";
//   };

//   const removeDocument = (name) => {
//     setDocuments((prev) => ({
//       ...prev,
//       [name]: null,
//     }));

//     setIsSubmitted(false);
//   };

//   const handleSubmit = async () => {
//     if (isSubmitting) return;

//     const requiredFields = [
//       ["fullName", "Full Name"],
//       ["email", "Email"],
//       ["phone", "Phone"],
//       ["dateOfBirth", "Date of Birth"],
//       ["gender", "Gender"],
//       ["address", "Address"],
//       ["specialization", "Specialization"],
//       ["experience", "Experience"],
//       ["consultationFee", "Consultation Fee"],
//       ["clinicName", "Clinic Name"],
//       ["availableDays", "Available Days"],
//       ["about", "About"],
//     ];

//     const missingField = requiredFields.find(
//       ([field]) => !String(doctorForm[field] || "").trim(),
//     );

//     if (missingField) {
//       alert(`${missingField[1]} is required`);
//       return;
//     }

//     if (!profilePhoto) {
//       alert("Profile photo is required");
//       return;
//     }

//     const requiredDocuments = [
//       ["medicalLicense", "Medical License"],
//       ["identityProof", "Identity Proof"],
//       ["degreeCertificate", "Degree Certificate"],
//       ["experienceCertificate", "Experience Certificate"],
//     ];

//     const missingDocument = requiredDocuments.find(
//       ([field]) => !documents[field],
//     );

//     if (missingDocument) {
//       alert(`${missingDocument[1]} is required`);
//       return;
//     }

//     setIsSubmitting(true);
//     setIsSubmitted(false);

//     try {
//       const formData = new FormData();

//       Object.entries(doctorForm).forEach(([key, value]) => {
//         if (value !== undefined && value !== null) {
//           formData.append(key, value);
//         }
//       });

//       formData.append("profilePhoto", profilePhoto);

//       Object.entries(documents).forEach(([name, file]) => {
//         if (file) {
//           formData.append(name, file);
//         }
//       });

//       const response = await fetch(
//         "http://localhost:8000/api/v1/pattner/doctor_dv",
//         {
//           method: "POST",
//           body: formData,
//         },
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to submit doctor verification");
//       }

//       console.log("Backend response:", data);
//       setIsSubmitted(true);
//     } catch (error) {
//       console.error("Submission error:", error);
//       alert(error.message || "Something went wrong");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const uploadedDocuments = Object.values(documents).filter(Boolean).length;

//   const completedItems =
//     1 +
//     (profilePhoto ? 1 : 0) +
//     uploadedDocuments +
//     (doctorForm.clinicName ? 1 : 0);

//   const totalRequired = 7;

//   const progress = Math.min(
//     100,
//     Math.round((completedItems / totalRequired) * 100),
//   );

//   return (
//     <div className="min-h-screen bg-slate-50">
//       {mobileOpen && (
//         <button
//           onClick={() => setMobileOpen(false)}
//           className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
//           aria-label="Close sidebar"
//         />
//       )}

//       <aside
//         className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
//           mobileOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex h-full flex-col">
//           <div className="flex h-20 items-center border-b border-slate-100 px-5">
//             <Link
//               to="/doctor/dashboard"
//               className="flex items-center gap-3"
//               onClick={() => setMobileOpen(false)}
//             >
//               <img
//                 src="/image.png"
//                 alt="LiBi Motion Care"
//                 className="h-10 w-10 object-contain"
//               />

//               <div>
//                 <p className="text-sm font-bold text-slate-900">
//                   LiBi Motion Care
//                 </p>

//                 <p className="text-[10px] text-slate-400">Doctor Portal</p>
//               </div>
//             </Link>
//           </div>

//           <div className="mx-4 mt-5 rounded-2xl bg-[#32838c]/5 p-4">
//             <div className="flex items-center gap-3">
//               <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#32838c] text-white">
//                 <Stethoscope className="h-5 w-5" />
//               </div>

//               <div className="min-w-0">
//                 <p className="truncate text-sm font-bold text-slate-900">
//                   {doctorForm.fullName || "Doctor"}
//                 </p>

//                 <p className="truncate text-xs text-slate-500">
//                   {doctorForm.specialization || "Doctor Profile"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <nav className="mt-6 flex-1 space-y-1 px-3">
//             <SidebarItem
//               icon={LayoutDashboard}
//               label="Dashboard"
//               to="/doctor/dashboard"
//               onClick={() => setMobileOpen(false)}
//             />

//             <SidebarItem
//               icon={CalendarDays}
//               label="Appointments"
//               to="/doctor/appointments"
//               onClick={() => setMobileOpen(false)}
//             />

//             <SidebarItem
//               icon={Users}
//               label="Patients"
//               to="/doctor/patients"
//               onClick={() => setMobileOpen(false)}
//             />

//             <SidebarItem
//               icon={IndianRupee}
//               label="Payments"
//               to="/doctor/payments"
//               onClick={() => setMobileOpen(false)}
//             />

//             <SidebarItem
//               icon={Bell}
//               label="Notifications"
//               to="/doctor/notifications"
//               onClick={() => setMobileOpen(false)}
//             />

//             <div className="my-4 border-t border-slate-100" />

//             <SidebarItem
//               icon={UserCircle}
//               label="Doctor Profile"
//               to="/doctor/profile"
//               onClick={() => setMobileOpen(false)}
//             />

//             <SidebarItem
//               icon={FileText}
//               label="Document Verification"
//               active
//               to="/doctor/verification"
//               onClick={() => setMobileOpen(false)}
//             />

//             <SidebarItem
//               icon={Settings}
//               label="Settings"
//               to="/doctor/settings"
//               onClick={() => setMobileOpen(false)}
//             />
//           </nav>

//           <div className="border-t border-slate-100 p-4">
//             <Link
//               to="/doctor/login"
//               className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-600"
//             >
//               <LogOut className="h-4 w-4" />
//               Logout
//             </Link>
//           </div>
//         </div>
//       </aside>

//       <div className="lg:pl-64">
//         <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setMobileOpen(true)}
//               className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 lg:hidden"
//             >
//               <span className="text-lg">☰</span>
//             </button>

//             <div className="hidden md:block">
//               <div className="flex items-center gap-2 text-xs text-slate-400">
//                 <Link to="/doctor/profile" className="hover:text-[#32838c]">
//                   Doctor Profile
//                 </Link>

//                 <span>›</span>

//                 <span className="text-slate-600">Document Verification</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500">
//               <Bell className="h-5 w-5" />
//               <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
//             </button>

//             <div className="hidden h-8 w-px bg-slate-200 sm:block" />

//             <div className="hidden items-center gap-3 sm:flex">
//               <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#32838c]/10">
//                 <Stethoscope className="h-5 w-5 text-[#32838c]" />
//               </div>

//               <div className="max-w-48">
//                 <p className="truncate text-sm font-bold text-slate-900">
//                   {doctorForm.fullName || "Doctor"}
//                 </p>

//                 <p className="text-xs text-slate-400">Doctor</p>
//               </div>

//               <ChevronDown className="h-4 w-4 text-slate-400" />
//             </div>
//           </div>
//         </header>

//         <main className="p-4 sm:p-6 lg:p-8">
//           <div className="mb-7 flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
//             <div className="flex items-start gap-4">
//               <button
//                 type="button"
//                 onClick={() => window.history.back()}
//                 className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-[#32838c]/30 hover:text-[#32838c]"
//               >
//                 <ArrowLeft className="h-5 w-5" />
//               </button>

//               <div>
//                 <div className="mb-3 flex items-center gap-3">
//                   <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
//                     <img
//                       src="/image.png"
//                       alt="LiBi Motion Care"
//                       className="h-9 w-9 object-contain"
//                     />
//                   </div>

//                   <div>
//                     <p className="text-xs font-bold text-[#32838c]">
//                       LiBi Motion Care
//                     </p>

//                     <p className="text-[10px] text-slate-400">
//                       Doctor Verification Portal
//                     </p>
//                   </div>
//                 </div>

//                 <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
//                   Doctor Verification
//                 </h1>

//                 <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
//                   Complete your doctor profile and upload the required photo and
//                   professional documents for verification.
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-white px-4 py-3 shadow-sm">
//               <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50">
//                 <ShieldCheck className="h-5 w-5 text-amber-600" />
//               </div>

//               <div>
//                 <p className="text-sm font-bold text-amber-600">
//                   Pending Verification
//                 </p>

//                 <p className="text-xs text-slate-400">
//                   Complete all required information
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
//             <div className="space-y-5">
//               <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
//                 <button
//                   onClick={() => toggleSection("information")}
//                   className="flex w-full items-center justify-between p-5 text-left sm:p-6"
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#32838c]/10">
//                       <UserCircle className="h-5 w-5 text-[#32838c]" />
//                     </div>

//                     <div>
//                       <div className="flex flex-wrap items-center gap-2">
//                         <h2 className="text-sm font-bold text-slate-900">
//                           Personal Information
//                         </h2>

//                         <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
//                           Required
//                         </span>
//                       </div>

//                       <p className="mt-1 text-xs text-slate-400">
//                         Basic information about the doctor
//                       </p>
//                     </div>
//                   </div>

//                   {sections.information ? (
//                     <ChevronUp className="h-5 w-5 text-slate-400" />
//                   ) : (
//                     <ChevronDown className="h-5 w-5 text-slate-400" />
//                   )}
//                 </button>

//                 {sections.information && (
//                   <div className="border-t border-slate-100 p-5 sm:p-6">
//                     <div className="grid gap-5 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2">
//                       <DoctorInput
//                         icon={UserCircle}
//                         label="Full Name"
//                         value={doctorForm.fullName}
//                         onChange={(value) =>
//                           updateDoctorForm("fullName", value)
//                         }
//                       />

//                       <DoctorInput
//                         icon={Mail}
//                         label="Email"
//                         type="email"
//                         value={doctorForm.email}
//                         onChange={(value) => updateDoctorForm("email", value)}
//                       />

//                       <DoctorInput
//                         icon={Phone}
//                         label="Phone"
//                         type="tel"
//                         value={doctorForm.phone}
//                         onChange={(value) => updateDoctorForm("phone", value)}
//                       />

//                       <DoctorInput
//                         icon={CalendarDays}
//                         label="Date of Birth"
//                         type="date"
//                         value={doctorForm.dateOfBirth}
//                         onChange={(value) =>
//                           updateDoctorForm("dateOfBirth", value)
//                         }
//                       />

//                       <div>
//                         <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
//                           Gender
//                         </label>

//                         <div className="relative">
//                           <UserCircle className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#32838c]" />

//                           <select
//                             value={doctorForm.gender}
//                             onChange={(event) =>
//                               updateDoctorForm("gender", event.target.value)
//                             }
//                             className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-9 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#32838c] focus:ring-2 focus:ring-[#32838c]/10"
//                           >
//                             <option value="">Select Gender</option>

//                             <option value="Male">Male</option>

//                             <option value="Female">Female</option>

//                             <option value="Other">Other</option>
//                           </select>

//                           <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//                         </div>
//                       </div>

//                       <DoctorInput
//                         icon={MapPin}
//                         label="Address"
//                         value={doctorForm.address}
//                         onChange={(value) => updateDoctorForm("address", value)}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </section>

//               <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
//                 <button
//                   onClick={() => toggleSection("professional")}
//                   className="flex w-full items-center justify-between p-5 text-left sm:p-6"
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#32838c]/10">
//                       <Stethoscope className="h-5 w-5 text-[#32838c]" />
//                     </div>

//                     <div>
//                       <div className="flex flex-wrap items-center gap-2">
//                         <h2 className="text-sm font-bold text-slate-900">
//                           Professional Information
//                         </h2>

//                         <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
//                           Required
//                         </span>
//                       </div>

//                       <p className="mt-1 text-xs text-slate-400">
//                         Professional details and consultation information
//                       </p>
//                     </div>
//                   </div>

//                   {sections.professional ? (
//                     <ChevronUp className="h-5 w-5 text-slate-400" />
//                   ) : (
//                     <ChevronDown className="h-5 w-5 text-slate-400" />
//                   )}
//                 </button>

//                 {sections.professional && (
//                   <div className="border-t border-slate-100 p-5 sm:p-6">
//                     <div className="grid gap-5 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2">
//                       <DoctorInput
//                         icon={Stethoscope}
//                         label="Specialization"
//                         value={doctorForm.specialization}
//                         onChange={(value) =>
//                           updateDoctorForm("specialization", value)
//                         }
//                       />

//                       <DoctorInput
//                         icon={Clock3}
//                         label="Experience"
//                         value={doctorForm.experience}
//                         onChange={(value) =>
//                           updateDoctorForm("experience", value)
//                         }
//                       />

//                       <DoctorInput
//                         icon={IndianRupee}
//                         label="Consultation Fee"
//                         type="number"
//                         value={doctorForm.consultationFee}
//                         onChange={(value) =>
//                           updateDoctorForm("consultationFee", value)
//                         }
//                       />

//                       <DoctorInput
//                         icon={Building2}
//                         label="Clinic Name"
//                         value={doctorForm.clinicName}
//                         onChange={(value) =>
//                           updateDoctorForm("clinicName", value)
//                         }
//                       />

//                       <DoctorInput
//                         icon={CalendarDays}
//                         label="Available Days"
//                         value={doctorForm.availableDays}
//                         onChange={(value) =>
//                           updateDoctorForm("availableDays", value)
//                         }
//                       />

//                       <div>
//                         <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
//                           Consultation Mode
//                         </label>

//                         <div className="relative">
//                           <Stethoscope className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#32838c]" />

//                           <select
//                             value={doctorForm.consultationMode}
//                             onChange={(event) =>
//                               updateDoctorForm(
//                                 "consultationMode",
//                                 event.target.value,
//                               )
//                             }
//                             className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-9 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#32838c] focus:ring-2 focus:ring-[#32838c]/10"
//                           >
//                             <option value="In-clinic">In-clinic</option>

//                             <option value="Online">Online</option>

//                             <option value="Both">In-clinic & Online</option>
//                           </select>

//                           <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//                         </div>
//                       </div>

//                       <div className="sm:col-span-2">
//                         <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
//                           About
//                         </label>

//                         <textarea
//                           value={doctorForm.about}
//                           onChange={(event) =>
//                             updateDoctorForm("about", event.target.value)
//                           }
//                           rows={4}
//                           placeholder="Describe your experience, expertise and professional background"
//                           className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#32838c] focus:ring-2 focus:ring-[#32838c]/10"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </section>

//               <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
//                 <AccordionHeader
//                   icon={ImageIcon}
//                   number="3"
//                   title="Doctor Photo"
//                   subtitle="Upload one clear professional photo"
//                   count={profilePhoto ? "1/1 Uploaded" : "0/1 Uploaded"}
//                   open={sections.photo}
//                   onClick={() => toggleSection("photo")}
//                   required
//                 />

//                 {sections.photo && (
//                   <div className="border-t border-slate-100 p-5 sm:p-6">
//                     <div className="max-w-sm">
//                       <PhotoUpload
//                         file={profilePhoto}
//                         onUpload={handlePhotoUpload}
//                         onRemove={removePhoto}
//                       />
//                     </div>

//                     <div className="mt-4 flex items-start gap-2 text-xs text-slate-400">
//                       <Info className="mt-0.5 h-4 w-4 shrink-0" />

//                       <p>
//                         Upload one clear professional photo. JPG and PNG formats
//                         are supported. Maximum 5 MB.
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </section>

//               <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
//                 <AccordionHeader
//                   icon={FileText}
//                   number="4"
//                   title="Professional Documents"
//                   subtitle="Upload your medical and professional verification documents"
//                   count={`${uploadedDocuments}/4 Uploaded`}
//                   open={sections.documents}
//                   onClick={() => toggleSection("documents")}
//                   required
//                 />

//                 {sections.documents && (
//                   <div className="border-t border-slate-100 p-5 sm:p-6">
//                     <div className="grid gap-4 md:grid-cols-2">
//                       <DocumentUpload
//                         name="medicalLicense"
//                         title="Medical License"
//                         description="Valid medical or professional registration license"
//                         required
//                         file={documents.medicalLicense}
//                         onUpload={handleDocumentUpload}
//                         onRemove={removeDocument}
//                       />

//                       <DocumentUpload
//                         name="identityProof"
//                         title="Identity Proof"
//                         description="Aadhaar, PAN or Driving License"
//                         required
//                         file={documents.identityProof}
//                         onUpload={handleDocumentUpload}
//                         onRemove={removeDocument}
//                       />

//                       <DocumentUpload
//                         name="degreeCertificate"
//                         title="Degree Certificate"
//                         description="Professional degree or qualification certificate"
//                         required
//                         file={documents.degreeCertificate}
//                         onUpload={handleDocumentUpload}
//                         onRemove={removeDocument}
//                       />

//                       <DocumentUpload
//                         name="experienceCertificate"
//                         title="Experience Certificate"
//                         description="Previous employment or experience proof"
//                         required
//                         file={documents.experienceCertificate}
//                         onUpload={handleDocumentUpload}
//                         onRemove={removeDocument}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </section>

//               <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
//                 <AccordionHeader
//                   icon={Building2}
//                   number="5"
//                   title="Clinic Information"
//                   subtitle="Enter the clinic information associated with your profile"
//                   count={doctorForm.clinicName ? "Completed" : "Required"}
//                   open={sections.clinic}
//                   onClick={() => toggleSection("clinic")}
//                 />

//                 {sections.clinic && (
//                   <div className="border-t border-slate-100 p-5 sm:p-6">
//                     <div className="grid gap-5 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2">
//                       <DoctorInput
//                         icon={Building2}
//                         label="Clinic Name"
//                         value={doctorForm.clinicName}
//                         onChange={(value) =>
//                           updateDoctorForm("clinicName", value)
//                         }
//                       />

//                       <DoctorInput
//                         icon={MapPin}
//                         label="Clinic Address"
//                         value={doctorForm.clinicAddress}
//                         onChange={(value) =>
//                           updateDoctorForm("clinicAddress", value)
//                         }
//                       />

//                       <DoctorInput
//                         icon={Phone}
//                         label="Clinic Phone"
//                         type="tel"
//                         value={doctorForm.clinicPhone}
//                         onChange={(value) =>
//                           updateDoctorForm("clinicPhone", value)
//                         }
//                       />

//                       <DoctorInput
//                         icon={Clock3}
//                         label="Working Hours"
//                         value={doctorForm.workingHours}
//                         onChange={(value) =>
//                           updateDoctorForm("workingHours", value)
//                         }
//                       />
//                     </div>
//                   </div>
//                 )}
//               </section>

//               <section className="rounded-3xl border border-[#32838c]/20 bg-white p-5 shadow-sm sm:p-6">
//                 <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//                   <div className="flex items-start gap-4">
//                     <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#32838c]/10">
//                       <Info className="h-5 w-5 text-[#32838c]" />
//                     </div>

//                     <div>
//                       <h3 className="text-sm font-bold text-slate-900">
//                         Review & Submit
//                       </h3>

//                       <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
//                         Please ensure all information is correct and all
//                         required documents and one doctor photo are uploaded
//                         before submitting.
//                       </p>
//                     </div>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={handleSubmit}
//                     disabled={isSubmitting}
//                     className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-6 py-3 text-xs font-bold text-white transition ${
//                       isSubmitting
//                         ? "cursor-not-allowed bg-[#32838c]/70"
//                         : "bg-[#32838c] hover:bg-[#286f77]"
//                     }`}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
//                         Submitting...
//                       </>
//                     ) : isSubmitted ? (
//                       <>
//                         <CheckCircle2 className="h-4 w-4" />
//                         Submitted
//                       </>
//                     ) : (
//                       <>
//                         <Send className="h-4 w-4" />
//                         Submit for Verification
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </section>
//             </div>

//             <aside className="space-y-5">
//               <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
//                 <div className="flex items-center gap-4">
//                   <div className="relative grid h-20 w-20 shrink-0 place-items-center rounded-full border-[7px] border-[#32838c]/15">
//                     <div
//                       className="absolute inset-[-7px] rounded-full border-[7px] border-transparent border-t-[#32838c]"
//                       style={{
//                         transform: `rotate(${Math.max(
//                           -45,
//                           progress * 3.6 - 45,
//                         )}deg)`,
//                       }}
//                     />

//                     <div className="text-center">
//                       <p className="text-lg font-bold text-slate-900">
//                         {progress}%
//                       </p>

//                       <p className="text-[9px] text-slate-400">Complete</p>
//                     </div>
//                   </div>

//                   <div>
//                     <h2 className="text-sm font-bold text-slate-900">
//                       Verification Progress
//                     </h2>

//                     <p className="mt-1 text-xs text-slate-400">
//                       Complete all required information
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
//                   <div
//                     className="h-full rounded-full bg-[#32838c] transition-all duration-500"
//                     style={{ width: `${progress}%` }}
//                   />
//                 </div>
//               </div>

//               <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
//                 <div className="mb-5 flex items-center gap-3">
//                   <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#32838c]/10">
//                     <CheckCircle2 className="h-5 w-5 text-[#32838c]" />
//                   </div>

//                   <h2 className="text-sm font-bold text-slate-900">
//                     Required Information
//                   </h2>
//                 </div>

//                 <div className="space-y-4">
//                   <ChecklistItem
//                     completed={Boolean(
//                       doctorForm.fullName &&
//                       doctorForm.email &&
//                       doctorForm.phone &&
//                       doctorForm.dateOfBirth &&
//                       doctorForm.gender &&
//                       doctorForm.address,
//                     )}
//                     text="Complete personal information"
//                   />

//                   <ChecklistItem
//                     completed={Boolean(
//                       doctorForm.specialization &&
//                       doctorForm.experience &&
//                       doctorForm.consultationFee &&
//                       doctorForm.clinicName &&
//                       doctorForm.availableDays &&
//                       doctorForm.about,
//                     )}
//                     text="Complete professional information"
//                   />

//                   <ChecklistItem
//                     completed={Boolean(profilePhoto)}
//                     text="Upload doctor photo"
//                   />

//                   <ChecklistItem
//                     completed={Boolean(documents.medicalLicense)}
//                     text="Medical license"
//                   />

//                   <ChecklistItem
//                     completed={Boolean(documents.identityProof)}
//                     text="Identity proof"
//                   />

//                   <ChecklistItem
//                     completed={Boolean(documents.degreeCertificate)}
//                     text="Degree certificate"
//                   />

//                   <ChecklistItem
//                     completed={Boolean(documents.experienceCertificate)}
//                     text="Experience certificate"
//                   />

//                   <ChecklistItem
//                     completed={Boolean(doctorForm.clinicName)}
//                     text="Clinic information"
//                   />
//                 </div>
//               </div>

//               <div className="rounded-3xl border border-[#32838c]/10 bg-[#32838c]/5 p-5">
//                 <div className="mb-4 flex items-center gap-3">
//                   <div className="grid h-10 w-10 place-items-center rounded-xl bg-white">
//                     <Info className="h-5 w-5 text-[#32838c]" />
//                   </div>

//                   <h2 className="text-sm font-bold text-slate-900">
//                     Guidelines
//                   </h2>
//                 </div>

//                 <div className="space-y-3">
//                   <GuideItem text="Upload clear and valid documents" />
//                   <GuideItem text="Accepted formats: PDF, JPG, PNG" />
//                   <GuideItem text="Maximum file size: 5 MB per file" />
//                   <GuideItem text="Make sure document details are readable" />
//                   <GuideItem text="All required documents must be uploaded" />
//                   <GuideItem text="Upload one clear professional photo" />
//                 </div>
//               </div>

//               <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
//                 <div className="flex items-center gap-3">
//                   <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#32838c]/10">
//                     <HelpCircle className="h-5 w-5 text-[#32838c]" />
//                   </div>

//                   <div>
//                     <h2 className="text-sm font-bold text-slate-900">
//                       Need Help?
//                     </h2>

//                     <p className="mt-1 text-xs text-slate-400">
//                       Need help with your documents?
//                     </p>
//                   </div>
//                 </div>

//                 <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#32838c] py-3 text-xs font-bold text-[#32838c] hover:bg-[#32838c]/5">
//                   <Mail className="h-4 w-4" />
//                   Contact Support
//                 </button>
//               </div>
//             </aside>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// function SidebarItem({ icon: Icon, label, active = false, to, onClick }) {
//   return (
//     <Link
//       to={to}
//       onClick={onClick}
//       className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
//         active
//           ? "bg-[#32838c]/10 text-[#32838c]"
//           : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
//       }`}
//     >
//       <Icon className="h-4 w-4" />
//       <span>{label}</span>
//     </Link>
//   );
// }

// function AccordionHeader({
//   icon: Icon,
//   number,
//   title,
//   subtitle,
//   count,
//   open,
//   onClick,
//   required = false,
// }) {
//   return (
//     <button
//       onClick={onClick}
//       className="flex w-full items-center justify-between p-5 text-left sm:p-6"
//     >
//       <div className="flex min-w-0 items-center gap-4">
//         <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#32838c]/10">
//           <Icon className="h-5 w-5 text-[#32838c]" />
//         </div>

//         <div className="min-w-0">
//           <div className="flex flex-wrap items-center gap-2">
//             <span className="grid h-6 w-6 place-items-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
//               {number}
//             </span>

//             <h2 className="text-sm font-bold text-slate-900">{title}</h2>

//             {required && (
//               <span className="rounded-full bg-rose-50 px-2 py-1 text-[10px] font-bold text-rose-500">
//                 Required
//               </span>
//             )}
//           </div>

//           <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
//         </div>
//       </div>

//       <div className="ml-3 flex shrink-0 items-center gap-3">
//         <span className="hidden rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500 sm:block">
//           {count}
//         </span>

//         {open ? (
//           <ChevronUp className="h-5 w-5 text-slate-400" />
//         ) : (
//           <ChevronDown className="h-5 w-5 text-slate-400" />
//         )}
//       </div>
//     </button>
//   );
// }

// function DoctorInput({ icon: Icon, label, value, onChange, type = "text" }) {
//   return (
//     <div>
//       <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
//         {label}
//       </label>

//       <div className="relative">
//         <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#32838c]" />

//         <input
//           type={type}
//           value={value}
//           onChange={(event) => onChange(event.target.value)}
//           className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#32838c] focus:ring-2 focus:ring-[#32838c]/10"
//         />
//       </div>
//     </div>
//   );
// }

// function PhotoUpload({ file, onUpload, onRemove }) {
//   return (
//     <div className="relative">
//       <label
//         className={`group flex min-h-[240px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-4 text-center transition ${
//           file
//             ? "border-emerald-200 bg-emerald-50/40"
//             : "border-slate-200 bg-slate-50 hover:border-[#32838c]/40 hover:bg-[#32838c]/5"
//         }`}
//       >
//         {file ? (
//           <>
//             <div className="grid h-24 w-24 place-items-center overflow-hidden rounded-full bg-white shadow-sm">
//               <img
//                 src={URL.createObjectURL(file)}
//                 alt="Doctor"
//                 className="h-full w-full object-cover"
//               />
//             </div>

//             <p className="mt-3 max-w-full truncate text-xs font-bold text-slate-700">
//               {file.name}
//             </p>

//             <p className="mt-1 text-[10px] text-slate-400">
//               {(file.size / 1024 / 1024).toFixed(2)} MB
//             </p>
//           </>
//         ) : (
//           <>
//             <div className="grid h-12 w-12 place-items-center rounded-xl bg-white shadow-sm">
//               <ImageIcon className="h-6 w-6 text-[#32838c]" />
//             </div>

//             <p className="mt-3 text-xs font-bold text-slate-700">
//               Upload Doctor Photo
//             </p>

//             <p className="mt-1 text-[10px] text-slate-400">
//               Professional profile photo
//             </p>

//             <div className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-[#32838c]">
//               <Upload className="h-3 w-3" />
//               Choose Image
//             </div>
//           </>
//         )}

//         <input
//           type="file"
//           accept="image/jpeg,image/png"
//           className="hidden"
//           onChange={onUpload}
//         />
//       </label>

//       {file && (
//         <button
//           type="button"
//           onClick={onRemove}
//           className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white text-red-500 shadow-sm hover:bg-red-50"
//         >
//           <X className="h-3.5 w-3.5" />
//         </button>
//       )}
//     </div>
//   );
// }

// function DocumentUpload({
//   name,
//   title,
//   description,
//   required = false,
//   file,
//   onUpload,
//   onRemove,
// }) {
//   return (
//     <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
//       <div className="mb-4 flex items-start justify-between gap-3">
//         <div className="flex min-w-0 items-start gap-3">
//           <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white">
//             <FileText className="h-5 w-5 text-[#32838c]" />
//           </div>

//           <div className="min-w-0">
//             <h3 className="text-xs font-bold text-slate-900">{title}</h3>

//             <p className="mt-1 text-[10px] leading-4 text-slate-400">
//               {description}
//             </p>
//           </div>
//         </div>

//         <span
//           className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-bold ${
//             required
//               ? "bg-rose-50 text-rose-500"
//               : "bg-slate-200 text-slate-500"
//           }`}
//         >
//           {required ? "Required" : "Optional"}
//         </span>
//       </div>

//       {file ? (
//         <div className="rounded-xl border border-emerald-200 bg-white p-3">
//           <div className="flex items-center gap-3">
//             <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-50">
//               <CheckCircle2 className="h-5 w-5 text-emerald-600" />
//             </div>

//             <div className="min-w-0 flex-1">
//               <p className="truncate text-xs font-bold text-slate-700">
//                 {file.name}
//               </p>

//               <p className="mt-1 text-[10px] text-slate-400">
//                 {(file.size / 1024 / 1024).toFixed(2)} MB
//               </p>
//             </div>
//           </div>

//           <div className="mt-3 flex items-center gap-3 border-t border-slate-100 pt-3">
//             <label className="flex cursor-pointer items-center gap-1 text-[10px] font-bold text-[#32838c]">
//               <RefreshCw className="h-3 w-3" />
//               Replace
//               <input
//                 type="file"
//                 accept=".pdf,.jpg,.jpeg,.png"
//                 className="hidden"
//                 onChange={(event) => onUpload(name, event)}
//               />
//             </label>

//             <button
//               type="button"
//               onClick={() => onRemove(name)}
//               className="flex items-center gap-1 text-[10px] font-bold text-red-500"
//             >
//               <X className="h-3 w-3" />
//               Remove
//             </button>
//           </div>
//         </div>
//       ) : (
//         <label className="flex min-h-[105px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-white transition hover:border-[#32838c]/40 hover:bg-[#32838c]/5">
//           <Upload className="h-6 w-6 text-[#32838c]" />

//           <p className="mt-2 text-xs font-bold text-slate-700">
//             Upload Document
//           </p>

//           <p className="mt-1 text-[10px] text-slate-400">
//             PDF, JPG, PNG · Max 5 MB
//           </p>

//           <input
//             type="file"
//             accept=".pdf,.jpg,.jpeg,.png"
//             className="hidden"
//             onChange={(event) => onUpload(name, event)}
//           />
//         </label>
//       )}
//     </div>
//   );
// }

// function ChecklistItem({ completed, text }) {
//   return (
//     <div className="flex items-center gap-3">
//       {completed ? (
//         <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
//       ) : (
//         <Circle className="h-4 w-4 shrink-0 text-slate-300" />
//       )}

//       <span
//         className={`text-xs ${
//           completed ? "font-medium text-slate-600" : "text-slate-400"
//         }`}
//       >
//         {text}
//       </span>
//     </div>
//   );
// }

// function GuideItem({ text }) {
//   return (
//     <div className="flex items-start gap-2">
//       <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#32838c]" />

//       <p className="text-xs leading-5 text-slate-500">{text}</p>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  IndianRupee,
  Bell,
  Settings,
  LogOut,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Circle,
  FileText,
  UserCircle,
  Image as ImageIcon,
  Upload,
  X,
  RefreshCw,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  Info,
  HelpCircle,
  Send,
  Clock3,
  ArrowLeft,
  Building2,
} from "lucide-react";

export default function DoctorDocuments() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [sections, setSections] = useState({
    information: true,
    professional: true,
    registration: true,
    photo: true,
    documents: true,
    clinic: true,
    declaration: true,
  });

  const [doctorForm, setDoctorForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",

    professionalType: "Physiotherapist",
    specialization: "",
    highestQualification: "",
    otherQualification: "",
    universityOrCollege: "",
    yearOfGraduation: "",
    experience: "",

    registrationNumber: "",
    registrationCouncil: "",
    registrationDate: "",

    consultationFee: "",
    availableDays: [],
    about: "",

    clinicName: "",
    clinicType: "",
    clinicAddress: "",
    city: "",
    state: "",
    pincode: "",
    clinicPhone: "",
    workingHours: "",

    declarationAccepted: false,
  });

  const [profilePhoto, setProfilePhoto] = useState(null);

  const [documents, setDocuments] = useState({
    medicalLicense: null,
    identityProof: null,
    degreeCertificate: null,
    experienceCertificate: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleSection = (section) => {
    setSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateDoctorForm = (field, value) => {
    setDoctorForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setIsSubmitted(false);
  };

  const toggleAvailableDay = (day) => {
    setDoctorForm((prev) => {
      const exists = prev.availableDays.includes(day);

      return {
        ...prev,
        availableDays: exists
          ? prev.availableDays.filter((item) => item !== day)
          : [...prev.availableDays, day],
      };
    });

    setIsSubmitted(false);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Maximum file size is 5 MB");
      event.target.value = "";
      return;
    }

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Only JPG and PNG images are allowed");
      event.target.value = "";
      return;
    }

    setProfilePhoto(file);
    setIsSubmitted(false);
    event.target.value = "";
  };

  const removePhoto = () => {
    setProfilePhoto(null);
    setIsSubmitted(false);
  };

  const handleDocumentUpload = (name, event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Maximum file size is 5 MB");
      event.target.value = "";
      return;
    }

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, JPG and PNG files are allowed");
      event.target.value = "";
      return;
    }

    setDocuments((prev) => ({
      ...prev,
      [name]: file,
    }));

    setIsSubmitted(false);
    event.target.value = "";
  };

  const removeDocument = (name) => {
    setDocuments((prev) => ({
      ...prev,
      [name]: null,
    }));

    setIsSubmitted(false);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const requiredFields = [
      ["fullName", "Full Name"],
      ["email", "Email"],
      ["phone", "Phone"],
      ["dateOfBirth", "Date of Birth"],
      ["gender", "Gender"],
      ["address", "Address"],
      ["professionalType", "Professional Type"],
      ["specialization", "Specialization"],
      ["highestQualification", "Highest Qualification"],
      ["experience", "Experience"],
      ["registrationNumber", "Registration Number"],
      ["consultationFee", "Consultation Fee"],
      ["clinicName", "Clinic Name"],
      ["clinicType", "Clinic Type"],
      ["clinicAddress", "Clinic Address"],
      ["city", "City"],
      ["state", "State"],
      ["pincode", "Pincode"],
    ];

    const missingField = requiredFields.find(
      ([field]) => !String(doctorForm[field] || "").trim(),
    );

    if (missingField) {
      alert(`${missingField[1]} is required`);
      return;
    }

    if (doctorForm.availableDays.length === 0) {
      alert("Please select at least one available day");
      return;
    }

    if (!doctorForm.declarationAccepted) {
      alert("Please accept the declaration");
      return;
    }

    if (!profilePhoto) {
      alert("Profile photo is required");
      return;
    }

    const requiredDocuments = [
      ["medicalLicense", "Medical License"],
      ["identityProof", "Identity Proof"],
      ["degreeCertificate", "Degree Certificate"],
      ["experienceCertificate", "Experience Certificate"],
    ];

    const missingDocument = requiredDocuments.find(
      ([field]) => !documents[field],
    );

    if (missingDocument) {
      alert(`${missingDocument[1]} is required`);
      return;
    }

    setIsSubmitting(true);
    setIsSubmitted(false);

    try {
      const formData = new FormData();

      formData.append("fullName", doctorForm.fullName);
      formData.append("email", doctorForm.email);
      formData.append("phone", doctorForm.phone);
      formData.append("dateOfBirth", doctorForm.dateOfBirth);
      formData.append("gender", doctorForm.gender);
      formData.append("address", doctorForm.address);

      formData.append("professionalType", doctorForm.professionalType);

      formData.append("specialization", doctorForm.specialization);

      formData.append("highestQualification", doctorForm.highestQualification);

      formData.append("otherQualification", doctorForm.otherQualification);

      formData.append("universityOrCollege", doctorForm.universityOrCollege);

      formData.append("yearOfGraduation", doctorForm.yearOfGraduation);

      formData.append("experience", doctorForm.experience);

      formData.append("registrationNumber", doctorForm.registrationNumber);

      formData.append("registrationCouncil", doctorForm.registrationCouncil);

      formData.append("registrationDate", doctorForm.registrationDate);

      formData.append("consultationFee", doctorForm.consultationFee);

      formData.append(
        "availableDays",
        JSON.stringify(doctorForm.availableDays),
      );

      formData.append("about", doctorForm.about);

      formData.append("clinicName", doctorForm.clinicName);
      formData.append("clinicType", doctorForm.clinicType);
      formData.append("clinicAddress", doctorForm.clinicAddress);
      formData.append("city", doctorForm.city);
      formData.append("state", doctorForm.state);
      formData.append("pincode", doctorForm.pincode);
      formData.append("clinicPhone", doctorForm.clinicPhone);
      formData.append("workingHours", doctorForm.workingHours);

      formData.append(
        "declarationAccepted",
        String(doctorForm.declarationAccepted),
      );

      formData.append("profilePhoto", profilePhoto);

      formData.append("medicalLicense", documents.medicalLicense);

      formData.append("identityProof", documents.identityProof);

      formData.append("degreeCertificate", documents.degreeCertificate);

      formData.append("experienceCertificate", documents.experienceCertificate);

      console.log("SENDING DOCTOR DATA");

      const response = await fetch(
        "http://localhost:8000/api/v1/pattner/doctor_dv",
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();

      console.log("DOCTOR DV RESPONSE:", result);

      if (!response.ok) {
        throw new Error(
          result?.message ||
            result?.error ||
            "Failed to submit doctor verification",
        );
      }

      setIsSubmitted(true);

      alert("Doctor verification submitted successfully");
    } catch (error) {
      console.error("Submission error:", error);
      alert(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadedDocuments = Object.values(documents).filter(Boolean).length;

  const personalComplete =
    doctorForm.fullName &&
    doctorForm.email &&
    doctorForm.phone &&
    doctorForm.dateOfBirth &&
    doctorForm.gender &&
    doctorForm.address;

  const professionalComplete =
    doctorForm.professionalType &&
    doctorForm.specialization &&
    doctorForm.highestQualification &&
    doctorForm.experience &&
    doctorForm.consultationFee;

  const registrationComplete = doctorForm.registrationNumber;

  const clinicComplete =
    doctorForm.clinicName &&
    doctorForm.clinicType &&
    doctorForm.clinicAddress &&
    doctorForm.city &&
    doctorForm.state &&
    doctorForm.pincode;

  const completedItems = [
    Boolean(personalComplete),
    Boolean(professionalComplete),
    Boolean(registrationComplete),
    Boolean(profilePhoto),
    uploadedDocuments === 4,
    Boolean(clinicComplete),
    Boolean(doctorForm.declarationAccepted),
  ].filter(Boolean).length;

  const progress = Math.round((completedItems / 7) * 100);

  return (
    <div className="min-h-screen bg-slate-50">
      {mobileOpen && (
        <button
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
          aria-label="Close sidebar"
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
              to="/doctor/dashboard"
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

                <p className="text-[10px] text-slate-400">Doctor Portal</p>
              </div>
            </Link>
          </div>

          <div className="mx-4 mt-5 rounded-2xl bg-[#32838c]/5 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#32838c] text-white">
                <Stethoscope className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">
                  {doctorForm.fullName || "Doctor"}
                </p>

                <p className="truncate text-xs text-slate-500">
                  {doctorForm.specialization || "Doctor Profile"}
                </p>
              </div>
            </div>
          </div>

          <nav className="mt-6 flex-1 space-y-1 px-3">
            <SidebarItem
              icon={LayoutDashboard}
              label="Dashboard"
              to="/doctor/dashboard"
              onClick={() => setMobileOpen(false)}
            />

            <SidebarItem
              icon={CalendarDays}
              label="Appointments"
              to="/doctor/appointments"
              onClick={() => setMobileOpen(false)}
            />

            <SidebarItem
              icon={Users}
              label="Patients"
              to="/doctor/patients"
              onClick={() => setMobileOpen(false)}
            />

            <SidebarItem
              icon={IndianRupee}
              label="Payments"
              to="/doctor/payments"
              onClick={() => setMobileOpen(false)}
            />

            <SidebarItem
              icon={Bell}
              label="Notifications"
              to="/doctor/notifications"
              onClick={() => setMobileOpen(false)}
            />

            <div className="my-4 border-t border-slate-100" />

            <SidebarItem
              icon={UserCircle}
              label="Doctor Profile"
              to="/doctor/profile"
              onClick={() => setMobileOpen(false)}
            />

            <SidebarItem
              icon={FileText}
              label="Document Verification"
              active
              to="/doctor/verification"
              onClick={() => setMobileOpen(false)}
            />

            <SidebarItem
              icon={Settings}
              label="Settings"
              to="/doctor/settings"
              onClick={() => setMobileOpen(false)}
            />
          </nav>

          <div className="border-t border-slate-100 p-4">
            <Link
              to="/doctor/login"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Link>
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
              ☰
            </button>

            <div className="hidden md:block">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Link to="/doctor/profile" className="hover:text-[#32838c]">
                  Doctor Profile
                </Link>

                <span>›</span>

                <span className="text-slate-600">Document Verification</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="hidden h-8 w-px bg-slate-200 sm:block" />

            <div className="hidden items-center gap-3 sm:flex">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#32838c]/10">
                <Stethoscope className="h-5 w-5 text-[#32838c]" />
              </div>

              <div className="max-w-48">
                <p className="truncate text-sm font-bold text-slate-900">
                  {doctorForm.fullName || "Doctor"}
                </p>

                <p className="text-xs text-slate-400">Doctor</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-7 flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="flex items-start gap-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-[#32838c]/30 hover:text-[#32838c]"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              <div>
                <div className="mb-3 flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                    <img
                      src="/image.png"
                      alt="LiBi Motion Care"
                      className="h-9 w-9 object-contain"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#32838c]">
                      LiBi Motion Care
                    </p>

                    <p className="text-[10px] text-slate-400">
                      Doctor Verification Portal
                    </p>
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Doctor Verification
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Complete your doctor profile and upload the required photo and
                  professional documents for verification.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-white px-4 py-3 shadow-sm">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50">
                <ShieldCheck className="h-5 w-5 text-amber-600" />
              </div>

              <div>
                <p className="text-sm font-bold text-amber-600">
                  Pending Verification
                </p>

                <p className="text-xs text-slate-400">
                  Complete all required information
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-5">
              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <button
                  onClick={() => toggleSection("information")}
                  className="flex w-full items-center justify-between p-5 text-left sm:p-6"
                >
                  <SectionTitle
                    icon={UserCircle}
                    title="Personal Information"
                    subtitle="Basic information about the doctor"
                    required
                  />

                  {sections.information ? (
                    <ChevronUp className="h-5 w-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  )}
                </button>

                {sections.information && (
                  <div className="border-t border-slate-100 p-5 sm:p-6">
                    <div className="grid gap-5 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2">
                      <DoctorInput
                        icon={UserCircle}
                        label="Full Name"
                        value={doctorForm.fullName}
                        onChange={(value) =>
                          updateDoctorForm("fullName", value)
                        }
                      />

                      <DoctorInput
                        icon={Mail}
                        label="Email"
                        type="email"
                        value={doctorForm.email}
                        onChange={(value) => updateDoctorForm("email", value)}
                      />

                      <DoctorInput
                        icon={Phone}
                        label="Phone"
                        type="tel"
                        value={doctorForm.phone}
                        onChange={(value) => updateDoctorForm("phone", value)}
                      />

                      <DoctorInput
                        icon={CalendarDays}
                        label="Date of Birth"
                        type="date"
                        value={doctorForm.dateOfBirth}
                        onChange={(value) =>
                          updateDoctorForm("dateOfBirth", value)
                        }
                      />

                      <div>
                        <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                          Gender
                        </label>

                        <select
                          value={doctorForm.gender}
                          onChange={(event) =>
                            updateDoctorForm("gender", event.target.value)
                          }
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-[#32838c]"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <DoctorInput
                        icon={MapPin}
                        label="Address"
                        value={doctorForm.address}
                        onChange={(value) => updateDoctorForm("address", value)}
                      />
                    </div>
                  </div>
                )}
              </section>

              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <button
                  onClick={() => toggleSection("professional")}
                  className="flex w-full items-center justify-between p-5 text-left sm:p-6"
                >
                  <SectionTitle
                    icon={Stethoscope}
                    title="Professional Information"
                    subtitle="Professional qualification and experience"
                    required
                  />

                  {sections.professional ? (
                    <ChevronUp className="h-5 w-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  )}
                </button>

                {sections.professional && (
                  <div className="border-t border-slate-100 p-5 sm:p-6">
                    <div className="grid gap-5 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2">
                      <SelectInput
                        icon={Stethoscope}
                        label="Professional Type"
                        value={doctorForm.professionalType}
                        onChange={(value) =>
                          updateDoctorForm("professionalType", value)
                        }
                        options={["Doctor", "Physiotherapist"]}
                      />

                      <DoctorInput
                        icon={Stethoscope}
                        label="Specialization"
                        value={doctorForm.specialization}
                        onChange={(value) =>
                          updateDoctorForm("specialization", value)
                        }
                      />

                      <DoctorInput
                        icon={FileText}
                        label="Highest Qualification"
                        value={doctorForm.highestQualification}
                        onChange={(value) =>
                          updateDoctorForm("highestQualification", value)
                        }
                      />

                      <DoctorInput
                        icon={FileText}
                        label="Other Qualification"
                        value={doctorForm.otherQualification}
                        onChange={(value) =>
                          updateDoctorForm("otherQualification", value)
                        }
                      />

                      <DoctorInput
                        icon={Building2}
                        label="University / College"
                        value={doctorForm.universityOrCollege}
                        onChange={(value) =>
                          updateDoctorForm("universityOrCollege", value)
                        }
                      />

                      <DoctorInput
                        icon={CalendarDays}
                        label="Year of Graduation"
                        type="number"
                        value={doctorForm.yearOfGraduation}
                        onChange={(value) =>
                          updateDoctorForm("yearOfGraduation", value)
                        }
                      />

                      <DoctorInput
                        icon={Clock3}
                        label="Experience"
                        type="number"
                        value={doctorForm.experience}
                        onChange={(value) =>
                          updateDoctorForm("experience", value)
                        }
                      />

                      <DoctorInput
                        icon={IndianRupee}
                        label="Consultation Fee"
                        type="number"
                        value={doctorForm.consultationFee}
                        onChange={(value) =>
                          updateDoctorForm("consultationFee", value)
                        }
                      />

                      <div className="sm:col-span-2">
                        <label className="mb-3 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                          Available Days
                        </label>

                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
                          {[
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat",
                            "Sun",
                          ].map((day) => {
                            const selected =
                              doctorForm.availableDays.includes(day);

                            return (
                              <button
                                key={day}
                                type="button"
                                onClick={() => toggleAvailableDay(day)}
                                className={`rounded-xl border px-3 py-3 text-xs font-bold transition ${
                                  selected
                                    ? "border-[#32838c] bg-[#32838c] text-white"
                                    : "border-slate-200 bg-white text-slate-500 hover:border-[#32838c]"
                                }`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                          About
                        </label>

                        <textarea
                          value={doctorForm.about}
                          onChange={(event) =>
                            updateDoctorForm("about", event.target.value)
                          }
                          rows={4}
                          placeholder="Describe your experience, expertise and professional background"
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-[#32838c]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </section>

              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <button
                  onClick={() => toggleSection("registration")}
                  className="flex w-full items-center justify-between p-5 text-left sm:p-6"
                >
                  <SectionTitle
                    icon={ShieldCheck}
                    title="Registration Information"
                    subtitle="Professional registration details"
                    required
                  />

                  {sections.registration ? (
                    <ChevronUp className="h-5 w-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  )}
                </button>

                {sections.registration && (
                  <div className="border-t border-slate-100 p-5 sm:p-6">
                    <div className="grid gap-5 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2">
                      <DoctorInput
                        icon={FileText}
                        label="Registration Number"
                        value={doctorForm.registrationNumber}
                        onChange={(value) =>
                          updateDoctorForm("registrationNumber", value)
                        }
                      />

                      <DoctorInput
                        icon={Building2}
                        label="Registration Council"
                        value={doctorForm.registrationCouncil}
                        onChange={(value) =>
                          updateDoctorForm("registrationCouncil", value)
                        }
                      />

                      <DoctorInput
                        icon={CalendarDays}
                        label="Registration Date"
                        type="date"
                        value={doctorForm.registrationDate}
                        onChange={(value) =>
                          updateDoctorForm("registrationDate", value)
                        }
                      />
                    </div>
                  </div>
                )}
              </section>

              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <AccordionHeader
                  icon={ImageIcon}
                  number="4"
                  title="Doctor Photo"
                  subtitle="Upload one clear professional photo"
                  count={profilePhoto ? "1/1 Uploaded" : "0/1 Uploaded"}
                  open={sections.photo}
                  onClick={() => toggleSection("photo")}
                  required
                />

                {sections.photo && (
                  <div className="border-t border-slate-100 p-5 sm:p-6">
                    <div className="max-w-sm">
                      <PhotoUpload
                        file={profilePhoto}
                        onUpload={handlePhotoUpload}
                        onRemove={removePhoto}
                      />
                    </div>
                  </div>
                )}
              </section>

              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <AccordionHeader
                  icon={FileText}
                  number="5"
                  title="Professional Documents"
                  subtitle="Upload your professional verification documents"
                  count={`${uploadedDocuments}/4 Uploaded`}
                  open={sections.documents}
                  onClick={() => toggleSection("documents")}
                  required
                />

                {sections.documents && (
                  <div className="border-t border-slate-100 p-5 sm:p-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <DocumentUpload
                        name="medicalLicense"
                        title="Medical License"
                        description="Valid medical or professional registration license"
                        file={documents.medicalLicense}
                        onUpload={handleDocumentUpload}
                        onRemove={removeDocument}
                      />

                      <DocumentUpload
                        name="identityProof"
                        title="Identity Proof"
                        description="Aadhaar, PAN or Driving License"
                        file={documents.identityProof}
                        onUpload={handleDocumentUpload}
                        onRemove={removeDocument}
                      />

                      <DocumentUpload
                        name="degreeCertificate"
                        title="Degree Certificate"
                        description="Professional degree or qualification certificate"
                        file={documents.degreeCertificate}
                        onUpload={handleDocumentUpload}
                        onRemove={removeDocument}
                      />

                      <DocumentUpload
                        name="experienceCertificate"
                        title="Experience Certificate"
                        description="Previous employment or experience proof"
                        file={documents.experienceCertificate}
                        onUpload={handleDocumentUpload}
                        onRemove={removeDocument}
                      />
                    </div>
                  </div>
                )}
              </section>

              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <AccordionHeader
                  icon={Building2}
                  number="6"
                  title="Clinic Information"
                  subtitle="Clinic associated with the doctor"
                  count={doctorForm.clinicName ? "Completed" : "Required"}
                  open={sections.clinic}
                  onClick={() => toggleSection("clinic")}
                />

                {sections.clinic && (
                  <div className="border-t border-slate-100 p-5 sm:p-6">
                    <div className="grid gap-5 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2">
                      <DoctorInput
                        icon={Building2}
                        label="Clinic Name"
                        value={doctorForm.clinicName}
                        onChange={(value) =>
                          updateDoctorForm("clinicName", value)
                        }
                      />

                      <DoctorInput
                        icon={Building2}
                        label="Clinic Type"
                        value={doctorForm.clinicType}
                        onChange={(value) =>
                          updateDoctorForm("clinicType", value)
                        }
                      />

                      <DoctorInput
                        icon={MapPin}
                        label="Clinic Address"
                        value={doctorForm.clinicAddress}
                        onChange={(value) =>
                          updateDoctorForm("clinicAddress", value)
                        }
                      />

                      <DoctorInput
                        icon={MapPin}
                        label="City"
                        value={doctorForm.city}
                        onChange={(value) => updateDoctorForm("city", value)}
                      />

                      <DoctorInput
                        icon={MapPin}
                        label="State"
                        value={doctorForm.state}
                        onChange={(value) => updateDoctorForm("state", value)}
                      />

                      <DoctorInput
                        icon={MapPin}
                        label="Pincode"
                        value={doctorForm.pincode}
                        onChange={(value) => updateDoctorForm("pincode", value)}
                      />

                      <DoctorInput
                        icon={Phone}
                        label="Clinic Phone"
                        type="tel"
                        value={doctorForm.clinicPhone}
                        onChange={(value) =>
                          updateDoctorForm("clinicPhone", value)
                        }
                      />

                      <DoctorInput
                        icon={Clock3}
                        label="Working Hours"
                        value={doctorForm.workingHours}
                        onChange={(value) =>
                          updateDoctorForm("workingHours", value)
                        }
                      />
                    </div>
                  </div>
                )}
              </section>

              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <button
                  onClick={() => toggleSection("declaration")}
                  className="flex w-full items-center justify-between p-5 text-left sm:p-6"
                >
                  <SectionTitle
                    icon={ShieldCheck}
                    title="Declaration"
                    subtitle="Confirm that the information provided is correct"
                    required
                  />

                  {sections.declaration ? (
                    <ChevronUp className="h-5 w-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  )}
                </button>

                {sections.declaration && (
                  <div className="border-t border-slate-100 p-5 sm:p-6">
                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <input
                        type="checkbox"
                        checked={doctorForm.declarationAccepted}
                        onChange={(event) =>
                          updateDoctorForm(
                            "declarationAccepted",
                            event.target.checked,
                          )
                        }
                        className="mt-1 h-4 w-4 accent-[#32838c]"
                      />

                      <span className="text-xs leading-5 text-slate-600">
                        I hereby declare that all information provided by me is
                        true and correct to the best of my knowledge. I
                        understand that incorrect or false information may
                        result in rejection of my verification.
                      </span>
                    </label>
                  </div>
                )}
              </section>

              <section className="rounded-3xl border border-[#32838c]/20 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#32838c]/10">
                      <Info className="h-5 w-5 text-[#32838c]" />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Review & Submit
                      </h3>

                      <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
                        Please check all information and documents before
                        submitting your doctor verification.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-6 py-3 text-xs font-bold text-white transition ${
                      isSubmitting
                        ? "cursor-not-allowed bg-[#32838c]/70"
                        : "bg-[#32838c] hover:bg-[#286f77]"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Submitting...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Submitted
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Submit for Verification
                      </>
                    )}
                  </button>
                </div>
              </section>
            </div>

            <aside className="space-y-5">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="relative grid h-20 w-20 shrink-0 place-items-center rounded-full border-[7px] border-[#32838c]/15">
                    <div
                      className="absolute inset-[-7px] rounded-full border-[7px] border-transparent border-t-[#32838c]"
                      style={{
                        transform: `rotate(${progress * 3.6 - 45}deg)`,
                      }}
                    />

                    <div className="text-center">
                      <p className="text-lg font-bold text-slate-900">
                        {progress}%
                      </p>

                      <p className="text-[9px] text-slate-400">Complete</p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Verification Progress
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Complete all required information
                    </p>
                  </div>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#32838c] transition-all duration-500"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#32838c]/10">
                    <CheckCircle2 className="h-5 w-5 text-[#32838c]" />
                  </div>

                  <h2 className="text-sm font-bold text-slate-900">
                    Required Information
                  </h2>
                </div>

                <div className="space-y-4">
                  <ChecklistItem
                    completed={Boolean(personalComplete)}
                    text="Complete personal information"
                  />

                  <ChecklistItem
                    completed={Boolean(professionalComplete)}
                    text="Complete professional information"
                  />

                  <ChecklistItem
                    completed={Boolean(registrationComplete)}
                    text="Complete registration information"
                  />

                  <ChecklistItem
                    completed={Boolean(profilePhoto)}
                    text="Upload doctor photo"
                  />

                  <ChecklistItem
                    completed={uploadedDocuments === 4}
                    text="Upload all professional documents"
                  />

                  <ChecklistItem
                    completed={Boolean(clinicComplete)}
                    text="Complete clinic information"
                  />

                  <ChecklistItem
                    completed={doctorForm.declarationAccepted}
                    text="Accept declaration"
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-[#32838c]/10 bg-[#32838c]/5 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white">
                    <Info className="h-5 w-5 text-[#32838c]" />
                  </div>

                  <h2 className="text-sm font-bold text-slate-900">
                    Guidelines
                  </h2>
                </div>

                <div className="space-y-3">
                  <GuideItem text="Upload clear and valid documents" />
                  <GuideItem text="Accepted formats: PDF, JPG, PNG" />
                  <GuideItem text="Maximum file size: 5 MB per file" />
                  <GuideItem text="Make sure document details are readable" />
                  <GuideItem text="Upload one clear professional photo" />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#32838c]/10">
                    <HelpCircle className="h-5 w-5 text-[#32838c]" />
                  </div>

                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Need Help?
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Need help with your documents?
                    </p>
                  </div>
                </div>

                <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#32838c] py-3 text-xs font-bold text-[#32838c] hover:bg-[#32838c]/5">
                  <Mail className="h-4 w-4" />
                  Contact Support
                </button>
              </div>
            </aside>
          </div>
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

function SectionTitle({ icon: Icon, title, subtitle, required }) {
  return (
    <div className="flex items-center gap-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#32838c]/10">
        <Icon className="h-5 w-5 text-[#32838c]" />
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-sm font-bold text-slate-900">{title}</h2>

          {required && (
            <span className="rounded-full bg-rose-50 px-2 py-1 text-[10px] font-bold text-rose-500">
              Required
            </span>
          )}
        </div>

        <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
      </div>
    </div>
  );
}

function AccordionHeader({
  icon: Icon,
  number,
  title,
  subtitle,
  count,
  open,
  onClick,
  required = false,
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between p-5 text-left sm:p-6"
    >
      <div className="flex min-w-0 items-center gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#32838c]/10">
          <Icon className="h-5 w-5 text-[#32838c]" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
              {number}
            </span>

            <h2 className="text-sm font-bold text-slate-900">{title}</h2>

            {required && (
              <span className="rounded-full bg-rose-50 px-2 py-1 text-[10px] font-bold text-rose-500">
                Required
              </span>
            )}
          </div>

          <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
        </div>
      </div>

      <div className="ml-3 flex shrink-0 items-center gap-3">
        <span className="hidden rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500 sm:block">
          {count}
        </span>

        {open ? (
          <ChevronUp className="h-5 w-5 text-slate-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-slate-400" />
        )}
      </div>
    </button>
  );
}

function DoctorInput({ icon: Icon, label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </label>

      <div className="relative">
        <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#32838c]" />

        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#32838c] focus:ring-2 focus:ring-[#32838c]/10"
        />
      </div>
    </div>
  );
}

function SelectInput({ icon: Icon, label, value, onChange, options }) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </label>

      <div className="relative">
        <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#32838c]" />

        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-9 text-sm font-semibold text-slate-700 outline-none focus:border-[#32838c]"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  );
}

function PhotoUpload({ file, onUpload, onRemove }) {
  return (
    <div className="relative">
      <label
        className={`group flex min-h-[240px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-4 text-center transition ${
          file
            ? "border-emerald-200 bg-emerald-50/40"
            : "border-slate-200 bg-slate-50 hover:border-[#32838c]/40 hover:bg-[#32838c]/5"
        }`}
      >
        {file ? (
          <>
            <div className="grid h-24 w-24 place-items-center overflow-hidden rounded-full bg-white shadow-sm">
              <img
                src={URL.createObjectURL(file)}
                alt="Doctor"
                className="h-full w-full object-cover"
              />
            </div>

            <p className="mt-3 max-w-full truncate text-xs font-bold text-slate-700">
              {file.name}
            </p>

            <p className="mt-1 text-[10px] text-slate-400">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </>
        ) : (
          <>
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-white shadow-sm">
              <ImageIcon className="h-6 w-6 text-[#32838c]" />
            </div>

            <p className="mt-3 text-xs font-bold text-slate-700">
              Upload Doctor Photo
            </p>

            <p className="mt-1 text-[10px] text-slate-400">
              Professional profile photo
            </p>

            <div className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-[#32838c]">
              <Upload className="h-3 w-3" />
              Choose Image
            </div>
          </>
        )}

        <input
          type="file"
          accept="image/jpeg,image/png"
          className="hidden"
          onChange={onUpload}
        />
      </label>

      {file && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white text-red-500 shadow-sm hover:bg-red-50"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

function DocumentUpload({
  name,
  title,
  description,
  file,
  onUpload,
  onRemove,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white">
            <FileText className="h-5 w-5 text-[#32838c]" />
          </div>

          <div className="min-w-0">
            <h3 className="text-xs font-bold text-slate-900">{title}</h3>

            <p className="mt-1 text-[10px] leading-4 text-slate-400">
              {description}
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-rose-50 px-2 py-1 text-[9px] font-bold text-rose-500">
          Required
        </span>
      </div>

      {file ? (
        <div className="rounded-xl border border-emerald-200 bg-white p-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-50">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-slate-700">
                {file.name}
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3 border-t border-slate-100 pt-3">
            <label className="flex cursor-pointer items-center gap-1 text-[10px] font-bold text-[#32838c]">
              <RefreshCw className="h-3 w-3" />
              Replace
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(event) => onUpload(name, event)}
              />
            </label>

            <button
              type="button"
              onClick={() => onRemove(name)}
              className="flex items-center gap-1 text-[10px] font-bold text-red-500"
            >
              <X className="h-3 w-3" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <label className="flex min-h-[105px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-white transition hover:border-[#32838c]/40 hover:bg-[#32838c]/5">
          <Upload className="h-6 w-6 text-[#32838c]" />

          <p className="mt-2 text-xs font-bold text-slate-700">
            Upload Document
          </p>

          <p className="mt-1 text-[10px] text-slate-400">
            PDF, JPG, PNG · Max 5 MB
          </p>

          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(event) => onUpload(name, event)}
          />
        </label>
      )}
    </div>
  );
}

function ChecklistItem({ completed, text }) {
  return (
    <div className="flex items-center gap-3">
      {completed ? (
        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
      ) : (
        <Circle className="h-4 w-4 shrink-0 text-slate-300" />
      )}

      <span
        className={`text-xs ${
          completed ? "font-medium text-slate-600" : "text-slate-400"
        }`}
      >
        {text}
      </span>
    </div>
  );
}

function GuideItem({ text }) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#32838c]" />

      <p className="text-xs leading-5 text-slate-500">{text}</p>
    </div>
  );
}
