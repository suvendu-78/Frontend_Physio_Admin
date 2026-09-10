import React, { useRef, useState } from "react";
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

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const secretCodeRef = useRef();
  const mobileRef = useRef();
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSecretCode, setShowSecretCode] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      Name: nameRef.current.value,
      Email: emailRef.current.value,
      Password: passwordRef.current.value,
      Mobile: mobileRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
      Secretcode: secretCodeRef.current.value,
    };
    console.log(formData);
    try {
      const data = await fetch(
        "http://localhost:8000/api/v1/onboard/adminsignup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        },
      );
    } catch (error) {
      console.log("Admin signup data fetch issu", error);
    }
    console.log("Admin Data:", formData);

    if (
      !formData.Name ||
      !formData.Email ||
      !formData.Password ||
      !formData.confirmPassword ||
      !formData.Secretcode
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.Password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const ADMIN_SECRET_CODE = "LiBi@Admin2026";

    if (formData.Secretcode !== ADMIN_SECRET_CODE) {
      setError("Invalid admin secret code.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      alert("Admin account created successfully.");

      navigate("/admin/login");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5fbfb] via-white to-[#eef7f8] px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#32838c]"
        >
          ← Back to Admin Portal
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

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}

              <InputField
                icon={User}
                name="name"
                label="Full Name"
                placeholder="Enter full name"
                inputRef={nameRef}
              />
              <InputField
                icon={User}
                name="mobile"
                label="mobile number"
                placeholder="+91 789456 4598"
                inputRef={mobileRef}
              />

              <InputField
                icon={Mail}
                name="email"
                label="Admin Email"
                type="email"
                placeholder="admin@example.com"
                inputRef={emailRef}
              />

              <PasswordField
                name="password"
                label="Password"
                placeholder="Create password"
                inputRef={passwordRef}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />

              <PasswordField
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm password"
                inputRef={confirmPasswordRef}
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
              />

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
                    ref={secretCodeRef}
                    id="secretCode"
                    name="secretCode"
                    type={showSecretCode ? "text" : "password"}
                    placeholder="Enter admin secret code"
                    autoComplete="off"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#32838c] focus:bg-white focus:ring-2 focus:ring-[#32838c]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowSecretCode(!showSecretCode)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#32838c]"
                  >
                    {showSecretCode ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#32838c] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#286a71] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
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

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={14} />
            Secure Admin Registration
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({
  icon: Icon,
  name,
  label,
  type = "text",
  placeholder,
  inputRef,
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
          ref={inputRef}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#32838c] focus:bg-white focus:ring-2 focus:ring-[#32838c]/10"
        />
      </div>
    </div>
  );
};

const PasswordField = ({
  name,
  label,
  placeholder,
  inputRef,
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
          ref={inputRef}
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#32838c] focus:bg-white focus:ring-2 focus:ring-[#32838c]/10"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#32838c]"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
};

export default AdminSignup;
