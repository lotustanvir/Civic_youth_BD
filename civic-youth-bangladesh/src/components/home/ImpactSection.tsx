import Image from "next/image";
import { impactMetrics } from "@/data/impact";
import { TrendingUp } from "lucide-react";

export function ImpactSection() {
  return (
    <section className="py-20 lg:py-28 bg-cy-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
          <div className="text-center lg:text-left">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              OUR IMPACT
            </h2>
            <p className="text-white/85 font-medium text-lg max-w-2xl mx-auto lg:mx-0">
              Building a more civic-minded, engaged and leadership-ready generation
              across Bangladesh.
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-white/20 hidden lg:block">
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
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/15 hover:bg-white/15 transition-colors"
            >
              <div className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-1">
                {metric.value}
                {metric.suffix || ""}
              </div>
              <div className="text-sm text-white/95 font-semibold">
                {metric.label}
              </div>
              {metric.type === "coming-soon" && (
                <div className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-white bg-white/15 border border-white/20 px-2 py-0.5 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  Coming soon
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-white/70 italic">
            Proposed Impact Targets — Actual verified data will be published as
            the organization completes its programs.
          </p>
        </div>
      </div>
    </section>
  );
}