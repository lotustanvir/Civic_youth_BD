"use client";

import Image from "next/image";
import { impactMetrics } from "@/data/impact";
import { TrendingUp } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { getTranslation } from "@/i18n";

const metricKeyMap: Record<string, string> = {
  "youth-reached": "youthReached",
  "active-volunteers": "activeVolunteers",
  "district-presence": "districtPresence",
  "community-projects": "communityProjects",
  "policy-dialogues": "policyDialogues",
  "leadership-programs": "leadershipPrograms",
};

export function ImpactSection() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = getTranslation(language);
  const isDark = theme === "dark";

  return (
    <section className={`py-20 lg:py-28 ${isDark ? "bg-dark-secondary" : "bg-cy-light"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
          <div className="text-center lg:text-left">
            <h2 className={`font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${isDark ? "text-dark-text" : "text-cy-dark"}`}>
              {t.impact.title}
            </h2>
            <p className={`font-medium text-lg max-w-2xl mx-auto lg:mx-0 ${isDark ? "text-dark-text/85" : "text-cy-gray"}`}>
              {t.impact.subtitle}
            </p>
          </div>
          <div className={`relative rounded-2xl overflow-hidden hidden lg:block ${isDark ? "border border-dark-border" : "border border-cy-border"}`}>
            <div className="relative aspect-[16/9]">
              <Image
                src="/images/leadership-circle.png.png"
                alt="Youth leaders in a mentorship circle discussion"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-10">
          {impactMetrics.map((metric) => (
            <div
              key={metric.id}
              className={`backdrop-blur-sm rounded-2xl p-6 text-center transition-colors ${
                isDark
                  ? "bg-dark-card border border-dark-border hover:bg-dark-card/80"
                  : "bg-white border border-cy-border shadow-sm hover:shadow-md"
              }`}
            >
              <div className={`font-[family-name:var(--font-heading)] text-3xl md:text-4xl lg:text-4xl font-bold mb-1 ${isDark ? "text-dark-text" : "text-cy-dark"}`}>
                {metric.value}
                {metric.suffix || ""}
              </div>
              <div className={`text-sm font-semibold ${isDark ? "text-dark-text/85" : "text-cy-gray"}`}>
                {t.metrics[metricKeyMap[metric.id] as keyof typeof t.metrics] || metric.label}
              </div>
              {metric.type === "coming-soon" && (
                <div className={`mt-2 inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                  isDark
                    ? "text-dark-text bg-white/15 border border-white/20"
                    : "text-cy-dark bg-cy-light border border-cy-border"
                }`}>
                  <TrendingUp className="w-3 h-3" />
                  {t.impact.comingSoon}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className={`text-sm italic ${isDark ? "text-dark-text/60" : "text-cy-gray"}`}>
            {t.impact.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
