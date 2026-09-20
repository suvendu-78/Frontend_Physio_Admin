import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Menu,
} from "lucide-react";

export default function DoctorDocuments() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [documents, setDocuments] = useState({
    medicalLicense: null,
    identityProof: null,
    degreeCertificate: null,
    experienceCertificate: null,
  });

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

  const getValue = (value) => {
    if (value === undefined || value === null) return "";
    return String(value);
  };

  const fetchDoctor = async () => {
    try {
      const response = await fetch(
        "https://physio-backend-sand.vercel.app/api/v1/pattner/finddoctor",
        {
          method: "GET",
          credentials: "include",
        },
      );

      const result = await response.json();

      if (!response.ok) return;

      const doctor = result?.data?.doctor || result?.doctor;

      if (!doctor) return;

      setDoctorForm((prev) => ({
        ...prev,
        fullName: doctor.fullName || prev.fullName,
        email: doctor.email || prev.email,
        phone: doctor.phone || prev.phone,
        dateOfBirth: doctor.dateOfBirth
          ? String(doctor.dateOfBirth).slice(0, 10)
          : prev.dateOfBirth,
        gender: doctor.gender || prev.gender,
        address: doctor.address || prev.address,
        professionalType: doctor.professionalType || prev.professionalType,
        specialization: doctor.specialization || prev.specialization,
        highestQualification:
          doctor.highestQualification ||
          doctor.qualification ||
          prev.highestQualification,
        otherQualification:
          doctor.otherQualification || prev.otherQualification,
        universityOrCollege:
          doctor.universityOrCollege || prev.universityOrCollege,
        yearOfGraduation:
          doctor.yearOfGraduation !== undefined
            ? String(doctor.yearOfGraduation)
            : prev.yearOfGraduation,
        experience:
          doctor.experience !== undefined
            ? String(doctor.experience)
            : prev.experience,
        registrationNumber:
          doctor.registrationNumber || prev.registrationNumber,
        registrationCouncil:
          doctor.registrationCouncil || prev.registrationCouncil,
        registrationDate: doctor.registrationDate || prev.registrationDate,
        consultationFee:
          doctor.consultationFee !== undefined
            ? String(doctor.consultationFee)
            : prev.consultationFee,
        availableDays: Array.isArray(doctor.availableDays)
          ? doctor.availableDays
          : prev.availableDays,
        about: doctor.about || prev.about,
        clinicName: doctor.clinicName || doctor.clinic?.name || prev.clinicName,
        clinicType: doctor.clinicType || doctor.clinic?.type || prev.clinicType,
        clinicAddress:
          doctor.clinicAddress || doctor.clinic?.address || prev.clinicAddress,
        city: doctor.city || doctor.clinic?.city || prev.city,
        state: doctor.state || doctor.clinic?.state || prev.state,
        pincode:
          doctor.pincode !== undefined
            ? String(doctor.pincode)
            : doctor.clinic?.pincode || prev.pincode,
        clinicPhone:
          doctor.clinicPhone || doctor.clinic?.phone || prev.clinicPhone,
        workingHours:
          doctor.workingHours ||
          doctor.clinic?.workingHours ||
          prev.workingHours,
      }));
    } catch (error) {
      console.error("Doctor fetch error:", error);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://physio-backend-sand.vercel.app/api/v1/pattner/doctorLogout",
        {
          method: "POST",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert("Logged out successfully");
        navigate("/doctor/login");
      } else {
        alert(data?.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong during logout");
    }
  };

  const toggleSection = (name) => {
    setSections((prev) => ({
      ...prev,
      [name]: !prev[name],
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

  const handleDocumentUpload = (name, event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Maximum file size is 5 MB");
      event.target.value = "";
      return;
    }

    if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
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

  const removePhoto = () => {
    setProfilePhoto(null);
    setIsSubmitted(false);
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

      Object.entries(doctorForm).forEach(([key, value]) => {
        if (key === "availableDays") {
          formData.append(key, JSON.stringify(value));
        } else if (key === "declarationAccepted") {
          formData.append(key, String(value));
        } else {
          formData.append(key, value);
        }
      });

      formData.append("profilePhoto", profilePhoto);
      formData.append("medicalLicense", documents.medicalLicense);
      formData.append("identityProof", documents.identityProof);
      formData.append("degreeCertificate", documents.degreeCertificate);
      formData.append("experienceCertificate", documents.experienceCertificate);

      const response = await fetch(
        "https://physio-backend-sand.vercel.app/api/v1/pattner/doctor_dv",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            result?.error ||
            "Failed to submit doctor verification",
        );
      }

      setIsSubmitted(true);
      alert("Doctor verification submitted successfully");
      navigate("/DocumentVerification");
    } catch (error) {
      console.error("Submission error:", error);
      alert(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadedDocuments = Object.values(documents).filter(Boolean).length;

  const completedItems = [
    Boolean(
      doctorForm.fullName &&
      doctorForm.email &&
      doctorForm.phone &&
      doctorForm.dateOfBirth &&
      doctorForm.gender &&
      doctorForm.address,
    ),
    Boolean(
      doctorForm.professionalType &&
      doctorForm.specialization &&
      doctorForm.highestQualification &&
      doctorForm.experience &&
      doctorForm.consultationFee,
    ),
    Boolean(doctorForm.registrationNumber),
    Boolean(profilePhoto),
    uploadedDocuments === 4,
    Boolean(
      doctorForm.clinicName &&
      doctorForm.clinicType &&
      doctorForm.clinicAddress &&
      doctorForm.city &&
      doctorForm.state &&
      doctorForm.pincode,
    ),
    Boolean(doctorForm.declarationAccepted),
  ].filter(Boolean).length;

  const progress = Math.round((completedItems / 7) * 100);

  const doctorName = doctorForm.fullName || "Doctor";

  const initials = doctorName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((item) => item[0])
    .join("")
    .toUpperCase();

  const handleLogouts = async () => {
    try {
      const response = await fetch(
        "https://physio-backend-sand.vercel.app/api/v1/pattner/doctorLogout",
        {
          method: "POST",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert("Logged out successfully");
        navigate("/doctor/login");
      } else {
        alert(data?.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong during logout");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {mobileOpen && (
        <button
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-800 bg-[#081f29] transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center border-b border-white/10 px-6">
            <Link
              to="/doctor/dashboard"
              className="flex items-center gap-3"
              onClick={() => setMobileOpen(false)}
            >
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

                <p className="mt-0.5 text-[10px] text-slate-400">
                  Doctor Portal
                </p>
              </div>
            </Link>
          </div>

          <div className="border-b border-white/10 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#32838c] text-sm font-bold text-white">
                {initials || "D"}
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-white">
                  {doctorName}
                </p>

                <p className="mt-1 truncate text-[10px] text-slate-400">
                  {doctorForm.specialization || "Doctor Profile"}
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Workspace
            </p>

            <SidebarItem
              icon={LayoutDashboard}
              label="Dashboard"
              to="/doctor/dashboard"
              onClick={() => setMobileOpen(false)}
            />

            {/* <SidebarItem
              icon={CalendarDays}
              label="Appointments"
              to="/doctor/appointments"
              onClick={() => setMobileOpen(false)}
            /> */}

            <SidebarItem
              icon={Users}
              label="Patients"
              to="/doctor/patients"
              onClick={() => setMobileOpen(false)}
            />
            {/* 
            <SidebarItem
              icon={IndianRupee}
              label="Payments"
              to="/doctor/payments"
              onClick={() => setMobileOpen(false)}
            /> */}

            {/* <SidebarItem
              icon={Bell}
              label="Notifications"
              to="/doctor/notifications"
              onClick={() => setMobileOpen(false)}
            /> */}

            <p className="mb-3 mt-8 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Account
            </p>

            {/* <SidebarItem
              icon={UserCircle}
              label="Profile"
              to="/doctor/profile"
              onClick={() => setMobileOpen(false)}
            /> */}

            <SidebarItem
              icon={FileText}
              label="Document Verification"
              active
              to="/doctor/documents"
              onClick={() => setMobileOpen(false)}
            />

            <SidebarItem
              icon={Settings}
              label="Settings"
              to="/doctor/settings"
              onClick={() => setMobileOpen(false)}
            />
          </nav>

          <div className="border-t border-white/10 p-4">
            <button
              type="button"
              // onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white"
              onClick={handleLogouts}
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex h-20 items-center justify-between px-5 sm:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 lg:hidden"
              >
                <Menu size={19} />
              </button>

              <div className="hidden lg:block">
                <p className="text-xs font-semibold text-slate-400">
                  Doctor Portal
                </p>

                <h1 className="mt-1 text-lg font-bold text-slate-900">
                  Document Verification
                </h1>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <button
                type="button"
                className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-[#32838c] hover:text-[#32838c]"
              >
                <Bell size={18} />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
              </button>

              <div className="hidden h-8 w-px bg-slate-200 sm:block" />

              <div className="hidden items-center gap-3 sm:flex">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#32838c] text-sm font-bold text-white">
                  {initials || "D"}
                </div>

                <div className="max-w-48">
                  <p className="truncate text-sm font-bold text-slate-900">
                    {doctorName}
                  </p>

                  <p className="truncate text-xs text-slate-400">
                    {doctorForm.specialization || "Doctor"}
                  </p>
                </div>
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
                  {isSubmitted ? "Submitted" : "Pending Verification"}
                </p>

                <p className="text-xs text-slate-400">
                  {progress}% profile completed
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-bold text-slate-700">
                Verification Progress
              </p>

              <p className="text-xs font-bold text-[#32838c]">{progress}%</p>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[#32838c] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-5">
              <VerificationSection
                open={sections.information}
                onClick={() => toggleSection("information")}
                icon={UserCircle}
                title="Personal Information"
                subtitle="Basic information about the doctor"
                required
              >
                <div className="grid gap-5 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2">
                  <DoctorInput
                    icon={UserCircle}
                    label="Full Name"
                    value={doctorForm.fullName}
                    onChange={(v) => updateDoctorForm("fullName", v)}
                  />

                  <DoctorInput
                    icon={Mail}
                    label="Email"
                    type="email"
                    value={doctorForm.email}
                    onChange={(v) => updateDoctorForm("email", v)}
                  />

                  <DoctorInput
                    icon={Phone}
                    label="Phone"
                    type="tel"
                    value={doctorForm.phone}
                    onChange={(v) => updateDoctorForm("phone", v)}
                  />

                  <DoctorInput
                    icon={CalendarDays}
                    label="Date of Birth"
                    type="date"
                    value={doctorForm.dateOfBirth}
                    onChange={(v) => updateDoctorForm("dateOfBirth", v)}
                  />

                  <SelectInput
                    icon={UserCircle}
                    label="Gender"
                    value={doctorForm.gender}
                    onChange={(v) => updateDoctorForm("gender", v)}
                    options={["Male", "Female", "Other"]}
                  />

                  <DoctorInput
                    icon={MapPin}
                    label="Address"
                    value={doctorForm.address}
                    onChange={(v) => updateDoctorForm("address", v)}
                  />
                </div>
              </VerificationSection>

              <VerificationSection
                open={sections.professional}
                onClick={() => toggleSection("professional")}
                icon={Stethoscope}
                title="Professional Information"
                subtitle="Professional qualification and experience"
                required
              >
                <div className="grid gap-5 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2">
                  <SelectInput
                    icon={Stethoscope}
                    label="Professional Type"
                    value={doctorForm.professionalType}
                    onChange={(v) => updateDoctorForm("professionalType", v)}
                    options={["Doctor", "Physiotherapist"]}
                  />

                  <DoctorInput
                    icon={Stethoscope}
                    label="Specialization"
                    value={doctorForm.specialization}
                    onChange={(v) => updateDoctorForm("specialization", v)}
                  />

                  <DoctorInput
                    icon={FileText}
                    label="Highest Qualification"
                    value={doctorForm.highestQualification}
                    onChange={(v) =>
                      updateDoctorForm("highestQualification", v)
                    }
                  />

                  <DoctorInput
                    icon={FileText}
                    label="Other Qualification"
                    value={doctorForm.otherQualification}
                    onChange={(v) => updateDoctorForm("otherQualification", v)}
                  />

                  <DoctorInput
                    icon={Building2}
                    label="University / College"
                    value={doctorForm.universityOrCollege}
                    onChange={(v) => updateDoctorForm("universityOrCollege", v)}
                  />

                  <DoctorInput
                    icon={CalendarDays}
                    label="Year of Graduation"
                    type="number"
                    value={doctorForm.yearOfGraduation}
                    onChange={(v) => updateDoctorForm("yearOfGraduation", v)}
                  />

                  <DoctorInput
                    icon={Clock3}
                    label="Experience"
                    type="number"
                    value={doctorForm.experience}
                    onChange={(v) => updateDoctorForm("experience", v)}
                  />

                  <DoctorInput
                    icon={IndianRupee}
                    label="Consultation Fee"
                    type="number"
                    value={doctorForm.consultationFee}
                    onChange={(v) => updateDoctorForm("consultationFee", v)}
                  />

                  <div className="sm:col-span-2">
                    <label className="mb-3 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      Available Days
                    </label>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                        (day) => {
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
                        },
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      About
                    </label>

                    <textarea
                      value={doctorForm.about}
                      onChange={(e) =>
                        updateDoctorForm("about", e.target.value)
                      }
                      rows={4}
                      placeholder="Describe your experience, expertise and professional background"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-[#32838c]"
                    />
                  </div>
                </div>
              </VerificationSection>

              <VerificationSection
                open={sections.registration}
                onClick={() => toggleSection("registration")}
                icon={ShieldCheck}
                title="Registration Information"
                subtitle="Professional registration details"
                required
              >
                <div className="grid gap-5 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2">
                  <DoctorInput
                    icon={FileText}
                    label="Registration Number"
                    value={doctorForm.registrationNumber}
                    onChange={(v) => updateDoctorForm("registrationNumber", v)}
                  />

                  <DoctorInput
                    icon={Building2}
                    label="Registration Council"
                    value={doctorForm.registrationCouncil}
                    onChange={(v) => updateDoctorForm("registrationCouncil", v)}
                  />

                  <DoctorInput
                    icon={CalendarDays}
                    label="Registration Date"
                    type="date"
                    value={doctorForm.registrationDate}
                    onChange={(v) => updateDoctorForm("registrationDate", v)}
                  />
                </div>
              </VerificationSection>

              <VerificationSection
                open={sections.photo}
                onClick={() => toggleSection("photo")}
                icon={ImageIcon}
                title="Doctor Photo"
                subtitle="Upload one clear professional photo"
                required
              >
                <PhotoUpload
                  file={profilePhoto}
                  onUpload={handlePhotoUpload}
                  onRemove={removePhoto}
                />
              </VerificationSection>

              <VerificationSection
                open={sections.documents}
                onClick={() => toggleSection("documents")}
                icon={FileText}
                title="Professional Documents"
                subtitle="Upload your professional verification documents"
                required
              >
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
              </VerificationSection>

              <VerificationSection
                open={sections.clinic}
                onClick={() => toggleSection("clinic")}
                icon={Building2}
                title="Clinic Information"
                subtitle="Clinic associated with the doctor"
              >
                <div className="grid gap-5 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2">
                  <DoctorInput
                    icon={Building2}
                    label="Clinic Name"
                    value={doctorForm.clinicName}
                    onChange={(v) => updateDoctorForm("clinicName", v)}
                  />

                  <DoctorInput
                    icon={Building2}
                    label="Clinic Type"
                    value={doctorForm.clinicType}
                    onChange={(v) => updateDoctorForm("clinicType", v)}
                  />

                  <DoctorInput
                    icon={MapPin}
                    label="Clinic Address"
                    value={doctorForm.clinicAddress}
                    onChange={(v) => updateDoctorForm("clinicAddress", v)}
                  />

                  <DoctorInput
                    icon={MapPin}
                    label="City"
                    value={doctorForm.city}
                    onChange={(v) => updateDoctorForm("city", v)}
                  />

                  <DoctorInput
                    icon={MapPin}
                    label="State"
                    value={doctorForm.state}
                    onChange={(v) => updateDoctorForm("state", v)}
                  />

                  <DoctorInput
                    icon={MapPin}
                    label="Pincode"
                    value={doctorForm.pincode}
                    onChange={(v) => updateDoctorForm("pincode", v)}
                  />

                  <DoctorInput
                    icon={Phone}
                    label="Clinic Phone"
                    type="tel"
                    value={doctorForm.clinicPhone}
                    onChange={(v) => updateDoctorForm("clinicPhone", v)}
                  />

                  <DoctorInput
                    icon={Clock3}
                    label="Working Hours"
                    value={doctorForm.workingHours}
                    onChange={(v) => updateDoctorForm("workingHours", v)}
                  />
                </div>
              </VerificationSection>

              <VerificationSection
                open={sections.declaration}
                onClick={() => toggleSection("declaration")}
                icon={ShieldCheck}
                title="Declaration"
                subtitle="Confirm that the information provided is correct"
                required
              >
                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <input
                    type="checkbox"
                    checked={doctorForm.declarationAccepted}
                    onChange={(e) =>
                      updateDoctorForm("declarationAccepted", e.target.checked)
                    }
                    className="mt-1 h-4 w-4 accent-[#32838c]"
                  />

                  <span className="text-xs leading-5 text-slate-600">
                    I hereby declare that all information provided by me is true
                    and correct to the best of my knowledge. I understand that
                    incorrect or false information may result in rejection of my
                    verification.
                  </span>
                </label>
              </VerificationSection>

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

            <div className="space-y-5">
              <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#32838c]/10">
                    <ShieldCheck className="h-5 w-5 text-[#32838c]" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Verification Checklist
                    </h3>

                    <p className="text-xs text-slate-400">
                      {completedItems}/7 completed
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <ChecklistItem
                    completed={
                      doctorForm.fullName &&
                      doctorForm.email &&
                      doctorForm.phone &&
                      doctorForm.dateOfBirth &&
                      doctorForm.gender &&
                      doctorForm.address
                    }
                    text="Personal information"
                  />

                  <ChecklistItem
                    completed={
                      doctorForm.professionalType &&
                      doctorForm.specialization &&
                      doctorForm.highestQualification &&
                      doctorForm.experience &&
                      doctorForm.consultationFee
                    }
                    text="Professional information"
                  />

                  <ChecklistItem
                    completed={doctorForm.registrationNumber}
                    text="Registration information"
                  />

                  <ChecklistItem
                    completed={profilePhoto}
                    text="Professional photo"
                  />

                  <ChecklistItem
                    completed={uploadedDocuments === 4}
                    text="All professional documents"
                  />

                  <ChecklistItem
                    completed={
                      doctorForm.clinicName &&
                      doctorForm.clinicType &&
                      doctorForm.clinicAddress &&
                      doctorForm.city &&
                      doctorForm.state &&
                      doctorForm.pincode
                    }
                    text="Clinic information"
                  />

                  <ChecklistItem
                    completed={doctorForm.declarationAccepted}
                    text="Declaration accepted"
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#32838c]/10">
                    <HelpCircle className="h-5 w-5 text-[#32838c]" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Upload Guidelines
                    </h3>

                    <p className="text-xs text-slate-400">
                      Keep these points in mind
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <GuideItem text="Upload clear and readable documents." />
                  <GuideItem text="Maximum file size is 5 MB." />
                  <GuideItem text="PDF, JPG and PNG files are accepted." />
                  <GuideItem text="Use valid professional documents." />
                  <GuideItem text="Make sure all information matches your documents." />
                </div>
              </div>
            </div>
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
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
        active
          ? "bg-cyan-400/10 text-cyan-300"
          : "text-slate-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon size={17} className={active ? "text-cyan-400" : "text-slate-400"} />

      <span>{label}</span>
    </Link>
  );
}

function VerificationSection({
  open,
  onClick,
  icon: Icon,
  title,
  subtitle,
  required = false,
  children,
}) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between p-5 text-left sm:p-6"
      >
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

        {open ? (
          <ChevronUp className="h-5 w-5 text-slate-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-slate-400" />
        )}
      </button>

      {open && (
        <div className="border-t border-slate-100 p-5 sm:p-6">{children}</div>
      )}
    </section>
  );
}

function DoctorInput({ icon: Icon, label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </label>

      <div className="relative">
        <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-semibold text-slate-700 outline-none focus:border-[#32838c]"
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
        <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-semibold text-slate-700 outline-none focus:border-[#32838c]"
        >
          <option value="">Select {label}</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function PhotoUpload({ file, onUpload, onRemove }) {
  return (
    <div>
      {file ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white">
                <ImageIcon className="h-5 w-5 text-[#32838c]" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-slate-700">
                  {file.name}
                </p>

                <p className="mt-1 text-[10px] text-slate-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onRemove}
              className="flex items-center gap-1 text-[10px] font-bold text-red-500"
            >
              <X className="h-3 w-3" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <label className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-[#32838c]/40 hover:bg-[#32838c]/5">
          <Upload className="h-7 w-7 text-[#32838c]" />

          <p className="mt-3 text-xs font-bold text-slate-700">
            Upload Professional Photo
          </p>

          <p className="mt-1 text-[10px] text-slate-400">JPG, PNG · Max 5 MB</p>

          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            className="hidden"
            onChange={onUpload}
          />
        </label>
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
      <div className="mb-3">
        <p className="text-xs font-bold text-slate-800">{title}</p>

        <p className="mt-1 text-[10px] leading-4 text-slate-400">
          {description}
        </p>
      </div>

      {file ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <FileText className="h-4 w-4 shrink-0 text-emerald-600" />

              <p className="truncate text-[10px] font-bold text-slate-700">
                {file.name}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onRemove(name)}
              className="text-red-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <label className="mt-3 inline-flex cursor-pointer items-center gap-1 text-[10px] font-bold text-[#32838c]">
            <Upload className="h-3 w-3" />
            Replace
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(event) => onUpload(name, event)}
            />
          </label>
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
