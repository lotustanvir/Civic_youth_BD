"use client";

import Image from "next/image";
import { opportunities } from "@/data/programs";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { getTranslation } from "@/i18n";

const typeColors: Record<string, string> = {
  Fellowship: "bg-cy-green-50 text-cy-green",
  Volunteer: "bg-blue-50 text-blue-700",
  Grant: "bg-purple-50 text-purple-700",
  Leadership: "bg-amber-50 text-amber-700",
  Event: "bg-cy-red-50 text-cy-red",
};

export default function OpportunitiesPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = getTranslation(language);

  return (
    <>
      {/* Hero */}
      <section
        className={`pt-32 pb-16 lg:pt-40 lg:pb-20 ${
          theme === "dark" ? "bg-dark-bg" : "bg-cy-light"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1
              className={`font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${
                theme === "dark" ? "text-dark-text" : "text-cy-dark"
              }`}
            >
              {t.opportunities.title}
            </h1>
            <p
              className={`text-lg leading-relaxed ${
                theme === "dark" ? "text-dark-muted" : "text-cy-gray"
              }`}
            >
              {t.opportunities.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Opportunities List */}
      <section
        className={`py-20 lg:py-28 ${
          theme === "dark" ? "bg-dark-secondary" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`relative rounded-2xl overflow-hidden mb-12 ${
              theme === "dark"
                ? "border border-dark-border"
                : "border border-cy-border"
            }`}
          >
            <div className="relative aspect-[21/9]">
              <Image
                src="/images/youth-fellowship-group.png.png"
                alt="Youth fellowship group participating in civic leadership programs"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cy-dark/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold text-white mb-2">
                  {t.opportunities.pathways}
                </h2>
                <p className="text-white/80 text-sm max-w-xl">
                  {t.opportunities.pathwaysText}
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className={`rounded-2xl p-6 hover:shadow-lg transition-all duration-300 flex flex-col ${
                  theme === "dark"
                    ? "bg-dark-card border border-dark-border"
                    : "bg-cy-light border border-cy-border"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      typeColors[opp.type] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Tag className="w-3 h-3" />
                    {t.opportunitiesData[opp.id as keyof typeof t.opportunitiesData]?.type || opp.type}
                  </span>
                </div>
                <h3
                  className={`font-[family-name:var(--font-heading)] text-lg font-semibold mb-3 ${
                    theme === "dark" ? "text-dark-text" : "text-cy-dark"
                  }`}
                >
                  {t.opportunitiesData[opp.id as keyof typeof t.opportunitiesData]?.title || opp.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-4 flex-1 ${
                    theme === "dark" ? "text-dark-muted" : "text-cy-gray"
                  }`}
                >
                  {t.opportunitiesData[opp.id as keyof typeof t.opportunitiesData]?.description || opp.description}
                </p>
                <div
                  className={`flex items-center justify-between pt-4 border-t ${
                    theme === "dark" ? "border-dark-border" : "border-cy-border"
                  }`}
                >
                  <span
                    className={`flex items-center gap-1.5 text-xs ${
                      theme === "dark" ? "text-dark-muted" : "text-cy-gray"
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    {t.opportunitiesData[opp.id as keyof typeof t.opportunitiesData]?.deadline || opp.deadline}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-cy-green group cursor-pointer">
                    {t.opportunities.details}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`mt-16 text-center rounded-2xl p-10 ${
              theme === "dark"
                ? "bg-dark-card border border-dark-border"
                : "bg-cy-green-50 border border-cy-green/10"
            }`}
          >
            <h3
              className={`font-[family-name:var(--font-heading)] text-xl font-semibold mb-3 ${
                theme === "dark" ? "text-dark-text" : "text-cy-dark"
              }`}
            >
              {t.opportunities.notFound}
            </h3>
            <p
              className={`mb-6 ${
                theme === "dark" ? "text-dark-muted" : "text-cy-gray"
              }`}
            >
              {t.opportunities.notFoundText}
            </p>
            <a
              href="/get-involved"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cy-green text-white font-semibold rounded-lg hover:bg-cy-green-dark transition-all group"
            >
              {t.opportunities.stayUpdated}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
