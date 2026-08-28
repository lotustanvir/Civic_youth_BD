"use client";

import Link from "next/link";
import Image from "next/image";
import { programs } from "@/data/programs";
import { ArrowRight, Star } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { getTranslation } from "@/i18n";

export default function ProgramsPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = getTranslation(language);

  const isDark = theme === "dark";

  return (
    <>
      {/* Hero */}
      <section className={`pt-32 pb-16 lg:pt-40 lg:pb-20 ${isDark ? "bg-dark-secondary" : "bg-cy-light"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className={`font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? "text-dark-text" : "text-cy-dark"}`}>
              {t.programs.title}
            </h1>
            <p className={`text-lg leading-relaxed ${isDark ? "text-dark-muted" : "text-cy-gray"}`}>
              {t.programs.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Programs List */}
      <section className={`py-20 lg:py-28 ${isDark ? "bg-dark-bg" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {programs.map((program) => (
              <div
                key={program.id}
                id={program.id}
                className={`scroll-mt-24 rounded-2xl border p-8 lg:p-10 hover:shadow-lg transition-all duration-300 ${
                  program.featured
                    ? "bg-cy-dark border-cy-dark text-white"
                    : isDark
                      ? "bg-dark-card border-dark-border hover:border-cy-green/30"
                      : "bg-white border-cy-border hover:border-cy-green/30"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {program.image && (
                    <div className="relative w-full lg:w-48 h-48 flex-shrink-0 rounded-xl overflow-hidden">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 192px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {program.featured && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cy-green/20 text-cy-green-light text-xs font-bold uppercase tracking-wider rounded-full">
                          <Star className="w-3 h-3" />
                          {t.programs.featured}
                        </span>
                      )}
                    </div>
                    <h2
                      className={`font-[family-name:var(--font-heading)] text-xl sm:text-2xl font-bold mb-3 ${
                        program.featured ? "text-white" : isDark ? "text-dark-text" : "text-cy-dark"
                      }`}
                    >
                      {t.programsData[program.id as keyof typeof t.programsData]?.title || program.title}
                    </h2>
                    <p
                      className={`leading-relaxed ${
                        program.featured ? "text-gray-300" : isDark ? "text-dark-muted" : "text-cy-gray"
                      }`}
                    >
                      {t.programsData[program.id as keyof typeof t.programsData]?.shortDescription || program.shortDescription}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Link
                      href={`/get-involved${program.featured ? "#member" : ""}`}
                      className={`inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all group ${
                        program.featured
                          ? "bg-cy-green text-white hover:bg-cy-green-light"
                          : isDark
                            ? "bg-dark-secondary text-dark-text hover:bg-cy-green hover:text-white"
                            : "bg-cy-green-50 text-cy-green hover:bg-cy-green hover:text-white"
                      }`}
                    >
                      {t.programs.learnMore}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
