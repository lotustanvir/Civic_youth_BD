import Link from "next/link";
import Image from "next/image";
import { socialLinks } from "@/data/socialLinks";
import { socialIconMap } from "@/components/ui/SocialIcons";
import { Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Thematic Areas", href: "/thematic-areas" },
  { label: "Programs", href: "/programs" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Blog", href: "/blog" },
  { label: "Impact", href: "/impact" },
];

const getInvolvedLinks = [
  { label: "Become a Member", href: "/get-involved#member" },
  { label: "Volunteer", href: "/get-involved#volunteer" },
  { label: "Partner With Us", href: "/get-involved#partner" },
  { label: "Donate", href: "/get-involved#donate" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Sitemap", href: "/sitemap" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cy-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/lgo.jpeg"
                alt="Civic Youth Bangladesh Logo"
                width={160}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              A national, non-partisan, youth-led civic leadership organization
              developing active citizenship, ethical leadership and community
              engagement across Bangladesh.
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
                    className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:bg-cy-green hover:text-white transition-all duration-200"
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
            <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-cy-green-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Get Involved
            </h3>
            <ul className="space-y-2.5">
              {getInvolvedLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-cy-green-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-cy-green-light" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 flex-shrink-0 text-cy-green-light" />
                <a
                  href="mailto:info@civicyouthbd.org"
                  className="hover:text-cy-green-light transition-colors"
                >
                  info@civicyouthbd.org
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
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
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} Civic Youth Bangladesh (CYB). All rights
              reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
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