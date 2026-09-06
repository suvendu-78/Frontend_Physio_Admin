import { useEffect, useMemo, useState } from "react";

import {
  MessageSquare,
  Search,
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  Clock3,
  UserRound,
  CheckCircle2,
  CircleAlert,
  CircleDashed,
  XCircle,
  MessageCircle,
  Eye,
  Trash2,
  UserRoundCog,
  Send,
  Stethoscope,
  Building2,
  ShieldCheck,
  FileText,
  X,
  ExternalLink,
  UserCheck,
  UserX,
  RefreshCw,
} from "lucide-react";

import EnquirySkeleton from "../../components/skeletons/EnquirySkeleton";

const initialEnquiries = [
  {
    id: "ENQ-1001",
    patientName: "Rahul Das",
    initials: "RD",
    phone: "+91 98765 43210",
    email: "rahul.das@example.com",
    city: "Bhubaneswar",
    service: "Back Pain Therapy",
    source: "Website Booking",
    priority: "High",
    status: "New",
    therapist: "",
    message:
      "I have severe lower back pain for the last 3 weeks. I would like to book a consultation this weekend.",
    createdAt: "2026-08-29T11:30:00",
  },
  {
    id: "ENQ-1002",
    patientName: "Priya Sharma",
    initials: "PS",
    phone: "+91 91234 56780",
    email: "priya.sharma@example.com",
    city: "Bhubaneswar",
    service: "Sports Rehabilitation",
    source: "Contact Form",
    priority: "Medium",
    status: "In Progress",
    therapist: "Dr. Priya Das",
    message:
      "I suffered a knee injury while playing badminton and need rehabilitation.",
    createdAt: "2026-08-29T10:15:00",
  },
  {
    id: "ENQ-1003",
    patientName: "Amit Kumar",
    initials: "AK",
    phone: "+91 99887 66554",
    email: "amit.kumar@example.com",
    city: "Cuttack",
    service: "Neck Pain Therapy",
    source: "WhatsApp",
    priority: "High",
    status: "Pending",
    therapist: "Dr. Ankit Kumar",
    message:
      "I am experiencing persistent neck pain and stiffness. Please let me know available slots.",
    createdAt: "2026-08-29T09:45:00",
  },
  {
    id: "ENQ-1004",
    patientName: "Sneha Patel",
    initials: "SP",
    phone: "+91 90123 45678",
    email: "sneha.patel@example.com",
    city: "Bhubaneswar",
    service: "Post-Surgery Rehabilitation",
    source: "Website Booking",
    priority: "High",
    status: "Resolved",
    therapist: "Dr. Rahul Singh",
    message:
      "I recently had knee surgery and would like to start physiotherapy sessions.",
    createdAt: "2026-08-28T16:20:00",
  },
  {
    id: "ENQ-1005",
    patientName: "Arjun Singh",
    initials: "AS",
    phone: "+91 93456 78901",
    email: "arjun.singh@example.com",
    city: "Puri",
    service: "Sports Injury",
    source: "WhatsApp",
    priority: "Medium",
    status: "New",
    therapist: "",
    message:
      "I injured my ankle during football. Can I get a physiotherapy appointment?",
    createdAt: "2026-08-28T14:10:00",
  },
  {
    id: "ENQ-1006",
    patientName: "Neha Mishra",
    initials: "NM",
    phone: "+91 97654 32109",
    email: "neha.mishra@example.com",
    city: "Bhubaneswar",
    service: "Knee Rehabilitation",
    source: "Contact Form",
    priority: "Low",
    status: "Resolved",
    therapist: "Dr. Rahul Singh",
    message:
      "I need information about your knee rehabilitation program and pricing.",
    createdAt: "2026-08-27T13:30:00",
  },
  {
    id: "ENQ-1007",
    patientName: "Suresh Nayak",
    initials: "SN",
    phone: "+91 94567 81234",
    email: "suresh.nayak@example.com",
    city: "Cuttack",
    service: "Shoulder Therapy",
    source: "Website Booking",
    priority: "Medium",
    status: "Pending",
    therapist: "Dr. Ankit Kumar",
    message:
      "I have shoulder pain and limited movement. I would like to know about treatment options.",
    createdAt: "2026-08-27T11:10:00",
  },
  {
    id: "ENQ-1008",
    patientName: "Pooja Rout",
    initials: "PR",
    phone: "+91 92345 67890",
    email: "pooja.rout@example.com",
    city: "Bhubaneswar",
    service: "Posture Correction",
    source: "Contact Form",
    priority: "Low",
    status: "In Progress",
    therapist: "Dr. Priya Das",
    message:
      "I work long hours at a desk and want help correcting my posture.",
    createdAt: "2026-08-26T15:40:00",
  },
];

const sourceOptions = [
  "All Sources",
  "Website Booking",
  "Contact Form",
  "WhatsApp",
  "Home Visit",
];

const statusOptions = [
  "All Status",
  "New",
  "Pending",
  "In Progress",
  "Resolved",
];

const priorityOptions = [
  "All Priority",
  "High",
  "Medium",
  "Low",
];

const therapistOptions = [
  "Unassigned",
  "Dr. Ankit Kumar",
  "Dr. Priya Das",
  "Dr. Rahul Singh",
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

function StatusBadge({ status }) {
  const styles = {
    New: "bg-cyan-50 text-cyan-700 ring-cyan-600/10",
    Pending: "bg-amber-50 text-amber-700 ring-amber-600/10",
    "In Progress":
      "bg-blue-50 text-blue-700 ring-blue-600/10",
    Resolved:
      "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        styles[status] ||
        "bg-slate-100 text-slate-600"
      }`}
    >
      {status === "New" && (
        <CircleDashed size={12} />
      )}

      {status === "Pending" && (
        <CircleAlert size={12} />
      )}

      {status === "In Progress" && (
        <Clock3 size={12} />
      )}

      {status === "Resolved" && (
        <CheckCircle2 size={12} />
      )}

      {status}
    </span>
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
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        styles[priority]
      }`}
    >
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

export default function Enquiries() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("enquiries");
  const [partners, setPartners] = useState([]);
  const [partnerSearch, setPartnerSearch] = useState("");
  const [partnerType, setPartnerType] = useState("All");
  const [partnerStatus, setPartnerStatus] = useState("All");
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showReject, setShowReject] = useState(false);

  const [enquiries, setEnquiries] =
    useState(initialEnquiries);

  const [search, setSearch] = useState("");
  const [source, setSource] =
    useState("All Sources");
  const [status, setStatus] =
    useState("All Status");
  const [priority, setPriority] =
    useState("All Priority");

  const [selectedEnquiry, setSelectedEnquiry] =
    useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function loadPartners() {
      const items = [];
      const doctorRaw = localStorage.getItem("libi_doctor_account");
      const clinicRaw = localStorage.getItem("libi_clinic_account");

      if (doctorRaw) {
        try {
          const doctor = JSON.parse(doctorRaw);
          items.push({
            ...doctor,
            partnerType: "DOCTOR",
            displayName: doctor.fullName || "Doctor",
            documents: JSON.parse(localStorage.getItem(`libi_doctor_documents_${doctor.id}`) || "{}"),
          });
        } catch (error) {
          console.error("Unable to load doctor verification data", error);
        }
      }

      if (clinicRaw) {
        try {
          const clinic = JSON.parse(clinicRaw);
          items.push({
            ...clinic,
            partnerType: "CLINIC",
            displayName: clinic.clinicName || clinic.fullName || "Clinic",
            documents: JSON.parse(localStorage.getItem(`libi_clinic_documents_${clinic.id}`) || "{}"),
          });
        } catch (error) {
          console.error("Unable to load clinic verification data", error);
        }
      }

      setPartners(items);
    }

    loadPartners();
    window.addEventListener("storage", loadPartners);
    return () => window.removeEventListener("storage", loadPartners);
  }, []);

  const filteredPartners = useMemo(() => {
    const value = partnerSearch.toLowerCase().trim();
    return partners.filter((partner) => {
      const matchesSearch = !value || [
        partner.displayName,
        partner.email,
        partner.phone,
        partner.registrationNumber,
        partner.specialization,
        partner.city,
      ].filter(Boolean).some((item) => String(item).toLowerCase().includes(value));
      const matchesType = partnerType === "All" || partner.partnerType === partnerType;
      const matchesStatus = partnerStatus === "All" || (partner.status || "PENDING") === partnerStatus;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [partners, partnerSearch, partnerType, partnerStatus]);

  const partnerCounts = useMemo(() => ({
    total: partners.length,
    underReview: partners.filter((p) => p.status === "UNDER_REVIEW").length,
    verified: partners.filter((p) => p.status === "VERIFIED").length,
    rejected: partners.filter((p) => p.status === "REJECTED").length,
  }), [partners]);

  function updatePartnerStatus(partner, nextStatus, reason = "") {
    const accountKey = partner.partnerType === "DOCTOR" ? "libi_doctor_account" : "libi_clinic_account";
    const currentRaw = localStorage.getItem(accountKey);
    if (!currentRaw) return;

    try {
      const account = JSON.parse(currentRaw);
      const updated = {
        ...account,
        status: nextStatus,
        documentStatus: nextStatus === "VERIFIED" ? "VERIFIED" : nextStatus === "REJECTED" ? "REJECTED" : account.documentStatus,
        ...(nextStatus === "VERIFIED" ? { verifiedAt: new Date().toISOString(), verifiedBy: "ADMIN" } : {}),
        ...(nextStatus === "REJECTED" ? { rejectionReason: reason, rejectedAt: new Date().toISOString(), rejectedBy: "ADMIN" } : {}),
      };

      localStorage.setItem(accountKey, JSON.stringify(updated));

      setPartners((current) => current.map((item) => item.id === partner.id ? { ...item, ...updated } : item));
      setSelectedPartner((current) => current ? { ...current, ...updated } : null);
      setShowReject(false);
      setRejectionReason("");
    } catch (error) {
      console.error("Unable to update partner verification", error);
    }
  }

  function refreshPartners() {
    window.dispatchEvent(new Event("storage"));
  }

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((enquiry) => {
      const value = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        !value ||
        enquiry.patientName
          .toLowerCase()
          .includes(value) ||
        enquiry.phone
          .toLowerCase()
          .includes(value) ||
        enquiry.email
          .toLowerCase()
          .includes(value) ||
        enquiry.id
          .toLowerCase()
          .includes(value) ||
        enquiry.service
          .toLowerCase()
          .includes(value);

      const matchesSource =
        source === "All Sources" ||
        enquiry.source === source;

      const matchesStatus =
        status === "All Status" ||
        enquiry.status === status;

      const matchesPriority =
        priority === "All Priority" ||
        enquiry.priority === priority;

      return (
        matchesSearch &&
        matchesSource &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    enquiries,
    search,
    source,
    status,
    priority,
  ]);

  const newCount = enquiries.filter(
    (item) => item.status === "New"
  ).length;

  const pendingCount = enquiries.filter(
    (item) =>
      item.status === "Pending" ||
      item.status === "In Progress"
  ).length;

  const resolvedCount = enquiries.filter(
    (item) => item.status === "Resolved"
  ).length;

  function clearFilters() {
    setSearch("");
    setSource("All Sources");
    setStatus("All Status");
    setPriority("All Priority");
  }

  function updateEnquiryStatus(newStatus) {
    if (!selectedEnquiry) return;

    setEnquiries((current) =>
      current.map((item) =>
        item.id === selectedEnquiry.id
          ? {
              ...item,
              status: newStatus,
            }
          : item
      )
    );

    setSelectedEnquiry((current) =>
      current
        ? {
            ...current,
            status: newStatus,
          }
        : null
    );
  }

  function assignTherapist(name) {
    if (!selectedEnquiry) return;

    const therapist =
      name === "Unassigned" ? "" : name;

    setEnquiries((current) =>
      current.map((item) =>
        item.id === selectedEnquiry.id
          ? {
              ...item,
              therapist,
            }
          : item
      )
    );

    setSelectedEnquiry((current) =>
      current
        ? {
            ...current,
            therapist,
          }
        : null
    );
  }

  function deleteEnquiry() {
    if (!selectedEnquiry) return;

    setEnquiries((current) =>
      current.filter(
        (item) =>
          item.id !== selectedEnquiry.id
      )
    );

    setSelectedEnquiry(null);
    setShowDeleteConfirm(false);
  }

  if (loading) {
    return <EnquirySkeleton />;
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Enquiries
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage patient enquiries, follow-ups and leads.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <Send size={17} />
          Export
        </button>

      </div>

      {/* Main Sections */}
      <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        <button
          type="button"
          onClick={() => setActiveSection("enquiries")}
          className={`inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-bold transition ${activeSection === "enquiries" ? "bg-[#32838c] text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}
        >
          <MessageSquare size={16} />
          Patient Enquiries
        </button>
        <button
          type="button"
          onClick={() => setActiveSection("verification")}
          className={`inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-bold transition ${activeSection === "verification" ? "bg-[#32838c] text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}
        >
          <ShieldCheck size={16} />
          Partner Verification
          {partnerCounts.underReview > 0 && (
            <span className={`grid min-w-5 h-5 place-items-center rounded-full px-1 text-[10px] ${activeSection === "verification" ? "bg-white text-[#32838c]" : "bg-amber-100 text-amber-700"}`}>
              {partnerCounts.underReview}
            </span>
          )}
        </button>
      </div>

      {activeSection === "enquiries" && (
      <>
      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Enquiries"
          value={enquiries.length}
          icon={MessageSquare}
          iconClass="bg-cyan-50 text-cyan-600"
        />

        <StatCard
          title="New"
          value={newCount}
          icon={CircleDashed}
          iconClass="bg-orange-50 text-orange-600"
        />

        <StatCard
          title="Pending Follow-ups"
          value={pendingCount}
          icon={CircleAlert}
          iconClass="bg-amber-50 text-amber-600"
        />

        <StatCard
          title="Resolved"
          value={resolvedCount}
          icon={CheckCircle2}
          iconClass="bg-emerald-50 text-emerald-600"
        />

      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">

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
              placeholder="Search name, phone or email..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
            />

          </div>

          {/* Source */}
          <select
            value={source}
            onChange={(event) =>
              setSource(event.target.value)
            }
            className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-teal-500 focus:bg-white"
          >
            {sourceOptions.map((item) => (
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

          {/* Priority */}
          <select
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value)
            }
            className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-teal-500 focus:bg-white"
          >
            {priorityOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

        </div>

        {(search ||
          source !== "All Sources" ||
          status !== "All Status" ||
          priority !== "All Priority") && (
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">

            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredEnquiries.length}
              </span>{" "}
              enquiries
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

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {filteredEnquiries.length === 0 ? (
          <div className="py-16 text-center">

            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400">
              <MessageSquare size={25} />
            </div>

            <h3 className="mt-4 text-base font-bold text-slate-900">
              No enquiries found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your filters.
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
                      Contact
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Service
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Source
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Priority
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredEnquiries.map(
                    (enquiry) => {
                      const dateTime =
                        formatDateTime(
                          enquiry.createdAt
                        );

                      return (
                        <tr
                          key={enquiry.id}
                          className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50/70"
                        >

                          {/* Patient */}
                          <td className="px-5 py-4">

                            <div className="flex items-center gap-3">

                              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0B1B2A] text-xs font-bold text-white">
                                {enquiry.initials}
                              </div>

                              <div>
                                <p className="text-sm font-semibold text-slate-800">
                                  {enquiry.patientName}
                                </p>

                                <p className="mt-0.5 text-xs text-slate-400">
                                  {enquiry.id}
                                </p>
                              </div>

                            </div>

                          </td>

                          {/* Contact */}
                          <td className="px-5 py-4">

                            <div className="space-y-1">

                              <a
                                href={`tel:${enquiry.phone}`}
                                className="flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-teal-600"
                              >
                                <Phone size={12} />
                                {enquiry.phone}
                              </a>

                              <a
                                href={`mailto:${enquiry.email}`}
                                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-600"
                              >
                                <Mail size={12} />
                                {enquiry.email}
                              </a>

                            </div>

                          </td>

                          {/* Service */}
                          <td className="px-5 py-4">

                            <p className="max-w-[180px] text-sm font-medium text-slate-700">
                              {enquiry.service}
                            </p>

                          </td>

                          {/* Source */}
                          <td className="px-5 py-4">

                            <span className="text-xs font-medium text-slate-600">
                              {enquiry.source}
                            </span>

                          </td>

                          {/* Priority */}
                          <td className="px-5 py-4">
                            <PriorityBadge
                              priority={
                                enquiry.priority
                              }
                            />
                          </td>

                          {/* Status */}
                          <td className="px-5 py-4">
                            <StatusBadge
                              status={
                                enquiry.status
                              }
                            />
                          </td>

                          {/* Actions */}
                          <td className="px-5 py-4 text-right">

                            <button
                              type="button"
                              onClick={() =>
                                setSelectedEnquiry(
                                  enquiry
                                )
                              }
                              className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-teal-600 hover:bg-teal-50"
                            >
                              <Eye size={15} />
                              View
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

              {filteredEnquiries.map(
                (enquiry) => {
                  const dateTime =
                    formatDateTime(
                      enquiry.createdAt
                    );

                  return (
                    <div
                      key={enquiry.id}
                      className="p-4"
                    >

                      <div className="flex items-start justify-between gap-3">

                        <div className="flex min-w-0 items-center gap-3">

                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0B1B2A] text-xs font-bold text-white">
                            {enquiry.initials}
                          </div>

                          <div className="min-w-0">

                            <p className="truncate text-sm font-semibold text-slate-800">
                              {enquiry.patientName}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              {enquiry.id}
                            </p>

                          </div>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedEnquiry(
                              enquiry
                            )
                          }
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
                        >
                          <MoreHorizontal size={18} />
                        </button>

                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4">

                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                            Service
                          </p>

                          <p className="mt-1 text-xs font-medium text-slate-700">
                            {enquiry.service}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                            Source
                          </p>

                          <p className="mt-1 text-xs font-medium text-slate-700">
                            {enquiry.source}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                            Date
                          </p>

                          <p className="mt-1 text-xs font-medium text-slate-700">
                            {dateTime.date}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                            Time
                          </p>

                          <p className="mt-1 text-xs font-medium text-slate-700">
                            {dateTime.time}
                          </p>
                        </div>

                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">

                        <PriorityBadge
                          priority={
                            enquiry.priority
                          }
                        />

                        <StatusBadge
                          status={
                            enquiry.status
                          }
                        />

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedEnquiry(
                            enquiry
                          )
                        }
                        className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <Eye size={14} />
                        View Enquiry
                      </button>

                    </div>
                  );
                }
              )}

            </div>
          </>
        )}

      </div>

      </>
      )}

      {activeSection === "verification" && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Total Partners" value={partnerCounts.total} icon={UserRound} iconClass="bg-cyan-50 text-cyan-600" />
            <StatCard title="Under Review" value={partnerCounts.underReview} icon={CircleAlert} iconClass="bg-amber-50 text-amber-600" />
            <StatCard title="Verified" value={partnerCounts.verified} icon={ShieldCheck} iconClass="bg-emerald-50 text-emerald-600" />
            <StatCard title="Rejected" value={partnerCounts.rejected} icon={UserX} iconClass="bg-red-50 text-red-600" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="grid gap-3 md:grid-cols-[1fr_180px_180px_auto]">
              <div className="relative">
                <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="search" value={partnerSearch} onChange={(e) => setPartnerSearch(e.target.value)} placeholder="Search doctor, clinic, email or registration..." className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10" />
              </div>
              <select value={partnerType} onChange={(e) => setPartnerType(e.target.value)} className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-teal-500">
                <option value="All">All Partners</option>
                <option value="DOCTOR">Doctors</option>
                <option value="CLINIC">Clinics</option>
              </select>
              <select value={partnerStatus} onChange={(e) => setPartnerStatus(e.target.value)} className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-teal-500">
                <option value="All">All Status</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="VERIFIED">Verified</option>
                <option value="REJECTED">Rejected</option>
                <option value="PENDING">Documents Pending</option>
              </select>
              <button type="button" onClick={refreshPartners} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                <RefreshCw size={16} /> Refresh
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {filteredPartners.length === 0 ? (
              <div className="py-16 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400"><ShieldCheck size={25} /></div>
                <h3 className="mt-4 text-base font-bold text-slate-900">No verification requests</h3>
                <p className="mt-1 text-sm text-slate-500">Doctor or clinic submissions will appear here after document submission.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredPartners.map((partner) => {
                  const currentStatus = partner.status || "PENDING";
                  const isDoctor = partner.partnerType === "DOCTOR";
                  const statusClass = currentStatus === "VERIFIED" ? "bg-emerald-50 text-emerald-700" : currentStatus === "REJECTED" ? "bg-red-50 text-red-700" : currentStatus === "UNDER_REVIEW" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600";
                  return (
                    <div key={`${partner.partnerType}-${partner.id}`} className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#32838c]/10 text-[#32838c]">
                          {isDoctor ? <Stethoscope size={21} /> : <Building2 size={21} />}
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="truncate text-sm font-bold text-slate-900">{partner.displayName}</h3>
                            <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-600">{isDoctor ? "Doctor" : "Clinic"}</span>
                            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${statusClass}`}>{currentStatus.replaceAll("_", " ")}</span>
                          </div>
                          <p className="mt-1 text-xs text-slate-500">{partner.email || "No email"} {partner.phone ? `• ${partner.phone}` : ""}</p>
                          <p className="mt-1 text-xs text-slate-400">{isDoctor ? `${partner.specialization || "Physiotherapy"} • ${partner.registrationNumber || "No registration number"}` : `${partner.city || "Location not provided"} • ${partner.registrationNumber || "No registration number"}`}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <button type="button" onClick={() => setSelectedPartner(partner)} className="inline-flex h-9 items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-bold text-slate-700 hover:bg-slate-50"><Eye size={15} /> Review</button>
                        {currentStatus === "UNDER_REVIEW" && (
                          <>
                            <button type="button" onClick={() => updatePartnerStatus(partner, "VERIFIED")} className="inline-flex h-9 items-center gap-2 rounded-xl bg-emerald-600 px-3 text-xs font-bold text-white hover:bg-emerald-700"><UserCheck size={15} /> Verify</button>
                            <button type="button" onClick={() => { setSelectedPartner(partner); setShowReject(true); }} className="inline-flex h-9 items-center gap-2 rounded-xl border border-red-200 px-3 text-xs font-bold text-red-600 hover:bg-red-50"><UserX size={15} /> Reject</button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      {/* Partner Verification Drawer */}
      {selectedPartner && (
        <div className="fixed inset-0 z-50">
          <button type="button" aria-label="Close partner review" onClick={() => { setSelectedPartner(null); setShowReject(false); }} className="absolute inset-0 cursor-default bg-[#0B1B2A]/50 backdrop-blur-sm" />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col bg-white shadow-2xl">
            <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#32838c]/10 text-[#32838c]">{selectedPartner.partnerType === "DOCTOR" ? <Stethoscope size={22} /> : <Building2 size={22} />}</div>
                  <div><h2 className="text-lg font-bold text-slate-900">{selectedPartner.displayName}</h2><p className="mt-0.5 text-xs text-slate-400">{selectedPartner.partnerType === "DOCTOR" ? "Doctor Verification" : "Clinic Verification"}</p></div>
                </div>
                <button type="button" onClick={() => setSelectedPartner(null)} className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100" aria-label="Close"><X size={19} /></button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><p className="text-[11px] text-slate-400">Email</p><p className="mt-1 text-sm font-semibold text-slate-700">{selectedPartner.email || "—"}</p></div>
                  <div><p className="text-[11px] text-slate-400">Phone</p><p className="mt-1 text-sm font-semibold text-slate-700">{selectedPartner.phone || "—"}</p></div>
                  <div><p className="text-[11px] text-slate-400">Registration No.</p><p className="mt-1 text-sm font-semibold text-slate-700">{selectedPartner.registrationNumber || "—"}</p></div>
                  <div><p className="text-[11px] text-slate-400">Status</p><p className="mt-1 text-sm font-semibold text-slate-700">{(selectedPartner.status || "PENDING").replaceAll("_", " ")}</p></div>
                  {selectedPartner.partnerType === "DOCTOR" ? <><div><p className="text-[11px] text-slate-400">Qualification</p><p className="mt-1 text-sm font-semibold text-slate-700">{selectedPartner.qualification || "—"}</p></div><div><p className="text-[11px] text-slate-400">Specialization</p><p className="mt-1 text-sm font-semibold text-slate-700">{selectedPartner.specialization || "—"}</p></div></> : <><div><p className="text-[11px] text-slate-400">Clinic</p><p className="mt-1 text-sm font-semibold text-slate-700">{selectedPartner.clinicName || selectedPartner.displayName}</p></div><div><p className="text-[11px] text-slate-400">City</p><p className="mt-1 text-sm font-semibold text-slate-700">{selectedPartner.city || "—"}</p></div></>}
                </div>
              </div>

              <section className="mt-7">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Submitted Documents</h3>
                <div className="mt-3 space-y-2">
                  {Object.entries(selectedPartner.documents || {}).map(([key, value]) => {
                    const file = value && typeof value === "object" ? value : null;
                    const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
                    return <div key={key} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3"><div className="flex min-w-0 items-center gap-3"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-teal-50 text-teal-600"><FileText size={16} /></div><div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-700">{file?.name || label}</p><p className="text-[11px] text-slate-400">{file?.type || "Document"}</p></div></div>{file?.url ? <a href={file.url} target="_blank" rel="noreferrer" className="inline-flex h-8 items-center gap-1 rounded-lg border border-slate-200 px-2.5 text-xs font-bold text-teal-700 hover:bg-teal-50"><ExternalLink size={13} /> Open</a> : <span className="text-[11px] font-semibold text-slate-400">Metadata only</span>}</div>;
                  })}
                  {Object.keys(selectedPartner.documents || {}).length === 0 && <p className="rounded-xl border border-dashed border-slate-200 p-5 text-center text-sm text-slate-500">No document metadata found.</p>}
                </div>
              </section>

              {selectedPartner.rejectionReason && <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4"><p className="text-xs font-bold text-red-700">Rejection Reason</p><p className="mt-1 text-sm text-red-600">{selectedPartner.rejectionReason}</p></div>}
            </div>
            {selectedPartner.status === "UNDER_REVIEW" && (
              <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">
                {!showReject ? <div className="flex gap-2"><button type="button" onClick={() => updatePartnerStatus(selectedPartner, "VERIFIED")} className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-bold text-white hover:bg-emerald-700"><UserCheck size={17} /> Verify Partner</button><button type="button" onClick={() => setShowReject(true)} className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 text-sm font-bold text-red-600 hover:bg-red-50"><UserX size={17} /> Reject</button></div> : <div><label className="text-xs font-bold text-slate-600">Reason for rejection</label><textarea value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} rows={3} placeholder="Explain what needs to be corrected..." className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/10" /><div className="mt-2 flex gap-2"><button type="button" onClick={() => setShowReject(false)} className="h-10 flex-1 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700">Cancel</button><button type="button" disabled={!rejectionReason.trim()} onClick={() => updatePartnerStatus(selectedPartner, "REJECTED", rejectionReason.trim())} className="h-10 flex-1 rounded-xl bg-red-600 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">Confirm Rejection</button></div></div>}
              </div>
            )}
          </aside>
        </div>
      )}

      {/* Details Drawer */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50">

          {/* Overlay */}
          <button
            type="button"
            aria-label="Close enquiry details"
            onClick={() =>
              setSelectedEnquiry(null)
            }
            className="absolute inset-0 cursor-default bg-[#0B1B2A]/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col bg-white shadow-2xl">

            {/* Drawer Header */}
            <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-center gap-3">

                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#0B1B2A] text-sm font-bold text-white">
                    {selectedEnquiry.initials}
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {selectedEnquiry.patientName}
                    </h2>

                    <p className="mt-0.5 text-xs text-slate-400">
                      {selectedEnquiry.id}
                    </p>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedEnquiry(null)
                  }
                  className="grid h-9 w-9 place-items-center rounded-lg text-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Close"
                >
                  ×
                </button>

              </div>

              <div className="mt-4 flex flex-wrap gap-2">

                <StatusBadge
                  status={
                    selectedEnquiry.status
                  }
                />

                <PriorityBadge
                  priority={
                    selectedEnquiry.priority
                  }
                />

              </div>

            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">

              {/* Contact */}
              <section>

                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Contact Information
                </h3>

                <div className="mt-3 space-y-3">

                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:bg-slate-50"
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-teal-50 text-teal-600">
                      <Phone size={16} />
                    </div>

                    <div>
                      <p className="text-[11px] text-slate-400">
                        Phone
                      </p>

                      <p className="text-sm font-semibold text-slate-700">
                        {selectedEnquiry.phone}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:bg-slate-50"
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-teal-50 text-teal-600">
                      <Mail size={16} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] text-slate-400">
                        Email
                      </p>

                      <p className="truncate text-sm font-semibold text-slate-700">
                        {selectedEnquiry.email}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">

                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-teal-50 text-teal-600">
                      <MapPin size={16} />
                    </div>

                    <div>
                      <p className="text-[11px] text-slate-400">
                        Location
                      </p>

                      <p className="text-sm font-semibold text-slate-700">
                        {selectedEnquiry.city}
                      </p>
                    </div>

                  </div>

                </div>

              </section>

              {/* Enquiry */}
              <section className="mt-7">

                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Enquiry Details
                </h3>

                <div className="mt-3 rounded-xl bg-slate-50 p-4">

                  <div className="grid grid-cols-2 gap-4">

                    <div>
                      <p className="text-[11px] text-slate-400">
                        Service
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {selectedEnquiry.service}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] text-slate-400">
                        Source
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {selectedEnquiry.source}
                      </p>
                    </div>

                  </div>

                  <div className="mt-5">

                    <p className="text-[11px] text-slate-400">
                      Message
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {selectedEnquiry.message}
                    </p>

                  </div>

                  <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">

                    <CalendarDays size={14} />

                    {formatDateTime(
                      selectedEnquiry.createdAt
                    ).date}

                    <Clock3 size={14} className="ml-2" />

                    {formatDateTime(
                      selectedEnquiry.createdAt
                    ).time}

                  </div>

                </div>

              </section>

              {/* Assign Therapist */}
              <section className="mt-7">

                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Assign Therapist
                </h3>

                <div className="relative mt-3">

                  <UserRoundCog
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    value={
                      selectedEnquiry.therapist ||
                      "Unassigned"
                    }
                    onChange={(event) =>
                      assignTherapist(
                        event.target.value
                      )
                    }
                    className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium text-slate-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
                  >
                    {therapistOptions.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}
                  </select>

                </div>

              </section>

              {/* Status */}
              <section className="mt-7">

                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Update Status
                </h3>

                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">

                  {statusOptions
                    .filter(
                      (item) =>
                        item !== "All Status"
                    )
                    .map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() =>
                          updateEnquiryStatus(
                            item
                          )
                        }
                        className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                          selectedEnquiry.status ===
                          item
                            ? "border-teal-600 bg-teal-50 text-teal-700"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {item}
                      </button>
                    ))}

                </div>

              </section>

            </div>

            {/* Drawer Footer */}
            <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">

              <div className="flex flex-col gap-2 sm:flex-row">

                <a
                  href={`https://wa.me/${selectedEnquiry.phone.replace(
                    /\D/g,
                    ""
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 text-sm font-bold text-white hover:opacity-90"
                >
                  <MessageCircle size={17} />
                  WhatsApp
                </a>

                <a
                  href={`tel:${selectedEnquiry.phone}`}
                  className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-[#0B1B2A] px-4 text-sm font-bold text-white hover:opacity-90"
                >
                  <Phone size={17} />
                  Call
                </a>

                <button
                  type="button"
                  onClick={() =>
                    setShowDeleteConfirm(true)
                  }
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  <span className="sm:hidden">
                    Delete
                  </span>
                </button>

              </div>

            </div>

          </aside>

        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm &&
        selectedEnquiry && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0B1B2A]/50 p-4 backdrop-blur-sm">

            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">

              <div className="grid h-11 w-11 place-items-center rounded-xl bg-red-50 text-red-600">
                <Trash2 size={20} />
              </div>

              <h2 className="mt-4 text-lg font-bold text-slate-900">
                Delete enquiry?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                This will permanently remove the enquiry from the admin panel.
              </p>

              <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() =>
                    setShowDeleteConfirm(false)
                  }
                  className="h-10 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={deleteEnquiry}
                  className="h-10 rounded-xl bg-red-600 px-4 text-sm font-bold text-white hover:bg-red-700"
                >
                  Delete Enquiry
                </button>

              </div>

            </div>

          </div>
        )}

    </div>
  );
}