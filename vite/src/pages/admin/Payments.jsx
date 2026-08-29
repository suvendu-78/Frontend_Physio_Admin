import { useEffect, useMemo, useState } from "react";

import {
  CreditCard,
  Plus,
  Search,
  MoreHorizontal,
  IndianRupee,
  CheckCircle2,
  Clock3,
  RotateCcw,
  XCircle,
  Smartphone,
  Banknote,
  WalletCards,
  ReceiptText,
  CalendarDays,
  UserRound,
  Stethoscope,
  X,
  Download,
  RefreshCcw,
} from "lucide-react";

import PaymentSkeleton from "../../components/skeletons/PaymentSkeleton";

const initialPayments = [
  {
    id: "PAY-1001",
    patientName: "Rahul Das",
    initials: "RD",
    appointmentId: "AP-1001",
    service: "Back Pain Therapy",
    therapist: "Dr. Ankit Kumar",
    amount: 800,
    method: "UPI",
    status: "Paid",
    transactionId: "TXN987654321",
    createdAt: "2026-08-29T14:30:00",
  },
  {
    id: "PAY-1002",
    patientName: "Priya Sharma",
    initials: "PS",
    appointmentId: "AP-1002",
    service: "Sports Rehabilitation",
    therapist: "Dr. Priya Das",
    amount: 1200,
    method: "Card",
    status: "Paid",
    transactionId: "TXN876543210",
    createdAt: "2026-08-29T13:45:00",
  },
  {
    id: "PAY-1003",
    patientName: "Amit Kumar",
    initials: "AK",
    appointmentId: "AP-1003",
    service: "Neck Pain Therapy",
    therapist: "Dr. Ankit Kumar",
    amount: 750,
    method: "Cash",
    status: "Pending",
    transactionId: "",
    createdAt: "2026-08-29T12:20:00",
  },
  {
    id: "PAY-1004",
    patientName: "Sneha Patel",
    initials: "SP",
    appointmentId: "AP-1004",
    service: "Post-Surgery Rehabilitation",
    therapist: "Dr. Rahul Singh",
    amount: 1500,
    method: "UPI",
    status: "Paid",
    transactionId: "TXN765432109",
    createdAt: "2026-08-28T16:20:00",
  },
  {
    id: "PAY-1005",
    patientName: "Arjun Singh",
    initials: "AS",
    appointmentId: "AP-1005",
    service: "Sports Injury",
    therapist: "Dr. Priya Das",
    amount: 1000,
    method: "Cash",
    status: "Paid",
    transactionId: "CASH-1005",
    createdAt: "2026-08-28T14:10:00",
  },
  {
    id: "PAY-1006",
    patientName: "Neha Mishra",
    initials: "NM",
    appointmentId: "AP-1006",
    service: "Knee Rehabilitation",
    therapist: "Dr. Rahul Singh",
    amount: 900,
    method: "Net Banking",
    status: "Refunded",
    transactionId: "TXN654321098",
    createdAt: "2026-08-27T13:30:00",
  },
  {
    id: "PAY-1007",
    patientName: "Suresh Nayak",
    initials: "SN",
    appointmentId: "AP-1007",
    service: "Shoulder Therapy",
    therapist: "Dr. Ankit Kumar",
    amount: 850,
    method: "UPI",
    status: "Failed",
    transactionId: "TXN543210987",
    createdAt: "2026-08-27T11:10:00",
  },
  {
    id: "PAY-1008",
    patientName: "Pooja Rout",
    initials: "PR",
    appointmentId: "AP-1008",
    service: "Posture Correction",
    therapist: "Dr. Priya Das",
    amount: 700,
    method: "Card",
    status: "Paid",
    transactionId: "TXN432109876",
    createdAt: "2026-08-26T15:40:00",
  },
];

const methodOptions = [
  "All Methods",
  "UPI",
  "Cash",
  "Card",
  "Net Banking",
];

const statusOptions = [
  "All Status",
  "Paid",
  "Pending",
  "Failed",
  "Refunded",
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

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function StatusBadge({ status }) {
  const config = {
    Paid: {
      className:
        "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
      icon: CheckCircle2,
    },
    Pending: {
      className:
        "bg-amber-50 text-amber-700 ring-amber-600/10",
      icon: Clock3,
    },
    Failed: {
      className:
        "bg-red-50 text-red-700 ring-red-600/10",
      icon: XCircle,
    },
    Refunded: {
      className:
        "bg-violet-50 text-violet-700 ring-violet-600/10",
      icon: RotateCcw,
    },
  };

  const item = config[status] || {
    className:
      "bg-slate-100 text-slate-600 ring-slate-500/10",
    icon: Clock3,
  };

  const Icon = item.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${item.className}`}
    >
      <Icon size={12} />
      {status}
    </span>
  );
}

function MethodIcon({ method }) {
  const config = {
    UPI: {
      icon: Smartphone,
      className: "bg-cyan-50 text-cyan-600",
    },
    Cash: {
      icon: Banknote,
      className: "bg-emerald-50 text-emerald-600",
    },
    Card: {
      icon: CreditCard,
      className: "bg-blue-50 text-blue-600",
    },
    "Net Banking": {
      icon: WalletCards,
      className: "bg-violet-50 text-violet-600",
    },
  };

  const item = config[method] || {
    icon: CreditCard,
    className: "bg-slate-100 text-slate-600",
  };

  const Icon = item.icon;

  return (
    <div
      className={`grid h-9 w-9 place-items-center rounded-lg ${item.className}`}
    >
      <Icon size={16} />
    </div>
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

export default function Payments() {
  const [loading, setLoading] = useState(true);

  const [payments, setPayments] =
    useState(initialPayments);

  const [search, setSearch] = useState("");

  const [method, setMethod] =
    useState("All Methods");

  const [status, setStatus] =
    useState("All Status");

  const [selectedPayment, setSelectedPayment] =
    useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const value = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        !value ||
        payment.patientName
          .toLowerCase()
          .includes(value) ||
        payment.id
          .toLowerCase()
          .includes(value) ||
        payment.appointmentId
          .toLowerCase()
          .includes(value) ||
        payment.service
          .toLowerCase()
          .includes(value) ||
        payment.transactionId
          .toLowerCase()
          .includes(value);

      const matchesMethod =
        method === "All Methods" ||
        payment.method === method;

      const matchesStatus =
        status === "All Status" ||
        payment.status === status;

      return (
        matchesSearch &&
        matchesMethod &&
        matchesStatus
      );
    });
  }, [payments, search, method, status]);

  const totalRevenue = payments
    .filter((item) => item.status === "Paid")
    .reduce(
      (total, item) => total + item.amount,
      0
    );

  const paidCount = payments.filter(
    (item) => item.status === "Paid"
  ).length;

  const pendingAmount = payments
    .filter((item) => item.status === "Pending")
    .reduce(
      (total, item) => total + item.amount,
      0
    );

  const refundedAmount = payments
    .filter((item) => item.status === "Refunded")
    .reduce(
      (total, item) => total + item.amount,
      0
    );

  function markAsPaid(id) {
    setPayments((current) =>
      current.map((payment) =>
        payment.id === id
          ? {
              ...payment,
              status: "Paid",
              transactionId:
                payment.transactionId ||
                `CASH-${Date.now()}`,
            }
          : payment
      )
    );

    setSelectedPayment((current) =>
      current?.id === id
        ? {
            ...current,
            status: "Paid",
            transactionId:
              current.transactionId ||
              `CASH-${Date.now()}`,
          }
        : current
    );
  }

  function clearFilters() {
    setSearch("");
    setMethod("All Methods");
    setStatus("All Status");
  }

  if (loading) {
    return <PaymentSkeleton />;
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Payments
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Track payments, revenue, refunds and outstanding balances.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#FFAA00] px-4 text-sm font-bold text-[#0B1B2A] shadow-sm transition hover:bg-[#f5a000]"
        >
          <Plus size={18} />
          Record Payment
        </button>

      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          icon={IndianRupee}
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Paid Payments"
          value={paidCount}
          icon={CheckCircle2}
          iconClass="bg-cyan-50 text-cyan-600"
        />

        <StatCard
          title="Pending Amount"
          value={formatCurrency(pendingAmount)}
          icon={Clock3}
          iconClass="bg-amber-50 text-amber-600"
        />

        <StatCard
          title="Refunded Amount"
          value={formatCurrency(refundedAmount)}
          icon={RotateCcw}
          iconClass="bg-violet-50 text-violet-600"
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
              placeholder="Search patient, payment or transaction..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
            />

          </div>

          {/* Method */}
          <select
            value={method}
            onChange={(event) =>
              setMethod(event.target.value)
            }
            className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-teal-500 focus:bg-white"
          >
            {methodOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
            className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-teal-500 focus:bg-white"
          >
            {statusOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

        </div>

        {(search ||
          method !== "All Methods" ||
          status !== "All Status") && (
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">

            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredPayments.length}
              </span>{" "}
              payments
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

      {/* Payment Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {filteredPayments.length === 0 ? (
          <div className="py-16 text-center">

            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400">
              <CreditCard size={25} />
            </div>

            <h3 className="mt-4 text-base font-bold text-slate-900">
              No payments found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>

          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden overflow-x-auto md:block">

              <table className="w-full min-w-[1050px]">

                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70">

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Patient
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Appointment
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Amount
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Method
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Date
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredPayments.map(
                    (payment) => {
                      const dateTime =
                        formatDateTime(
                          payment.createdAt
                        );

                      return (
                        <tr
                          key={payment.id}
                          className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50/70"
                        >

                          {/* Patient */}
                          <td className="px-5 py-4">

                            <div className="flex items-center gap-3">

                              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0B1B2A] text-xs font-bold text-white">
                                {payment.initials}
                              </div>

                              <div>
                                <p className="text-sm font-semibold text-slate-800">
                                  {payment.patientName}
                                </p>

                                <p className="mt-0.5 text-xs text-slate-400">
                                  {payment.id}
                                </p>
                              </div>

                            </div>

                          </td>

                          {/* Appointment */}
                          <td className="px-5 py-4">

                            <p className="text-xs font-semibold text-slate-700">
                              {payment.appointmentId}
                            </p>

                            <p className="mt-1 max-w-[180px] truncate text-xs text-slate-400">
                              {payment.service}
                            </p>

                          </td>

                          {/* Amount */}
                          <td className="px-5 py-4">

                            <p className="text-sm font-bold text-slate-800">
                              {formatCurrency(
                                payment.amount
                              )}
                            </p>

                          </td>

                          {/* Method */}
                          <td className="px-5 py-4">

                            <div className="flex items-center gap-2">

                              <MethodIcon
                                method={
                                  payment.method
                                }
                              />

                              <span className="text-xs font-semibold text-slate-600">
                                {payment.method}
                              </span>

                            </div>

                          </td>

                          {/* Status */}
                          <td className="px-5 py-4">
                            <StatusBadge
                              status={
                                payment.status
                              }
                            />
                          </td>

                          {/* Date */}
                          <td className="px-5 py-4">

                            <p className="text-xs font-medium text-slate-700">
                              {dateTime.date}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              {dateTime.time}
                            </p>

                          </td>

                          {/* Action */}
                          <td className="px-5 py-4 text-right">

                            <button
                              type="button"
                              onClick={() =>
                                setSelectedPayment(
                                  payment
                                )
                              }
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                              aria-label="View payment"
                            >
                              <MoreHorizontal
                                size={18}
                              />
                            </button>

                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

            {/* Mobile */}
            <div className="divide-y divide-slate-100 md:hidden">

              {filteredPayments.map(
                (payment) => {
                  const dateTime =
                    formatDateTime(
                      payment.createdAt
                    );

                  return (
                    <div
                      key={payment.id}
                      className="p-4"
                    >

                      <div className="flex items-start justify-between gap-3">

                        <div className="flex min-w-0 items-center gap-3">

                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0B1B2A] text-xs font-bold text-white">
                            {payment.initials}
                          </div>

                          <div className="min-w-0">

                            <p className="truncate text-sm font-semibold text-slate-800">
                              {payment.patientName}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              {payment.id}
                            </p>

                          </div>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedPayment(
                              payment
                            )
                          }
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
                        >
                          <MoreHorizontal
                            size={18}
                          />
                        </button>

                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4">

                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                            Amount
                          </p>

                          <p className="mt-1 text-sm font-bold text-slate-800">
                            {formatCurrency(
                              payment.amount
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                            Method
                          </p>

                          <p className="mt-1 text-xs font-medium text-slate-700">
                            {payment.method}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                            Status
                          </p>

                          <div className="mt-1">
                            <StatusBadge
                              status={
                                payment.status
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                            Date
                          </p>

                          <p className="mt-1 text-xs font-medium text-slate-700">
                            {dateTime.date}
                          </p>
                        </div>

                      </div>

                    </div>
                  );
                }
              )}

            </div>
          </>
        )}

      </div>

      {/* Payment Details Drawer */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50">

          {/* Overlay */}
          <button
            type="button"
            aria-label="Close payment details"
            onClick={() =>
              setSelectedPayment(null)
            }
            className="absolute inset-0 cursor-default bg-[#0B1B2A]/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-lg flex-col bg-white shadow-2xl">

            {/* Header */}
            <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-center gap-3">

                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                    <ReceiptText size={21} />
                  </div>

                  <div>

                    <p className="text-xs font-medium text-slate-400">
                      {selectedPayment.id}
                    </p>

                    <h2 className="mt-0.5 text-lg font-bold text-slate-900">
                      Payment Details
                    </h2>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedPayment(null)
                  }
                  className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Close"
                >
                  <X size={19} />
                </button>

              </div>

              <div className="mt-4">
                <StatusBadge
                  status={
                    selectedPayment.status
                  }
                />
              </div>

            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">

              {/* Amount */}
              <div className="rounded-2xl bg-[#0B1B2A] p-5 text-white">

                <p className="text-xs font-medium text-white/60">
                  Payment Amount
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {formatCurrency(
                    selectedPayment.amount
                  )}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
                  <CreditCard size={14} />
                  {selectedPayment.method}
                </div>

              </div>

              {/* Patient */}
              <section className="mt-7">

                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Patient
                </h3>

                <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200 p-4">

                  <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                    {selectedPayment.initials}
                  </div>

                  <div>

                    <p className="text-sm font-bold text-slate-800">
                      {selectedPayment.patientName}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {selectedPayment.appointmentId}
                    </p>

                  </div>

                </div>

              </section>

              {/* Payment Information */}
              <section className="mt-7">

                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Payment Information
                </h3>

                <div className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200">

                  <div className="flex items-center justify-between gap-4 p-4">
                    <span className="text-xs text-slate-400">
                      Service
                    </span>

                    <span className="text-right text-xs font-semibold text-slate-700">
                      {selectedPayment.service}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 p-4">
                    <span className="text-xs text-slate-400">
                      Therapist
                    </span>

                    <span className="text-right text-xs font-semibold text-slate-700">
                      {selectedPayment.therapist}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 p-4">
                    <span className="text-xs text-slate-400">
                      Transaction ID
                    </span>

                    <span className="max-w-[200px] truncate text-right text-xs font-semibold text-slate-700">
                      {selectedPayment.transactionId ||
                        "Not available"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 p-4">
                    <span className="text-xs text-slate-400">
                      Payment Date
                    </span>

                    <span className="text-right text-xs font-semibold text-slate-700">
                      {
                        formatDateTime(
                          selectedPayment.createdAt
                        ).date
                      }
                      <br />
                      <span className="font-normal text-slate-400">
                        {
                          formatDateTime(
                            selectedPayment.createdAt
                          ).time
                        }
                      </span>
                    </span>
                  </div>

                </div>

              </section>

            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">

              <div className="flex flex-col gap-2">

                {selectedPayment.status ===
                  "Pending" && (
                  <button
                    type="button"
                    onClick={() =>
                      markAsPaid(
                        selectedPayment.id
                      )
                    }
                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 text-sm font-bold text-white hover:bg-teal-700"
                  >
                    <CheckCircle2 size={16} />
                    Mark as Paid
                  </button>
                )}

                {selectedPayment.status ===
                  "Paid" && (
                  <button
                    type="button"
                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#0B1B2A] px-4 text-sm font-bold text-white hover:opacity-90"
                  >
                    <Download size={16} />
                    Download Receipt
                  </button>
                )}

                {selectedPayment.status ===
                  "Paid" && (
                  <button
                    type="button"
                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-4 text-sm font-semibold text-violet-600 hover:bg-violet-50"
                  >
                    <RefreshCcw size={16} />
                    Refund Payment
                  </button>
                )}

              </div>

            </div>

          </aside>

        </div>
      )}

    </div>
  );
}