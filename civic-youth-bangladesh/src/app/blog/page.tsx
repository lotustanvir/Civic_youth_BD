import type { Metadata } from "next";
import Image from "next/image";
import { articles } from "@/data/articles";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, analysis and perspectives from Civic Youth Bangladesh on civic education, youth leadership and community engagement.",
};

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
  return (
    <>
      {/* Hero */}
      <section className="bg-cy-light pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold text-cy-dark mb-6">
              Blog & Insights
            </h1>
            <p className="text-lg text-cy-gray leading-relaxed">
              Perspectives, analysis and stories from Civic Youth Bangladesh.
            </p>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="group bg-cy-light rounded-2xl overflow-hidden border border-cy-border hover:shadow-lg transition-all duration-300 flex flex-col"
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
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-cy-gray">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-cy-dark mb-2 group-hover:text-cy-green transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-cy-gray leading-relaxed flex-1 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-cy-border">
                    <span className="text-xs text-cy-gray">
                      {article.author} &middot;{" "}
                      {new Date(article.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-cy-green">
                      Read
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