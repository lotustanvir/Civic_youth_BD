"use client";

import Image from "next/image";
import { impactMetrics, impactTargetMetrics } from "@/data/impact";
import { TrendingUp, Target } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { getTranslation } from "@/i18n";

export default function ImpactPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = getTranslation(language);

  const metricKeyMap: Record<string, string> = {
    "youth-reached": "youthReached",
    "active-volunteers": "activeVolunteers",
    "district-presence": "districtPresence",
    "community-projects": "communityProjects",
    "policy-dialogues": "policyDialogues",
    "leadership-programs": "leadershipPrograms",
    "target-youth": "youthReached",
    "target-volunteers": "activeVolunteers",
    "target-districts": "districtPresence",
    "target-projects": "communityProjects",
    "target-dialogues": "policyDialogues",
    "target-programs": "leadershipPrograms",
  };

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
              {t.impactPage.title}
            </h1>
            <p
              className={`text-lg leading-relaxed ${
                theme === "dark" ? "text-dark-muted" : "text-cy-gray"
              }`}
            >
              {t.impactPage.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Current Status */}
      <section
        className={`py-20 lg:py-28 ${
          theme === "dark" ? "bg-dark-secondary" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
            <div className="text-center lg:text-left">
              <h2
                className={`font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold mb-4 ${
                  theme === "dark" ? "text-dark-text" : "text-cy-dark"
                }`}
              >
                {t.impactPage.currentStatus}
              </h2>
              <p
                className={`text-lg max-w-2xl mx-auto lg:mx-0 ${
                  theme === "dark" ? "text-dark-muted" : "text-cy-gray"
                }`}
              >
                {t.impactPage.currentStatusText}
              </p>
            </div>
            <div
              className={`relative rounded-2xl overflow-hidden ${
                theme === "dark"
                  ? "border border-dark-border"
                  : "border border-cy-border"
              }`}
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src="/images/public-speaking-seminar.png.png"
                  alt="Young people participating in a civic leadership seminar"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {impactMetrics.map((metric) => (
              <div
                key={metric.id}
                className={`rounded-2xl p-6 text-center ${
                  theme === "dark"
                    ? "bg-dark-card border border-dark-border"
                    : "bg-cy-light border border-cy-border"
                }`}
              >
                <div
                  className={`font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold mb-1 ${
                    theme === "dark" ? "text-dark-text" : "text-cy-dark"
                  }`}
                >
                  {metric.value}
                </div>
                <div
                  className={`text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-dark-muted" : "text-cy-gray"
                  }`}
                >
                  {t.metrics[metricKeyMap[metric.id] as keyof typeof t.metrics] || metric.label}
                </div>
                <span
                  className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                    theme === "dark"
                      ? "text-dark-muted bg-dark-border/50"
                      : "text-cy-gray bg-cy-border/50"
                  }`}
                >
                  <TrendingUp className="w-3 h-3" />
                  {t.impact.comingSoon}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proposed Targets */}
      <section className="py-20 lg:py-28 bg-cy-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-white mb-4">
              {t.impactPage.proposedTargets}
            </h2>
            <p className="text-lg text-cy-green-light max-w-2xl mx-auto">
              {t.impactPage.proposedTargetsText}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {impactTargetMetrics.map((metric) => (
              <div
                key={metric.id}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10"
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Target className="w-4 h-4 text-cy-green-light" />
                </div>
                <div className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-white mb-1">
                  {typeof metric.value === "number"
                    ? metric.value.toLocaleString()
                    : metric.value}
                  {metric.suffix || ""}
                </div>
                <div className="text-sm text-cy-green-light font-medium">
                  {t.metrics[metricKeyMap[metric.id] as keyof typeof t.metrics] || metric.label}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-sm text-white/70 italic">
              {t.impactPage.disclaimer}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
