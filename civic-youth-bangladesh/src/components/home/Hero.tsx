"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { getTranslation } from "@/i18n";

export function Hero() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = getTranslation(language);
  const isDark = theme === "dark";

  return (
    <section
      className={`relative overflow-hidden pt-36 pb-16 md:pt-40 lg:pt-44 lg:pb-24 ${
        isDark ? "bg-dark-bg" : "bg-white"
      }`}
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-cy-green blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-cy-red blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT — Text Content */}
          <div className="order-1">
            {/* Main Heading */}
            <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-extrabold leading-[1.1] tracking-tight mb-4">
              <span className={isDark ? "text-white" : "text-slate-950"}>
                Civic Youth
              </span>
              <br />
              <span className={isDark ? "text-green-400" : "text-green-700"}>
                Bangladesh
              </span>
            </h1>

            {/* Sub-heading */}
            <p
              className={`font-[family-name:var(--font-heading)] text-lg sm:text-xl lg:text-2xl font-bold mb-6 ${
                isDark ? "text-cy-green-light" : "text-cy-green"
              }`}
            >
              {language === "bn"
                ? "আজই সম্পৃক্ত হোন, আগামীর নেতৃত্ব দিন।"
                : "Engage Today, Lead Tomorrow."}
            </p>

            {/* Description */}
            <p
              className={`text-base sm:text-lg leading-relaxed mb-8 ${
                isDark ? "text-dark-muted" : "text-cy-gray"
              }`}
            >
              {t.hero.description}
            </p>

            {/* CTA Button */}
            <Link
              href="/programs"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cy-green text-white font-semibold rounded-lg hover:bg-cy-green-dark transition-all duration-200 shadow-sm hover:shadow-md group text-sm sm:text-base"
            >
              {language === "bn" ? "আমাদের কার্যক্রম" : "OUR PROGRAMS"}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* RIGHT — Hero Image */}
          <div className="order-2">
            <div className="relative w-full aspect-[4/3] lg:aspect-[5/4] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero-youth-group-jpg.png"
                alt="Young people representing civic leadership and youth engagement in Bangladesh"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
            fill={isDark ? "#16211D" : "#F5F7F6"}
          />
        </svg>
      </div>
    </section>
  );
}
