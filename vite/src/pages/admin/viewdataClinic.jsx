import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  X,
  Building2,
  MapPin,
  FileText,
  CalendarDays,
  Clock,
  Image as ImageIcon,
  Info,
  Eye,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ClinicDetails() {
  const navigate = useNavigate();

  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchClinic = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/onboard/clinicpendingData",
      );

      const result = await response.json();

      console.log("Clinic Details:", result);

      if (result.success) {
        const data = Array.isArray(result.data) ? result.data[0] : result.data;

        setClinic(data || null);
      } else {
        setClinic(null);
      }
    } catch (error) {
      console.log("Clinic fetch error:", error);
      setClinic(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClinic();
  }, []);

  const handleApprove = async () => {
    if (!clinic?._id || actionLoading) {
      return;
    }

    try {
      setActionLoading(true);

      const response = await fetch(
        `http://localhost:8000/api/v1/pattner/clinic/status/${clinic._id}`,
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

      const result = await response.json();

      console.log("Approve Clinic Response:", result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to approve clinic");
      }

      alert(result.message || "Clinic approved successfully");

      navigate("/admin/onboard");
    } catch (error) {
      console.log("Approve clinic error:", error);
      alert(error.message || "Failed to approve clinic");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!clinic?._id || actionLoading) {
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
        `http://localhost:8000/api/v1/pattner/clinic/status/${clinic._id}`,
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

      const result = await response.json();

      console.log("Reject Clinic Response:", result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to reject clinic");
      }

      alert(result.message || "Clinic rejected successfully");

      navigate("/admin/onboard");
    } catch (error) {
      console.log("Reject clinic error:", error);
      alert(error.message || "Failed to reject clinic");
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
    link.download = doc.fileName || "clinic-document";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="mb-3 h-5 w-32 animate-pulse rounded bg-slate-200" />
            <div className="h-9 w-64 animate-pulse rounded bg-slate-200" />
            <div className="mt-2 h-4 w-80 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="flex gap-3">
            <div className="h-14 w-32 animate-pulse rounded-xl bg-slate-200" />
            <div className="h-14 w-32 animate-pulse rounded-xl bg-slate-200" />
          </div>
        </div>

        <div className="mb-6 h-48 animate-pulse rounded-2xl bg-white" />

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <div className="h-80 animate-pulse rounded-2xl bg-white" />
          <div className="h-80 animate-pulse rounded-2xl bg-white" />
        </div>
      </div>
    );
  }

  if (!clinic) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Building2 size={50} className="mx-auto mb-4 text-slate-300" />

          <h2 className="text-xl font-bold text-slate-800">
            Clinic data not found
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
    clinic.isActive === true
      ? "Active"
      : clinic.verificationStatus === "pending"
        ? "Pending"
        : "Inactive";

  const joinedOn = clinic.createdAt
    ? new Date(clinic.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  const photos = Array.isArray(clinic.photos) ? clinic.photos : [];

  const documents = getDocuments(clinic.documents);

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
            Clinic Details
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View complete clinic information and documents
          </p>
        </div>

        {status === "Pending" && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReject}
              disabled={actionLoading}
              className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-7 py-4 text-sm font-semibold text-red-500 shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={19} />

              {actionLoading ? "Processing..." : "Reject"}
            </button>

            <button
              type="button"
              onClick={handleApprove}
              disabled={actionLoading}
              className="flex items-center gap-2 rounded-xl bg-emerald-500 px-7 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Check size={19} />

              {actionLoading ? "Processing..." : "Approve"}
            </button>
          </div>
        )}
      </div>

      <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center">
          <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-cyan-50 text-cyan-500">
            {photos.length > 0 && photos[0]?.url ? (
              <img
                src={photos[0].url}
                alt={clinic.clinicName}
                className="h-full w-full object-cover"
              />
            ) : (
              <Building2 size={60} strokeWidth={1.5} />
            )}
          </div>

          <div className="flex-1">
            <div className="mb-2 inline-flex items-center gap-2 rounded-lg bg-cyan-50 px-3 py-1.5 text-sm font-semibold text-cyan-600">
              <Building2 size={15} />
              Clinic
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              {clinic.clinicName || "N/A"}
            </h2>

            <p className="mt-1 text-base text-slate-500">
              {clinic.clinicType || "N/A"}
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
                <div className="rounded-lg bg-cyan-50 p-2 text-cyan-500">
                  <Building2 size={17} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">Clinic ID</p>

                  <p className="text-sm font-semibold text-slate-700">
                    {clinic._id || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <InfoCard
          icon={<Building2 size={19} />}
          title="Clinic Information"
          iconClass="bg-cyan-50 text-cyan-600"
        >
          <InfoRow label="Clinic Name" value={clinic.clinicName} />

          <InfoRow label="Clinic Type" value={clinic.clinicType} />

          <InfoRow label="Email" value={clinic.email} />

          <InfoRow label="Phone" value={clinic.phone} />

          <InfoRow label="Address" value={clinic.address} />

          <InfoRow label="City" value={clinic.city} />

          <InfoRow label="State" value={clinic.state} />

          <InfoRow label="Pincode" value={clinic.pincode} />
        </InfoCard>

        <InfoCard
          icon={<Clock size={19} />}
          title="Working Hours"
          iconClass="bg-emerald-50 text-emerald-600"
        >
          {Array.isArray(clinic.workingHours) &&
          clinic.workingHours.length > 0 ? (
            <div className="space-y-2 py-3">
              {clinic.workingHours.map((item, index) => {
                const day =
                  item?.day ||
                  item?.days ||
                  item?.weekDay ||
                  `Day ${index + 1}`;

                const isEnabled = item?.enabled === true;

                const open =
                  item?.open ||
                  item?.openingTime ||
                  item?.openTime ||
                  item?.startTime ||
                  "";

                const close =
                  item?.close ||
                  item?.closingTime ||
                  item?.closeTime ||
                  item?.endTime ||
                  "";

                return (
                  <div
                    key={`${day}-${index}`}
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          isEnabled ? "bg-emerald-500" : "bg-slate-400"
                        }`}
                      />

                      <span className="text-sm font-semibold text-slate-700">
                        {day}
                      </span>
                    </div>

                    <span
                      className={`text-sm font-medium ${
                        isEnabled ? "text-slate-600" : "text-red-500"
                      }`}
                    >
                      {isEnabled
                        ? `${open || "--"} - ${close || "--"}`
                        : "Closed"}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-slate-500">
              No working hours available
            </div>
          )}
        </InfoCard>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                <ImageIcon size={20} />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">Clinic Photos</h3>

                <p className="text-xs text-slate-500">Uploaded clinic images</p>
              </div>
            </div>
          </div>

          <div className="p-5">
            {photos.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {photos.map((photo, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      photo?.url &&
                      window.open(photo.url, "_blank", "noopener,noreferrer")
                    }
                    className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                  >
                    {photo?.url ? (
                      <img
                        src={photo.url}
                        alt={`Clinic ${index + 1}`}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ImageIcon size={35} className="text-slate-300" />
                      </div>
                    )}

                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
                      <Eye
                        size={25}
                        className="text-white opacity-0 transition group-hover:opacity-100"
                      />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center">
                <ImageIcon size={40} className="mx-auto mb-3 text-slate-300" />

                <p className="text-sm font-medium text-slate-500">
                  No clinic photos available
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FileText size={20} />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">Documents</h3>

                <p className="text-xs text-slate-500">
                  Verify clinic documents
                </p>
              </div>
            </div>
          </div>

          <div className="p-4">
            {documents.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-50 text-left">
                      <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        #
                      </th>

                      <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Document
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
                                {doc.name}
                              </span>

                              {doc.fileName && (
                                <span className="block max-w-[250px] truncate text-xs text-slate-400">
                                  {doc.fileName}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="px-3 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              disabled={!doc.url}
                              onClick={() => handleViewDocument(doc)}
                              className="flex items-center gap-1.5 rounded-lg border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Eye size={15} />
                              View
                            </button>

                            <button
                              type="button"
                              disabled={!doc.url}
                              onClick={() => handleDownloadDocument(doc)}
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
          icon={<MapPin size={19} />}
          title="Location"
          iconClass="bg-orange-50 text-orange-600"
        >
          <InfoRow label="Address" value={clinic.address} />

          <InfoRow label="City" value={clinic.city} />

          <InfoRow label="State" value={clinic.state} />

          <InfoRow label="Pincode" value={clinic.pincode} />
        </InfoCard>

        <InfoCard
          icon={<Info size={19} />}
          title="Additional Information"
          iconClass="bg-cyan-50 text-cyan-600"
        >
          <InfoRow label="Verification" value={clinic.verificationStatus} />

          <InfoRow label="Active" value={clinic.isActive ? "Yes" : "No"} />

          <InfoRow label="Clinic ID" value={clinic._id} />

          <InfoRow
            label="Created At"
            value={
              clinic.createdAt
                ? new Date(clinic.createdAt).toLocaleString()
                : "N/A"
            }
          />

          <InfoRow
            label="Updated At"
            value={
              clinic.updatedAt
                ? new Date(clinic.updatedAt).toLocaleString()
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
                Please verify all clinic information and documents before
                approving or rejecting this clinic.
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

function formatValue(value) {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }

  if (Array.isArray(value)) {
    return (
      value
        .map((item) => {
          if (typeof item === "object" && item !== null) {
            return formatObject(item);
          }

          return String(item);
        })
        .filter(Boolean)
        .join(", ") || "N/A"
    );
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
