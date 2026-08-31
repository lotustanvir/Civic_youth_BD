"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminTable } from "@/components/admin/AdminTable";
import { adminGetContacts, adminMarkContactRead } from "@/lib/admin-api";

export default function AdminContactsPage() {
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
      const res = await adminGetContacts(page, 10);
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

  const handleMarkRead = async (id: string) => {
    await adminMarkContactRead(id);
    setData((prev) =>
      prev.map((r) => (r.id === id ? { ...r, read: true } : r))
    );
  };

  const fields = [
    {
      key: "name",
      label: "Name",
      render: (v: unknown, record: Record<string, unknown>) => (
        <span className={!record.read ? "font-semibold text-[#222222]" : "text-[#6B7280]"}>
          {String(v)}
        </span>
      ),
    },
    { key: "email", label: "Email" },
    { key: "subject", label: "Subject" },
    {
      key: "read",
      label: "Status",
      render: (v: unknown) =>
        v ? (
          <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-[#D1FAE5] text-[#065F46]">
            Read
          </span>
        ) : (
          <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-[#FEF3C7] text-[#92400E]">
            Unread
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
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "subject", label: "Subject" },
    { key: "message", label: "Message" },
    {
      key: "read",
      label: "Read Status",
      render: (v: unknown) => (v ? "Read" : "Unread"),
    },
    {
      key: "createdAt",
      label: "Submitted At",
      render: (v: unknown) =>
        new Date(String(v)).toLocaleString("en-US"),
    },
  ];

  return (
    <AdminTable
      title="Contact Messages"
      data={data}
      fields={fields}
      detailFields={detailFields}
      meta={meta}
      onPageChange={fetchData}
      loading={loading}
    />
  );
}
