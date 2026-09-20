import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import {
  Mail,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  KeyRound,
} from "lucide-react";

const DoctorForgotPassword = () => {
  const refEmail = useRef();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyEmail = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const cleanEmail = { email: refEmail.current.value };

    if (!cleanEmail) {
      setError("Please enter your registered email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://physio-backend-sand.vercel.app/api/v1/pattner/pattner_Forgetpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // credentials: "include",
          body: JSON.stringify(cleanEmail),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong.");
        setLoading(false);
        return;
      }

      setSuccess("Password reset link has been sent to your email.");
    } catch (error) {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7fbfb] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="h-11 w-11 overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
              <img
                src="/image.png"
                alt="LiBi Motion Care"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900">
                LiBi <span className="text-[#32838c]">Motion Care</span>
              </h1>

              <p className="mt-0.5 text-xs text-slate-400">
                Doctor Partner Portal
              </p>
            </div>
          </Link>

          <Link
            to="/doctor/login"
            className="inline-flex items-center gap-2 rounded-lg border border-[#32838c] px-4 py-2 text-xs font-bold text-[#32838c] transition hover:bg-[#32838c] hover:text-white sm:text-sm"
          >
            Back to Login
          </Link>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-81px)] items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#32838c]/10">
              <KeyRound size={30} className="text-[#32838c]" />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#32838c]">
              Doctor Partner
            </p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
              Forgot Password?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Enter your registered email address to reset your doctor account
              password.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-8">
            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                <ShieldCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-red-500"
                />

                <p className="text-xs font-medium leading-5 text-red-700">
                  {error}
                </p>
              </div>
            )}

            {success && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <p className="text-xs font-medium leading-5 text-emerald-700">
                  {success}
                </p>
              </div>
            )}

            {!success && (
              <form onSubmit={handleVerifyEmail}>
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  Registered Email Address
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    ref={refEmail}
                    type="email"
                    onChange={() => setError("")}
                    placeholder="doctor@example.com"
                    className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#32838c] focus:bg-white focus:ring-2 focus:ring-[#32838c]/10"
                    required
                  />
                </div>

                <div className="mt-5 flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                  <ShieldCheck
                    size={17}
                    className="mt-0.5 shrink-0 text-[#32838c]"
                  />

                  <p className="text-[11px] leading-5 text-slate-500">
                    Enter the email address you used when creating your LiBi
                    Motion Care doctor account.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#32838c] text-sm font-bold text-white shadow-lg shadow-[#32838c]/20 transition hover:bg-[#286a71] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending Reset Link...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>
            )}

            {success && (
              <div className="text-center">
                <p className="text-sm text-slate-500">
                  Please check your email and click the reset password link.
                </p>

                <Link
                  to="/doctor/login"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#32838c] hover:underline"
                >
                  <ArrowLeft size={16} />
                  Back to Login
                </Link>
              </div>
            )}

            {!success && (
              <div className="mt-7 border-t border-slate-100 pt-6 text-center">
                <p className="text-xs text-slate-500">
                  Remember your password?{" "}
                  <Link
                    to="/doctor/login"
                    className="font-bold text-[#32838c] hover:underline"
                  >
                    Back to Login
                  </Link>
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            <ShieldCheck size={14} className="text-[#32838c]" />

            <span className="text-[10px] text-slate-400">
              Secure Doctor Partner Account
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorForgotPassword;
