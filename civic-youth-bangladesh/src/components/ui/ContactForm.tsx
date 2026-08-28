"use client";

import { Send } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { getTranslation } from "@/i18n";

export function ContactForm() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = getTranslation(language);

  return (
    <div className={`rounded-2xl p-8 lg:p-10 border ${theme === "dark" ? "bg-dark-card border-dark-border" : "bg-cy-light border-cy-border"}`}>
      <h2 className={`font-[family-name:var(--font-heading)] text-2xl font-bold mb-6 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
        {t.contactForm.send}
      </h2>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
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
            placeholder={t.contactForm.messagePlaceholder}
            className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all resize-none ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
          />
        </div>
        <div className={`rounded-xl p-4 border ${theme === "dark" ? "bg-dark-bg border-dark-border" : "bg-cy-green-50 border-cy-green/10"}`}>
          <p className={`text-sm flex items-center gap-2 ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
            <Send className="w-4 h-4 text-cy-green flex-shrink-0" />
            {t.contactForm.backendNotice}
          </p>
        </div>
      </form>
    </div>
  );
}
