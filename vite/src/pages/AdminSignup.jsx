import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ShieldCheck,
  User,
  Mail,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  UserPlus,
  Loader2,
} from "lucide-react";

const AdminSignup = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [showSecretCode, setShowSecretCode] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    secretCode: "",
  });


  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };


  const handleSubmit = (e) => {

    e.preventDefault();


    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.secretCode
    ) {
      setError("Please fill in all fields.");
      return;
    }


    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError("Passwords do not match.");
      return;
    }


    /*
      DEVELOPMENT ONLY

      Later this secret must be checked
      by your backend.
    */

    const ADMIN_SECRET_CODE = "LiBi@Admin2026";


    if (
      formData.secretCode !== ADMIN_SECRET_CODE
    ) {
      setError("Invalid admin secret code.");
      return;
    }


    setLoading(true);


    setTimeout(() => {

      setLoading(false);

      alert(
        "Admin account created successfully."
      );

      navigate("/admin/login");

    }, 800);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5fbfb] via-white to-[#eef7f8] px-4 py-8">

      {/* ================================
          BACK
      ================================= */}

      <div className="mx-auto max-w-6xl">

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#32838c]"
        >
          ← Back to Admin Portal
        </Link>

      </div>


      {/* ================================
          SIGNUP
      ================================= */}

      <div className="flex min-h-[calc(100vh-100px)] items-center justify-center">

        <div className="w-full max-w-md">

          {/* Logo */}

          <div className="mb-7 text-center">

            <div className="mx-auto mb-4 h-16 w-16 overflow-hidden rounded-full border border-slate-200 bg-white shadow-md">

              <img
                src="/image.png"
                alt="LiBi Motion Care"
                className="h-full w-full object-cover"
              />

            </div>


            <div className="mb-3 flex items-center justify-center gap-2">

              <ShieldCheck
                size={19}
                className="text-[#32838c]"
              />

              <span className="text-sm font-semibold uppercase tracking-wider text-[#32838c]">
                Admin Registration
              </span>

            </div>


            <h1 className="text-3xl font-bold text-slate-900">
              Create Admin Account
            </h1>


            <p className="mt-2 text-sm text-slate-500">
              Register an administrator for LiBi Motion Care
            </p>

          </div>


          {/* Card */}

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* ERROR */}

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}


              {/* NAME */}

              <InputField
                icon={User}
                name="name"
                label="Full Name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
              />


              {/* EMAIL */}

              <InputField
                icon={Mail}
                name="email"
                label="Admin Email"
                type="email"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={handleChange}
              />


              {/* PASSWORD */}

              <PasswordField
                name="password"
                label="Password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />


              {/* CONFIRM PASSWORD */}

              <PasswordField
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
              />


              {/* SECRET CODE */}

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

                  <button
                    type="button"
                    onClick={() =>
                      setShowSecretCode(
                        !showSecretCode
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#32838c]"
                  >

                    {showSecretCode ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}

                  </button>

                </div>

              </div>


              {/* SUBMIT */}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#32838c] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#286a71] disabled:cursor-not-allowed disabled:opacity-70"
              >

                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus size={17} />

                    Create Admin Account
                  </>
                )}

              </button>

            </form>


            {/* LOGIN */}

            <div className="mt-6 border-t border-slate-100 pt-6 text-center">

              <p className="text-sm text-slate-500">
                Already have an admin account?
              </p>

              <Link
                to="/admin/login"
                className="mt-1 inline-block text-sm font-semibold text-[#32838c] hover:underline"
              >
                Sign In
              </Link>

            </div>

          </div>


          {/* Security */}

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">

            <ShieldCheck size={14} />

            Secure Admin Registration

          </div>

        </div>

      </div>

    </div>
  );
};


/* ========================================
   INPUT FIELD
======================================== */

const InputField = ({
  icon: Icon,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <div className="relative">

        <Icon
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#32838c] focus:bg-white focus:ring-2 focus:ring-[#32838c]/10"
        />

      </div>

    </div>
  );
};


/* ========================================
   PASSWORD FIELD
======================================== */

const PasswordField = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  showPassword,
  setShowPassword,
}) => {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <div className="relative">

        <Lock
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          id={name}
          name={name}
          type={
            showPassword
              ? "text"
              : "password"
          }
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#32838c] focus:bg-white focus:ring-2 focus:ring-[#32838c]/10"
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword(!showPassword)
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#32838c]"
        >

          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}

        </button>

      </div>

    </div>
  );
};


export default AdminSignup;