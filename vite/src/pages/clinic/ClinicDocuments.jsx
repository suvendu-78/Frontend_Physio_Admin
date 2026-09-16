import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
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
} from "lucide-react";

export default function ClinicDocuments() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [sections, setSections] = useState({
    information: true,
    hours: true,
    photos: true,
    registration: false,
    owner: false,
    additional: false,
  });

  const [clinicForm, setClinicForm] = useState({
    clinicName: "LiBi Motion Care Clinic",
    clinicType: "Physiotherapy Clinic",
    ownerName: "Suvendu Behera",
    email: "clinic@libimotioncare.com",
    phone: "+91 9876543210",
    address: "123 Main Road, Saheed Nagar",
    city: "Bhubaneswar",
    state: "Odisha",
    pincode: "751007",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [clinicPhotos, setClinicPhotos] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);

  const [documents, setDocuments] = useState({
    registration: null,
    ownerId: null,
    pan: null,
    gst: null,
    address: null,
    license: null,
    supporting: null,
  });

  const [workingDays, setWorkingDays] = useState({
    Monday: {
      open: true,
      from: "09:00 AM",
      to: "08:00 PM",
    },
    Tuesday: {
      open: true,
      from: "09:00 AM",
      to: "08:00 PM",
    },
    Wednesday: {
      open: true,
      from: "09:00 AM",
      to: "08:00 PM",
    },
    Thursday: {
      open: true,
      from: "09:00 AM",
      to: "08:00 PM",
    },
    Friday: {
      open: true,
      from: "09:00 AM",
      to: "08:00 PM",
    },
    Saturday: {
      open: true,
      from: "09:00 AM",
      to: "02:00 PM",
    },
    Sunday: {
      open: false,
      from: "09:00 AM",
      to: "08:00 PM",
    },
  });

  const clinic = clinicForm;

  const toggleSection = (section) => {
    setSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateClinicForm = (field, value) => {
    setClinicForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setIsSubmitted(false);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setIsSubmitted(false);

    try {
      const formData = new FormData();

      Object.entries(clinicForm).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append("workingDays", JSON.stringify(workingDays));

      clinicPhotos.forEach((file) => {
        if (file) {
          formData.append("clinicPhotos", file);
        }
      });

      Object.entries(documents).forEach(([name, file]) => {
        if (file) {
          formData.append(name, file);
        }
      });

      const response = await fetch(
        "http://localhost:8000/api/v1/pattner/cliniDv",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit clinic verification");
      }

      console.log("Backend response:", data);

      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoUpload = (index, event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setClinicPhotos((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });

    setIsSubmitted(false);

    event.target.value = "";
  };

  const removePhoto = (index) => {
    setClinicPhotos((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });

    setIsSubmitted(false);
  };

  const handleDocumentUpload = (name, event) => {
    const file = event.target.files?.[0];

    if (!file) return;

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

  const toggleDay = (day) => {
    setWorkingDays((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        open: !prev[day].open,
      },
    }));

    setIsSubmitted(false);
  };

  const updateTime = (day, field, value) => {
    setWorkingDays((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));

    setIsSubmitted(false);
  };

  const uploadedPhotos = clinicPhotos.filter(Boolean).length;

  const requiredDocuments = [
    documents.registration,
    documents.ownerId,
    documents.pan,
    documents.address,
    documents.license,
  ];

  const uploadedRequiredDocuments = requiredDocuments.filter(Boolean).length;

  const openDays = Object.values(workingDays).filter((day) => day.open).length;

  const completedItems =
    1 +
    (openDays > 0 ? 1 : 0) +
    (uploadedPhotos === 5 ? 1 : 0) +
    uploadedRequiredDocuments;

  const totalItems = 8;

  const progress = Math.min(
    100,
    Math.round((completedItems / totalItems) * 100),
  );
  const handleLogouts = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/pattner/clinicLogout",
        {
          method: "POST",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert("Logged out successfully");
        navigate("/clinic/login");
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
              icon={Bell}
              label="Notifications"
              to="/clinic/notifications"
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
              icon={FileText}
              label="Document Verification"
              active
              to="/clinic/verification"
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
            <Link
              to="/clinic/login"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-600"
              onClick={handleLogouts}
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
              <span className="text-lg">☰</span>
            </button>

            <div className="hidden md:block">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Link to="/clinic/profile" className="hover:text-[#32838c]">
                  Clinic Profile
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
                <Building2 className="h-5 w-5 text-[#32838c]" />
              </div>

              <div className="max-w-48">
                <p className="truncate text-sm font-bold text-slate-900">
                  {clinic.clinicName}
                </p>

                <p className="text-xs text-slate-400">Clinic Admin</p>
              </div>

              <ChevronDown className="h-4 w-4 text-slate-400" />
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
                      Clinic Verification Portal
                    </p>
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Clinic Verification
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Complete your clinic profile and upload the required documents
                  and photos for verification.
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
                  <div className="flex items-center gap-4">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#32838c]/10">
                      <Building2 className="h-5 w-5 text-[#32838c]" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-sm font-bold text-slate-900">
                          Clinic Information
                        </h2>

                        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
                          Completed
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-slate-400">
                        Basic information about your clinic
                      </p>
                    </div>
                  </div>

                  {sections.information ? (
                    <ChevronUp className="h-5 w-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  )}
                </button>

                {sections.information && (
                  <div className="border-t border-slate-100 p-5 sm:p-6">
                    <div className="grid gap-5 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2">
                      <ClinicInput
                        icon={Building2}
                        label="Clinic Name"
                        value={clinicForm.clinicName}
                        onChange={(value) =>
                          updateClinicForm("clinicName", value)
                        }
                      />

                      <div>
                        <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                          Clinic Type
                        </label>

                        <div className="relative">
                          <Stethoscope className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#32838c]" />

                          <select
                            value={clinicForm.clinicType}
                            onChange={(event) =>
                              updateClinicForm("clinicType", event.target.value)
                            }
                            className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-9 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#32838c] focus:ring-2 focus:ring-[#32838c]/10"
                          >
                            <option>Physiotherapy Clinic</option>
                            <option>Rehabilitation Clinic</option>
                            <option>Multispecialty Clinic</option>
                            <option>Sports Rehabilitation Clinic</option>
                            <option>Other</option>
                          </select>

                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        </div>
                      </div>

                      <ClinicInput
                        icon={UserCircle}
                        label="Owner Name"
                        value={clinicForm.ownerName}
                        onChange={(value) =>
                          updateClinicForm("ownerName", value)
                        }
                      />

                      <ClinicInput
                        icon={Mail}
                        label="Email"
                        type="email"
                        value={clinicForm.email}
                        onChange={(value) => updateClinicForm("email", value)}
                      />

                      <ClinicInput
                        icon={Phone}
                        label="Mobile Number"
                        type="tel"
                        value={clinicForm.phone}
                        onChange={(value) => updateClinicForm("phone", value)}
                      />

                      <ClinicInput
                        icon={MapPin}
                        label="Address"
                        value={clinicForm.address}
                        onChange={(value) => updateClinicForm("address", value)}
                      />

                      <ClinicInput
                        icon={MapPin}
                        label="City"
                        value={clinicForm.city}
                        onChange={(value) => updateClinicForm("city", value)}
                      />

                      <ClinicInput
                        icon={MapPin}
                        label="State"
                        value={clinicForm.state}
                        onChange={(value) => updateClinicForm("state", value)}
                      />

                      <ClinicInput
                        icon={MapPin}
                        label="Pincode"
                        value={clinicForm.pincode}
                        onChange={(value) => updateClinicForm("pincode", value)}
                      />
                    </div>

                    <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2">
                        {isSubmitted ? (
                          <>
                            <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-50">
                              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                            </span>

                            <span className="text-xs font-semibold text-emerald-600">
                              Information submitted successfully
                            </span>
                          </>
                        ) : (
                          <span className="text-xs text-slate-400">
                            Make sure all information is correct before
                            submitting.
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold text-white transition ${
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
                            Submit Information
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </section>

              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <button
                  onClick={() => toggleSection("hours")}
                  className="flex w-full items-center justify-between p-5 text-left sm:p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#32838c]/10">
                      <Clock3 className="h-5 w-5 text-[#32838c]" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-sm font-bold text-slate-900">
                          Clinic Working Hours
                        </h2>

                        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
                          {openDays} Days Open
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-slate-400">
                        Set the days and timings when your clinic is open
                      </p>
                    </div>
                  </div>

                  {sections.hours ? (
                    <ChevronUp className="h-5 w-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  )}
                </button>

                {sections.hours && (
                  <div className="border-t border-slate-100 p-5 sm:p-6">
                    <div className="space-y-3">
                      {Object.entries(workingDays).map(([day, data]) => (
                        <div
                          key={day}
                          className={`rounded-2xl border p-4 transition ${
                            data.open
                              ? "border-slate-200 bg-white"
                              : "border-slate-100 bg-slate-50"
                          }`}
                        >
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => toggleDay(day)}
                                className={`relative h-6 w-11 rounded-full transition ${
                                  data.open ? "bg-[#32838c]" : "bg-slate-300"
                                }`}
                              >
                                <span
                                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                                    data.open ? "left-6" : "left-1"
                                  }`}
                                />
                              </button>

                              <div>
                                <p className="text-sm font-bold text-slate-800">
                                  {day}
                                </p>

                                <p
                                  className={`text-[10px] ${
                                    data.open
                                      ? "text-emerald-500"
                                      : "text-slate-400"
                                  }`}
                                >
                                  {data.open ? "Open" : "Closed"}
                                </p>
                              </div>
                            </div>

                            {data.open ? (
                              <div className="flex flex-wrap items-center gap-3">
                                <TimeSelect
                                  value={data.from}
                                  onChange={(value) =>
                                    updateTime(day, "from", value)
                                  }
                                />

                                <span className="text-xs font-medium text-slate-400">
                                  to
                                </span>

                                <TimeSelect
                                  value={data.to}
                                  onChange={(value) =>
                                    updateTime(day, "to", value)
                                  }
                                />
                              </div>
                            ) : (
                              <span className="rounded-full bg-slate-200 px-3 py-1.5 text-[10px] font-bold text-slate-500">
                                Closed
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-start gap-2 text-xs text-slate-400">
                      <Info className="mt-0.5 h-4 w-4 shrink-0" />

                      <p>
                        Set your regular clinic operating hours. You can update
                        these timings later from your clinic settings.
                      </p>
                    </div>
                  </div>
                )}
              </section>

              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <AccordionHeader
                  icon={ImageIcon}
                  number="3"
                  title="Clinic Photos"
                  subtitle="Upload 5 photos of your clinic"
                  count={`${uploadedPhotos}/5 Uploaded`}
                  open={sections.photos}
                  onClick={() => toggleSection("photos")}
                  required
                />

                {sections.photos && (
                  <div className="border-t border-slate-100 p-5 sm:p-6">
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                      {clinicPhotos.map((photo, index) => (
                        <PhotoUpload
                          key={index}
                          index={index}
                          file={photo}
                          onUpload={handlePhotoUpload}
                          onRemove={removePhoto}
                        />
                      ))}
                    </div>

                    <div className="mt-4 flex items-start gap-2 text-xs text-slate-400">
                      <Info className="mt-0.5 h-4 w-4 shrink-0" />

                      <p>
                        Upload clear images of your clinic. JPG and PNG formats
                        are supported. Maximum 5 MB per image.
                      </p>
                    </div>
                  </div>
                )}
              </section>

              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <AccordionHeader
                  icon={FileText}
                  number="4"
                  title="Registration Documents"
                  subtitle="Upload clinic registration and legal documents"
                  count={
                    documents.registration ? "1/3 Uploaded" : "0/3 Uploaded"
                  }
                  open={sections.registration}
                  onClick={() => toggleSection("registration")}
                />

                {sections.registration && (
                  <div className="border-t border-slate-100 p-5 sm:p-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <DocumentUpload
                        name="registration"
                        title="Clinic Registration Certificate"
                        description="Official registration certificate"
                        required
                        file={documents.registration}
                        onUpload={handleDocumentUpload}
                        onRemove={removeDocument}
                      />

                      <DocumentUpload
                        name="pan"
                        title="PAN Card"
                        description="Clinic or proprietor PAN card"
                        required
                        file={documents.pan}
                        onUpload={handleDocumentUpload}
                        onRemove={removeDocument}
                      />

                      <DocumentUpload
                        name="license"
                        title="Clinic / Establishment License"
                        description="Applicable clinic license"
                        required
                        file={documents.license}
                        onUpload={handleDocumentUpload}
                        onRemove={removeDocument}
                      />
                    </div>
                  </div>
                )}
              </section>

              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <AccordionHeader
                  icon={UserCircle}
                  number="5"
                  title="Owner / Administrator Documents"
                  subtitle="Identity proof of clinic owner or administrator"
                  count={documents.ownerId ? "1/2 Uploaded" : "0/2 Uploaded"}
                  open={sections.owner}
                  onClick={() => toggleSection("owner")}
                />

                {sections.owner && (
                  <div className="border-t border-slate-100 p-5 sm:p-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <DocumentUpload
                        name="ownerId"
                        title="Owner / Administrator ID Proof"
                        description="Aadhaar, PAN or Driving License"
                        required
                        file={documents.ownerId}
                        onUpload={handleDocumentUpload}
                        onRemove={removeDocument}
                      />

                      <DocumentUpload
                        name="address"
                        title="Clinic Address Proof"
                        description="Electricity bill, rent agreement or property papers"
                        required
                        file={documents.address}
                        onUpload={handleDocumentUpload}
                        onRemove={removeDocument}
                      />
                    </div>
                  </div>
                )}
              </section>

              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <AccordionHeader
                  icon={ShieldCheck}
                  number="6"
                  title="Additional Documents"
                  subtitle="GST, licenses or other supporting documents"
                  count={
                    documents.gst || documents.supporting
                      ? "Uploaded"
                      : "0/2 Uploaded"
                  }
                  open={sections.additional}
                  onClick={() => toggleSection("additional")}
                />

                {sections.additional && (
                  <div className="border-t border-slate-100 p-5 sm:p-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <DocumentUpload
                        name="gst"
                        title="GST Certificate"
                        description="GST registration certificate if applicable"
                        file={documents.gst}
                        onUpload={handleDocumentUpload}
                        onRemove={removeDocument}
                      />

                      <DocumentUpload
                        name="supporting"
                        title="Other Supporting Document"
                        description="Any other relevant verification document"
                        file={documents.supporting}
                        onUpload={handleDocumentUpload}
                        onRemove={removeDocument}
                      />
                    </div>
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
                        Please ensure all information is correct and all
                        required documents and five clinic photos are uploaded
                        before submitting.
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
                        transform: `rotate(${Math.max(
                          -45,
                          progress * 3.6 - 45,
                        )}deg)`,
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
                    style={{ width: `${progress}%` }}
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
                    completed={true}
                    text="Complete clinic information"
                  />

                  <ChecklistItem
                    completed={openDays > 0}
                    text="Set clinic working hours"
                  />

                  <ChecklistItem
                    completed={uploadedPhotos === 5}
                    text="Upload 5 clinic photos"
                  />

                  <ChecklistItem
                    completed={Boolean(documents.registration)}
                    text="Clinic registration certificate"
                  />

                  <ChecklistItem
                    completed={Boolean(documents.ownerId)}
                    text="Owner ID proof"
                  />

                  <ChecklistItem
                    completed={Boolean(documents.pan)}
                    text="PAN card"
                  />

                  <ChecklistItem
                    completed={Boolean(documents.address)}
                    text="Clinic address proof"
                  />

                  <ChecklistItem
                    completed={Boolean(documents.license)}
                    text="Clinic / establishment license"
                  />

                  <ChecklistItem
                    completed={Boolean(documents.gst)}
                    text="GST certificate if applicable"
                    optional
                  />

                  <ChecklistItem
                    completed={Boolean(documents.supporting)}
                    text="Other supporting documents"
                    optional
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
                  <GuideItem text="All required documents must be uploaded" />
                  <GuideItem text="You will be notified after verification" />
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

function ClinicInput({ icon: Icon, label, value, onChange, type = "text" }) {
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

function TimeSelect({ value, onChange }) {
  const times = [
    "08:00 AM",
    "08:30 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
    "07:30 PM",
    "08:00 PM",
    "08:30 PM",
    "09:00 PM",
    "09:30 PM",
    "10:00 PM",
  ];

  return (
    <div className="relative">
      <Clock3 className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-xs font-semibold text-slate-700 outline-none focus:border-[#32838c]"
      >
        {times.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );
}

function PhotoUpload({ index, file, onUpload, onRemove }) {
  const labels = [
    "Front View",
    "Reception",
    "Treatment Area",
    "Equipment",
    "Waiting Area",
  ];

  return (
    <div className="relative">
      <label
        className={`group flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-4 text-center transition ${
          file
            ? "border-emerald-200 bg-emerald-50/40"
            : "border-slate-200 bg-slate-50 hover:border-[#32838c]/40 hover:bg-[#32838c]/5"
        }`}
      >
        {file ? (
          <>
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-100">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
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
              Upload Photo {index + 1}
            </p>

            <p className="mt-1 text-[10px] text-slate-400">{labels[index]}</p>

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
          onChange={(event) => onUpload(index, event)}
        />
      </label>

      {file && (
        <button
          type="button"
          onClick={() => onRemove(index)}
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
  required = false,
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

        <span
          className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-bold ${
            required
              ? "bg-rose-50 text-rose-500"
              : "bg-slate-200 text-slate-500"
          }`}
        >
          {required ? "Required" : "Optional"}
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

function ChecklistItem({ completed, text, optional = false }) {
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

      {optional && (
        <span className="ml-auto text-[9px] text-slate-400">Optional</span>
      )}
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
