import React, { useRef, useState } from "react";
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

  const fullNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  const registrationNumberRef = useRef();
  const qualificationRef = useRef();
  const specializationRef = useRef();
  const experienceRef = useRef();

  const clinicNameRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const pincodeRef = useRef();

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const doctorData = {
      fullName: fullNameRef.current.value.trim(),
      email: emailRef.current.value.trim().toLowerCase(),
      phone: phoneRef.current.value.trim(),

      registrationNumber: registrationNumberRef.current.value.trim(),
      qualification: qualificationRef.current.value.trim(),
      specialization: specializationRef.current.value.trim(),
      experience: experienceRef.current.value.trim(),

      clinicName: clinicNameRef.current.value.trim(),
      address: addressRef.current.value.trim(),
      city: cityRef.current.value.trim(),
      state: stateRef.current.value.trim(),
      pincode: pincodeRef.current.value.trim(),

      Password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
      role: "doctor",
    };

    const requiredFields = [
      {
        name: "Full Name",
        value: doctorData.fullName,
      },
      {
        name: "Email Address",
        value: doctorData.email,
      },
      {
        name: "Phone Number",
        value: doctorData.phone,
      },
      {
        name: "Medical Registration Number",
        value: doctorData.registrationNumber,
      },
      {
        name: "Qualification",
        value: doctorData.qualification,
      },
      {
        name: "Specialization",
        value: doctorData.specialization,
      },
      {
        name: "Years of Experience",
        value: doctorData.experience,
      },
      {
        name: "Clinic / Hospital Name",
        value: doctorData.clinicName,
      },
      {
        name: "Practice Address",
        value: doctorData.address,
      },
      {
        name: "City",
        value: doctorData.city,
      },
      {
        name: "State",
        value: doctorData.state,
      },
      {
        name: "Pincode",
        value: doctorData.pincode,
      },
      {
        name: "Password",
        value: doctorData.Password,
      },
      {
        name: "Confirm Password",
        value: doctorData.confirmPassword,
      },
    ];

    const missingFields = requiredFields
      .filter((field) => !field.value)
      .map((field) => field.name);

    if (missingFields.length > 0) {
      const message = `Please fill in: ${missingFields.join(", ")}`;

      setError(message);
      window.alert(message);

      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(doctorData.email)) {
      setError("Please enter a valid email address.");
      window.alert("Please enter a valid email address.");

      return;
    }

    if (!/^\d{10}$/.test(doctorData.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      window.alert("Please enter a valid 10-digit phone number.");

      return;
    }

    if (!/^\d{6}$/.test(doctorData.pincode)) {
      setError("Please enter a valid 6-digit pincode.");
      window.alert("Please enter a valid 6-digit pincode.");

      return;
    }

    if (Number(doctorData.experience) < 0) {
      setError("Experience cannot be negative.");
      window.alert("Experience cannot be negative.");

      return;
    }

    if (doctorData.Password.length < 8) {
      setError("Password must contain at least 8 characters.");
      window.alert("Password must contain at least 8 characters.");

      return;
    }

    if (doctorData.Password !== doctorData.confirmPassword) {
      setError("Passwords do not match.");
      window.alert("Passwords do not match.");

      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://physio-backend-sand.vercel.app/api/v1/pattner/SignupPattner_Doctor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(doctorData),
        },
      );

      let data = {};

      try {
        data = await response.json();
      } catch (jsonError) {
        console.log("Response is not JSON");
      }

      console.log("Server Response:", data);
      console.log("Status:", response.status);

      if (!response.ok) {
        const serverMessage =
          data?.message || data?.error || "Doctor registration failed.";

        const messageLower = serverMessage.toLowerCase();

        const alreadyExists =
          response.status === 409 ||
          messageLower.includes("already exists") ||
          messageLower.includes("already registered") ||
          messageLower.includes("duplicate") ||
          messageLower.includes("email already") ||
          messageLower.includes("phone already") ||
          messageLower.includes("doctor already") ||
          messageLower.includes("user already");

        if (alreadyExists) {
          setLoading(false);

          setError(
            "This doctor already exists. Please use a different email or phone number.",
          );

          window.alert(
            "Doctor already exists!\n\nPlease use a different email or phone number.",
          );

          return;
        }

        setLoading(false);
        setError(serverMessage);
        window.alert(serverMessage);

        return;
      }

      setLoading(false);

      setSuccess(
        "Doctor account created successfully. Redirecting to login...",
      );

      window.alert(
        "Doctor account created successfully!\n\nRedirecting to login...",
      );

      setTimeout(() => {
        navigate("/doctor/login");
      }, 1000);
    } catch (error) {
      console.error("Doctor signup error:", error);

      setLoading(false);

      setError(
        "Unable to connect to server. Please check your internet/server connection.",
      );

      window.alert(
        "Unable to connect to server.\n\nPlease check whether your backend server is running.",
      );

      return;
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
            Already Registered?
            <span className="hidden sm:inline">Login</span>
          </Link>
        </div>
      </header>

      <main className="px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#32838c]/10">
              <Stethoscope size={30} className="text-[#32838c]" />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#32838c]">
              Doctor Partner Registration
            </p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Create Your Doctor Account
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
              Join LiBi Motion Care and manage your professional profile,
              appointments and patients from one place.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40">
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10">
              {error && (
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                  <div className="mt-0.5 shrink-0 text-red-500">
                    <ShieldCheck size={18} />
                  </div>

                  <p className="text-sm font-medium text-red-700">{error}</p>
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

              <SectionHeading
                icon={User}
                title="Personal Information"
                description="Enter your basic contact information."
              />

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <InputField
                  label="Full Name"
                  placeholder="Dr. John Doe"
                  icon={User}
                  inputRef={fullNameRef}
                  required
                />

                <InputField
                  label="Email Address"
                  type="email"
                  placeholder="doctor@example.com"
                  icon={Mail}
                  inputRef={emailRef}
                  required
                />

                <InputField
                  label="Phone Number"
                  type="tel"
                  placeholder="9876543210"
                  icon={Phone}
                  inputRef={phoneRef}
                  required
                  maxLength={10}
                />
              </div>

              <div className="mt-10 border-t border-slate-100 pt-8">
                <SectionHeading
                  icon={Award}
                  title="Professional Information"
                  description="Provide your medical and professional details."
                />

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <InputField
                    label="Medical Registration Number"
                    placeholder="Enter registration number"
                    icon={Award}
                    inputRef={registrationNumberRef}
                    required
                  />

                  <InputField
                    label="Qualification"
                    placeholder="MBBS / BPT / MPT / etc."
                    icon={GraduationCap}
                    inputRef={qualificationRef}
                    required
                  />

                  <InputField
                    label="Specialization"
                    placeholder="e.g. Physiotherapy"
                    icon={Stethoscope}
                    inputRef={specializationRef}
                    required
                  />

                  <InputField
                    label="Years of Experience"
                    type="number"
                    placeholder="e.g. 5"
                    icon={Award}
                    inputRef={experienceRef}
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="mt-10 border-t border-slate-100 pt-8">
                <SectionHeading
                  icon={Building2}
                  title="Practice Information"
                  description="Add your current clinic or practice details."
                />

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <InputField
                    label="Clinic / Hospital Name"
                    placeholder="Enter clinic or hospital name"
                    icon={Building2}
                    inputRef={clinicNameRef}
                    required
                  />

                  <InputField
                    label="City"
                    placeholder="Bhubaneswar"
                    icon={MapPin}
                    inputRef={cityRef}
                    required
                  />

                  <InputField
                    label="State"
                    placeholder="Odisha"
                    icon={MapPin}
                    inputRef={stateRef}
                    required
                  />

                  <InputField
                    label="Pincode"
                    placeholder="751001"
                    icon={MapPin}
                    inputRef={pincodeRef}
                    maxLength={6}
                    required
                  />

                  <div className="md:col-span-2">
                    <InputField
                      label="Practice Address"
                      placeholder="Enter your complete practice address"
                      icon={MapPin}
                      inputRef={addressRef}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-slate-100 pt-8">
                <SectionHeading
                  icon={Lock}
                  title="Account Security"
                  description="Create a secure password for your account."
                />

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-700">
                      Password
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <Lock
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        ref={passwordRef}
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimum 8 characters"
                        className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#32838c] focus:bg-white focus:ring-2 focus:ring-[#32838c]/10"
                        required
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
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

                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-700">
                      Confirm Password
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <Lock
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        ref={confirmPasswordRef}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#32838c] focus:bg-white focus:ring-2 focus:ring-[#32838c]/10"
                        required
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
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

              <div className="mt-8 flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-[#32838c]"
                />

                <p className="text-xs leading-5 text-slate-500">
                  By creating an account, you agree to LiBi Motion Care's
                  partner terms and understand that your professional account
                  may require verification before full access is provided.
                </p>
              </div>

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

          <p className="text-xs text-slate-400">© 2026 LiBi Motion Care</p>
        </div>
      </footer>
    </div>
  );
};

const SectionHeading = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#32838c]/10 text-[#32838c]">
        <Icon size={19} />
      </div>

      <div>
        <h3 className="text-base font-bold text-slate-900">{title}</h3>

        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  type = "text",
  placeholder,
  icon: Icon,
  inputRef,
  required = false,
  maxLength,
  min,
}) => {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-slate-700">
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="relative">
        <Icon
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          ref={inputRef}
          type={type}
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
