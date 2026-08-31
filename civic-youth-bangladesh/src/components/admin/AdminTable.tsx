"use client";

import { useState } from "react";
import { X, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

interface Field {
  key: string;
  label: string;
  render?: (value: unknown, record: Record<string, unknown>) => React.ReactNode;
}

interface DetailField {
  key: string;
  label: string;
  render?: (value: unknown) => React.ReactNode;
}

interface AdminTableProps {
  title: string;
  data: Record<string, unknown>[];
  fields: Field[];
  detailFields: DetailField[];
  meta: { page: number; limit: number; total: number; totalPages: number };
  onPageChange: (page: number) => void;
  loading?: boolean;
  getStatusValue?: (record: Record<string, unknown>) => string;
  onStatusChange?: (id: string, status: string) => Promise<void>;
}

export function AdminTable({
  title,
  data,
  fields,
  detailFields,
  meta,
  onPageChange,
  loading,
  getStatusValue,
  onStatusChange,
}: AdminTableProps) {
  const [selected, setSelected] = useState<Record<string, unknown> | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const handleStatusChange = async (status: string) => {
    if (!selected || !onStatusChange) return;
    setUpdatingStatus(true);
    try {
      await onStatusChange(selected.id as string, status);
      setSelected({ ...selected, status });
    } catch {
      // ignore
    } finally {
      setUpdatingStatus(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#222222]">
          {title}
        </h1>
        <p className="text-[#6B7280] mt-1">
          {meta.total} total record{meta.total !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#F5F7F6]">
                {fields.map((field) => (
                  <th
                    key={field.key}
                    className="text-left px-4 py-3 font-medium text-[#6B7280] whitespace-nowrap"
                  >
                    {field.label}
                  </th>
                ))}
                {getStatusValue && (
                  <th className="text-left px-4 py-3 font-medium text-[#6B7280]">
                    Status
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={fields.length + (getStatusValue ? 1 : 0)}
                    className="text-center py-12"
                  >
                    <Loader2 className="w-6 h-6 animate-spin text-[#138A36] mx-auto" />
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={fields.length + (getStatusValue ? 1 : 0)}
                    className="text-center py-12 text-[#6B7280]"
                  >
                    No records found
                  </td>
                </tr>
              ) : (
                data.map((record) => (
                  <tr
                    key={record.id as string}
                    onClick={() => setSelected(record)}
                    className="border-b border-[#E5E7EB] last:border-b-0 hover:bg-[#F5F7F6] cursor-pointer transition-colors"
                  >
                    {fields.map((field) => (
                      <td
                        key={field.key}
                        className="px-4 py-3 text-[#222222] whitespace-nowrap max-w-[200px] truncate"
                      >
                        {field.render
                          ? field.render(record[field.key], record)
                          : (record[field.key] as React.ReactNode) ?? "—"}
                      </td>
                    ))}
                    {getStatusValue && (
                      <td className="px-4 py-3">
                        <StatusBadge status={getStatusValue(record)} />
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {meta.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#E5E7EB]">
            <p className="text-sm text-[#6B7280]">
              Page {meta.page} of {meta.totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onPageChange(meta.page - 1)}
                disabled={meta.page <= 1}
                className="p-2 rounded-lg border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F5F7F6] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => onPageChange(meta.page + 1)}
                disabled={meta.page >= meta.totalPages}
                className="p-2 rounded-lg border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F5F7F6] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#222222]">
                Record Details
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="text-[#6B7280] hover:text-[#222222] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {detailFields.map((field) => {
                const value = selected[field.key];
                return (
                  <div key={field.key}>
                    <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-1">
                      {field.label}
                    </p>
                    <div className="text-sm text-[#222222]">
                      {field.render
                        ? field.render(value)
                        : value
                          ? String(value)
                          : "—"}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="px-6 py-4 border-t border-[#E5E7EB] flex items-center justify-between">
              <p className="text-xs text-[#6B7280]">
                ID: {String(selected.id).slice(0, 8)}...
              </p>
              {getStatusValue && onStatusChange && (
                <div className="flex items-center gap-2">
                  {["PENDING", "APPROVED", "REJECTED"].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      disabled={
                        updatingStatus ||
                        getStatusValue(selected) === status
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-50 ${
                        getStatusValue(selected) === status
                          ? "bg-[#138A36] text-white"
                          : "border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F5F7F6]"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: "bg-[#FEF3C7] text-[#92400E]",
    APPROVED: "bg-[#D1FAE5] text-[#065F46]",
    REJECTED: "bg-[#FEE2E2] text-[#991B1B]",
  };

  return (
    <span
      className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${
        styles[status] ?? "bg-[#F5F7F6] text-[#6B7280]"
      }`}
    >
      {status}
    </span>
  );
}
