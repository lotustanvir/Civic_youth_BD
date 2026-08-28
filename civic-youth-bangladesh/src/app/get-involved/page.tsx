"use client";

import Image from "next/image";
import {
  Users,
  Heart,
  Handshake,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { getTranslation } from "@/i18n";

const involvementKeys = ["becomeMember", "volunteer", "partner", "donate"] as const;
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  becomeMember: Users,
  volunteer: Heart,
  partner: Handshake,
  donate: DollarSign,
};
const colorMap: Record<string, string> = {
  becomeMember: "green",
  volunteer: "red",
  partner: "green",
  donate: "red",
};

export default function GetInvolvedPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = getTranslation(language);

  return (
    <>
      {/* Hero */}
      <section className={`${theme === "dark" ? "bg-dark-secondary" : "bg-cy-light"} pt-32 pb-16 lg:pt-40 lg:pb-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className={`font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
              {t.getInvolved.title}
            </h1>
            <p className={`text-lg leading-relaxed ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
              {t.getInvolved.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Options */}
      <section className={`py-20 lg:py-28 ${theme === "dark" ? "bg-dark-bg" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`relative rounded-2xl overflow-hidden mb-12 border ${theme === "dark" ? "border-dark-border" : "border-cy-border"}`}>
            <div className="relative aspect-[21/9]">
              <Image
                src="/images/community-outreach.png.png"
                alt="Young volunteers participating in community outreach"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cy-dark/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold text-white mb-2">
                  {t.getInvolved.makeDifference}
                </h2>
                <p className="text-white/80 text-sm max-w-xl">
                  {t.getInvolved.makeDifferenceText}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {involvementKeys.map((key) => {
              const isGreen = colorMap[key] === "green";
              const Icon = iconMap[key];
              const option = t.getInvolved[key];
              return (
                <div
                  key={key}
                  id={key}
                  className={`scroll-mt-24 rounded-2xl border p-8 lg:p-10 hover:shadow-lg transition-all duration-300 ${theme === "dark" ? "border-dark-border" : "border-cy-border"}`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                    <div
                      className={`w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center ${
                        isGreen ? "bg-cy-green-50" : "bg-cy-red-50"
                      }`}
                    >
                      <Icon
                        className={`w-7 h-7 ${
                          isGreen ? "text-cy-green" : "text-cy-red"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className={`font-[family-name:var(--font-heading)] text-2xl font-bold mb-3 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                        {option.title}
                      </h2>
                      <p className={`leading-relaxed mb-4 ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
                        {option.description}
                      </p>
                      <div className={`rounded-xl p-4 border ${theme === "dark" ? "bg-dark-card border-dark-border" : "bg-cy-light border-cy-border"}`}>
                        <p className={`text-sm flex items-center gap-2 ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
                          <ArrowRight className="w-4 h-4 text-cy-green flex-shrink-0" />
                          {option.cta}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
