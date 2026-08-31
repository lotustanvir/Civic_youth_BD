"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminTable } from "@/components/admin/AdminTable";
import {
  adminGetPartnerships,
  adminUpdatePartnershipStatus,
} from "@/lib/admin-api";

export default function AdminPartnershipsPage() {
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
      const res = await adminGetPartnerships(page, 10);
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
    await adminUpdatePartnershipStatus(id, status);
    setData((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const fields = [
    { key: "organizationName", label: "Organization" },
    { key: "contactPerson", label: "Contact Person" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
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
    { key: "organizationName", label: "Organization Name" },
    { key: "contactPerson", label: "Contact Person" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "organizationType", label: "Organization Type" },
    { key: "website", label: "Website" },
    { key: "partnershipInterest", label: "Partnership Interest" },
    { key: "message", label: "Message" },
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
      title="Partnership Inquiries"
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
