import { useEffect, useState } from "react";

import {
  Building2,
  Save,
  Clock3,
  Bell,
  CalendarDays,
  ShieldCheck,
  LockKeyhole,
  Mail,
  Phone,
  MapPin,
  Globe,
  Check,
  UserRound,
} from "lucide-react";

import SettingSkeleton from "../../components/skeletons/SettingSkeleton";

const initialSettings = {
  clinicName: "Physiotherapy Care",
  email: "clinic@example.com",
  phone: "+91 98765 43210",
  address: "Bhubaneswar, Odisha",
  website: "https://example.com",

  appointmentDuration: "30 minutes",
  bookingBuffer: "10 minutes",
  advanceBooking: "30 days",

  onlineAppointments: true,
  allowCancellation: true,

  newAppointment: true,
  newEnquiry: true,
  paymentNotification: true,
  appointmentReminder: true,

  businessHours: {
    Monday: {
      enabled: true,
      start: "09:00",
      end: "20:00",
    },
    Tuesday: {
      enabled: true,
      start: "09:00",
      end: "20:00",
    },
    Wednesday: {
      enabled: true,
      start: "09:00",
      end: "20:00",
    },
    Thursday: {
      enabled: true,
      start: "09:00",
      end: "20:00",
    },
    Friday: {
      enabled: true,
      start: "09:00",
      end: "20:00",
    },
    Saturday: {
      enabled: true,
      start: "09:00",
      end: "17:00",
    },
    Sunday: {
      enabled: false,
      start: "09:00",
      end: "14:00",
    },
  },
};

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function SectionHeader({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-3">

      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-700">
        <Icon size={18} />
      </div>

      <div>
        <h2 className="text-base font-bold text-slate-900">
          {title}
        </h2>

        <p className="mt-1 text-xs leading-5 text-slate-400">
          {description}
        </p>
      </div>

    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  icon: Icon,
  placeholder,
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-bold text-slate-600">
        {label}
      </label>

      <div className="relative">

        {Icon && (
          <Icon
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`h-10 w-full rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10 ${
            Icon ? "pl-10 pr-3" : "px-3"
          }`}
        />

      </div>

    </div>
  );
}

function Toggle({
  enabled,
  onChange,
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        enabled
          ? "bg-teal-600"
          : "bg-slate-300"
      }`}
      aria-label={
        enabled
          ? "Disable setting"
          : "Enable setting"
      }
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
          enabled
            ? "left-6"
            : "left-1"
        }`}
      />
    </button>
  );
}

function SettingToggleRow({
  title,
  description,
  enabled,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-5">

      <div className="min-w-0">

        <p className="text-sm font-semibold text-slate-700">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-400">
          {description}
        </p>

      </div>

      <Toggle
        enabled={enabled}
        onChange={onChange}
      />

    </div>
  );
}

export default function Settings() {
  const [loading, setLoading] = useState(true);

  const [settings, setSettings] =
    useState(initialSettings);

  const [saved, setSaved] =
    useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  function updateField(field, value) {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  }

  function updateBusinessHour(
    day,
    field,
    value
  ) {
    setSettings((current) => ({
      ...current,
      businessHours: {
        ...current.businessHours,
        [day]: {
          ...current.businessHours[day],
          [field]: value,
        },
      },
    }));

    setSaved(false);
  }

  function saveSettings() {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  if (loading) {
    return <SettingSkeleton />;
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your clinic, appointments, notifications and business preferences.
        </p>
      </div>

      {/* Clinic Profile */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

        <SectionHeader
          icon={Building2}
          title="Clinic Profile"
          description="Update the basic information displayed across your clinic."
        />

        <div className="mt-6 grid gap-5 md:grid-cols-2">

          <Field
            label="Clinic Name"
            value={settings.clinicName}
            onChange={(event) =>
              updateField(
                "clinicName",
                event.target.value
              )
            }
            icon={Building2}
          />

          <Field
            label="Email Address"
            type="email"
            value={settings.email}
            onChange={(event) =>
              updateField(
                "email",
                event.target.value
              )
            }
            icon={Mail}
          />

          <Field
            label="Phone Number"
            value={settings.phone}
            onChange={(event) =>
              updateField(
                "phone",
                event.target.value
              )
            }
            icon={Phone}
          />

          <Field
            label="Website"
            value={settings.website}
            onChange={(event) =>
              updateField(
                "website",
                event.target.value
              )
            }
            icon={Globe}
          />

          <div className="md:col-span-2">
            <Field
              label="Clinic Address"
              value={settings.address}
              onChange={(event) =>
                updateField(
                  "address",
                  event.target.value
                )
              }
              icon={MapPin}
            />
          </div>

        </div>

        <div className="mt-6 flex justify-end">

          <button
            type="button"
            onClick={saveSettings}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#0B1B2A] px-4 text-sm font-bold text-white transition hover:opacity-90"
          >
            {saved ? (
              <>
                <Check size={17} />
                Saved
              </>
            ) : (
              <>
                <Save size={17} />
                Save Changes
              </>
            )}
          </button>

        </div>

      </section>

      {/* Appointment Settings */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

        <SectionHeader
          icon={CalendarDays}
          title="Appointment Settings"
          description="Control how patients can book and manage appointments."
        />

        <div className="mt-6 grid gap-5 md:grid-cols-3">

          <div>
            <label className="mb-2 block text-xs font-bold text-slate-600">
              Appointment Duration
            </label>

            <select
              value={settings.appointmentDuration}
              onChange={(event) =>
                updateField(
                  "appointmentDuration",
                  event.target.value
                )
              }
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-teal-500 focus:bg-white"
            >
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>45 minutes</option>
              <option>60 minutes</option>
              <option>90 minutes</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-slate-600">
              Booking Buffer
            </label>

            <select
              value={settings.bookingBuffer}
              onChange={(event) =>
                updateField(
                  "bookingBuffer",
                  event.target.value
                )
              }
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-teal-500 focus:bg-white"
            >
              <option>5 minutes</option>
              <option>10 minutes</option>
              <option>15 minutes</option>
              <option>20 minutes</option>
              <option>30 minutes</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-slate-600">
              Advance Booking
            </label>

            <select
              value={settings.advanceBooking}
              onChange={(event) =>
                updateField(
                  "advanceBooking",
                  event.target.value
                )
              }
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-teal-500 focus:bg-white"
            >
              <option>7 days</option>
              <option>15 days</option>
              <option>30 days</option>
              <option>60 days</option>
              <option>90 days</option>
            </select>
          </div>

        </div>

        <div className="mt-6 space-y-5 border-t border-slate-100 pt-5">

          <SettingToggleRow
            title="Allow Online Appointments"
            description="Allow patients to book appointments through the website."
            enabled={settings.onlineAppointments}
            onChange={(value) =>
              updateField(
                "onlineAppointments",
                value
              )
            }
          />

          <SettingToggleRow
            title="Allow Appointment Cancellation"
            description="Allow patients to cancel their appointments online."
            enabled={settings.allowCancellation}
            onChange={(value) =>
              updateField(
                "allowCancellation",
                value
              )
            }
          />

        </div>

      </section>

      {/* Notification Settings */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

        <SectionHeader
          icon={Bell}
          title="Notification Settings"
          description="Choose which clinic activities should generate notifications."
        />

        <div className="mt-6 space-y-5">

          <SettingToggleRow
            title="New Appointment"
            description="Notify the admin when a new appointment is booked."
            enabled={settings.newAppointment}
            onChange={(value) =>
              updateField(
                "newAppointment",
                value
              )
            }
          />

          <SettingToggleRow
            title="New Enquiry"
            description="Notify the admin whenever a patient submits an enquiry."
            enabled={settings.newEnquiry}
            onChange={(value) =>
              updateField(
                "newEnquiry",
                value
              )
            }
          />

          <SettingToggleRow
            title="Payment Notifications"
            description="Receive notifications when payments are completed or failed."
            enabled={settings.paymentNotification}
            onChange={(value) =>
              updateField(
                "paymentNotification",
                value
              )
            }
          />

          <SettingToggleRow
            title="Appointment Reminders"
            description="Send reminders before scheduled patient appointments."
            enabled={settings.appointmentReminder}
            onChange={(value) =>
              updateField(
                "appointmentReminder",
                value
              )
            }
          />

        </div>

      </section>

      {/* Business Hours */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

        <SectionHeader
          icon={Clock3}
          title="Business Hours"
          description="Set your clinic's weekly operating hours."
        />

        <div className="mt-6 divide-y divide-slate-100">

          {days.map((day) => {

            const schedule =
              settings.businessHours[day];

            return (
              <div
                key={day}
                className="flex flex-col gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
              >

                <div className="w-28 shrink-0">
                  <p className="text-sm font-semibold text-slate-700">
                    {day}
                  </p>
                </div>

                <div className="flex flex-1 flex-wrap items-center gap-2">

                  <input
                    type="time"
                    value={schedule.start}
                    disabled={!schedule.enabled}
                    onChange={(event) =>
                      updateBusinessHour(
                        day,
                        "start",
                        event.target.value
                      )
                    }
                    className="h-9 rounded-lg border border-slate-200 bg-slate-50 px-2 text-xs text-slate-700 outline-none focus:border-teal-500 disabled:cursor-not-allowed disabled:opacity-40"
                  />

                  <span className="text-xs text-slate-400">
                    to
                  </span>

                  <input
                    type="time"
                    value={schedule.end}
                    disabled={!schedule.enabled}
                    onChange={(event) =>
                      updateBusinessHour(
                        day,
                        "end",
                        event.target.value
                      )
                    }
                    className="h-9 rounded-lg border border-slate-200 bg-slate-50 px-2 text-xs text-slate-700 outline-none focus:border-teal-500 disabled:cursor-not-allowed disabled:opacity-40"
                  />

                  {!schedule.enabled && (
                    <span className="ml-1 text-xs font-medium text-slate-400">
                      Closed
                    </span>
                  )}

                </div>

                <Toggle
                  enabled={schedule.enabled}
                  onChange={(value) =>
                    updateBusinessHour(
                      day,
                      "enabled",
                      value
                    )
                  }
                />

              </div>
            );
          })}

        </div>

      </section>

      {/* Security */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

        <SectionHeader
          icon={ShieldCheck}
          title="Security"
          description="Manage your administrator account security."
        />

        <div className="mt-6 divide-y divide-slate-100">

          <div className="flex flex-col gap-4 py-4 first:pt-0 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">

              <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-600">
                <LockKeyhole size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Administrator Password
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Change your account password regularly for better security.
                </p>
              </div>

            </div>

            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <LockKeyhole size={16} />
              Change Password
            </button>

          </div>

          <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">

              <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-600">
                <ShieldCheck size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Two-Factor Authentication
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Add an extra layer of security to your administrator account.
                </p>
              </div>

            </div>

            <span className="inline-flex h-8 items-center justify-center rounded-full bg-slate-100 px-3 text-xs font-semibold text-slate-500">
              Coming Soon
            </span>

          </div>

        </div>

      </section>

      {/* Account */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

        <SectionHeader
          icon={UserRound}
          title="Admin Account"
          description="Basic information about the current administrator."
        />

        <div className="mt-6 rounded-xl bg-slate-50 p-4">

          <div className="flex items-center gap-3">

            <div className="grid h-11 w-11 place-items-center rounded-full bg-[#0B1B2A] text-white">
              <UserRound size={18} />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-800">
                Clinic Administrator
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {settings.email}
              </p>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}