"use client";

import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "@/components/ui/ContactForm";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { getTranslation } from "@/i18n";

export default function ContactPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = getTranslation(language);

  return (
    <>
      {/* Hero */}
      <section className={`${theme === "dark" ? "bg-dark-secondary" : "bg-cy-light"} pt-32 pb-16 lg:pt-40 lg:pb-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className={`font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
              {t.contact.title}
            </h1>
            <p className={`text-lg leading-relaxed ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
              {t.contact.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className={`py-20 lg:py-28 ${theme === "dark" ? "bg-dark-bg" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <div>
              <h2 className={`font-[family-name:var(--font-heading)] text-2xl font-bold mb-6 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                {t.contact.getInTouch}
              </h2>
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cy-green-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-cy-green" />
                  </div>
                  <div>
                    <h3 className={`font-semibold text-sm mb-1 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                      {t.contact.address}
                    </h3>
                    <p className={`text-sm ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
                      {t.contact.addressValue}
                    </p>
                    <p className={`text-xs mt-1 ${theme === "dark" ? "text-dark-muted/60" : "text-cy-gray/60"}`}>
                      {t.contact.addressNote}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cy-green-50 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-cy-green" />
                  </div>
                  <div>
                    <h3 className={`font-semibold text-sm mb-1 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                      {t.contact.email}
                    </h3>
                    <a
                      href="mailto:info@civicyouthbd.org"
                      className={`text-sm hover:text-cy-green transition-colors ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}
                    >
                      info@civicyouthbd.org
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cy-green-50 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-cy-green" />
                  </div>
                  <div>
                    <h3 className={`font-semibold text-sm mb-1 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                      {t.contact.phone}
                    </h3>
                    <a
                      href="tel:+8801XXXXXXXXX"
                      className={`text-sm hover:text-cy-green transition-colors ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}
                    >
                      +880 1XXXXXXXXX
                    </a>
                    <p className={`text-xs mt-1 ${theme === "dark" ? "text-dark-muted/60" : "text-cy-gray/60"}`}>
                      {t.contact.phoneNote}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`rounded-2xl p-6 border mb-6 ${theme === "dark" ? "bg-dark-card border-dark-border" : "bg-cy-light border-cy-border"}`}>
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4">
                  <Image
                    src="/images/office-image.jpg.png"
                    alt="Professional workspace representing Civic Youth Bangladesh operations"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  {/* Official CYB logo overlay */}
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg p-1.5 shadow-md">
                    <Image
                      src="/images/cyb-logo.png"
                      alt="Civic Youth Bangladesh Logo"
                      width={80}
                      height={50}
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                </div>
                <h3 className={`font-[family-name:var(--font-heading)] font-semibold mb-2 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                  {t.contact.mediaInquiries}
                </h3>
                <p className={`text-sm ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
                  {t.contact.mediaText}{" "}
                  <a
                    href="mailto:media@civicyouthbd.org"
                    className="text-cy-green hover:text-cy-green-dark font-medium"
                  >
                    media@civicyouthbd.org
                  </a>
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
