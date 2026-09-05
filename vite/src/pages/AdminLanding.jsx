import React from "react";
import { Link } from "react-router-dom";

import {
  ShieldCheck,
  ArrowRight,
  CalendarDays,
  Users,
  Stethoscope,
  Building2,
  CreditCard,
  BarChart3,
  MessageSquare,
  LockKeyhole,
  CheckCircle2,
} from "lucide-react";

const AdminLanding = () => {
  return (
    <div className="min-h-screen bg-[#f7fbfb] text-slate-900">

      {/* =========================================================
          NAVBAR
      ========================================================= */}

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
                Admin Portal
              </p>
            </div>
          </Link>

          {/* NAVIGATION */}
          <div className="flex items-center gap-2 sm:gap-3">

            <Link
              to="/admin/login"
              className="hidden rounded-lg border border-[#32838c] px-4 py-2 text-sm font-semibold text-[#32838c] transition hover:bg-[#32838c] hover:text-white sm:block"
            >
              Login
            </Link>

            <Link
              to="/admin/signup"
              className="rounded-lg bg-[#32838c] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#286a71]"
            >
              Sign Up
            </Link>

          </div>
        </div>
      </header>


      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden">

        {/* BACKGROUND DECORATION */}

        <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#32838c]/5 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-cyan-400/5 blur-3xl" />

        <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">

          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}

          <div>

            {/* BADGE */}

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#32838c]/20 bg-[#32838c]/5 px-4 py-2">

              <ShieldCheck
                size={16}
                className="text-[#32838c]"
              />

              <span className="text-xs font-bold uppercase tracking-wider text-[#32838c]">
                Secure Administration
              </span>

            </div>


            {/* HEADING */}

            <h2 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">

              Manage{" "}

              <span className="text-[#32838c]">
                LiBi Motion Care
              </span>{" "}

              with confidence.

            </h2>


            {/* DESCRIPTION */}

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
              A centralized administration portal to manage
              appointments, patients, therapists, clinics,
              payments, enquiries and reports.
            </p>


            {/* BUTTONS */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                to="/admin/login"
                className="group flex items-center justify-center gap-2 rounded-xl bg-[#32838c] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#32838c]/20 transition hover:bg-[#286a71]"
              >
                Admin Login

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>


              <Link
                to="/admin/signup"
                className="flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:border-[#32838c] hover:text-[#32838c]"
              >
                Create Admin Account
              </Link>

            </div>


            {/* SECURITY POINTS */}

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">

              <SecurityPoint text="Secure Access" />

              <SecurityPoint text="Centralized Management" />

              <SecurityPoint text="Easy Monitoring" />

            </div>

          </div>


          {/* =====================================================
              RIGHT DASHBOARD PREVIEW
          ===================================================== */}

          <div className="relative">

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/40">

              {/* BROWSER HEADER */}

              <div className="flex h-14 items-center justify-between border-b border-slate-100 px-5">

                <div className="flex items-center gap-2">

                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />

                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />

                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />

                </div>

                <div className="h-8 w-8 rounded-full bg-[#32838c]/10" />

              </div>


              {/* DASHBOARD CONTENT */}

              <div className="p-5">

                <div className="mb-5">

                  <p className="text-sm font-bold text-slate-800">
                    Admin Dashboard
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    LiBi Motion Care overview
                  </p>

                </div>


                {/* STATS */}

                <div className="grid grid-cols-2 gap-3">

                  <PreviewCard
                    icon={CalendarDays}
                    value="248"
                    label="Appointments"
                  />

                  <PreviewCard
                    icon={Users}
                    value="1,264"
                    label="Patients"
                  />

                  <PreviewCard
                    icon={Stethoscope}
                    value="86"
                    label="Therapists"
                  />

                  <PreviewCard
                    icon={Building2}
                    value="32"
                    label="Clinics"
                  />

                </div>


                {/* REVENUE */}

                <div className="mt-4 rounded-xl bg-slate-50 p-4">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-xs text-slate-400">
                        Total Revenue
                      </p>

                      <p className="mt-1 text-xl font-bold text-slate-900">
                        ₹1,84,750
                      </p>

                    </div>


                    <BarChart3
                      size={21}
                      className="text-[#32838c]"
                    />

                  </div>


                  {/* CHART */}

                  <div className="mt-5 flex h-24 items-end gap-2">

                    {[42, 57, 48, 72, 60, 84, 68, 94].map(
                      (height, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-t bg-[#32838c]/30"
                          style={{
                            height: `${height}%`,
                          }}
                        />
                      )
                    )}

                  </div>

                </div>


                {/* ACTIVITY */}

                <div className="mt-4 space-y-3">

                  <ActivityPreview />

                  <ActivityPreview />

                  <ActivityPreview />

                </div>

              </div>

            </div>


            {/* FLOATING SECURITY CARD */}

            <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-slate-200 bg-white p-4 shadow-xl sm:block">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">

                  <LockKeyhole size={18} />

                </div>


                <div>

                  <p className="text-xs font-bold text-slate-800">
                    Secure Access
                  </p>

                  <p className="mt-1 text-[11px] text-slate-400">
                    Protected admin portal
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          FEATURES
      ========================================================= */}

      <section className="border-t border-slate-200 bg-white py-16">

        <div className="mx-auto max-w-7xl px-5 sm:px-8">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-bold uppercase tracking-wider text-[#32838c]">
              Admin Tools
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Everything in one place
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
              Manage your LiBi Motion Care platform
              from one centralized administration portal.
            </p>

          </div>


          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <FeatureCard
              icon={CalendarDays}
              title="Appointments"
              description="Manage patient appointments and schedules."
            />

            <FeatureCard
              icon={Users}
              title="Patients"
              description="Manage registered patients."
            />

            <FeatureCard
              icon={Stethoscope}
              title="Therapists"
              description="Manage therapists and their profiles."
            />

            <FeatureCard
              icon={Building2}
              title="Clinics"
              description="Manage registered clinics."
            />

            <FeatureCard
              icon={CreditCard}
              title="Payments"
              description="Monitor payments and transactions."
            />

            <FeatureCard
              icon={BarChart3}
              title="Reports"
              description="Track platform performance."
            />

            <FeatureCard
              icon={MessageSquare}
              title="Enquiries"
              description="Manage customer enquiries."
            />

            <FeatureCard
              icon={ShieldCheck}
              title="Administration"
              description="Securely control the platform."
            />

          </div>

        </div>

      </section>


      {/* =========================================================
          PARTNER REGISTRATION
      ========================================================= */}

      <section className="border-t border-slate-200 bg-[#f7fbfb] py-20">

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">

          {/* =====================================================
              LEFT PARTNER CONTENT
          ===================================================== */}

          <div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#32838c]/20 bg-[#32838c]/5 px-4 py-2">

              <ShieldCheck
                size={16}
                className="text-[#32838c]"
              />

              <span className="text-xs font-bold uppercase tracking-wider text-[#32838c]">
                Join LiBi Motion Care
              </span>

            </div>


            <h2 className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl">

              Become a{" "}

              <span className="text-[#32838c]">
                LiBi Partner
              </span>

            </h2>


            <p className="mt-5 max-w-xl text-base leading-7 text-slate-500">
              Join the LiBi Motion Care network as a clinic
              or doctor. Create your professional account
              and manage your appointments, patients and
              practice from one place.
            </p>


            {/* BENEFITS */}

            <div className="mt-8 space-y-5">

              <PartnerBenefit
                icon={Users}
                title="Connect with Patients"
                description="Build your presence and connect with patients through LiBi Motion Care."
              />

              <PartnerBenefit
                icon={CalendarDays}
                title="Manage Appointments"
                description="Manage your appointments and schedules from your partner account."
              />

              <PartnerBenefit
                icon={ShieldCheck}
                title="Verified Partner Access"
                description="Secure access for clinics and healthcare professionals."
              />

            </div>

          </div>


          {/* =====================================================
              PARTNER REGISTRATION CARD
          ===================================================== */}

          <div className="mx-auto w-full max-w-md">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-7">

              {/* CARD HEADER */}

              <div className="mb-7 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#32838c]/10">

                  <Users
                    size={25}
                    className="text-[#32838c]"
                  />

                </div>


                <h2 className="mt-4 text-xl font-bold text-slate-900">
                  Partner Registration
                </h2>


                <p className="mt-1 text-xs text-slate-500">
                  Choose your account type
                </p>

              </div>


              {/* =================================================
                  DOCTOR
              ================================================= */}

              <Link
                to="/doctor/signup"
                className="group flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition duration-200 hover:border-[#32838c] hover:bg-[#32838c]/5 hover:shadow-md"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#32838c]/10 text-[#32838c] transition group-hover:bg-[#32838c] group-hover:text-white">

                    <Stethoscope size={21} />

                  </div>


                  <div>

                    <h3 className="text-sm font-bold text-slate-900">
                      Register as Doctor
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Create your professional doctor account
                    </p>

                  </div>

                </div>


                <ArrowRight
                  size={18}
                  className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#32838c]"
                />

              </Link>


              {/* =================================================
                  CLINIC
              ================================================= */}

              <Link
                to="/clinic/signup"
                className="group mt-3 flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition duration-200 hover:border-[#32838c] hover:bg-[#32838c]/5 hover:shadow-md"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#32838c]/10 text-[#32838c] transition group-hover:bg-[#32838c] group-hover:text-white">

                    <Building2 size={21} />

                  </div>


                  <div>

                    <h3 className="text-sm font-bold text-slate-900">
                      Register as Clinic
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Create your clinic partner account
                    </p>

                  </div>

                </div>


                <ArrowRight
                  size={18}
                  className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#32838c]"
                />

              </Link>


              {/* =================================================
                  EXISTING PARTNER LOGIN
              ================================================= */}

              <div className="mt-7 border-t border-slate-100 pt-5">

                <p className="text-center text-xs text-slate-500">
                  Already have a partner account?
                </p>


                <div className="mt-3 grid grid-cols-2 gap-3">

                  <Link
                    to="/doctor/login"
                    className="flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-600 transition hover:border-[#32838c] hover:bg-[#32838c]/5 hover:text-[#32838c]"
                  >

                    <Stethoscope size={14} />

                    Doctor Login

                  </Link>


                  <Link
                    to="/clinic/login"
                    className="flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-600 transition hover:border-[#32838c] hover:bg-[#32838c]/5 hover:text-[#32838c]"
                  >

                    <Building2 size={14} />

                    Clinic Login

                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          CTA
      ========================================================= */}

      <section className="bg-[#081f29] py-16">

        <div className="mx-auto max-w-3xl px-5 text-center">

          <ShieldCheck
            size={38}
            className="mx-auto text-cyan-400"
          />


          <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
            Welcome to the Admin Portal
          </h2>


          <p className="mt-3 text-sm leading-6 text-slate-300">
            Securely manage LiBi Motion Care
            from one centralized platform.
          </p>


          <Link
            to="/admin/login"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#32838c] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#286a71]"
          >

            Login to Admin Portal

            <ArrowRight size={17} />

          </Link>

        </div>

      </section>


      {/* =========================================================
          FOOTER
      ========================================================= */}

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
            © 2026 LiBi Motion Care Admin Portal
          </p>

        </div>

      </footer>

    </div>
  );
};


/* =========================================================
   SECURITY POINT
========================================================= */

const SecurityPoint = ({ text }) => {
  return (
    <div className="flex items-center gap-2">

      <CheckCircle2
        size={15}
        className="text-[#32838c]"
      />

      <span className="text-xs font-medium text-slate-500">
        {text}
      </span>

    </div>
  );
};


/* =========================================================
   PREVIEW CARD
========================================================= */

const PreviewCard = ({
  icon: Icon,
  value,
  label,
}) => {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

      <Icon
        size={18}
        className="text-[#32838c]"
      />

      <p className="mt-3 text-xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {label}
      </p>

    </div>
  );
};


/* =========================================================
   ACTIVITY PREVIEW
========================================================= */

const ActivityPreview = () => {
  return (
    <div className="flex items-center gap-3">

      <div className="h-8 w-8 rounded-full bg-[#32838c]/10" />

      <div className="flex-1">

        <div className="h-2.5 w-32 rounded bg-slate-100" />

        <div className="mt-1.5 h-2 w-20 rounded bg-slate-100" />

      </div>

      <div className="h-2 w-12 rounded bg-slate-100" />

    </div>
  );
};


/* =========================================================
   FEATURE CARD
========================================================= */

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-[#32838c]/30 hover:shadow-lg">

      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#32838c]/10 text-[#32838c] transition group-hover:bg-[#32838c] group-hover:text-white">

        <Icon size={19} />

      </div>


      <h3 className="mt-4 text-sm font-bold text-slate-900">
        {title}
      </h3>


      <p className="mt-2 text-xs leading-5 text-slate-500">
        {description}
      </p>

    </div>
  );
};


/* =========================================================
   PARTNER BENEFIT
========================================================= */

const PartnerBenefit = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="flex items-start gap-3">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#32838c]/10">

        <Icon
          size={18}
          className="text-[#32838c]"
        />

      </div>


      <div>

        <h3 className="text-sm font-bold text-slate-800">
          {title}
        </h3>


        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>

      </div>

    </div>
  );
};


export default AdminLanding;