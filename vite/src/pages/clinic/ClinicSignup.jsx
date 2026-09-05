import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Building2,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  Award,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  FileText,
} from "lucide-react";

export default function ClinicSignup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    clinicName: "",
    ownerName: "",
    email: "",
    phone: "",
    registrationNumber: "",
    clinicType: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    password: "",
    confirmPassword: "",
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
    setError("");

    if (!formData.clinicName.trim()) {
      setError("Please enter clinic name.");
      return;
    }

    if (!formData.ownerName.trim()) {
      setError("Please enter clinic owner/admin name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter clinic email.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number.");
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

    if (
      formData.pincode &&
      !/^\d{6}$/.test(formData.pincode)
    ) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      /*
       * DEVELOPMENT ONLY
       *
       * In production:
       * Send this information to your backend API.
       * Never store passwords directly in localStorage.
       */

      const clinicAccount = {
        id: `clinic_${Date.now()}`,
        role: "CLINIC",

        clinicName: formData.clinicName.trim(),
        ownerName: formData.ownerName.trim(),

        email: formData.email.toLowerCase().trim(),
        phone: formData.phone,

        registrationNumber:
          formData.registrationNumber.trim(),

        clinicType: formData.clinicType,

        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode,

        password: formData.password,

        status: "PENDING",

        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "libi_clinic_account",
        JSON.stringify(clinicAccount)
      );

      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        navigate("/clinic/login");
      }, 1500);
    }, 900);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl border border-slate-200">
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-emerald-50">
            <CheckCircle2 className="h-9 w-9 text-emerald-600" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Registration Successful
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Your clinic registration has been submitted successfully.
            You can now continue to the clinic login.
          </p>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Registration Status
            </p>

            <div className="mt-2 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />

              <span className="text-sm font-semibold text-slate-700">
                Pending Verification
              </span>
            </div>
          </div>

          <p className="mt-5 text-xs text-slate-400">
            Redirecting to clinic login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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

          <Link
            to="/clinic/login"
            className="text-sm font-semibold text-[#32838c] hover:underline"
          >
            Already registered? Login
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Heading */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[#32838c]/10">
              <Building2 className="h-7 w-7 text-[#32838c]" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Register Your Clinic
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Join LiBi Motion Care and manage your clinic,
              doctors, patients and appointments from one platform.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              {/* Clinic Information */}
              <section className="p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#32838c]/10">
                    <Building2 className="h-5 w-5 text-[#32838c]" />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      Clinic Information
                    </h2>

                    <p className="text-xs text-slate-500">
                      Basic details about your clinic
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <InputField
                    label="Clinic Name"
                    name="clinicName"
                    value={formData.clinicName}
                    onChange={handleChange}
                    placeholder="Enter clinic name"
                    icon={Building2}
                    required
                  />

                  <InputField
                    label="Clinic Owner / Administrator"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    placeholder="Enter owner/admin name"
                    icon={User}
                    required
                  />

                  <InputField
                    label="Clinic Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="clinic@example.com"
                    icon={Mail}
                    required
                  />

                  <InputField
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit phone number"
                    icon={Phone}
                    maxLength={10}
                    required
                  />

                  <InputField
                    label="Registration Number"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="Clinic registration number"
                    icon={FileText}
                  />

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Clinic Type
                    </label>

                    <select
                      name="clinicType"
                      value={formData.clinicType}
                      onChange={handleChange}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#32838c] focus:ring-4 focus:ring-[#32838c]/10"
                    >
                      <option value="">
                        Select clinic type
                      </option>
                      <option value="Physiotherapy Clinic">
                        Physiotherapy Clinic
                      </option>
                      <option value="Rehabilitation Center">
                        Rehabilitation Center
                      </option>
                      <option value="Multi-Speciality Clinic">
                        Multi-Speciality Clinic
                      </option>
                      <option value="Wellness Center">
                        Wellness Center
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </section>

              <div className="border-t border-slate-100" />

              {/* Address */}
              <section className="p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#32838c]/10">
                    <MapPin className="h-5 w-5 text-[#32838c]" />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      Clinic Address
                    </h2>

                    <p className="text-xs text-slate-500">
                      Where your clinic is located
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Address
                    </label>

                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Enter complete clinic address"
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#32838c] focus:ring-4 focus:ring-[#32838c]/10"
                    />
                  </div>

                  <InputField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    icon={MapPin}
                  />

                  <InputField
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                    icon={MapPin}
                  />

                  <InputField
                    label="Pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6-digit pincode"
                    icon={MapPin}
                    maxLength={6}
                  />
                </div>
              </section>

              <div className="border-t border-slate-100" />

              {/* Security */}
              <section className="p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#32838c]/10">
                    <ShieldCheck className="h-5 w-5 text-[#32838c]" />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      Account Security
                    </h2>

                    <p className="text-xs text-slate-500">
                      Create a secure clinic account
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <PasswordField
                    label="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    show={showPassword}
                    setShow={setShowPassword}
                    placeholder="Minimum 8 characters"
                  />

                  <PasswordField
                    label="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    show={showConfirmPassword}
                    setShow={setShowConfirmPassword}
                    placeholder="Re-enter password"
                  />
                </div>
              </section>

              {/* Error */}
              {error && (
                <div className="mx-6 mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 sm:mx-8">
                  {error}
                </div>
              )}

              {/* Bottom */}
              <div className="border-t border-slate-100 bg-slate-50/70 p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Link>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#32838c] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#32838c]/20 transition hover:bg-[#286f77] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Creating Account..." : "Register Clinic"}

                    {!loading && (
                      <ArrowRight className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="h-4 w-4" />
            Your clinic information is protected.
          </div>
        </div>
      </main>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  type = "text",
  required = false,
  maxLength,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <div className="relative">
        <Icon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          required={required}
          className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#32838c] focus:ring-4 focus:ring-[#32838c]/10"
        />
      </div>
    </div>
  );
}

function PasswordField({
  label,
  name,
  value,
  onChange,
  show,
  setShow,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
        <span className="ml-1 text-red-500">*</span>
      </label>

      <div className="relative">
        <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#32838c] focus:ring-4 focus:ring-[#32838c]/10"
        />

        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          {show ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}