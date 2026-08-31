"use client";

import { useState } from "react";
import { Search, Loader2, CheckCircle, Clock, XCircle, FileSearch } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

type ApplicationType = "membership" | "volunteer" | "partnership";

interface StatusResult {
  type: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  submittedAt: string;
}

const statusConfig = {
  PENDING: {
    label: "Under Review",
    icon: Clock,
    bg: "bg-[#FEF3C7]",
    text: "text-[#92400E]",
    border: "border-[#F59E0B]/20",
  },
  APPROVED: {
    label: "Approved",
    icon: CheckCircle,
    bg: "bg-[#D1FAE5]",
    text: "text-[#065F46]",
    border: "border-[#10B981]/20",
  },
  REJECTED: {
    label: "Not Approved",
    icon: XCircle,
    bg: "bg-[#FEE2E2]",
    text: "text-[#991B1B]",
    border: "border-[#EF4444]/20",
  },
};

export default function ApplicationStatusPage() {
  const { theme } = useTheme();

  const [type, setType] = useState<ApplicationType>("membership");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StatusResult | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!email.trim() || !phone.trim()) {
      setError("Please enter both email and phone number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/application-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error?.message || "Failed to check status");
      }

      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className={`${theme === "dark" ? "bg-dark-secondary" : "bg-cy-light"} pt-32 pb-16 lg:pt-40 lg:pb-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className={`font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
              Check Application Status
            </h1>
            <p className={`text-lg leading-relaxed ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
              Enter your details below to check the status of your membership, volunteer, or partnership application.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className={`py-20 lg:py-28 ${theme === "dark" ? "bg-dark-bg" : "bg-white"}`}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`rounded-2xl border p-8 lg:p-10 ${theme === "dark" ? "border-dark-border bg-dark-card" : "border-cy-border bg-white shadow-sm"}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-cy-green-50 flex items-center justify-center">
                <FileSearch className="w-6 h-6 text-cy-green" />
              </div>
              <div>
                <h2 className={`font-[family-name:var(--font-heading)] text-xl font-bold ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                  Application Status Checker
                </h2>
                <p className={`text-sm ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
                  Find out where your application stands
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Application Type */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                  Application Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { value: "membership", label: "Membership" },
                    { value: "volunteer", label: "Volunteer" },
                    { value: "partnership", label: "Partnership" },
                  ] as const).map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setType(option.value)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                        type === option.value
                          ? "bg-cy-green text-white border-cy-green"
                          : theme === "dark"
                            ? "bg-dark-bg text-dark-muted border-dark-border hover:border-dark-muted"
                            : "bg-cy-light text-cy-gray border-cy-border hover:border-cy-gray"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="status-email" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                  Email Address
                </label>
                <input
                  id="status-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${
                    theme === "dark"
                      ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted"
                      : "bg-white border-cy-border"
                  }`}
                  autoComplete="email"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="status-phone" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                  Phone Number
                </label>
                <input
                  id="status-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880 1XXXXXXXXX"
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${
                    theme === "dark"
                      ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted"
                      : "bg-white border-cy-border"
                  }`}
                  autoComplete="tel"
                />
              </div>

              {error && (
                <div className="p-3 bg-[#FDF2F4] border border-[#C8102E]/20 rounded-xl">
                  <p className="text-sm text-[#C8102E]">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-cy-green text-white font-semibold rounded-xl hover:bg-cy-green-dark transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Check Status
                  </>
                )}
              </button>
            </form>

            {/* Result */}
            {result && (
              <div className={`mt-8 p-6 rounded-2xl border ${statusConfig[result.status].border} ${statusConfig[result.status].bg}`}>
                <div className="flex items-center gap-3 mb-4">
                  {(() => {
                    const Icon = statusConfig[result.status].icon;
                    return <Icon className={`w-6 h-6 ${statusConfig[result.status].text}`} />;
                  })()}
                  <h3 className={`font-[family-name:var(--font-heading)] text-lg font-bold ${statusConfig[result.status].text}`}>
                    Application Status
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
                      Application Type
                    </span>
                    <span className={`text-sm font-semibold ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                      {result.type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
                      Status
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${statusConfig[result.status].text} ${statusConfig[result.status].bg}`}>
                      {statusConfig[result.status].label}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
                      Submitted
                    </span>
                    <span className={`text-sm ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                      {new Date(result.submittedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
