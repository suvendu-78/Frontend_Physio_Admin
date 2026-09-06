import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Stethoscope,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Trash2,
  Eye,
  Clock3,
  LogOut,
  Home,
} from "lucide-react";

const REQUIRED_DOCUMENTS = [
  {
    id: "registration_certificate",
    title: "Professional Registration Certificate",
    description: "Valid professional registration certificate",
    required: true,
  },
  {
    id: "qualification_certificate",
    title: "Qualification Certificate",
    description: "Degree / diploma / professional qualification",
    required: true,
  },
  {
    id: "government_id",
    title: "Government ID",
    description: "Valid government-issued identity document",
    required: true,
  },
  {
    id: "experience_certificate",
    title: "Experience Certificate",
    description: "Relevant professional experience certificate",
    required: true,
  },
  {
    id: "profile_photo",
    title: "Profile Photo",
    description: "Recent professional profile photograph",
    required: true,
  },
  {
    id: "additional_certificate",
    title: "Additional Certificate",
    description: "Any additional professional certificate",
    required: false,
  },
];

export default function DoctorDocuments() {
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [documents, setDocuments] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const storedDoctor = localStorage.getItem(
      "libi_current_doctor"
    );

    if (!storedDoctor) {
      navigate("/doctor/login");
      return;
    }

    try {
      const parsedDoctor = JSON.parse(storedDoctor);

      setDoctor(parsedDoctor);

      const storedDocuments = localStorage.getItem(
        `libi_doctor_documents_${parsedDoctor.id}`
      );

      if (storedDocuments) {
        setDocuments(JSON.parse(storedDocuments));
      }
    } catch {
      navigate("/doctor/login");
    }
  }, [navigate]);

  const handleFileChange = (documentId, file) => {
    setError("");
    setSuccess("");

    if (!file) return;

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        `${file.name} is larger than 5MB. Please choose a smaller file.`
      );
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Only PDF, JPG, JPEG and PNG files are allowed."
      );
      return;
    }

    /*
     * Development prototype:
     * We store basic file information only.
     *
     * Real application:
     * Upload the file to backend/storage and store
     * the returned secure file URL.
     */

    const documentData = {
      id: documentId,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      status: "UPLOADED",
      uploadedAt: new Date().toISOString(),
    };

    setDocuments((prev) => ({
      ...prev,
      [documentId]: documentData,
    }));
  };

  const removeDocument = (documentId) => {
    setDocuments((prev) => {
      const updated = { ...prev };
      delete updated[documentId];
      return updated;
    });

    setError("");
    setSuccess("");
  };

  const getRequiredDocuments = () =>
    REQUIRED_DOCUMENTS.filter((doc) => doc.required);

  const uploadedRequiredDocuments =
    getRequiredDocuments().filter(
      (doc) => documents[doc.id]
    ).length;

  const allRequiredUploaded =
    uploadedRequiredDocuments ===
    getRequiredDocuments().length;

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!allRequiredUploaded) {
      setError(
        "Please upload all required documents before submitting."
      );
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      try {
        localStorage.setItem(
          `libi_doctor_documents_${doctor.id}`,
          JSON.stringify(documents)
        );

        const storedAccount = localStorage.getItem(
          "libi_doctor_account"
        );

        if (storedAccount) {
          const account = JSON.parse(storedAccount);

          account.status = "UNDER_REVIEW";
          account.documentStatus = "SUBMITTED";
          account.documentsSubmittedAt =
            new Date().toISOString();

          localStorage.setItem(
            "libi_doctor_account",
            JSON.stringify(account)
          );
        }

        const updatedDoctor = {
          ...doctor,
          status: "UNDER_REVIEW",
          documentStatus: "SUBMITTED",
        };

        localStorage.setItem(
          "libi_current_doctor",
          JSON.stringify(updatedDoctor)
        );

        setDoctor(updatedDoctor);
        setSubmitting(false);
        setSuccess(
          "Documents submitted successfully. Your account is now under review."
        );

        setTimeout(() => {
          navigate("/doctor/verification-status");
        }, 1200);
      } catch {
        setSubmitting(false);
        setError(
          "Unable to submit documents. Please try again."
        );
      }
    }, 900);
  };

  const handleLogout = () => {
    localStorage.removeItem("libi_current_doctor");
    navigate("/doctor/login");
  };

  if (!doctor) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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
                Doctor Verification Portal
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

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#32838c]">
                <Stethoscope className="h-4 w-4" />
                Doctor Verification
              </div>

              <h1 className="text-3xl font-bold text-slate-900">
                Submit Your Documents
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Upload the required documents so our admin
                team can verify your professional profile.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <p className="text-xs text-slate-400">
                Required Documents
              </p>

              <p className="mt-1 text-xl font-bold text-slate-900">
                {uploadedRequiredDocuments}/
                {getRequiredDocuments().length}
              </p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-600">
              Verification Progress
            </span>

            <span className="text-[#32838c]">
              {Math.round(
                (uploadedRequiredDocuments /
                  getRequiredDocuments().length) *
                  100
              )}
              %
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-[#32838c] transition-all"
              style={{
                width: `${
                  (uploadedRequiredDocuments /
                    getRequiredDocuments().length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Documents */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {REQUIRED_DOCUMENTS.map((document) => {
              const uploaded = documents[document.id];

              return (
                <DocumentCard
                  key={document.id}
                  document={document}
                  uploaded={uploaded}
                  onUpload={(file) =>
                    handleFileChange(
                      document.id,
                      file
                    )
                  }
                  onRemove={() =>
                    removeDocument(document.id)
                  }
                />
              );
            })}
          </div>

          {/* Info */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-[#32838c]" />

              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Document Requirements
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Accepted formats: PDF, JPG, JPEG and PNG.
                  Maximum file size is 5MB per document.
                  Please make sure your documents are clear
                  and readable.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Link
              to="/doctor/verification-status"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              <Clock3 className="h-4 w-4" />
              View Status
            </Link>

            <button
              type="submit"
              disabled={submitting || !allRequiredUploaded}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#32838c] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#32838c]/20 transition hover:bg-[#286f77] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "Submitting..."
                : "Submit for Verification"}

              {!submitting && (
                <ArrowRight className="h-4 w-4" />
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

function DocumentCard({
  document,
  uploaded,
  onUpload,
  onRemove,
}) {
  return (
    <div
      className={`rounded-2xl border bg-white p-5 shadow-sm transition ${
        uploaded
          ? "border-emerald-200"
          : "border-slate-200"
      }`}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div
            className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${
              uploaded
                ? "bg-emerald-50"
                : "bg-[#32838c]/10"
            }`}
          >
            {uploaded ? (
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            ) : (
              <FileText className="h-6 w-6 text-[#32838c]" />
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                {document.title}
              </h3>

              {document.required && (
                <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold text-red-500">
                  REQUIRED
                </span>
              )}
            </div>

            <p className="mt-1 text-xs text-slate-500">
              {document.description}
            </p>

            {uploaded && (
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-semibold text-slate-700">
                  {uploaded.fileName}
                </span>

                <span className="text-slate-400">
                  •
                </span>

                <span className="text-emerald-600">
                  Uploaded
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {uploaded && (
            <>
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                title="Preview"
                onClick={() => {
                  alert(
                    `Preview: ${uploaded.fileName}`
                  );
                }}
              >
                <Eye className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onRemove}
                className="grid h-10 w-10 place-items-center rounded-xl border border-red-100 text-red-500 transition hover:bg-red-50"
                title="Remove"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </>
          )}

          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800">
            <Upload className="h-4 w-4" />
            {uploaded ? "Replace" : "Upload"}

            <input
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                onUpload(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}