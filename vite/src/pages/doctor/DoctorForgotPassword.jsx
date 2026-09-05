import React, { useState } from "react";
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
  KeyRound,
} from "lucide-react";

const DoctorForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================================================
     STEP 1
     VERIFY EMAIL
  ========================================================= */

  const handleVerifyEmail = (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const cleanEmail = email.toLowerCase().trim();

    if (!cleanEmail) {
      setError("Please enter your registered email address.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const savedAccount = localStorage.getItem(
        "libi_doctor_account"
      );

      if (!savedAccount) {
        setLoading(false);

        setError(
          "No doctor account was found. Please create a doctor account first."
        );

        return;
      }

      const doctorAccount = JSON.parse(savedAccount);

      if (doctorAccount.email !== cleanEmail) {
        setLoading(false);

        setError(
          "No doctor account is registered with this email address."
        );

        return;
      }

      setLoading(false);

      setStep(2);
    }, 700);
  };


  /* =========================================================
     STEP 2
     RESET PASSWORD
  ========================================================= */

  const handleResetPassword = (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!newPassword || !confirmPassword) {
      setError("Please enter and confirm your new password.");
      return;
    }

    if (newPassword.length < 8) {
      setError(
        "Your new password must contain at least 8 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const savedAccount = localStorage.getItem(
        "libi_doctor_account"
      );

      if (!savedAccount) {
        setLoading(false);

        setError(
          "Doctor account could not be found. Please register again."
        );

        return;
      }

      const doctorAccount = JSON.parse(savedAccount);

      const updatedAccount = {
        ...doctorAccount,
        password: newPassword,
        passwordUpdatedAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "libi_doctor_account",
        JSON.stringify(updatedAccount)
      );

      setLoading(false);

      setSuccess(
        "Your password has been changed successfully."
      );

      setTimeout(() => {
        navigate("/doctor/login");
      }, 1500);
    }, 800);
  };


  return (
    <div className="min-h-screen bg-[#f7fbfb] text-slate-900">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

          {/* LOGO */}

          <Link
            to="/"
            className="inline-flex items-center gap-3"
          >

            <div className="h-11 w-11 overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">

              <img
                src="/image.png"
                alt="LiBi Motion Care"
                className="h-full w-full object-cover"
              />

            </div>


            <div>

              <h1 className="text-lg font-bold tracking-tight text-slate-900">

                LiBi{" "}

                <span className="text-[#32838c]">
                  Motion Care
                </span>

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


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="flex min-h-[calc(100vh-81px)] items-center justify-center px-5 py-12 sm:px-8">

        <div className="w-full max-w-md">

          {/* =================================================
              ICON
          ================================================= */}

          <div className="text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#32838c]/10">

              {step === 1 ? (
                <KeyRound
                  size={30}
                  className="text-[#32838c]"
                />
              ) : (
                <Lock
                  size={30}
                  className="text-[#32838c]"
                />
              )}

            </div>


            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#32838c]">
              Doctor Partner
            </p>


            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">

              {step === 1
                ? "Forgot Password?"
                : "Create New Password"}

            </h2>


            <p className="mt-3 text-sm leading-6 text-slate-500">

              {step === 1
                ? "Enter your registered email address to reset your doctor account password."
                : "Create a new secure password for your doctor account."}

            </p>

          </div>


          {/* =================================================
              CARD
          ================================================= */}

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-8">

            {/* =================================================
                STEP INDICATOR
            ================================================= */}

            <div className="mb-7 flex items-center">

              <div className="flex flex-1 items-center">

                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                    step >= 1
                      ? "bg-[#32838c] text-white"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  1
                </div>

                <div
                  className={`h-0.5 flex-1 ${
                    step >= 2
                      ? "bg-[#32838c]"
                      : "bg-slate-200"
                  }`}
                />

              </div>


              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  step >= 2
                    ? "bg-[#32838c] text-white"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                2
              </div>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

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


            {/* =================================================
                SUCCESS
            ================================================= */}

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


            {/* =================================================
                STEP 1
                EMAIL
            ================================================= */}

            {step === 1 && (
              <form onSubmit={handleVerifyEmail}>

                <label className="mb-2 block text-xs font-bold text-slate-700">

                  Registered Email Address

                  <span className="ml-1 text-red-500">
                    *
                  </span>

                </label>


                <div className="relative">

                  <Mail
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />


                  <input
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError("");
                    }}
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
                    Enter the email address you used when
                    creating your LiBi Motion Care doctor account.
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

                      Checking Account...
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


            {/* =================================================
                STEP 2
                NEW PASSWORD
            ================================================= */}

            {step === 2 && (
              <form onSubmit={handleResetPassword}>

                {/* EMAIL DISPLAY */}

                <div className="mb-6 rounded-xl bg-[#32838c]/5 p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#32838c]">

                      <Mail size={16} />

                    </div>

                    <div>

                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Account
                      </p>

                      <p className="mt-1 text-xs font-bold text-slate-700">
                        {email}
                      </p>

                    </div>

                  </div>

                </div>


                {/* NEW PASSWORD */}

                <div>

                  <label className="mb-2 block text-xs font-bold text-slate-700">

                    New Password

                    <span className="ml-1 text-red-500">
                      *
                    </span>

                  </label>


                  <div className="relative">

                    <Lock
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />


                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={newPassword}
                      onChange={(event) => {
                        setNewPassword(event.target.value);
                        setError("");
                      }}
                      placeholder="Minimum 8 characters"
                      className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#32838c] focus:bg-white focus:ring-2 focus:ring-[#32838c]/10"
                      required
                    />


                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#32838c]"
                    >

                      {showPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}

                    </button>

                  </div>

                </div>


                {/* CONFIRM PASSWORD */}

                <div className="mt-5">

                  <label className="mb-2 block text-xs font-bold text-slate-700">

                    Confirm New Password

                    <span className="ml-1 text-red-500">
                      *
                    </span>

                  </label>


                  <div className="relative">

                    <Lock
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />


                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={confirmPassword}
                      onChange={(event) => {
                        setConfirmPassword(
                          event.target.value
                        );
                        setError("");
                      }}
                      placeholder="Confirm new password"
                      className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#32838c] focus:bg-white focus:ring-2 focus:ring-[#32838c]/10"
                      required
                    />


                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#32838c]"
                    >

                      {showConfirmPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}

                    </button>

                  </div>

                </div>


                {/* PASSWORD REQUIREMENTS */}

                <div className="mt-5 rounded-xl bg-slate-50 p-4">

                  <p className="text-xs font-bold text-slate-700">
                    Password requirements
                  </p>

                  <div className="mt-3 space-y-2">

                    <PasswordRequirement
                      valid={newPassword.length >= 8}
                      text="At least 8 characters"
                    />

                    <PasswordRequirement
                      valid={
                        newPassword === confirmPassword &&
                        confirmPassword.length > 0
                      }
                      text="Passwords match"
                    />

                  </div>

                </div>


                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#32838c] text-sm font-bold text-white shadow-lg shadow-[#32838c]/20 transition hover:bg-[#286a71] disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Updating Password...
                    </>
                  ) : (
                    <>
                      Reset Password

                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}

                </button>


                {/* CHANGE EMAIL */}

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setNewPassword("");
                    setConfirmPassword("");
                    setError("");
                    setSuccess("");
                  }}
                  className="mt-5 flex w-full items-center justify-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-[#32838c]"
                >

                  <ArrowLeft size={14} />

                  Use a different email

                </button>

              </form>
            )}


            {/* LOGIN LINK */}

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

          </div>


          {/* SECURITY */}

          <div className="mt-6 flex items-center justify-center gap-2">

            <ShieldCheck
              size={14}
              className="text-[#32838c]"
            />

            <span className="text-[10px] text-slate-400">
              Secure Doctor Partner Account
            </span>

          </div>

        </div>

      </main>

    </div>
  );
};


/* =========================================================
   PASSWORD REQUIREMENT
========================================================= */

const PasswordRequirement = ({
  valid,
  text,
}) => {
  return (
    <div className="flex items-center gap-2">

      <CheckCircle2
        size={14}
        className={
          valid
            ? "text-emerald-500"
            : "text-slate-300"
        }
      />

      <span
        className={`text-[11px] ${
          valid
            ? "font-semibold text-emerald-600"
            : "text-slate-400"
        }`}
      >
        {text}
      </span>

    </div>
  );
};


export default DoctorForgotPassword;