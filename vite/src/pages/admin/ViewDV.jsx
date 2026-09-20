import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  Info,
} from "lucide-react";

export default function ProviderDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const provider = location.state?.provider;
  const type = location.state?.type || "Doctor";

  useEffect(() => {
    if (provider) {
      setLoading(false);
    }
  }, [provider]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 h-5 w-32 animate-pulse rounded bg-slate-200" />
            <div className="h-9 w-64 animate-pulse rounded bg-slate-200" />
            <div className="mt-2 h-4 w-80 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="flex gap-3">
            <div className="h-12 w-28 animate-pulse rounded-xl bg-slate-200" />
            <div className="h-12 w-28 animate-pulse rounded-xl bg-slate-200" />
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="h-32 w-32 animate-pulse rounded-full bg-slate-200" />

            <div className="flex-1">
              <div className="h-7 w-24 animate-pulse rounded-lg bg-slate-200" />

              <div className="mt-3 h-8 w-72 animate-pulse rounded bg-slate-200" />

              <div className="mt-2 h-5 w-52 animate-pulse rounded bg-slate-200" />

              <div className="mt-6 flex flex-wrap gap-6">
                <div className="h-12 w-36 animate-pulse rounded-lg bg-slate-200" />
                <div className="h-12 w-36 animate-pulse rounded-lg bg-slate-200" />
                <div className="h-12 w-44 animate-pulse rounded-lg bg-slate-200" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-800">
            Provider data not found
          </h2>

          <button
            onClick={() => navigate("/admin/onboard")}
            className="mt-4 rounded-xl bg-[#0aaab8] px-5 py-3 font-semibold text-white"
          >
            Back to Onboard
          </button>
        </div>
      </div>
    );
  }

  const status =
    provider.isActive === true
      ? "Active"
      : provider.verificationStatus === "pending"
        ? "Pending"
        : "Inactive";

  const joinedOn = provider.createdAt
    ? new Date(provider.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  const fullName = provider.fullName || provider.name || "N/A";

  const specialization =
    provider.specialization ||
    provider.speciality ||
    provider.highestQualification ||
    provider.qualification ||
    "N/A";

  const profileImage =
    provider.profileImage ||
    provider.image ||
    provider.profilePhoto?.url ||
    provider.documents?.profilePhoto?.url ||
    "";

  const handleApprove = async () => {
    if (!provider?._id || actionLoading) {
      return;
    }

    try {
      setActionLoading(true);

      const response = await fetch(
        `http://localhost:8000/api/v1/pattner/doctor/status/${provider._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "approve",
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to approve doctor");
      }

      alert(data.message || "Doctor approved successfully");

      navigate("/admin/onboard");
    } catch (error) {
      console.error("Approve Doctor Error:", error);
      alert(error.message || "Failed to approve doctor");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!provider?._id || actionLoading) {
      return;
    }

    const message = window.prompt(
      "Enter rejection reason:",
      "Documents are not valid",
    );

    if (message === null) {
      return;
    }

    try {
      setActionLoading(true);

      const response = await fetch(
        `https://physio-backend-sand.vercel.app/api/v1/pattner/doctor/status/${provider._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "reject",
            message,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reject doctor");
      }

      alert(data.message || "Doctor rejected successfully");

      navigate("/admin/onboard");
    } catch (error) {
      console.error("Reject Doctor Error:", error);
      alert(error.message || "Failed to reject doctor");
    } finally {
      setActionLoading(false);
    }
  };

  const handleViewDocument = (doc) => {
    if (!doc?.url) {
      console.log("Document URL not available");
      return;
    }

    window.open(doc.url, "_blank", "noopener,noreferrer");
  };

  const handleDownloadDocument = (doc) => {
    if (!doc?.url) {
      console.log("Document URL not available");
      return;
    }

    const link = document.createElement("a");

    link.href = doc.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.download = doc.fileName || doc.name || "document";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const documents = getDocuments(provider.documents);

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
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

        {status === "Pending" && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleReject}
              disabled={actionLoading}
              className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-6 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={19} />

              {actionLoading ? "Processing..." : "Reject"}
            </button>

            <button
              onClick={handleApprove}
              disabled={actionLoading}
              className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Check size={19} />

              {actionLoading ? "Processing..." : "Approve"}
            </button>
          </div>
        )}
      </div>

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-50 text-blue-500">
            {profileImage ? (
              <img
                src={profileImage}
                alt={fullName}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserRound size={65} strokeWidth={1.5} />
            )}
          </div>

          <div className="flex-1">
            <div className="mb-2 inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-600">
              <UserRound size={15} />
              {type}
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              {formatValue(fullName)}
            </h2>

            <p className="mt-1 text-base text-slate-500">
              {formatValue(specialization)}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-slate-100 p-2 text-slate-500">
                  <CalendarDays size={17} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">Joined On</p>

                  <p className="text-sm font-medium text-slate-700">
                    {joinedOn}
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

                  <span
                    className={`mt-1 inline-flex rounded-lg px-3 py-1 text-xs font-semibold ${
                      status === "Active"
                        ? "bg-emerald-50 text-emerald-600"
                        : status === "Pending"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-red-50 text-red-600"
                    }`}
                  >
                    {status}
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
                    {formatValue(provider._id)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <InfoCard
          icon={<CircleUserRound size={19} />}
          title="Personal Information"
          iconClass="bg-cyan-50 text-cyan-600"
        >
          <InfoRow
            label="Full Name"
            value={provider.fullName || provider.name}
          />

          <InfoRow label="Email" value={provider.email} />

          <InfoRow label="Phone" value={provider.phone} />

          <InfoRow
            label="Date of Birth"
            value={provider.dateOfBirth || provider.dob}
          />

          <InfoRow label="Gender" value={provider.gender} />

          <InfoRow
            label="Address"
            value={
              provider.address || provider.fullAddress || provider.location
            }
          />
        </InfoCard>

        <InfoCard
          icon={<BriefcaseBusiness size={19} />}
          title="Professional Information"
          iconClass="bg-emerald-50 text-emerald-600"
        >
          <InfoRow
            label="Professional Type"
            value={provider.professionalType}
          />

          <InfoRow
            label="Specialization"
            value={provider.specialization || provider.speciality}
          />

          <InfoRow
            label="Highest Qualification"
            value={provider.highestQualification}
          />

          <InfoRow label="Qualification" value={provider.qualification} />

          <InfoRow label="Experience" value={provider.experience} />

          <InfoRow label="Consultation Fee" value={provider.consultationFee} />

          <InfoRow
            label="Registration Number"
            value={
              provider.registration?.registrationNumber ||
              provider.registrationNumber
            }
          />

          <InfoRow
            label="Clinic/Hospital"
            value={provider.clinic || provider.clinicName || provider.hospital}
          />

          <InfoRow label="Available Days" value={provider.availableDays} />

          <InfoRow label="About" value={provider.about || provider.bio} />
        </InfoCard>

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
            {documents.length > 0 ? (
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
                    {documents.map((doc, index) => (
                      <tr
                        key={`${doc.key}-${index}`}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className="px-3 py-4 text-sm text-slate-500">
                          {index + 1}
                        </td>

                        <td className="px-3 py-4">
                          <div className="flex items-center gap-2">
                            <FileText size={17} className="text-slate-400" />

                            <div>
                              <span className="block text-sm font-medium text-slate-700">
                                {formatValue(doc.name)}
                              </span>

                              {doc.fileName && (
                                <span className="block max-w-[280px] truncate text-xs text-slate-400">
                                  {formatValue(doc.fileName)}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                          {formatDate(doc.createdAt)}
                        </td>

                        <td className="px-3 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleViewDocument(doc)}
                              disabled={!doc.url}
                              className="flex items-center gap-1.5 rounded-lg border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Eye size={15} />
                              View
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDownloadDocument(doc)}
                              disabled={!doc.url}
                              className="flex items-center gap-1.5 rounded-lg border border-emerald-200 px-3 py-2 text-xs font-semibold text-emerald-600 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
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
            ) : (
              <div className="py-10 text-center">
                <FileText size={40} className="mx-auto mb-3 text-slate-300" />

                <p className="text-sm font-medium text-slate-500">
                  No documents available
                </p>
              </div>
            )}
          </div>
        </div>

        <InfoCard
          icon={<Building2 size={19} />}
          title="Additional Information"
          iconClass="bg-cyan-50 text-cyan-600"
        >
          <InfoRow label="Email" value={provider.email} />

          <InfoRow label="Phone" value={provider.phone} />

          <InfoRow label="Verification" value={provider.verificationStatus} />

          <InfoRow
            label="Declaration Accepted"
            value={
              provider.declarationAccepted === true
                ? "Yes"
                : provider.declarationAccepted === false
                  ? "No"
                  : "N/A"
            }
          />

          <InfoRow label="Active" value={provider.isActive ? "Yes" : "No"} />

          <InfoRow
            label="Created At"
            value={
              provider.createdAt
                ? new Date(provider.createdAt).toLocaleString()
                : "N/A"
            }
          />

          <InfoRow
            label="Updated At"
            value={
              provider.updatedAt
                ? new Date(provider.updatedAt).toLocaleString()
                : "N/A"
            }
          />

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

function getDocuments(documentsObject) {
  if (!documentsObject || typeof documentsObject !== "object") {
    return [];
  }

  const documents = [];

  Object.entries(documentsObject).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item && typeof item === "object" && item.url) {
          documents.push({
            key: `${key}-${index}`,
            name: formatDocumentName(key),
            fileName: item.fileName || "",
            url: item.url || "",
            createdAt: item.createdAt || "",
          });
        }
      });

      return;
    }

    if (value && typeof value === "object" && value.url) {
      documents.push({
        key,
        name: formatDocumentName(key),
        fileName: value.fileName || "",
        url: value.url || "",
        createdAt: value.createdAt || "",
      });
    }
  });

  return documents;
}

function formatDocumentName(name) {
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
}

function formatDate(value) {
  if (!value) {
    return "N/A";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return formatValue(value);
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatValue(value) {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }

  if (Array.isArray(value)) {
    const result = value
      .map((item) => {
        if (typeof item === "object" && item !== null) {
          return formatObject(item);
        }

        return String(item);
      })
      .filter(Boolean)
      .join(", ");

    return result || "N/A";
  }

  if (typeof value === "object") {
    return formatObject(value);
  }

  return String(value);
}

function formatObject(value) {
  if (!value || typeof value !== "object") {
    return String(value);
  }

  const parts = Object.entries(value)
    .filter(
      ([, item]) =>
        item !== null &&
        item !== undefined &&
        item !== "" &&
        typeof item !== "object",
    )
    .map(([key, item]) => {
      const formattedKey = key
        .replace(/([A-Z])/g, " $1")
        .replace(/[-_]/g, " ")
        .replace(/^./, (char) => char.toUpperCase());

      return `${formattedKey}: ${item}`;
    });

  return parts.join(", ") || "N/A";
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <div className="h-6 w-48 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="px-5 py-4">
        <div className="space-y-4">
          <div className="flex gap-5">
            <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-48 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="flex gap-5">
            <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-56 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="flex gap-5">
            <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="flex gap-5">
            <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-52 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="flex gap-5">
            <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-44 animate-pulse rounded bg-slate-200" />
          </div>
        </div>
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

      <span className="break-words text-sm font-medium leading-5 text-slate-700">
        {formatValue(value)}
      </span>
    </div>
  );
}
