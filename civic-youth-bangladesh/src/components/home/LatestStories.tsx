"use client";

import Link from "next/link";
import Image from "next/image";
import { articles } from "@/data/articles";
import { ArrowRight, Clock } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getTranslation } from "@/i18n";

const categoryColors: Record<string, string> = {
  "Civic Education": "bg-cy-green-50 text-cy-green",
  "Youth Leadership": "bg-cy-red-50 text-cy-red",
  "Climate Action": "bg-green-50 text-green-700",
  "Media Literacy": "bg-blue-50 text-blue-700",
  Policy: "bg-purple-50 text-purple-700",
  Community: "bg-amber-50 text-amber-700",
  Research: "bg-indigo-50 text-indigo-700",
};

export function LatestStories() {
  const { language } = useLanguage();
  const t = getTranslation(language);

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-cy-dark dark:text-dark-text mb-3">
              {t.latestStories.title}
            </h2>
            <p className="text-lg text-cy-gray dark:text-dark-text/70">
              {t.latestStories.subtitle}
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cy-green hover:text-cy-green-dark transition-colors"
          >
            {t.latestStories.viewAll}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {articles.slice(0, 3).map((article) => (
            <article
              key={article.id}
              className="group bg-white dark:bg-dark-card rounded-2xl overflow-hidden border border-cy-border dark:border-dark-border shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-[16/10] relative overflow-hidden">
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-cy-green-50 to-cy-red-50" />
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      categoryColors[article.category] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {t.articlesData[article.id as keyof typeof t.articlesData]?.category || article.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-cy-gray dark:text-dark-text/60">
                    <Clock className="w-3 h-3" />
                    {t.articlesData[article.id as keyof typeof t.articlesData]?.readTime || article.readTime}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-cy-dark dark:text-dark-text mb-2 group-hover:text-cy-green transition-colors line-clamp-2">
                  {t.articlesData[article.id as keyof typeof t.articlesData]?.title || article.title}
                </h3>
                <p className="text-sm text-cy-gray dark:text-dark-text/60 leading-relaxed line-clamp-3">
                  {t.articlesData[article.id as keyof typeof t.articlesData]?.excerpt || article.excerpt}
                </p>
                <Link
                  href={article.href}
                  className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-cy-green hover:text-cy-green-dark transition-colors"
                >
                  {t.latestStories.readMore}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
