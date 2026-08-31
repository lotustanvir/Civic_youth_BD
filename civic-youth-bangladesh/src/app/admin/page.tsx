"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Heart,
  Handshake,
  MessageSquare,
  Clock,
  CheckCircle,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { adminGetStats } from "@/lib/admin-api";

interface Stats {
  total: {
    memberships: number;
    volunteers: number;
    partnerships: number;
    contacts: number;
  };
  pending: {
    memberships: number;
    volunteers: number;
    partnerships: number;
  };
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    adminGetStats()
      .then((res) => setStats(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#138A36]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-[#C8102E]">{error}</p>
      </div>
    );
  }

  const cards = [
    {
      label: "Membership Applications",
      value: stats?.total.memberships ?? 0,
      pending: stats?.pending.memberships ?? 0,
      icon: Users,
      href: "/admin/memberships",
      color: "bg-[#138A36]",
    },
    {
      label: "Volunteer Applications",
      value: stats?.total.volunteers ?? 0,
      pending: stats?.pending.volunteers ?? 0,
      icon: Heart,
      href: "/admin/volunteers",
      color: "bg-[#C8102E]",
    },
    {
      label: "Partnership Inquiries",
      value: stats?.total.partnerships ?? 0,
      pending: stats?.pending.partnerships ?? 0,
      icon: Handshake,
      href: "/admin/partnerships",
      color: "bg-[#138A36]",
    },
    {
      label: "Contact Messages",
      value: stats?.total.contacts ?? 0,
      pending: null,
      icon: MessageSquare,
      href: "/admin/contacts",
      color: "bg-[#C8102E]",
    },
  ];

  const totalPending =
    (stats?.pending.memberships ?? 0) +
    (stats?.pending.volunteers ?? 0) +
    (stats?.pending.partnerships ?? 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#222222]">
          Dashboard
        </h1>
        <p className="text-[#6B7280] mt-1">
          Overview of all submissions and applications
        </p>
      </div>

      {totalPending > 0 && (
        <div className="flex items-center gap-3 p-4 bg-[#FDF2F4] border border-[#C8102E]/20 rounded-xl">
          <Clock className="w-5 h-5 text-[#C8102E] flex-shrink-0" />
          <p className="text-sm text-[#C8102E]">
            <strong>{totalPending}</strong> pending application{totalPending !== 1 ? "s" : ""}{" "}
            require{totalPending === 1 ? "s" : ""} your review
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-4 h-4 text-[#6B7280] group-hover:text-[#138A36] transition-colors" />
              </div>
              <p className="text-3xl font-bold text-[#222222]">{card.value}</p>
              <p className="text-sm text-[#6B7280] mt-1">{card.label}</p>
              {card.pending !== null && card.pending > 0 && (
                <div className="flex items-center gap-1.5 mt-3">
                  <CheckCircle className="w-3.5 h-3.5 text-[#C8102E]" />
                  <span className="text-xs font-medium text-[#C8102E]">
                    {card.pending} pending
                  </span>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
