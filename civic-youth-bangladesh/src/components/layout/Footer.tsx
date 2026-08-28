"use client";

import Link from "next/link";
import { socialLinks } from "@/data/socialLinks";
import { socialIconMap } from "@/components/ui/SocialIcons";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { getTranslation } from "@/i18n";

export function Footer() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = getTranslation(language);
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: t.nav.about, href: "/about" },
    { label: t.nav.thematicAreas, href: "/thematic-areas" },
    { label: t.nav.programs, href: "/programs" },
    { label: t.nav.opportunities, href: "/opportunities" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.impact, href: "/impact" },
  ];

  const getInvolvedLinks = [
    { label: t.footer.becomeMember, href: "/get-involved#member" },
    { label: t.footer.volunteer, href: "/get-involved#volunteer" },
    { label: t.footer.partnerWithUs, href: "/get-involved#partner" },
    { label: t.footer.donate, href: "/get-involved#donate" },
  ];

  const legalLinks = [
    { label: t.footer.privacyPolicy, href: "/privacy" },
    { label: t.footer.termsOfUse, href: "/terms" },
    { label: t.footer.accessibility, href: "/accessibility" },
    { label: t.footer.sitemap, href: "/sitemap" },
  ];

  return (
    <footer className={theme === "dark" ? "bg-dark-bg text-dark-text" : "bg-cy-dark text-white"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <p className={`font-[family-name:var(--font-heading)] text-lg font-bold mb-1 ${theme === "dark" ? "text-dark-text" : "text-white"}`}>
              {language === "bn" ? "সিভিক ইয়ুথ বাংলাদেশ" : "Civic Youth Bangladesh"}
            </p>
            <p className={`text-xs mb-4 ${theme === "dark" ? "text-dark-muted" : "text-gray-500"}`}>
              {language === "bn" ? "আজই সম্পৃক্ত হোন, আগামীর নেতৃত্ব দিন।" : "Engage Today, Lead Tomorrow."}
            </p>
            <p className={`${theme === "dark" ? "text-dark-muted" : "text-gray-400"} text-sm leading-relaxed mb-6`}>
              {t.footer.description}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = socialIconMap[link.icon];
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      theme === "dark"
                        ? "bg-white/10 text-dark-muted hover:bg-dark-card hover:text-cy-green-light"
                        : "bg-white/10 text-gray-400 hover:bg-cy-green hover:text-white"
                    }`}
                    aria-label={link.name}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-wider mb-4 ${theme === "dark" ? "text-dark-text" : "text-white"}`}>
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${theme === "dark" ? "text-dark-muted hover:text-cy-green-light" : "text-gray-400 hover:text-cy-green-light"}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className={`font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-wider mb-4 ${theme === "dark" ? "text-dark-text" : "text-white"}`}>
              {t.footer.getInvolved}
            </h3>
            <ul className="space-y-2.5">
              {getInvolvedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${theme === "dark" ? "text-dark-muted hover:text-cy-green-light" : "text-gray-400 hover:text-cy-green-light"}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={`font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-wider mb-4 ${theme === "dark" ? "text-dark-text" : "text-white"}`}>
              {t.footer.contact}
            </h3>
            <ul className="space-y-3">
              <li className={`flex items-start gap-3 text-sm ${theme === "dark" ? "text-dark-muted" : "text-gray-400"}`}>
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-cy-green-light" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className={`flex items-center gap-3 text-sm ${theme === "dark" ? "text-dark-muted" : "text-gray-400"}`}>
                <Mail className="w-4 h-4 flex-shrink-0 text-cy-green-light" />
                <a
                  href="mailto:info@civicyouthbd.org"
                  className="hover:text-cy-green-light transition-colors"
                >
                  info@civicyouthbd.org
                </a>
              </li>
              <li className={`flex items-center gap-3 text-sm ${theme === "dark" ? "text-dark-muted" : "text-gray-400"}`}>
                <Phone className="w-4 h-4 flex-shrink-0 text-cy-green-light" />
                <a
                  href="tel:+8801XXXXXXXXX"
                  className="hover:text-cy-green-light transition-colors"
                >
                  +880 1XXXXXXXXX
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t py-6 ${theme === "dark" ? "border-dark-border" : "border-white/10"}`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className={`text-sm ${theme === "dark" ? "text-dark-muted" : "text-gray-500"}`}>
              {t.footer.copyright.replace("{year}", String(currentYear))}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-xs transition-colors ${theme === "dark" ? "text-dark-muted hover:text-gray-300" : "text-gray-500 hover:text-gray-300"}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
