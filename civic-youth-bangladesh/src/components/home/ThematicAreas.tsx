"use client";

import Link from "next/link";
import { thematicAreas } from "@/data/thematicAreas";
import {
  BookOpen,
  Users,
  HeartHandshake,
  Scale,
  Newspaper,
  BriefcaseBusiness,
  Globe,
  FileText,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { getTranslation } from "@/i18n";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Users,
  HeartHandshake,
  Scale,
  Newspaper,
  BriefcaseBusiness,
  Globe,
  FileText,
  Lightbulb,
};

export function ThematicAreas() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = getTranslation(language);

  const isDark = theme === "dark";

  return (
    <section className={`py-20 lg:py-28 ${isDark ? "bg-dark-secondary" : "bg-cy-light"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${isDark ? "text-dark-text" : "text-cy-dark"}`}>
            {t.thematicAreas.sectionTitle}
          </h2>
          <p className={`text-lg leading-relaxed ${isDark ? "text-dark-muted" : "text-cy-gray"}`}>
            {t.thematicAreas.sectionSubtitle}
          </p>
        </div>

        {/* Cards grid — 3 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {thematicAreas.map((area) => {
            const Icon = iconMap[area.icon];
            const isGreen = area.accentColor === "green";
            const areaTranslation = t.thematicAreas.areas[area.id as keyof typeof t.thematicAreas.areas];

            return (
              <div
                key={area.id}
                className={`group rounded-2xl p-8 border shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-cy-green/30 transition-all duration-300 flex flex-col ${isDark ? "bg-dark-card border-dark-border" : "bg-white border-cy-border"}`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors ${
                    isGreen
                      ? "bg-cy-green-50 group-hover:bg-cy-green/10"
                      : "bg-cy-red-50 group-hover:bg-cy-red/10"
                  }`}
                >
                  {Icon && (
                    <Icon
                      className={`w-7 h-7 ${
                        isGreen ? "text-cy-green" : "text-cy-red"
                      }`}
                    />
                  )}
                </div>
                <h3 className={`font-[family-name:var(--font-heading)] text-xl font-semibold mb-3 ${isDark ? "text-dark-text" : "text-cy-dark"}`}>
                  {areaTranslation?.title ?? area.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-5 flex-1 ${isDark ? "text-dark-muted" : "text-cy-gray"}`}>
                  {areaTranslation?.description ?? area.description}
                </p>
                <Link
                  href={area.href}
                  className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
                    isGreen
                      ? "text-cy-green hover:text-cy-green-dark"
                      : "text-cy-red hover:text-cy-red-dark"
                  }`}
                >
                  {t.thematicAreas.learnMore}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
