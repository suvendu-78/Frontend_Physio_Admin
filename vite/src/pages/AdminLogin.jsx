import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ShieldCheck,
  Mail,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
} from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showSecretCode, setShowSecretCode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    secretCode: "",
  });

  // ================================
  // HANDLE INPUT CHANGE
  // ================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // ================================
  // HANDLE LOGIN
  // ================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      !formData.secretCode
    ) {
      setError(
        "Please enter your email, password and secret code."
      );

      return;
    }

    /*
      DEVELOPMENT ONLY

      Do not keep a real secret code
      inside frontend code after deployment.

      Later, this should be checked
      through your backend API.
    */

    const ADMIN_SECRET_CODE = "LiBi@Admin2026";

    if (formData.secretCode !== ADMIN_SECRET_CODE) {
      setError("Invalid admin secret code.");
      return;
    }

    setLoading(true);

    // Temporary development login
    setTimeout(() => {
      setLoading(false);

      /*
        Admin website:
        http://localhost:5174

        Dashboard:
        http://localhost:5174/admin
      */

      navigate("/admin");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5fbfb] via-white to-[#eef7f8] px-4 py-8">

      {/* =========================================
          BACK TO ADMIN PORTAL
      ========================================== */}

      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#32838c]"
        >
          ← Back to Admin Portal
        </Link>
      </div>


      {/* =========================================
          LOGIN CONTAINER
      ========================================== */}

      <div className="flex min-h-[calc(100vh-100px)] items-center justify-center">

        <div className="w-full max-w-md">

          {/* =========================================
              LOGO / HEADER
          ========================================== */}

          <div className="mb-7 text-center">

            {/* Logo */}

            <div className="mx-auto mb-4 h-16 w-16 overflow-hidden rounded-full border border-slate-200 bg-white shadow-md">

              <img
                src="/image.png"
                alt="LiBi Motion Care"
                className="h-full w-full object-cover"
              />

            </div>


            {/* Admin Portal */}

            <div className="mb-3 flex items-center justify-center gap-2">

              <ShieldCheck
                size={19}
                className="text-[#32838c]"
              />

              <span className="text-sm font-semibold uppercase tracking-wider text-[#32838c]">
                Admin Portal
              </span>

            </div>


            {/* Heading */}

            <h1 className="text-3xl font-bold text-slate-900">
              Welcome Back
            </h1>


            <p className="mt-2 text-sm text-slate-500">
              Sign in to manage LiBi Motion Care
            </p>

          </div>


          {/* =========================================
              LOGIN CARD
          ========================================== */}

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* =====================================
                  ERROR MESSAGE
              ====================================== */}

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}


              {/* =====================================
                  EMAIL
              ====================================== */}

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
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@example.com"
                    autoComplete="email"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#32838c] focus:bg-white focus:ring-2 focus:ring-[#32838c]/10"
                  />

                </div>

              </div>


              {/* =====================================
                  PASSWORD
              ====================================== */}

              <div>

                {/* Password Label + Forgot Password */}

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>


                  <Link
                    to="/admin/forgot-password"
                    className="text-xs font-semibold text-[#32838c] transition hover:underline"
                  >
                    Forgot Password?
                  </Link>

                </div>


                {/* Password Input */}

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />


                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#32838c] focus:bg-white focus:ring-2 focus:ring-[#32838c]/10"
                  />


                  {/* Show / Hide Password */}

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#32838c]"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}

                  </button>

                </div>

              </div>


              {/* =====================================
                  SECRET CODE
              ====================================== */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="secretCode"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Admin Secret Code
                  </label>


                  <span className="text-[11px] font-medium text-[#32838c]">
                    Required
                  </span>

                </div>


                <div className="relative">

                  <KeyRound
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />


                  <input
                    id="secretCode"
                    name="secretCode"
                    type={
                      showSecretCode
                        ? "text"
                        : "password"
                    }
                    value={formData.secretCode}
                    onChange={handleChange}
                    placeholder="Enter admin secret code"
                    autoComplete="off"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#32838c] focus:bg-white focus:ring-2 focus:ring-[#32838c]/10"
                  />


                  {/* Show / Hide Secret Code */}

                  <button
                    type="button"
                    onClick={() =>
                      setShowSecretCode(
                        !showSecretCode
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#32838c]"
                    aria-label={
                      showSecretCode
                        ? "Hide secret code"
                        : "Show secret code"
                    }
                  >

                    {showSecretCode ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}

                  </button>

                </div>

              </div>


              {/* =====================================
                  REMEMBER ME
              ====================================== */}

              <div className="flex items-center gap-2">

                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-[#32838c] focus:ring-[#32838c]"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-slate-500"
                >
                  Remember me
                </label>

              </div>


              {/* =====================================
                  LOGIN BUTTON
              ====================================== */}

              <button
                type="submit"
                disabled={loading}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#32838c] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#286a71] disabled:cursor-not-allowed disabled:opacity-70"
              >

                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In

                    <ArrowRight size={17} />
                  </>
                )}

              </button>

            </form>


            {/* =========================================
                SIGNUP
            ========================================== */}

            <div className="mt-6 border-t border-slate-100 pt-6 text-center">

              <p className="text-sm text-slate-500">
                Don't have an admin account?
              </p>


              <Link
                to="/admin/signup"
                className="mt-1 inline-block text-sm font-semibold text-[#32838c] hover:underline"
              >
                Create Admin Account
              </Link>

            </div>

          </div>


          {/* =========================================
              SECURITY NOTE
          ========================================== */}

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">

            <ShieldCheck size={14} />

            Secure Admin Access

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminLogin;