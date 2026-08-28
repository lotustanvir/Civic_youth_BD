import Link from "next/link";
import { thematicAreas } from "@/data/thematicAreas";
import {
  BookOpen,
  Users,
  HeartHandshake,
  Scale,
  Newspaper,
  BriefcaseBusiness,
  Globe,
  FileText,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Users,
  HeartHandshake,
  Scale,
  Newspaper,
  BriefcaseBusiness,
  Globe,
  FileText,
  Lightbulb,
};

export function ThematicAreas() {
  return (
    <section className="py-20 lg:py-28 bg-cy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-cy-dark mb-4">
            THEMATIC AREAS
          </h2>
          <p className="text-lg text-cy-gray leading-relaxed">
            Empowering young people with the knowledge, leadership and
            opportunities to strengthen communities and shape Bangladesh&apos;s
            future.
          </p>
        </div>

        {/* Cards grid — 3 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {thematicAreas.map((area) => {
            const Icon = iconMap[area.icon];
            const isGreen = area.accentColor === "green";

            return (
              <div
                key={area.id}
                className="group bg-white rounded-2xl p-8 border border-cy-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors ${
                    isGreen
                      ? "bg-cy-green-50 group-hover:bg-cy-green/10"
                      : "bg-cy-red-50 group-hover:bg-cy-red/10"
                  }`}
                >
                  {Icon && (
                    <Icon
                      className={`w-7 h-7 ${
                        isGreen ? "text-cy-green" : "text-cy-red"
                      }`}
                    />
                  )}
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-cy-dark mb-3">
                  {area.title}
                </h3>
                <p className="text-cy-gray text-sm leading-relaxed mb-5 flex-1">
                  {area.description}
                </p>
                <Link
                  href={area.href}
                  className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
                    isGreen
                      ? "text-cy-green hover:text-cy-green-dark"
                      : "text-cy-red hover:text-cy-red-dark"
                  }`}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
