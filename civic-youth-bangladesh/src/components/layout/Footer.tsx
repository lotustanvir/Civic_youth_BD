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
  const isDark = theme === "dark";

  const quickLinks = [
    { label: t.nav.about, href: "/about" },
    { label: t.nav.themes, href: "/thematic-areas" },
    { label: t.nav.programs, href: "/programs" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.impact, href: "/impact" },
    { label: t.footer.contact, href: "/contact" },
  ];

  const legalLinks = [
    { label: t.footer.privacyPolicy, href: "/privacy" },
    { label: t.footer.termsOfUse, href: "/terms" },
    { label: t.footer.accessibility, href: "/accessibility" },
    { label: t.footer.sitemap, href: "/sitemap" },
  ];

  return (
    <footer className={isDark ? "bg-dark-bg text-dark-text" : "bg-gray-50 text-gray-700"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <p className={`font-[family-name:var(--font-heading)] text-lg font-bold mb-1 ${isDark ? "text-dark-text" : "text-gray-900"}`}>
              {language === "bn" ? "সিভিক ইয়ুথ বাংলাদেশ" : "Civic Youth Bangladesh"}
            </p>
            <p className={`text-xs mb-4 ${isDark ? "text-dark-muted" : "text-gray-500"}`}>
              {language === "bn" ? "আজই সম্পৃক্ত হোন, আগামীর নেতৃত্ব দিন।" : "Engage Today, Lead Tomorrow."}
            </p>
            <p className={`text-sm leading-relaxed mb-6 ${isDark ? "text-dark-muted" : "text-gray-600"}`}>
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
                      isDark
                        ? "bg-white/10 text-dark-muted hover:bg-dark-card hover:text-cy-green-light"
                        : "bg-gray-200 text-gray-500 hover:bg-cy-green hover:text-white"
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
            <h3 className={`font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-wider mb-4 ${isDark ? "text-dark-text" : "text-gray-900"}`}>
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${isDark ? "text-dark-muted hover:text-cy-green-light" : "text-gray-600 hover:text-cy-green"}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={`font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-wider mb-4 ${isDark ? "text-dark-text" : "text-gray-900"}`}>
              {t.footer.contact}
            </h3>
            <ul className="space-y-3">
              <li className={`flex items-start gap-3 text-sm ${isDark ? "text-dark-muted" : "text-gray-600"}`}>
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-cy-green" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className={`flex items-center gap-3 text-sm ${isDark ? "text-dark-muted" : "text-gray-600"}`}>
                <Mail className="w-4 h-4 flex-shrink-0 text-cy-green" />
                <a
                  href="mailto:info@civicyouthbd.org"
                  className="hover:text-cy-green transition-colors"
                >
                  info@civicyouthbd.org
                </a>
              </li>
              <li className={`flex items-center gap-3 text-sm ${isDark ? "text-dark-muted" : "text-gray-600"}`}>
                <Phone className="w-4 h-4 flex-shrink-0 text-cy-green" />
                <a
                  href="tel:+8801XXXXXXXXX"
                  className="hover:text-cy-green transition-colors"
                >
                  +880 1XXXXXXXXX
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t py-6 ${isDark ? "border-dark-border" : "border-gray-200"}`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className={`text-sm ${isDark ? "text-dark-muted" : "text-gray-500"}`}>
              {t.footer.copyright.replace("{year}", String(currentYear))}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-xs transition-colors ${isDark ? "text-dark-muted hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}
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
