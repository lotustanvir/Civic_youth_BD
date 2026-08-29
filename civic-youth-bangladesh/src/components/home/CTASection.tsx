"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { getTranslation } from "@/i18n";

export function CTASection() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = getTranslation(language);
  const isDark = theme === "dark";

  return (
    <section className={`py-20 lg:py-28 ${isDark ? "bg-dark-bg" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative rounded-3xl overflow-hidden ${
          isDark
            ? "bg-gradient-to-br from-cy-dark to-cy-dark/95"
            : "bg-gradient-to-br from-cy-green to-cy-green-dark"
        }`}>
          <div className="absolute inset-0">
            <Image
              src="/images/cta-background-jpg.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-[center_55%]"
            />
            <div className={`absolute inset-0 ${
              isDark
                ? "bg-gradient-to-r from-black/55 via-black/35 to-black/20"
                : "bg-gradient-to-r from-black/45 via-black/25 to-black/15"
            }`} />
          </div>
          <div className="relative text-center py-16 px-8 sm:px-16">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 drop-shadow-md">
              {t.cta.title}
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-sm">
              {t.cta.subtitle}
            </p>
            <div>
              <Link
                href="/get-involved"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-cy-green text-white font-semibold rounded-lg hover:bg-cy-green-light transition-all duration-200 shadow-sm hover:shadow-md group"
              >
                {t.cta.becomeMember}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
