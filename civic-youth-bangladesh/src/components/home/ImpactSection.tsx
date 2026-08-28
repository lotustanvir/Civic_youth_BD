"use client";

import Image from "next/image";
import { impactMetrics } from "@/data/impact";
import { TrendingUp } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
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
  const t = getTranslation(language);

  return (
    <section className="py-20 lg:py-28 bg-dark-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
          <div className="text-center lg:text-left">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white dark:text-dark-text mb-4">
              {t.impact.title}
            </h2>
            <p className="text-white/85 dark:text-dark-text/85 font-medium text-lg max-w-2xl mx-auto lg:mx-0">
              {t.impact.subtitle}
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-white/20 dark:border-dark-border hidden lg:block">
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
              className="bg-white/10 dark:bg-dark-card backdrop-blur-sm rounded-2xl p-6 text-center border border-white/15 dark:border-dark-border hover:bg-white/15 dark:hover:bg-dark-card/80 transition-colors"
            >
              <div className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl lg:text-4xl font-bold text-white dark:text-dark-text mb-1">
                {metric.value}
                {metric.suffix || ""}
              </div>
              <div className="text-sm text-white/95 dark:text-dark-text/85 font-semibold">
                {t.metrics[metricKeyMap[metric.id] as keyof typeof t.metrics] || metric.label}
              </div>
              {metric.type === "coming-soon" && (
                <div className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-white bg-white/15 border border-white/20 px-2 py-0.5 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  {t.impact.comingSoon}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-white/70 dark:text-dark-text/60 italic">
            {t.impact.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
