import { useEffect, useState } from "react";
import {
  FileCheck,
  Clock3,
  CheckCircle2,
  XCircle,
  FileText,
  ShieldCheck,
  UserRound,
  Mail,
  CalendarDays,
  AlertCircle,
} from "lucide-react";

export default function DocumentVerification() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  const doctorId = localStorage.getItem("doctorId");

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      try {
        const response = await fetch(
          "https://physio-backend-sand.vercel.app/api/v1/pattner/doctor/document-verification",
          {
            method: "GET",
            credentials: "include",
          },
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch verification status",
          );
        }

        setDoctor(result.data);

        console.log("DOCUMENT VERIFICATION:", result);

        setDoctor(result.data);
      } catch (error) {
        console.error("DOCUMENT VERIFICATION ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) {
      fetchVerificationStatus();
    } else {
      setLoading(false);
    }
  }, [doctorId]);

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-50">
            <div className="h-7 w-7 animate-spin rounded-full border-4 border-teal-100 border-t-teal-600" />
          </div>

          <p className="mt-4 text-sm font-semibold text-slate-600">
            Checking verification status...
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Please wait while we fetch your documents.
          </p>
        </div>
      </div>
    );
  }

  const status = doctor?.verificationStatus || "pending";

  const statusConfig = {
    approved: {
      title: "Verification Approved",
      description:
        "Your documents have been reviewed and successfully verified.",
      icon: CheckCircle2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      titleColor: "text-emerald-800",
      textColor: "text-emerald-700",
    },

    pending: {
      title: "Verification In Progress",
      description:
        "Your documents are currently being reviewed by our verification team.",
      icon: Clock3,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      titleColor: "text-amber-800",
      textColor: "text-amber-700",
    },

    rejected: {
      title: "Verification Rejected",
      description: "Your submitted documents could not be verified.",
      icon: XCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      titleColor: "text-red-800",
      textColor: "text-red-700",
    },
  };

  const currentStatus = statusConfig[status] || statusConfig.pending;

  const StatusIcon = currentStatus.icon;

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B1B2A] text-white shadow-sm">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Document Verification
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Track the verification status of your submitted documents.
              </p>
            </div>
          </div>
        </div>

        <div
          className={`relative overflow-hidden rounded-3xl border ${currentStatus.border} ${currentStatus.bg} p-6 shadow-sm sm:p-8`}
        >
          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/30" />
          <div className="absolute -bottom-16 -left-10 h-32 w-32 rounded-full bg-white/20" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${currentStatus.iconBg} ${currentStatus.iconColor}`}
              >
                <StatusIcon size={30} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Current Status
                </p>

                <h2
                  className={`mt-1 text-2xl font-bold ${currentStatus.titleColor}`}
                >
                  {currentStatus.title}
                </h2>

                <p
                  className={`mt-1 max-w-xl text-sm ${currentStatus.textColor}`}
                >
                  {currentStatus.description}
                </p>
              </div>
            </div>

            <div
              className={`inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold capitalize shadow-sm ${currentStatus.titleColor}`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  status === "approved"
                    ? "bg-emerald-500"
                    : status === "rejected"
                      ? "bg-red-500"
                      : "bg-amber-500"
                }`}
              />

              {status}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <UserRound size={20} />
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Doctor Information
                </h2>

                <p className="text-xs text-slate-400">
                  Registered account details
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-teal-600 shadow-sm">
                    <UserRound size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Full Name
                    </p>

                    <p className="mt-1 truncate text-sm font-bold text-slate-700">
                      {doctor?.fullName || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-teal-600 shadow-sm">
                    <Mail size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Email Address
                    </p>

                    <p className="mt-1 truncate text-sm font-bold text-slate-700">
                      {doctor?.email || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <FileCheck size={20} />
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Verification
                  </h2>

                  <p className="text-xs text-slate-400">Document review</p>
                </div>
              </div>

              <div className="mt-6 flex flex-1 flex-col justify-center text-center">
                <div
                  className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${currentStatus.iconBg} ${currentStatus.iconColor}`}
                >
                  <StatusIcon size={38} />
                </div>

                <p className="mt-4 text-lg font-bold capitalize text-slate-800">
                  {status}
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  {status === "approved"
                    ? "Your account is verified."
                    : status === "rejected"
                      ? "Please check the rejection reason."
                      : "Your account is under review."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {status === "rejected" && doctor?.rejectionReason && (
          <div className="rounded-2xl border border-red-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <AlertCircle size={21} />
              </div>

              <div>
                <h2 className="text-sm font-bold text-red-800">
                  Reason for Rejection
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {doctor.rejectionReason}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <FileText size={20} />
            </div>

            <div className="flex-1">
              <h2 className="text-base font-bold text-slate-900">
                Document Review
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Your submitted documents are reviewed by the verification team.
                The verification status shown above reflects the current status
                of your application.
              </p>

              {doctor?.verifiedAt && (
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-400">
                  <CalendarDays size={15} />
                  Verified on {new Date(doctor.verifiedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
