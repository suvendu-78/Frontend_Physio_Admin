import { useEffect, useMemo, useState } from "react";

import {
  Bell,
  Search,
  CheckCheck,
  CalendarCheck,
  UserPlus,
  CreditCard,
  MessageSquare,
  AlertTriangle,
  Info,
  Trash2,
  MoreHorizontal,
  Clock3,
  CheckCircle2,
  CircleAlert,
  X,
  ChevronRight,
} from "lucide-react";

import NotificationSkeleton from "../../components/skeletons/NotificationSkeleton";

const initialNotifications = [
  {
    id: "NT-1001",
    title: "New appointment booked",
    message:
      "Rahul Das booked a Back Pain Therapy appointment for today at 4:30 PM.",
    type: "Appointment",
    priority: "High",
    read: false,
    createdAt: "2026-08-29T14:30:00",
  },
  {
    id: "NT-1002",
    title: "New patient enquiry",
    message:
      "A new enquiry has been received from Priya Sharma regarding Sports Rehabilitation.",
    type: "Enquiry",
    priority: "Medium",
    read: false,
    createdAt: "2026-08-29T13:45:00",
  },
  {
    id: "NT-1003",
    title: "Payment received",
    message:
      "Payment of ₹1,200 has been successfully received from Amit Kumar.",
    type: "Payment",
    priority: "Low",
    read: true,
    createdAt: "2026-08-29T12:20:00",
  },
  {
    id: "NT-1004",
    title: "Therapist schedule updated",
    message:
      "Dr. Priya Das updated her availability for the upcoming week.",
    type: "Therapist",
    priority: "Low",
    read: true,
    createdAt: "2026-08-29T11:30:00",
  },
  {
    id: "NT-1005",
    title: "Appointment cancellation",
    message:
      "Sneha Patel cancelled her Post-Surgery Rehabilitation appointment scheduled for tomorrow.",
    type: "Appointment",
    priority: "Medium",
    read: false,
    createdAt: "2026-08-29T10:15:00",
  },
  {
    id: "NT-1006",
    title: "Follow-up required",
    message:
      "Arjun Singh has an enquiry that has not been followed up for more than 24 hours.",
    type: "Reminder",
    priority: "High",
    read: false,
    createdAt: "2026-08-28T18:10:00",
  },
  {
    id: "NT-1007",
    title: "New patient registered",
    message:
      "Neha Mishra has successfully registered as a new patient.",
    type: "Patient",
    priority: "Low",
    read: true,
    createdAt: "2026-08-28T16:30:00",
  },
  {
    id: "NT-1008",
    title: "Payment pending",
    message:
      "Payment for appointment AP-1045 is still pending.",
    type: "Payment",
    priority: "High",
    read: false,
    createdAt: "2026-08-28T15:45:00",
  },
  {
    id: "NT-1009",
    title: "System information",
    message:
      "Your clinic profile information was successfully updated.",
    type: "System",
    priority: "Low",
    read: true,
    createdAt: "2026-08-28T13:15:00",
  },
];

const typeOptions = [
  "All Types",
  "Appointment",
  "Enquiry",
  "Payment",
  "Therapist",
  "Patient",
  "Reminder",
  "System",
];

const readOptions = [
  "All Notifications",
  "Unread",
  "Read",
];

function formatDateTime(value) {
  const date = new Date(value);

  return {
    date: date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    time: date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

function NotificationIcon({ type }) {
  const config = {
    Appointment: {
      icon: CalendarCheck,
      className: "bg-blue-50 text-blue-600",
    },
    Enquiry: {
      icon: MessageSquare,
      className: "bg-cyan-50 text-cyan-600",
    },
    Payment: {
      icon: CreditCard,
      className: "bg-emerald-50 text-emerald-600",
    },
    Therapist: {
      icon: UserPlus,
      className: "bg-violet-50 text-violet-600",
    },
    Patient: {
      icon: UserPlus,
      className: "bg-orange-50 text-orange-600",
    },
    Reminder: {
      icon: Clock3,
      className: "bg-amber-50 text-amber-600",
    },
    System: {
      icon: Info,
      className: "bg-slate-100 text-slate-600",
    },
  };

  const item =
    config[type] || config.System;

  const Icon = item.icon;

  return (
    <div
      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${item.className}`}
    >
      <Icon size={19} />
    </div>
  );
}

function PriorityBadge({ priority }) {
  const styles = {
    High: "bg-red-50 text-red-700 ring-red-600/10",
    Medium:
      "bg-amber-50 text-amber-700 ring-amber-600/10",
    Low: "bg-slate-100 text-slate-600 ring-slate-500/10",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        styles[priority]
      }`}
    >
      {priority === "High" && (
        <CircleAlert size={12} />
      )}

      {priority === "Medium" && (
        <AlertTriangle size={12} />
      )}

      {priority === "Low" && (
        <Info size={12} />
      )}

      {priority}
    </span>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  iconClass,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">

        <div
          className={`grid h-10 w-10 place-items-center rounded-xl ${iconClass}`}
        >
          <Icon size={19} />
        </div>

        <span className="text-xs font-medium text-slate-400">
          Current
        </span>

      </div>

      <p className="mt-4 text-sm font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

export default function Notifications() {
  const [loading, setLoading] = useState(true);

  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [search, setSearch] = useState("");

  const [type, setType] =
    useState("All Types");

  const [readFilter, setReadFilter] =
    useState("All Notifications");

  const [selectedNotification, setSelectedNotification] =
    useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const filteredNotifications = useMemo(() => {
    return notifications.filter(
      (notification) => {
        const value = search
          .toLowerCase()
          .trim();

        const matchesSearch =
          !value ||
          notification.title
            .toLowerCase()
            .includes(value) ||
          notification.message
            .toLowerCase()
            .includes(value) ||
          notification.type
            .toLowerCase()
            .includes(value);

        const matchesType =
          type === "All Types" ||
          notification.type === type;

        const matchesRead =
          readFilter === "All Notifications" ||
          (readFilter === "Unread" &&
            !notification.read) ||
          (readFilter === "Read" &&
            notification.read);

        return (
          matchesSearch &&
          matchesType &&
          matchesRead
        );
      }
    );
  }, [
    notifications,
    search,
    type,
    readFilter,
  ]);

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  const appointmentCount =
    notifications.filter(
      (item) => item.type === "Appointment"
    ).length;

  const enquiryCount =
    notifications.filter(
      (item) => item.type === "Enquiry"
    ).length;

  const highPriorityCount =
    notifications.filter(
      (item) => item.priority === "High"
    ).length;

  function markAsRead(id) {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, read: true }
          : item
      )
    );

    if (
      selectedNotification?.id === id
    ) {
      setSelectedNotification((current) =>
        current
          ? { ...current, read: true }
          : null
      );
    }
  }

 function markAsUnread(id) {
  setNotifications((current) =>
    current.map((item) =>
      item.id === id
        ? { ...item, read: false }
        : item
    )
  );

  if (selectedNotification?.id === id) {
    setSelectedNotification((current) =>
      current
        ? { ...current, read: false }
        : null
    );
  }
}

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        read: true,
      }))
    );

    setSelectedNotification((current) =>
      current
        ? { ...current, read: true }
        : null
    );
  }

  function deleteNotification(id) {
    setNotifications((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );

    if (
      selectedNotification?.id === id
    ) {
      setSelectedNotification(null);
    }
  }

  function clearFilters() {
    setSearch("");
    setType("All Types");
    setReadFilter("All Notifications");
  }

  if (loading) {
    return <NotificationSkeleton />;
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <div className="flex items-center gap-3">

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Notifications
            </h1>

            {unreadCount > 0 && (
              <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
                {unreadCount} unread
              </span>
            )}

          </div>

          <p className="mt-1 text-sm text-slate-500">
            Stay updated with appointments, enquiries, payments and clinic activity.
          </p>
        </div>

        <button
          type="button"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#0B1B2A] px-4 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <CheckCheck size={17} />
          Mark all read
        </button>

      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Unread"
          value={unreadCount}
          icon={Bell}
          iconClass="bg-orange-50 text-orange-600"
        />

        <StatCard
          title="Appointments"
          value={appointmentCount}
          icon={CalendarCheck}
          iconClass="bg-blue-50 text-blue-600"
        />

        <StatCard
          title="Enquiries"
          value={enquiryCount}
          icon={MessageSquare}
          iconClass="bg-cyan-50 text-cyan-600"
        />

        <StatCard
          title="High Priority"
          value={highPriorityCount}
          icon={CircleAlert}
          iconClass="bg-red-50 text-red-600"
        />

      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">

          {/* Search */}
          <div className="relative">

            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search notifications..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
            />

          </div>

          {/* Type */}
          <select
            value={type}
            onChange={(event) =>
              setType(event.target.value)
            }
            className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-teal-500 focus:bg-white"
          >
            {typeOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Read status */}
          <select
            value={readFilter}
            onChange={(event) =>
              setReadFilter(event.target.value)
            }
            className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-teal-500 focus:bg-white"
          >
            {readOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

        </div>

        {(search ||
          type !== "All Types" ||
          readFilter !== "All Notifications") && (
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">

            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredNotifications.length}
              </span>{" "}
              notifications
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-semibold text-teal-600 hover:text-teal-700"
            >
              Clear filters
            </button>

          </div>
        )}

      </div>

      {/* Notification List */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {filteredNotifications.length === 0 ? (
          <div className="py-16 text-center">

            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400">
              <Bell size={25} />
            </div>

            <h3 className="mt-4 text-base font-bold text-slate-900">
              No notifications found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>

          </div>
        ) : (
          <div className="divide-y divide-slate-100">

            {filteredNotifications.map(
              (notification) => {
                const dateTime =
                  formatDateTime(
                    notification.createdAt
                  );

                return (
                  <div
                    key={notification.id}
                    className={`group relative flex items-start gap-4 p-4 transition sm:p-5 ${
                      !notification.read
                        ? "bg-cyan-50/30"
                        : "hover:bg-slate-50/70"
                    }`}
                  >

                    {/* Unread indicator */}
                    {!notification.read && (
                      <span className="absolute left-0 top-0 h-full w-1 bg-teal-500" />
                    )}

                    {/* Icon */}
                    <NotificationIcon
                      type={notification.type}
                    />

                    {/* Content */}
                    <div className="min-w-0 flex-1">

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                        <div className="min-w-0">

                          <div className="flex flex-wrap items-center gap-2">

                            <h3
                              className={`text-sm ${
                                notification.read
                                  ? "font-semibold"
                                  : "font-bold"
                              } text-slate-900`}
                            >
                              {notification.title}
                            </h3>

                            {!notification.read && (
                              <span className="h-2 w-2 rounded-full bg-teal-500" />
                            )}

                          </div>

                          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
                            {notification.message}
                          </p>

                        </div>

                        <PriorityBadge
                          priority={
                            notification.priority
                          }
                        />

                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">

                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
                          <Clock3 size={13} />
                          {dateTime.date} ·{" "}
                          {dateTime.time}
                        </span>

                        <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-500">
                          {notification.type}
                        </span>

                        <span className="text-[11px] font-medium text-slate-400">
                          {notification.id}
                        </span>

                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex flex-wrap gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedNotification(
                              notification
                            )
                          }
                          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          <ChevronRight size={14} />
                          View
                        </button>

                        {!notification.read ? (
                          <button
                            type="button"
                            onClick={() =>
                              markAsRead(
                                notification.id
                              )
                            }
                            className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-teal-600 hover:bg-teal-50"
                          >
                            <CheckCircle2 size={14} />
                            Mark read
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              markAsUnread(
                                notification.id
                              )
                            }
                            className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-slate-500 hover:bg-slate-100"
                          >
                            <Bell size={14} />
                            Mark unread
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            deleteNotification(
                              notification.id
                            )
                          }
                          className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>

                      </div>

                    </div>

                    {/* Desktop menu */}
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedNotification(
                          notification
                        )
                      }
                      className="hidden h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 sm:grid"
                    >
                      <MoreHorizontal size={18} />
                    </button>

                  </div>
                );
              }
            )}

          </div>
        )}

      </div>

      {/* Details Drawer */}
      {selectedNotification && (
        <div className="fixed inset-0 z-50">

          {/* Overlay */}
          <button
            type="button"
            aria-label="Close notification details"
            onClick={() =>
              setSelectedNotification(null)
            }
            className="absolute inset-0 cursor-default bg-[#0B1B2A]/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-lg flex-col bg-white shadow-2xl">

            {/* Header */}
            <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-center gap-3">

                  <NotificationIcon
                    type={
                      selectedNotification.type
                    }
                  />

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      {selectedNotification.id}
                    </p>

                    <h2 className="mt-0.5 text-lg font-bold text-slate-900">
                      Notification Details
                    </h2>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedNotification(null)
                  }
                  className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Close"
                >
                  <X size={19} />
                </button>

              </div>

              <div className="mt-4 flex flex-wrap gap-2">

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  {selectedNotification.type}
                </span>

                <PriorityBadge
                  priority={
                    selectedNotification.priority
                  }
                />

                {selectedNotification.read ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 size={12} />
                    Read
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700">
                    <Bell size={12} />
                    Unread
                  </span>
                )}

              </div>

            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">

              <h3 className="text-lg font-bold text-slate-900">
                {selectedNotification.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {selectedNotification.message}
              </p>

              <div className="mt-7 rounded-2xl bg-slate-50 p-4">

                <div className="flex items-center gap-3">

                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-white text-teal-600 shadow-sm">
                    <Clock3 size={16} />
                  </div>

                  <div>
                    <p className="text-[11px] text-slate-400">
                      Received
                    </p>

                    <p className="mt-0.5 text-sm font-semibold text-slate-700">
                      {
                        formatDateTime(
                          selectedNotification.createdAt
                        ).date
                      }
                    </p>

                    <p className="text-xs text-slate-400">
                      {
                        formatDateTime(
                          selectedNotification.createdAt
                        ).time
                      }
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">

              <div className="flex flex-col gap-2 sm:flex-row">

                {selectedNotification.read ? (
                  <button
                    type="button"
                    onClick={() =>
                      markAsUnread(
                        selectedNotification.id
                      )
                    }
                    className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Bell size={16} />
                    Mark unread
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      markAsRead(
                        selectedNotification.id
                      )
                    }
                    className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 text-sm font-bold text-white hover:bg-teal-700"
                  >
                    <CheckCheck size={16} />
                    Mark as read
                  </button>
                )}

                <button
                  type="button"
                  onClick={() =>
                    deleteNotification(
                      selectedNotification.id
                    )
                  }
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  Delete
                </button>

              </div>

            </div>

          </aside>

        </div>
      )}

    </div>
  );
}