"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getTranslation } from "@/i18n";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function Newsletter() {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError(t.newsletter.errorEmpty);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t.newsletter.errorInvalid);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error?.message || "Failed to subscribe");
      }

      const msg = data?.data?.message || t.newsletter.success;
      setSuccessMsg(msg);
      setSubmitted(true);
      setEmail("");
    } catch (err) {
      setError(t.newsletter.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-cy-light dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-cy-dark dark:text-dark-text mb-4">
            {t.newsletter.title}
          </h2>
          <p className="text-lg text-cy-gray dark:text-dark-text mb-8">
            {t.newsletter.subtitle}
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-3 p-6 bg-cy-green-50 dark:bg-cy-green-50/10 rounded-2xl border border-cy-green/20">
              <CheckCircle className="w-6 h-6 text-cy-green flex-shrink-0" />
              <p className="text-cy-green-dark dark:text-cy-green font-medium">
                {successMsg}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  {t.newsletter.placeholder}
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder={t.newsletter.placeholder}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className="w-full px-5 py-3.5 bg-white dark:bg-dark-bg border border-cy-border dark:border-dark-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all dark:text-dark-text"
                />
                {error && (
                  <p className="mt-2 text-sm text-cy-red text-left">{error}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-cy-green text-white font-semibold rounded-xl hover:bg-cy-green-dark transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {t.newsletter.subscribe}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
