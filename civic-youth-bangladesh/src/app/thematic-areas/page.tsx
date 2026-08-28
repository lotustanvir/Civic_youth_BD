"use client";

import Image from "next/image";
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
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { getTranslation } from "@/i18n";

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

const thematicAreaImages: Record<string, string> = {
  "civic-education": "/images/program-classroom-jpg.png",
  "youth-leadership": "/images/program-speaking.jpg.png",
  "community-engagement": "/images/community-service.jpg.png",
  "civil-political-rights": "/images/public-speaking-seminar.png.png",
  "media-literacy": "/images/blog-media-literacy.jpg.png",
  "youth-skills": "/images/training-group-discussion.png.png",
  "climate-resilience": "/images/community-tree-planting.png.png",
  "research-policy": "/images/program-discussion.jpg.png",
  "civic-innovation": "/images/workshop-event.jpg.png",
};

export default function ThematicAreasPage() {
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
              {t.thematicAreasPage.title}
            </h1>
            <p className={`text-lg leading-relaxed ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
              {t.thematicAreasPage.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Thematic Areas Detail */}
      <section className={`py-20 lg:py-28 ${theme === "dark" ? "bg-dark-bg" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 lg:space-y-16">
            {thematicAreas.map((area, index) => {
              const Icon = iconMap[area.icon];
              const isGreen = area.accentColor === "green";
              const primaryImage = thematicAreaImages[area.id];
              const hasBothImages = !!(primaryImage && area.secondaryImage);
              const areaTranslation = t.thematicAreas.areas[area.id as keyof typeof t.thematicAreas.areas];
              const fullDescription = t.thematicAreas.fullDescriptions?.[area.id as keyof typeof t.thematicAreas.fullDescriptions];
              return (
                <div
                  key={area.id}
                  id={area.id}
                  className={`scroll-mt-24 grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-center ${
                    index % 2 === 1 ? "lg:direction-rtl" : ""
                  }`}
                >
                  <div>
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
                        isGreen ? "bg-cy-green-50" : "bg-cy-red-50"
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
                    <h2 className={`font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold mb-4 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                      {areaTranslation?.title || area.title}
                    </h2>
                    <p className={`leading-relaxed ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
                      {fullDescription || areaTranslation?.description || area.description}
                    </p>
                  </div>
                  {hasBothImages ? (
                    <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-3">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                        <Image
                          src={primaryImage}
                          alt={area.title}
                          fill
                          sizes="(max-width: 480px) 100vw, 25vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                        <Image
                          src={area.secondaryImage!}
                          alt={`${area.title} in action`}
                          fill
                          sizes="(max-width: 480px) 100vw, 25vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className={`rounded-2xl overflow-hidden border ${theme === "dark" ? "bg-dark-card border-dark-border" : "bg-cy-light border-cy-border"}`}>
                      {primaryImage ? (
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={primaryImage}
                            alt={area.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="p-10 text-center">
                          <div
                            className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                              isGreen ? "bg-cy-green/10" : "bg-cy-red/10"
                            }`}
                          >
                            {Icon && (
                              <Icon
                                className={`w-8 h-8 ${
                                  isGreen ? "text-cy-green" : "text-cy-red"
                                }`}
                              />
                            )}
                          </div>
                          <p className={`text-sm ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
                            {t.thematicAreasPage.fallback}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
