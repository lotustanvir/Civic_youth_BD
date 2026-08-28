"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { navigation, ctaButton } from "@/data/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Search,
} from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const headerRef = useRef<HTMLElement>(null);

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

  const handleDropdownEnter = (label: string) => {
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileExpanded = (label: string) => {
    setMobileExpanded(mobileExpanded === label ? null : label);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-cy-border py-2"
          : "bg-white py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <Image
              src="/images/lgo.jpeg"
              alt="Civic Youth Bangladesh Logo"
              width={200}
              height={64}
              className="h-12 w-auto md:h-14 lg:h-16 object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navigation.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.children && handleDropdownEnter(item.label)
                }
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-cy-dark hover:text-cy-green transition-colors rounded-lg hover:bg-cy-green-50"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        activeDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-1 z-50">
                    <div className="bg-white rounded-xl shadow-lg border border-cy-border py-2 min-w-[220px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-cy-dark hover:text-cy-green hover:bg-cy-green-50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-cy-dark hover:text-cy-green transition-colors rounded-lg hover:bg-cy-green-50"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* CTA Button - Desktop */}
            <Link
              href={ctaButton.href}
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-cy-green text-white text-sm font-semibold rounded-lg hover:bg-cy-green-dark transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {ctaButton.label}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-cy-dark hover:text-cy-green transition-colors rounded-lg"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="mt-3 pb-2 border-t border-cy-border pt-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cy-gray" />
              <input
                type="search"
                placeholder="Search CYB..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-cy-light border border-cy-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-0 bg-white z-50 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" onClick={() => setMobileOpen(false)}>
                <Image
                  src="/images/lgo.jpeg"
                  alt="Civic Youth Bangladesh Logo"
                  width={200}
                  height={48}
                  className="h-12 w-auto object-contain"
                  priority
                />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-cy-dark hover:text-cy-red transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="space-y-1" aria-label="Mobile navigation">
              {navigation.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleMobileExpanded(item.label)}
                        className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-cy-dark hover:bg-cy-green-50 rounded-lg transition-colors"
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            mobileExpanded === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {mobileExpanded === item.label && (
                        <div className="pl-4 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block px-4 py-2.5 text-sm text-cy-gray hover:text-cy-green hover:bg-cy-green-50 rounded-lg transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 text-base font-medium text-cy-dark hover:bg-cy-green-50 rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="mt-6 space-y-3">
              <Link
                href={ctaButton.href}
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-5 py-3 bg-cy-green text-white font-semibold rounded-lg hover:bg-cy-green-dark transition-all"
              >
                {ctaButton.label}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}