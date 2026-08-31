"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminTable } from "@/components/admin/AdminTable";
import {
  adminGetVolunteers,
  adminUpdateVolunteerStatus,
} from "@/lib/admin-api";

export default function AdminVolunteersPage() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [meta, setMeta] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const res = await adminGetVolunteers(page, 10);
      setData(res.data);
      setMeta(res.meta);
    } catch {
      // handled by adminFetch redirect
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  const handleStatusChange = async (id: string, status: string) => {
    await adminUpdateVolunteerStatus(id, status);
    setData((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const fields = [
    { key: "fullName", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "skills", label: "Skills" },
    {
      key: "createdAt",
      label: "Submitted",
      render: (v: unknown) =>
        new Date(String(v)).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
  ];

  const detailFields = [
    { key: "fullName", label: "Full Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "institution", label: "Institution" },
    { key: "skills", label: "Skills" },
    { key: "interests", label: "Interests" },
    { key: "experience", label: "Experience" },
    { key: "availability", label: "Availability" },
    { key: "motivation", label: "Motivation" },
    { key: "portfolioUrl", label: "Portfolio URL" },
    { key: "status", label: "Status" },
    {
      key: "createdAt",
      label: "Submitted At",
      render: (v: unknown) =>
        new Date(String(v)).toLocaleString("en-US"),
    },
  ];

  return (
    <AdminTable
      title="Volunteer Applications"
      data={data}
      fields={fields}
      detailFields={detailFields}
      meta={meta}
      onPageChange={fetchData}
      loading={loading}
      getStatusValue={(r) => String(r.status)}
      onStatusChange={handleStatusChange}
    />
  );
}
