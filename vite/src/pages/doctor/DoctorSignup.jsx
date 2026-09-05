import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Stethoscope,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Award,
  GraduationCap,
  Building2,
  MapPin,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const DoctorSignup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    registrationNumber: "",
    qualification: "",
    specialization: "",
    experience: "",

    clinicName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    // Basic validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all required personal information.");
      return;
    }

    if (
      !formData.registrationNumber ||
      !formData.qualification ||
      !formData.specialization
    ) {
      setError("Please complete your professional information.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    setLoading(true);

    /*
      DEVELOPMENT ONLY

      This stores the doctor account in localStorage.
      In production this MUST be replaced with a backend API
      and password hashing/authentication.
    */

    setTimeout(() => {
      const doctorAccount = {
        id: `doctor_${Date.now()}`,
        role: "DOCTOR",

        fullName: formData.fullName,
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone,

        password: formData.password,

        registrationNumber: formData.registrationNumber,
        qualification: formData.qualification,
        specialization: formData.specialization,
        experience: formData.experience,

        clinicName: formData.clinicName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,

        status: "PENDING",
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "libi_doctor_account",
        JSON.stringify(doctorAccount)
      );

      setLoading(false);
      setSuccess(
        "Doctor account created successfully. Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/doctor/login");
      }, 1200);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#f7fbfb] text-slate-900">

      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

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
            Already Registered?
            <span className="hidden sm:inline">
              Login
            </span>
          </Link>

        </div>
      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="px-5 py-10 sm:px-8 sm:py-14">

        <div className="mx-auto max-w-5xl">

          {/* PAGE HEADER */}

          <div className="mb-10 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#32838c]/10">
              <Stethoscope
                size={30}
                className="text-[#32838c]"
              />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#32838c]">
              Doctor Partner Registration
            </p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Create Your Doctor Account
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
              Join LiBi Motion Care and manage your professional
              profile, appointments and patients from one place.
            </p>

          </div>


          {/* FORM CARD */}

          <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40">

            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 lg:p-10"
            >

              {/* =================================================
                  ALERTS
              ================================================= */}

              {error && (
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">

                  <div className="mt-0.5 shrink-0 text-red-500">
                    <ShieldCheck size={18} />
                  </div>

                  <p className="text-sm font-medium text-red-700">
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

                  <p className="text-sm font-medium text-emerald-700">
                    {success}
                  </p>

                </div>
              )}


              {/* =================================================
                  PERSONAL INFORMATION
              ================================================= */}

              <SectionHeading
                icon={User}
                title="Personal Information"
                description="Enter your basic contact information."
              />

              <div className="mt-6 grid gap-5 md:grid-cols-2">

                <InputField
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Dr. John Doe"
                  icon={User}
                  required
                />

                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="doctor@example.com"
                  icon={Mail}
                  required
                />

                <InputField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  icon={Phone}
                  required
                  maxLength={10}
                />

              </div>


              {/* =================================================
                  PROFESSIONAL INFORMATION
              ================================================= */}

              <div className="mt-10 border-t border-slate-100 pt-8">

                <SectionHeading
                  icon={Award}
                  title="Professional Information"
                  description="Provide your medical and professional details."
                />

                <div className="mt-6 grid gap-5 md:grid-cols-2">

                  <InputField
                    label="Medical Registration Number"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="Enter registration number"
                    icon={Award}
                    required
                  />

                  <InputField
                    label="Qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    placeholder="MBBS / BPT / MPT / etc."
                    icon={GraduationCap}
                    required
                  />

                  <InputField
                    label="Specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="e.g. Physiotherapy"
                    icon={Stethoscope}
                    required
                  />

                  <InputField
                    label="Years of Experience"
                    name="experience"
                    type="number"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g. 5"
                    icon={Award}
                    min="0"
                  />

                </div>

              </div>


              {/* =================================================
                  PRACTICE INFORMATION
              ================================================= */}

              <div className="mt-10 border-t border-slate-100 pt-8">

                <SectionHeading
                  icon={Building2}
                  title="Practice Information"
                  description="Add your current clinic or practice details."
                />

                <div className="mt-6 grid gap-5 md:grid-cols-2">

                  <InputField
                    label="Clinic / Hospital Name"
                    name="clinicName"
                    value={formData.clinicName}
                    onChange={handleChange}
                    placeholder="Enter clinic or hospital name"
                    icon={Building2}
                  />

                  <InputField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Bhubaneswar"
                    icon={MapPin}
                  />

                  <InputField
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Odisha"
                    icon={MapPin}
                  />

                  <InputField
                    label="Pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="751001"
                    icon={MapPin}
                    maxLength={6}
                  />

                  <div className="md:col-span-2">

                    <InputField
                      label="Practice Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your complete practice address"
                      icon={MapPin}
                    />

                  </div>

                </div>

              </div>


              {/* =================================================
                  PASSWORD
              ================================================= */}

              <div className="mt-10 border-t border-slate-100 pt-8">

                <SectionHeading
                  icon={Lock}
                  title="Account Security"
                  description="Create a secure password for your account."
                />

                <div className="mt-6 grid gap-5 md:grid-cols-2">

                  {/* PASSWORD */}

                  <div>

                    <label className="mb-2 block text-xs font-bold text-slate-700">
                      Password
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
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
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

                  <div>

                    <label className="mb-2 block text-xs font-bold text-slate-700">
                      Confirm Password
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
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
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

                </div>

              </div>


              {/* =================================================
                  TERMS
              ================================================= */}

              <div className="mt-8 flex items-start gap-3 rounded-xl bg-slate-50 p-4">

                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-[#32838c]"
                />

                <p className="text-xs leading-5 text-slate-500">
                  By creating an account, you agree to LiBi Motion
                  Care's partner terms and understand that your
                  professional account may require verification
                  before full access is provided.
                </p>

              </div>


              {/* =================================================
                  SUBMIT
              ================================================= */}

              <button
                type="submit"
                disabled={loading}
                className="group mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#32838c] text-sm font-bold text-white shadow-lg shadow-[#32838c]/20 transition hover:bg-[#286a71] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Doctor Account

                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}

              </button>


              {/* =================================================
                  LOGIN
              ================================================= */}

              <p className="mt-6 text-center text-xs text-slate-500">

                Already have a doctor account?{" "}

                <Link
                  to="/doctor/login"
                  className="font-bold text-[#32838c] hover:underline"
                >
                  Login here
                </Link>

              </p>

            </form>

          </div>


          {/* BACK */}

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


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 sm:flex-row sm:px-8">

          <div className="flex items-center gap-2">

            <div className="h-8 w-8 overflow-hidden rounded-full">

              <img
                src="/image.png"
                alt="LiBi Motion Care"
                className="h-full w-full object-cover"
              />

            </div>

            <span className="text-sm font-bold text-slate-700">
              LiBi Motion Care
            </span>

          </div>

          <p className="text-xs text-slate-400">
            © 2026 LiBi Motion Care
          </p>

        </div>

      </footer>

    </div>
  );
};


/* =========================================================
   SECTION HEADING
========================================================= */

const SectionHeading = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="flex items-start gap-3">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#32838c]/10 text-[#32838c]">
        <Icon size={19} />
      </div>

      <div>
        <h3 className="text-base font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>
      </div>

    </div>
  );
};


/* =========================================================
   INPUT FIELD
========================================================= */

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  required = false,
  maxLength,
  min,
}) => {
  return (
    <div>

      <label className="mb-2 block text-xs font-bold text-slate-700">

        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}

      </label>

      <div className="relative">

        <Icon
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          min={min}
          className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#32838c] focus:bg-white focus:ring-2 focus:ring-[#32838c]/10"
        />

      </div>

    </div>
  );
};


export default DoctorSignup;