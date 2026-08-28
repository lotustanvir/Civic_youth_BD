"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ctaButton } from "@/data/navigation";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { getTranslation } from "@/i18n";
import {
  Menu,
  X,
  Search,
  Sun,
  Moon,
} from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const t = getTranslation(language);

  const navItems = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.thematicAreas, href: "/thematic-areas" },
    { label: t.nav.programs, href: "/programs" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.impact, href: "/impact" },
    { label: t.nav.getInvolved, href: "/get-involved" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const headerBg = theme === "dark"
    ? isScrolled
      ? "bg-dark-bg/95 backdrop-blur-md shadow-sm border-b border-dark-border py-2"
      : "bg-dark-bg py-4"
    : isScrolled
      ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-cy-border py-2"
      : "bg-white py-4";

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo + Branding */}
          <Link href="/" className="flex-shrink-0 group flex items-center gap-3">
            <Image
              src="/images/lgo.jpeg"
              alt="Civic Youth Bangladesh Logo"
              width={200}
              height={64}
              className="h-14 w-auto sm:h-16 md:h-16 lg:h-20 object-contain"
              priority
            />
            <div className="hidden sm:flex flex-col">
              <span className={`font-[family-name:var(--font-heading)] text-base lg:text-lg font-bold leading-tight ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                {language === "bn" ? "সিভিক ইয়ুথ বাংলাদেশ" : "Civic Youth Bangladesh"}
              </span>
              <span className={`text-[11px] lg:text-xs leading-tight ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
                {language === "bn" ? "আজই সম্পৃক্ত হোন, আগামীর নেতৃত্ব দিন।" : "Engage Today, Lead Tomorrow."}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                  theme === "dark"
                    ? "text-dark-text hover:text-cy-green hover:bg-dark-card"
                    : "text-cy-dark hover:text-cy-green hover:bg-cy-green-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 transition-colors rounded-lg ${
                theme === "dark"
                  ? "text-dark-text hover:text-cy-green hover:bg-dark-card"
                  : "text-cy-dark hover:text-cy-green hover:bg-cy-green-50"
              }`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === "en" ? "bn" : "en")}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                theme === "dark"
                  ? "text-dark-text hover:bg-dark-card border border-dark-border"
                  : "text-cy-dark hover:bg-cy-green-50 border border-cy-border"
              }`}
              aria-label={`Switch to ${language === "en" ? "Bangla" : "English"}`}
            >
              {language === "en" ? "বাংলা" : "EN"}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`p-2 transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cy-green focus-visible:ring-offset-2 ${
                theme === "dark"
                  ? "text-dark-text hover:bg-dark-card focus-visible:ring-offset-dark-bg"
                  : "text-cy-dark hover:text-cy-green hover:bg-cy-green-50"
              }`}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* CTA Button - Desktop */}
            <Link
              href={ctaButton.href}
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-cy-green text-white text-sm font-semibold rounded-lg hover:bg-cy-green-dark transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {t.nav.joinCta}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 transition-colors rounded-lg ${
                theme === "dark" ? "text-dark-text" : "text-cy-dark"
              }`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className={`mt-3 pb-2 border-t pt-3 ${theme === "dark" ? "border-dark-border" : "border-cy-border"}`}>
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`} />
              <input
                type="search"
                placeholder="Search CYB..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${
                  theme === "dark"
                    ? "bg-dark-card border-dark-border text-dark-text placeholder:text-dark-muted"
                    : "bg-cy-light border-cy-border"
                }`}
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className={`lg:hidden fixed inset-0 top-0 z-50 overflow-y-auto ${theme === "dark" ? "bg-dark-bg" : "bg-white"}`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                <Image
                  src="/images/lgo.jpeg"
                  alt="Civic Youth Bangladesh Logo"
                  width={200}
                  height={48}
                  className="h-12 w-auto object-contain"
                  priority
                />
                <div className="flex flex-col">
                  <span className={`font-[family-name:var(--font-heading)] text-sm font-bold leading-tight ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                    {language === "bn" ? "সিভিক ইয়ুথ বাংলাদেশ" : "Civic Youth Bangladesh"}
                  </span>
                  <span className={`text-[10px] leading-tight ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
                    {language === "bn" ? "আজই সম্পৃক্ত হোন, আগামীর নেতৃত্ব দিন।" : "Engage Today, Lead Tomorrow."}
                  </span>
                </div>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className={`p-2 transition-colors ${theme === "dark" ? "text-dark-text hover:text-cy-red" : "text-cy-dark hover:text-cy-red"}`}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="space-y-1" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                      theme === "dark"
                        ? "text-dark-text hover:bg-dark-card"
                        : "text-cy-dark hover:bg-cy-green-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>

            <div className="mt-6 space-y-3">
              <Link
                href={ctaButton.href}
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-5 py-3 bg-cy-green text-white font-semibold rounded-lg hover:bg-cy-green-dark transition-all"
              >
                {t.nav.joinCta}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
