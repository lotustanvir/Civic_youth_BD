"use client";

import Image from "next/image";
import { featuredProgram } from "@/data/programs";
import { Star } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { getTranslation } from "@/i18n";

export function FeaturedProgram() {
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
            : "bg-gradient-to-br from-gray-50 to-white border border-cy-border"
        }`}>
          {!isDark && (
            <div className="absolute inset-0 opacity-[0.03]">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-cy-green blur-3xl" />
              <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-cy-red blur-3xl" />
            </div>
          )}
          {isDark && (
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-cy-green blur-3xl" />
              <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-cy-red blur-3xl" />
            </div>
          )}

          <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center p-8 sm:p-12 lg:p-16">
            {/* Content */}
            <div>
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full mb-6 ${
                isDark
                  ? "bg-cy-green/20 text-cy-green-light"
                  : "bg-cy-green-50 text-cy-green"
              }`}>
                <Star className="w-3.5 h-3.5" />
                {t.featuredProgram.badge}
              </div>
              <h2 className={`font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight ${
                isDark ? "text-white" : "text-cy-dark"
              }`}>
                {t.programsData[featuredProgram.id as keyof typeof t.programsData]?.title || featuredProgram.title}
              </h2>
              <p className={`text-lg leading-relaxed ${
                isDark ? "text-gray-300" : "text-cy-gray"
              }`}>
                {t.programsData[featuredProgram.id as keyof typeof t.programsData]?.shortDescription || featuredProgram.shortDescription}
              </p>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                <Image
                  src={featuredProgram.image || "/images/featured-program-group.jpg.png"}
                  alt="Young participants collaborating in a civic leadership program"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
