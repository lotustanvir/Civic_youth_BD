"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { getTranslation } from "@/i18n";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function ContactForm() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = getTranslation(language);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setError(t.contactForm.required);
      return;
    }

    setSending(true);

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error?.message || "Failed to send message");
      }

      setSubmitted(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setError(t.contactForm.error);
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className={`rounded-2xl p-8 lg:p-10 border ${theme === "dark" ? "bg-dark-card border-dark-border" : "bg-cy-light border-cy-border"}`}>
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <CheckCircle className="w-12 h-12 text-cy-green" />
          <p className="text-lg font-medium text-cy-green-dark dark:text-cy-green text-center">
            {t.contactForm.success}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl p-8 lg:p-10 border ${theme === "dark" ? "bg-dark-card border-dark-border" : "bg-cy-light border-cy-border"}`}>
      <h2 className={`font-[family-name:var(--font-heading)] text-2xl font-bold mb-6 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
        {t.contactForm.send}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="contact-name"
              className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}
            >
              {t.contactForm.name}
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.contactForm.namePlaceholder}
              className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
            />
          </div>
          <div>
            <label
              htmlFor="contact-email"
              className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}
            >
              {t.contactForm.email}
            </label>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.contactForm.emailPlaceholder}
              className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="contact-subject"
            className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}
          >
            {t.contactForm.subject}
          </label>
          <input
            id="contact-subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={t.contactForm.subjectPlaceholder}
            className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
          />
        </div>
        <div>
          <label
            htmlFor="contact-message"
            className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}
          >
            {t.contactForm.message}
          </label>
          <textarea
            id="contact-message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.contactForm.messagePlaceholder}
            className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all resize-none ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
          />
        </div>
        {error && (
          <p className="text-sm text-cy-red">{error}</p>
        )}
        <div className={`rounded-xl p-4 border ${theme === "dark" ? "bg-dark-bg border-dark-border" : "bg-cy-green-50 border-cy-green/10"}`}>
          <p className={`text-sm flex items-center gap-2 ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
            <Send className="w-4 h-4 text-cy-green flex-shrink-0" />
            {t.contactForm.backendNotice}
          </p>
        </div>
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-cy-green text-white font-semibold rounded-xl hover:bg-cy-green-dark transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {t.contactForm.sending}
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              {t.contactForm.send}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
