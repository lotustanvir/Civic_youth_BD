import type { Metadata } from "next";
import Image from "next/image";
import { opportunities } from "@/data/programs";
import { ArrowRight, Clock, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Opportunities",
  description:
    "Fellowships, volunteer roles, research grants and leadership opportunities with Civic Youth Bangladesh.",
};

const typeColors: Record<string, string> = {
  Fellowship: "bg-cy-green-50 text-cy-green",
  Volunteer: "bg-blue-50 text-blue-700",
  Grant: "bg-purple-50 text-purple-700",
  Leadership: "bg-amber-50 text-amber-700",
  Event: "bg-cy-red-50 text-cy-red",
};

export default function OpportunitiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cy-light pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold text-cy-dark mb-6">
              Opportunities
            </h1>
            <p className="text-lg text-cy-gray leading-relaxed">
              Discover fellowships, volunteer roles, research grants and
              leadership opportunities with CYB.
            </p>
          </div>
        </div>
      </section>

      {/* Opportunities List */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden mb-12 border border-cy-border">
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
                  Fellowship & Leadership Pathways
                </h2>
                <p className="text-white/80 text-sm max-w-xl">
                  Building the next generation of civic leaders through structured programs, mentorship and community impact.
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="bg-cy-light rounded-2xl p-6 border border-cy-border hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      typeColors[opp.type] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Tag className="w-3 h-3" />
                    {opp.type}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-cy-dark mb-3">
                  {opp.title}
                </h3>
                <p className="text-sm text-cy-gray leading-relaxed mb-4 flex-1">
                  {opp.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-cy-border">
                  <span className="flex items-center gap-1.5 text-xs text-cy-gray">
                    <Clock className="w-3 h-3" />
                    {opp.deadline}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-cy-green group cursor-pointer">
                    Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center bg-cy-green-50 rounded-2xl p-10 border border-cy-green/10">
            <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-cy-dark mb-3">
              Don&apos;t see what you&apos;re looking for?
            </h3>
            <p className="text-cy-gray mb-6">
              New opportunities are added regularly. Join our newsletter to stay
              updated.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cy-green text-white font-semibold rounded-lg hover:bg-cy-green-dark transition-all group"
            >
              Stay Updated
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}