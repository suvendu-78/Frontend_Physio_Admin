import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
} from "lucide-react";

export default function ClinicLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      /*
       * DEVELOPMENT ONLY
       *
       * Production:
       * authenticate through backend API.
       */

      const storedAccount = localStorage.getItem(
        "libi_clinic_account"
      );

      if (!storedAccount) {
        setLoading(false);
        setError(
          "No clinic account found. Please register your clinic first."
        );
        return;
      }

      try {
        const clinic = JSON.parse(storedAccount);

        const emailMatches =
          clinic.email === email.toLowerCase().trim();

        const passwordMatches =
          clinic.password === password;

        if (!emailMatches || !passwordMatches) {
          setLoading(false);
          setError(
            "Invalid email or password. Please try again."
          );
          return;
        }

        const currentClinic = {
          id: clinic.id,
          role: "CLINIC",

          clinicName: clinic.clinicName,
          ownerName: clinic.ownerName,

          email: clinic.email,
          phone: clinic.phone,

          registrationNumber:
            clinic.registrationNumber,

          clinicType: clinic.clinicType,

          address: clinic.address,
          city: clinic.city,
          state: clinic.state,
          pincode: clinic.pincode,

          status: clinic.status,

          documentStatus:
            clinic.documentStatus || "PENDING",

          rejectionReason:
            clinic.rejectionReason || "",

          verifiedAt:
            clinic.verifiedAt || null,

          verifiedBy:
            clinic.verifiedBy || null,
        };

        localStorage.setItem(
          "libi_current_clinic",
          JSON.stringify(currentClinic)
        );

        setLoading(false);

        /*
         * VERIFICATION FLOW
         */

        // 1. Admin has verified the clinic
        if (clinic.status === "VERIFIED") {
          navigate("/clinic/dashboard");
          return;
        }

        // 2. Documents were rejected
        if (
          clinic.status === "REJECTED" ||
          clinic.documentStatus === "REJECTED"
        ) {
          navigate("/clinic/documents");
          return;
        }

        // 3. Documents are submitted and waiting
        // for admin verification
        if (
          clinic.status === "UNDER_REVIEW" ||
          clinic.documentStatus === "SUBMITTED"
        ) {
          navigate("/clinic/verification-status");
          return;
        }

        // 4. New account / documents not submitted
        navigate("/clinic/documents");
      } catch {
        setLoading(false);
        setError(
          "Something went wrong. Please register again."
        );
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =====================================================
            LEFT PANEL
        ===================================================== */}

        <div className="hidden bg-[#32838c] p-10 text-white lg:flex lg:flex-col lg:justify-between">

          <Link to="/" className="flex items-center gap-3">
            <img
              src="/image.png"
              alt="LiBi Motion Care"
              className="h-12 w-12 object-contain"
            />

            <div>
              <p className="text-lg font-bold">
                LiBi Motion Care
              </p>

              <p className="text-xs text-white/70">
                Clinic Partner Portal
              </p>
            </div>
          </Link>

          <div className="max-w-lg">

            <div className="mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-white/10">
              <Building2 className="h-8 w-8" />
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Manage your clinic
              <br />
              from one place.
            </h1>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/75">
              Manage doctors, patients, appointments,
              payments and your clinic operations through
              the LiBi Motion Care partner platform.
            </p>

            <div className="mt-8 space-y-4">

              {[
                "Manage your clinic profile",
                "Manage doctors and patients",
                "Track appointments and payments",
                "Secure document verification",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm"
                >
                  <CheckCircle2 className="h-5 w-5" />
                  {item}
                </div>
              ))}

            </div>
          </div>

          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} LiBi Motion Care
          </p>
        </div>

        {/* =====================================================
            RIGHT PANEL
        ===================================================== */}

        <div className="flex items-center justify-center px-4 py-10 sm:px-8">
          <div className="w-full max-w-md">

            <div className="mb-8 text-center lg:text-left">

              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#32838c]/10">
                <Building2 className="h-7 w-7 text-[#32838c]" />
              </div>

              <h2 className="text-3xl font-bold text-slate-900">
                Clinic Login
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Sign in to your clinic partner account
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-8"
            >

              {/* ERROR */}

              {error && (
                <div className="mb-5 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />

                  <span>{error}</span>
                </div>
              )}

              {/* EMAIL */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Clinic Email
                </label>

                <div className="relative">

                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="clinic@example.com"
                    className="h-13 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-sm outline-none transition focus:border-[#32838c] focus:ring-4 focus:ring-[#32838c]/10"
                  />

                </div>
              </div>

              {/* PASSWORD */}

              <div className="mt-5">

                <div className="mb-2 flex items-center justify-between">

                  <label className="block text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <Link
                    to="/clinic/forgot-password"
                    className="text-xs font-semibold text-[#32838c] hover:underline"
                  >
                    Forgot Password?
                  </Link>

                </div>

                <div className="relative">

                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your password"
                    className="h-13 w-full rounded-xl border border-slate-200 pl-11 pr-12 text-sm outline-none transition focus:border-[#32838c] focus:ring-4 focus:ring-[#32838c]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>

                </div>
              </div>

              {/* LOGIN */}

              <button
                type="submit"
                disabled={loading}
                className="mt-7 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#32838c] text-sm font-bold text-white shadow-lg shadow-[#32838c]/20 transition hover:bg-[#286f77] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}

              </button>

              {/* VERIFICATION INFO */}

              <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#32838c]/15 bg-[#32838c]/5 p-3.5">

                <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-[#32838c]" />

                <p className="text-xs leading-5 text-slate-500">
                  Your clinic must complete document
                  verification before dashboard access is
                  enabled.
                </p>

              </div>

              {/* REGISTER */}

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-100" />

                <span className="text-xs text-slate-400">
                  OR
                </span>

                <div className="h-px flex-1 bg-slate-100" />
              </div>

              <p className="text-center text-sm text-slate-500">
                Don't have a clinic account?{" "}

                <Link
                  to="/clinic/signup"
                  className="font-bold text-[#32838c] hover:underline"
                >
                  Register Clinic
                </Link>
              </p>

            </form>

            {/* BACK */}

            <div className="mt-6 flex justify-center">

              <Link
                to="/"
                className="text-sm font-semibold text-slate-500 hover:text-[#32838c]"
              >
                ← Back to LiBi Motion Care
              </Link>

            </div>

            {/* SECURITY */}

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4" />
              Secure Clinic Partner Portal
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}