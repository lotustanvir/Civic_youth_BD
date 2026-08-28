"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Sun, Moon } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { getTranslation } from "@/i18n";

export function Hero() {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const t = getTranslation(language);

  return (
    <section
      className={`relative overflow-hidden pt-24 pb-16 lg:pt-28 lg:pb-20 ${
        theme === "dark" ? "bg-dark-bg" : "bg-white"
      }`}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-cy-green blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-cy-red blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Language & Theme toggles */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-10 flex items-center gap-2">
          {/* Language toggle */}
          <div className="flex items-center rounded-full border border-gray-300 dark:border-gray-600 overflow-hidden text-sm font-medium">
            <button
              onClick={() => setLanguage("en")}
              aria-label="Switch language to English"
              aria-pressed={language === "en"}
              className={`px-3 py-1.5 transition-colors ${
                language === "en"
                  ? "bg-cy-green text-white"
                  : theme === "dark"
                    ? "bg-dark-card text-dark-text"
                    : "bg-white text-cy-dark"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("bn")}
              aria-label="Switch language to Bangla"
              aria-pressed={language === "bn"}
              className={`px-3 py-1.5 transition-colors ${
                language === "bn"
                  ? "bg-cy-green text-white"
                  : theme === "dark"
                    ? "bg-dark-card text-dark-text"
                    : "bg-white text-cy-dark"
              }`}
            >
              বাংলা
            </button>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`p-2 rounded-full border transition-colors ${
              theme === "dark"
                ? "border-gray-600 bg-dark-card text-dark-text hover:bg-gray-700"
                : "border-gray-300 bg-white text-cy-dark hover:bg-gray-100"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Large horizontal hero image */}
        <div className="relative w-full h-[300px] md:h-[380px] lg:h-[460px] xl:h-[500px] overflow-hidden rounded-2xl shadow-xl mb-10 md:mb-14">
          <Image
            src="/images/hero-youth-group-jpg.png"
            alt="Young people representing civic leadership and youth engagement in Bangladesh"
            fill
            sizes="100vw"
            className="object-cover object-[center_25%]"
            priority
          />
        </div>

        {/* Approved description */}
        <div className="max-w-5xl mx-auto text-left">
          <p
            className={`text-base md:text-lg leading-7 md:leading-8 ${
              theme === "dark" ? "text-dark-text" : "text-cy-gray"
            }`}
          >
            {t.hero.description}
          </p>

          {/* Our Programmes button */}
          <div className="mt-8">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-cy-green text-white font-semibold rounded-lg hover:bg-cy-green-dark transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              {t.hero.cta}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
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
            fill={theme === "dark" ? "#16211D" : "#F5F7F6"}
          />
        </svg>
      </div>
    </section>
  );
}
