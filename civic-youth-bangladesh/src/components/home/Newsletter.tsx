"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getTranslation } from "@/i18n";

export function Newsletter() {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
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

    setSubmitted(true);
    setEmail("");
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
                {t.newsletter.success}
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
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-cy-green text-white font-semibold rounded-xl hover:bg-cy-green-dark transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
              >
                <Send className="w-4 h-4" />
                {t.newsletter.subscribe}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
