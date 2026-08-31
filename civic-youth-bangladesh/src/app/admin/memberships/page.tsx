"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminTable } from "@/components/admin/AdminTable";
import {
  adminGetMemberships,
  adminUpdateMembershipStatus,
} from "@/lib/admin-api";

export default function AdminMembershipsPage() {
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
      const res = await adminGetMemberships(page, 10);
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
    await adminUpdateMembershipStatus(id, status);
    setData((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const fields = [
    { key: "fullName", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "institution", label: "Institution" },
    {
      key: "memberType",
      label: "Type",
      render: (v: unknown) => (
        <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-[#138A36]/10 text-[#138A36]">
          {String(v)}
        </span>
      ),
    },
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
    { key: "department", label: "Department" },
    { key: "memberType", label: "Member Type" },
    { key: "district", label: "District" },
    { key: "interests", label: "Interests" },
    { key: "motivation", label: "Motivation" },
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
      title="Membership Applications"
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
