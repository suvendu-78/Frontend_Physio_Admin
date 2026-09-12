import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  X,
  UserRound,
  BriefcaseBusiness,
  FileText,
  Building2,
  CalendarDays,
  CircleUserRound,
  Eye,
  Download,
  Phone,
  Mail,
  MapPin,
  Clock,
  Info,
} from "lucide-react";

const provider = {
  id: "DOC-1001",
  name: "Dr. Rahul Sharma",
  type: "Doctor",
  specialization: "Orthopedic Specialist",
  status: "Pending",
  joinedOn: "10 Sep 2026",

  personal: {
    fullName: "Dr. Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    phone: "9876543210",
    dateOfBirth: "15 Mar 1990",
    gender: "Male",
    address: "123, Green Park, Bhubaneswar, Odisha - 751001",
  },

  professional: {
    specialization: "Orthopedic Specialist",
    experience: "8 Years",
    consultationFee: "₹700",
    clinic: "City Care Clinic",
    availableDays: "Mon, Tue, Wed, Thu, Fri",
    about:
      "Experienced orthopedic specialist with expertise in sports injuries, joint replacement and rehabilitation.",
  },

  clinic: {
    name: "City Care Clinic",
    address: "123, Green Park, Bhubaneswar, Odisha - 751001",
    phone: "9876543211",
    workingHours: "9:00 AM - 6:00 PM",
    consultationMode: ["In-clinic", "Online"],
  },

  documents: [
    {
      id: 1,
      name: "Medical License",
      date: "05 Sep 2026",
      file: "medical-license.pdf",
    },
    {
      id: 2,
      name: "Identity Proof (Aadhaar)",
      date: "05 Sep 2026",
      file: "identity-proof.pdf",
    },
    {
      id: 3,
      name: "Degree Certificate",
      date: "05 Sep 2026",
      file: "degree-certificate.pdf",
    },
    {
      id: 4,
      name: "Experience Certificate",
      date: "05 Sep 2026",
      file: "experience-certificate.pdf",
    },
  ],
};

export default function ProviderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleApprove = () => {
    console.log("Approved provider:", id);
  };

  const handleReject = () => {
    console.log("Rejected provider:", id);
  };

  const handleViewDocument = (document) => {
    console.log("View document:", document.file);
  };

  const handleDownloadDocument = (document) => {
    console.log("Download document:", document.file);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Section */}
      <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <button
            onClick={() => navigate("/admin/onboard")}
            className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700"
          >
            <ArrowLeft size={18} />
            Back to Onboard
          </button>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Provider Details
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View complete information and documents
          </p>
        </div>

        {/* Approve / Reject */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleReject}
            className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-6 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
          >
            <X size={19} />
            Reject
          </button>

          <button
            onClick={handleApprove}
            className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600"
          >
            <Check size={19} />
            Approve
          </button>
        </div>
      </div>

      {/* Provider Profile Card */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          {/* Profile Image */}
          <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-50 text-blue-500">
            <UserRound size={65} strokeWidth={1.5} />
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <div className="mb-2 inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-600">
              <UserRound size={15} />
              {provider.type}
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              {provider.name}
            </h2>

            <p className="mt-1 text-base text-slate-500">
              {provider.specialization}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-slate-100 p-2 text-slate-500">
                  <CalendarDays size={17} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">Joined On</p>
                  <p className="text-sm font-medium text-slate-700">
                    {provider.joinedOn}
                  </p>
                </div>
              </div>

              <div className="h-9 w-px bg-slate-200" />

              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-amber-50 p-2 text-amber-500">
                  <span className="block h-4 w-4 rounded-full border-2 border-current" />
                </div>

                <div>
                  <p className="text-xs text-slate-400">Status</p>

                  <span className="mt-1 inline-flex rounded-lg bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
                    {provider.status}
                  </span>
                </div>
              </div>

              <div className="h-9 w-px bg-slate-200" />

              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-blue-50 p-2 text-blue-500">
                  <FileText size={17} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">Provider ID</p>

                  <p className="text-sm font-semibold text-slate-700">
                    {provider.id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Grid */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Personal Information */}
        <InfoCard
          icon={<CircleUserRound size={19} />}
          title="Personal Information"
          iconClass="bg-cyan-50 text-cyan-600"
        >
          <InfoRow label="Full Name" value={provider.personal.fullName} />

          <InfoRow label="Email" value={provider.personal.email} />

          <InfoRow label="Phone" value={provider.personal.phone} />

          <InfoRow
            label="Date of Birth"
            value={provider.personal.dateOfBirth}
          />

          <InfoRow label="Gender" value={provider.personal.gender} />

          <InfoRow label="Address" value={provider.personal.address} />
        </InfoCard>

        {/* Professional Information */}
        <InfoCard
          icon={<BriefcaseBusiness size={19} />}
          title="Professional Information"
          iconClass="bg-emerald-50 text-emerald-600"
        >
          <InfoRow
            label="Specialization"
            value={provider.professional.specialization}
          />

          <InfoRow
            label="Experience"
            value={provider.professional.experience}
          />

          <InfoRow
            label="Consultation Fee"
            value={provider.professional.consultationFee}
          />

          <InfoRow
            label="Clinic/Hospital"
            value={provider.professional.clinic}
          />

          <InfoRow
            label="Available Days"
            value={provider.professional.availableDays}
          />

          <InfoRow label="About" value={provider.professional.about} />
        </InfoCard>

        {/* Documents */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                <FileText size={20} />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">Documents</h3>

                <p className="text-xs text-slate-500">
                  Verify uploaded documents
                </p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="rounded-lg bg-slate-50 text-left">
                    <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      #
                    </th>

                    <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Document Name
                    </th>

                    <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Uploaded On
                    </th>

                    <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {provider.documents.map((document) => (
                    <tr
                      key={document.id}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="px-3 py-4 text-sm text-slate-500">
                        {document.id}
                      </td>

                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <FileText size={17} className="text-slate-400" />

                          <span className="text-sm font-medium text-slate-700">
                            {document.name}
                          </span>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                        {document.date}
                      </td>

                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewDocument(document)}
                            className="flex items-center gap-1.5 rounded-lg border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
                          >
                            <Eye size={15} />
                            View
                          </button>

                          <button
                            onClick={() => handleDownloadDocument(document)}
                            className="flex items-center gap-1.5 rounded-lg border border-emerald-200 px-3 py-2 text-xs font-semibold text-emerald-600 transition hover:bg-emerald-50"
                          >
                            <Download size={15} />
                            Download
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Clinic Information */}
        <InfoCard
          icon={<Building2 size={19} />}
          title="Clinic Information"
          iconClass="bg-cyan-50 text-cyan-600"
        >
          <InfoRow label="Clinic Name" value={provider.clinic.name} />

          <InfoRow label="Clinic Address" value={provider.clinic.address} />

          <InfoRow label="Clinic Phone" value={provider.clinic.phone} />

          <InfoRow label="Working Hours" value={provider.clinic.workingHours} />

          <div className="flex items-start border-b border-slate-100 py-2.5 last:border-0">
            <span className="w-[180px] shrink-0 text-sm text-slate-500">
              Consultation Mode
            </span>

            <div className="flex flex-wrap gap-2">
              {provider.clinic.consultationMode.map((mode) => (
                <span
                  key={mode}
                  className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                    mode === "Online"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  {mode}
                </span>
              ))}
            </div>
          </div>

          {/* Review Box */}
          <div className="mt-5 flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
              <Info size={17} />
            </div>

            <div>
              <h4 className="text-sm font-bold text-blue-700">
                Review & Take Action
              </h4>

              <p className="mt-1 text-xs leading-5 text-blue-600">
                Please verify all the information and documents before approving
                or rejecting this provider.
              </p>
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  );
}

function InfoCard({ title, icon, iconClass, children }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
          >
            {icon}
          </div>

          <h3 className="font-bold text-slate-900">{title}</h3>
        </div>
      </div>

      <div className="px-5 py-2">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start border-b border-slate-100 py-2.5 last:border-0">
      <span className="w-[180px] shrink-0 text-sm text-slate-500">{label}</span>

      <span className="text-sm font-medium leading-5 text-slate-700">
        {value}
      </span>
    </div>
  );
}
