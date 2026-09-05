import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

export default function ClinicForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyEmail = (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your clinic email.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const storedAccount = localStorage.getItem(
        "libi_clinic_account"
      );

      if (!storedAccount) {
        setLoading(false);
        setError(
          "No clinic account found with this email."
        );
        return;
      }

      try {
        const clinic = JSON.parse(storedAccount);

        if (
          clinic.email !==
          email.toLowerCase().trim()
        ) {
          setLoading(false);
          setError(
            "No clinic account found with this email."
          );
          return;
        }

        setLoading(false);
        setStep(2);
      } catch {
        setLoading(false);
        setError(
          "Unable to verify account. Please try again."
        );
      }
    }, 700);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    setError("");

    if (password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const storedAccount = localStorage.getItem(
        "libi_clinic_account"
      );

      if (!storedAccount) {
        setLoading(false);
        setError("Clinic account not found.");
        return;
      }

      try {
        const clinic = JSON.parse(storedAccount);

        clinic.password = password;

        localStorage.setItem(
          "libi_clinic_account",
          JSON.stringify(clinic)
        );

        setLoading(false);
        setStep(3);
      } catch {
        setLoading(false);
        setError(
          "Unable to reset password. Please try again."
        );
      }
    }, 800);
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-emerald-50">
            <CheckCircle2 className="h-9 w-9 text-emerald-600" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Password Updated
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Your clinic password has been updated
            successfully.
          </p>

          <button
            onClick={() => navigate("/clinic/login")}
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#32838c] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#286f77]"
          >
            Continue to Login
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
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
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[#32838c]/10">
              <Building2 className="h-7 w-7 text-[#32838c]" />
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              Forgot Password?
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Reset your clinic partner account password
            </p>
          </div>

          <div className="mb-6 flex items-center">
            <Step
              number="1"
              label="Verify"
              active={step === 1}
              completed={step > 1}
            />

            <div className="h-px flex-1 bg-slate-200" />

            <Step
              number="2"
              label="Reset"
              active={step === 2}
              completed={false}
            />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-8">
            {error && (
              <div className="mb-5 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {step === 1 && (
              <form onSubmit={handleVerifyEmail}>
                <h2 className="text-xl font-bold text-slate-900">
                  Verify Your Account
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Enter the email address associated with
                  your clinic account.
                </p>

                <div className="mt-6">
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

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#32838c] text-sm font-bold text-white transition hover:bg-[#286f77] disabled:opacity-60"
                >
                  {loading
                    ? "Verifying..."
                    : "Verify Email"}

                  {!loading && (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleResetPassword}>
                <h2 className="text-xl font-bold text-slate-900">
                  Create New Password
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Create a new secure password for your
                  clinic account.
                </p>

                <div className="mt-6">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    New Password
                  </label>

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
                      placeholder="Minimum 8 characters"
                      className="h-13 w-full rounded-xl border border-slate-200 pl-11 pr-12 text-sm outline-none transition focus:border-[#32838c] focus:ring-4 focus:ring-[#32838c]/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (prev) => !prev
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Confirm Password
                  </label>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(
                          e.target.value
                        );
                        setError("");
                      }}
                      placeholder="Re-enter password"
                      className="h-13 w-full rounded-xl border border-slate-200 pl-11 pr-12 text-sm outline-none transition focus:border-[#32838c] focus:ring-4 focus:ring-[#32838c]/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (prev) => !prev
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#32838c] text-sm font-bold text-white transition hover:bg-[#286f77] disabled:opacity-60"
                >
                  {loading
                    ? "Updating..."
                    : "Update Password"}

                  {!loading && (
                    <CheckCircle2 className="h-4 w-4" />
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/clinic/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#32838c]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Clinic Login
            </Link>
          </div>

          <div className="mt-6 flex justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="h-4 w-4" />
            Secure account recovery
          </div>
        </div>
      </main>
    </div>
  );
}

function Step({ number, label, active, completed }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`grid h-9 w-9 place-items-center rounded-full text-xs font-bold ${
          completed
            ? "bg-emerald-500 text-white"
            : active
            ? "bg-[#32838c] text-white"
            : "bg-slate-100 text-slate-400"
        }`}
      >
        {completed ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          number
        )}
      </div>

      <span
        className={`hidden text-xs font-semibold sm:block ${
          active
            ? "text-slate-900"
            : "text-slate-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
}