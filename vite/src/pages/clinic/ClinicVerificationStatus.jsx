import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Building2,
  CheckCircle2,
  Clock3,
  AlertCircle,
  FileText,
  ArrowRight,
  ShieldCheck,
  LogOut,
} from "lucide-react";

export default function ClinicVerificationStatus() {
  const navigate = useNavigate();

  const [clinic, setClinic] = useState(null);
  const [documents, setDocuments] = useState({});

  useEffect(() => {
    const storedClinic = localStorage.getItem(
      "libi_current_clinic"
    );

    if (!storedClinic) {
      navigate("/clinic/login");
      return;
    }

    try {
      const parsedClinic = JSON.parse(storedClinic);

      setClinic(parsedClinic);

      const storedDocuments = localStorage.getItem(
        `libi_clinic_documents_${parsedClinic.id}`
      );

      if (storedDocuments) {
        setDocuments(JSON.parse(storedDocuments));
      }
    } catch {
      navigate("/clinic/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("libi_current_clinic");
    navigate("/clinic/login");
  };

  if (!clinic) return null;

  const status =
    clinic.status || "DOCUMENTS_PENDING";

  const uploadedCount =
    Object.keys(documents).length;

  const getStatusContent = () => {
    if (status === "VERIFIED") {
      return {
        title: "Your Clinic is Verified",
        description:
          "Your clinic documents have been reviewed and your clinic partner account has been successfully verified.",
        icon: CheckCircle2,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
        badge: "VERIFIED",
        badgeClass:
          "bg-emerald-50 text-emerald-700",
      };
    }

    if (status === "REJECTED") {
      return {
        title: "Documents Need Attention",
        description:
          "Your submitted clinic documents require correction or additional information. Please update and resubmit them.",
        icon: AlertCircle,
        iconBg: "bg-red-50",
        iconColor: "text-red-600",
        badge: "REJECTED",
        badgeClass: "bg-red-50 text-red-700",
      };
    }

    if (
      status === "UNDER_REVIEW" ||
      status === "DOCUMENTS_SUBMITTED"
    ) {
      return {
        title: "Clinic Verification in Progress",
        description:
          "Your clinic documents have been submitted and are currently being reviewed by the LiBi Motion Care admin team.",
        icon: Clock3,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600",
        badge: "UNDER REVIEW",
        badgeClass:
          "bg-amber-50 text-amber-700",
      };
    }

    return {
      title: "Documents Required",
      description:
        "Please upload the required clinic documents to begin the verification process.",
      icon: FileText,
      iconBg: "bg-[#32838c]/10",
      iconColor: "text-[#32838c]",
      badge: "DOCUMENTS PENDING",
      badgeClass:
        "bg-[#32838c]/10 text-[#32838c]",
    };
  };

  const content = getStatusContent();
  const StatusIcon = content.icon;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/image.png"
              alt="LiBi Motion Care"
              className="h-11 w-11 object-contain"
            />

            <div>
              <p className="text-lg font-bold text-slate-900">
                LiBi Motion Care
              </p>

              <p className="text-xs text-slate-500">
                Clinic Partner Portal
              </p>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-[#32838c]/10">
            <Building2 className="h-8 w-8 text-[#32838c]" />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Clinic Verification Status
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {clinic.clinicName}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-10">
          <div className="text-center">
            <div
              className={`mx-auto grid h-20 w-20 place-items-center rounded-full ${content.iconBg}`}
            >
              <StatusIcon
                className={`h-10 w-10 ${content.iconColor}`}
              />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              {content.title}
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
              {content.description}
            </p>

            <span
              className={`mt-5 inline-flex rounded-full px-4 py-2 text-xs font-bold ${content.badgeClass}`}
            >
              {content.badge}
            </span>
          </div>

          <div className="mx-auto mt-10 max-w-xl">
            <VerificationStep
              title="Clinic Registered"
              description="Your clinic partner account has been created."
              completed
            />

            <VerificationStep
              title="Documents Submitted"
              description={`${uploadedCount} document(s) uploaded.`}
              completed={
                status !== "DOCUMENTS_PENDING"
              }
            />

            <VerificationStep
              title="Admin Review"
              description="The LiBi Motion Care admin team reviews your clinic documents."
              completed={
                status === "VERIFIED"
              }
              active={
                status === "UNDER_REVIEW" ||
                status === "DOCUMENTS_SUBMITTED"
              }
            />

            <VerificationStep
              title="Clinic Verified"
              description="Access your complete clinic dashboard."
              completed={status === "VERIFIED"}
              last
            />
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            {status === "VERIFIED" && (
              <Link
                to="/clinic/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#32838c] px-7 py-3 text-sm font-bold text-white hover:bg-[#286f77]"
              >
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}

            {(status === "DOCUMENTS_PENDING" ||
              status === "REJECTED") && (
              <Link
                to="/clinic/documents"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#32838c] px-7 py-3 text-sm font-bold text-white hover:bg-[#286f77]"
              >
                {status === "REJECTED"
                  ? "Update Documents"
                  : "Upload Documents"}

                <ArrowRight className="h-4 w-4" />
              </Link>
            )}

            {status === "UNDER_REVIEW" && (
              <div className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-7 py-3 text-sm font-semibold text-slate-500">
                <Clock3 className="h-4 w-4" />
                Awaiting Admin Verification
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="h-4 w-4" />
          LiBi Motion Care Verification System
        </div>
      </main>
    </div>
  );
}

function VerificationStep({
  title,
  description,
  completed,
  active,
  last,
}) {
  return (
    <div className="relative flex gap-4">
      {!last && (
        <div
          className={`absolute left-5 top-10 h-full w-px ${
            completed
              ? "bg-emerald-300"
              : "bg-slate-200"
          }`}
        />
      )}

      <div
        className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full ${
          completed
            ? "bg-emerald-500 text-white"
            : active
            ? "bg-amber-500 text-white"
            : "bg-slate-100 text-slate-400"
        }`}
      >
        {completed ? (
          <CheckCircle2 className="h-5 w-5" />
        ) : (
          <Clock3 className="h-5 w-5" />
        )}
      </div>

      <div className="pb-8">
        <h3 className="text-sm font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}