import type { Metadata } from "next";
import Image from "next/image";
import { impactMetrics, impactTargetMetrics } from "@/data/impact";
import { TrendingUp, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "CYB's proposed impact targets and the outcomes we aim to achieve through civic leadership and community engagement programs.",
};

export default function ImpactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cy-light pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold text-cy-dark mb-6">
              Our Impact
            </h1>
            <p className="text-lg text-cy-gray leading-relaxed">
              Tracking our progress toward building a more civic-minded,
              engaged and leadership-ready generation.
            </p>
          </div>
        </div>
      </section>

      {/* Current Status */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
            <div className="text-center lg:text-left">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-cy-dark mb-4">
                Current Status
              </h2>
              <p className="text-lg text-cy-gray max-w-2xl mx-auto lg:mx-0">
                CYB is in its development phase. Verified impact data will be
                published as programs are completed and evaluated.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-cy-border">
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
                className="bg-cy-light rounded-2xl p-6 text-center border border-cy-border"
              >
                <div className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-cy-dark mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-cy-gray font-medium mb-2">
                  {metric.label}
                </div>
                <span className="inline-flex items-center gap-1 text-xs text-cy-gray bg-cy-border/50 px-2 py-0.5 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  Coming soon
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
              Proposed Impact Targets
            </h2>
            <p className="text-lg text-cy-green-light max-w-2xl mx-auto">
              Aspirational goals guiding CYB&apos;s program design and growth
              strategy.
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
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-sm text-white/70 italic">
              These are proposed targets, not verified achievements. Actual
              verified data will be published as programs are completed and
              independently evaluated.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}