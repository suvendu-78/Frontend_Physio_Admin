import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import {
  ShieldCheck,
  Mail,
  ArrowLeft,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const AdminForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const refemail = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    if (!email) {
      setError("Please enter your admin email.");
      return;
    }

    const info = {
      Email: refemail.current.value,
    };

    ///admin_Forgetpassword
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/onboard/admin_Forgetpassword",
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

    setLoading(true);

    setLoading(false);
    setSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5fbfb] via-white to-[#eef7f8] px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/admin/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#32838c]"
        >
          <ArrowLeft size={16} />
          Back to Admin Login
        </Link>
      </div>

      <div className="flex min-h-[calc(100vh-100px)] items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 h-16 w-16 overflow-hidden rounded-full border border-slate-200 bg-white shadow-md">
              <img
                src="/image.png"
                alt="LiBi Motion Care"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mb-3 flex items-center justify-center gap-2">
              <ShieldCheck size={19} className="text-[#32838c]" />

              <span className="text-sm font-semibold uppercase tracking-wider text-[#32838c]">
                Admin Portal
              </span>
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              Forgot Password?
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Enter your admin email and we'll help you reset your password.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Admin Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      ref={refemail}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="admin@example.com"
                      autoComplete="email"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#32838c] focus:bg-white focus:ring-2 focus:ring-[#32838c]/10"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#32838c] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#286a71] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="py-4 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
                  <CheckCircle2 size={30} className="text-emerald-500" />
                </div>

                <h2 className="mt-5 text-xl font-bold text-slate-900">
                  Request Received
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  If an admin account exists with this email, password reset
                  instructions will be sent to you.
                </p>

                <Link
                  to="/admin/login"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#32838c] hover:underline"
                >
                  <ArrowLeft size={16} />
                  Back to Admin Login
                </Link>
              </div>
            )}

            {!success && (
              <div className="mt-6 border-t border-slate-100 pt-6 text-center">
                <p className="text-sm text-slate-500">
                  Remember your password?
                </p>

                <Link
                  to="/admin/login"
                  className="mt-1 inline-block text-sm font-semibold text-[#32838c] hover:underline"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={14} />
            Secure Admin Access
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
