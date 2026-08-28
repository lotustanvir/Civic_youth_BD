"use client";

import Image from "next/image";
import { articles } from "@/data/articles";
import { ArrowRight, Clock } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
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

export default function BlogPage() {
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
              {t.blog.title}
            </h1>
            <p
              className={`text-lg leading-relaxed ${
                theme === "dark" ? "text-dark-muted" : "text-cy-gray"
              }`}
            >
              {t.blog.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section
        className={`py-20 lg:py-28 ${
          theme === "dark" ? "bg-dark-secondary" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className={`group rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col ${
                  theme === "dark"
                    ? "bg-dark-card border border-dark-border"
                    : "bg-cy-light border border-cy-border"
                }`}
              >
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
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        categoryColors[article.category] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {t.articlesData[article.id as keyof typeof t.articlesData]?.category || article.category}
                    </span>
                    <span
                      className={`flex items-center gap-1 text-xs ${
                        theme === "dark" ? "text-dark-muted" : "text-cy-gray"
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      {t.articlesData[article.id as keyof typeof t.articlesData]?.readTime || article.readTime}
                    </span>
                  </div>
                  <h2
                    className={`font-[family-name:var(--font-heading)] text-lg font-semibold mb-2 group-hover:text-cy-green transition-colors ${
                      theme === "dark" ? "text-dark-text" : "text-cy-dark"
                    }`}
                  >
                    {t.articlesData[article.id as keyof typeof t.articlesData]?.title || article.title}
                  </h2>
                  <p
                    className={`text-sm leading-relaxed flex-1 line-clamp-3 ${
                      theme === "dark" ? "text-dark-muted" : "text-cy-gray"
                    }`}
                  >
                    {t.articlesData[article.id as keyof typeof t.articlesData]?.excerpt || article.excerpt}
                  </p>
                  <div
                    className={`flex items-center justify-between pt-4 mt-4 border-t ${
                      theme === "dark" ? "border-dark-border" : "border-cy-border"
                    }`}
                  >
                    <span
                      className={`text-xs ${
                        theme === "dark" ? "text-dark-muted" : "text-cy-gray"
                      }`}
                    >
                      {article.author} &middot;{" "}
                      {new Date(article.date).toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-cy-green">
                      {t.blog.read}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
