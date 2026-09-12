import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Stethoscope,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const DoctorLogin = () => {
  const navigate = useNavigate();

  const refEmail = useRef();
  const refPassword = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const loginData = {
      Email: refEmail.current.value.trim().toLowerCase(),
      Password: refPassword.current.value,
    };

    if (!loginData.Email || !loginData.Password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/pattner/doctor_Login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(loginData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Invalid email or password. Please try again.",
        );
        setLoading(false);
        return;
      }
      setLoading(false);
      navigate("/doctor/dashboard");
    } catch (error) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
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
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-81px)] items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#32838c]/10">
              <Stethoscope size={30} className="text-[#32838c]" />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#32838c]">
              Doctor Partner
            </p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
              Welcome Back
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              Login to access your doctor dashboard.
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

            <form onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  Email Address
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    ref={refEmail}
                    placeholder="doctor@example.com"
                    className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#32838c] focus:bg-white focus:ring-2 focus:ring-[#32838c]/10"
                    required
                  />
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700">
                    Password
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <Link
                    to="/doctor/forgot-password"
                    className="text-xs font-semibold text-[#32838c] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="relative">
                  <Lock
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    ref={refPassword}
                    placeholder="Enter your password"
                    className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#32838c] focus:bg-white focus:ring-2 focus:ring-[#32838c]/10"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#32838c]"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#32838c]" />

                <span className="text-xs text-slate-500">
                  Your account information is protected.
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#32838c] text-sm font-bold text-white shadow-lg shadow-[#32838c]/20 transition hover:bg-[#286a71] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Login to Doctor Portal
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            <div className="mt-7 border-t border-slate-100 pt-6 text-center">
              <p className="text-xs text-slate-500">
                Don't have a doctor account?{" "}
                <Link
                  to="/doctor/signup"
                  className="font-bold text-[#32838c] hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-[#32838c]"
            >
              <ArrowLeft size={15} />
              Back to Partner Registration
            </Link>
          </div>
        </div>
      </main>

      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
          <div className="w-full max-w-sm rounded-2xl bg-white p-7 text-center shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#32838c]/10">
              <CheckCircle2 size={30} className="text-[#32838c]" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              Login Successful
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Welcome back! You have successfully logged in to the doctor
              portal.
            </p>

            <button
              type="button"
              onClick={() => {
                setShowSuccessPopup(false);
                navigate("/doctor/dashboard");
              }}
              className="mt-6 h-11 w-full rounded-xl bg-[#32838c] text-sm font-bold text-white transition hover:bg-[#286a71]"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorLogin;
