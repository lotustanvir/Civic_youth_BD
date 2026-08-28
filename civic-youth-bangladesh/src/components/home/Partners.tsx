"use client";

import Link from "next/link";
import { partners } from "@/data/partners";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getTranslation } from "@/i18n";

export function Partners() {
  const { language } = useLanguage();
  const t = getTranslation(language);

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-cy-dark dark:text-dark-text mb-4">
            {t.partners.title}
            <br />
            {t.partners.titleLine2}
          </h2>
          <p className="text-lg text-cy-gray dark:text-dark-text max-w-2xl mx-auto">
            {t.partners.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-10">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center bg-cy-light dark:bg-dark-bg border border-cy-border dark:border-dark-border rounded-xl p-6 h-28 hover:shadow-md transition-shadow grayscale hover:grayscale-0"
            >
              {partner.placeholder ? (
                <span className="text-sm text-cy-gray dark:text-dark-text text-center font-medium">
                  {partner.name}
                </span>
              ) : (
                <span className="text-sm text-cy-dark dark:text-dark-text font-semibold">
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/about#partners"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cy-green hover:text-cy-green-dark transition-colors"
          >
            {t.partners.viewPartnerships}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
