import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import {
  Building2,
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

export default function ClinicForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const refemail = useRef();
  const handleVerifyEmail = async (e) => {
    e.preventDefault();

    const info = {
      email: refemail.current.value,
    };
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your clinic email.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://physio-backend-sand.vercel.app/api/v1/pattner/clinic_Forgetpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(info),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send reset link.");
      }

      setSuccess(
        data.message || "Password reset link has been sent to your email.",
      );
    } catch (error) {
      console.log("FORGOT PASSWORD ERROR:", error);

      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

              <p className="text-xs text-slate-500">Clinic Partner Portal</p>
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
              Enter your admin email and we'll help you reset your password.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-8">
            {error && (
              <div className="mb-5 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-5 flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleVerifyEmail}>
              <h2 className="text-xl font-bold text-slate-900">
                Reset Your Password
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter the email address associated with your admin account. We
                will send you a password reset link.
              </p>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Admin Email
                </label>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="email"
                    value={email}
                    ref={refemail}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                      setSuccess("");
                    }}
                    placeholder="admin@example.com"
                    className="h-13 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-sm outline-none transition focus:border-[#32838c] focus:ring-4 focus:ring-[#32838c]/10"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#32838c] text-sm font-bold text-white transition hover:bg-[#286f77] disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Reset Link"}

                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
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
