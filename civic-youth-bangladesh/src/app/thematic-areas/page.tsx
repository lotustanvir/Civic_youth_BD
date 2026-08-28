import type { Metadata } from "next";
import Image from "next/image";
import { thematicAreas } from "@/data/thematicAreas";
import {
  BookOpen,
  Users,
  HeartHandshake,
  FileText,
  Lightbulb,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Thematic Areas",
  description:
    "Explore CYB's six strategic thematic areas: Civic Education, Ethical Leadership, Community Engagement, Research & Policy, Civic Innovation and Partnerships.",
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Users,
  HeartHandshake,
  FileText,
  Lightbulb,
  Globe,
};

const thematicAreaImages: Record<string, string> = {
  "civic-education": "/images/program-classroom-jpg.png",
  "ethical-leadership": "/images/program-speaking.jpg.png",
  "community-engagement": "/images/community-service.jpg.png",
  "research-policy": "/images/program-discussion.jpg.png",
  "civic-innovation": "/images/workshop-event.jpg.png",
  partnerships: "/images/featured-program-group.jpg.png",
};

const fullDescriptions: Record<string, string> = {
  "civic-education":
    "CYB's Civic Education & Citizenship program builds civic literacy, constitutional awareness, democratic values, media literacy and responsible citizenship among young Bangladeshis. Through workshops, campaigns and digital resources, we help young people understand their rights, duties and role in democratic society.",
  "ethical-leadership":
    "Our Ethical Youth Leadership programs develop competent, accountable, inclusive and service-oriented young leaders. We believe that leadership must be grounded in ethics and a commitment to serving communities rather than personal gain.",
  "community-engagement":
    "Community Engagement & Volunteerism transforms civic values into community action through organized volunteering and local initiatives. CYB connects young people with community needs and provides the frameworks for meaningful, sustained civic action.",
  "research-policy":
    "Research & Public Policy strengthens youth participation in research, policy analysis and evidence-informed public dialogue. We support young researchers and create spaces for youth voices in policy conversations.",
  "civic-innovation":
    "Civic Innovation & Technology leverages innovation, digital tools and civic technology to address community and governance challenges. We believe technology can be a powerful tool for civic engagement when guided by ethical principles.",
  partnerships:
    "Partnerships & Collective Impact connects youth, institutions and communities through meaningful national and international partnerships. We believe lasting change requires collaboration across sectors and boundaries.",
};

export default function ThematicAreasPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cy-light pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold text-cy-dark mb-6">
              Thematic Areas
            </h1>
            <p className="text-lg text-cy-gray leading-relaxed">
              Six strategic focus areas driving our mission to empower young
              people across Bangladesh.
            </p>
          </div>
        </div>
      </section>

      {/* Thematic Areas Detail */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 lg:space-y-16">
            {thematicAreas.map((area, index) => {
              const Icon = iconMap[area.icon];
              const isGreen = area.accentColor === "green";
              const hasBothImages = !!(thematicAreaImages[area.id] && area.secondaryImage);
              const primaryImage = thematicAreaImages[area.id];
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
                        isGreen
                          ? "bg-cy-green-50"
                          : "bg-cy-red-50"
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
                    <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold text-cy-dark mb-4">
                      {area.title}
                    </h2>
                    <p className="text-cy-gray leading-relaxed">
                      {fullDescriptions[area.id] || area.description}
                    </p>
                  </div>
                  {hasBothImages ? (
                    <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-3">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                        <Image
                          src={primaryImage!}
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
                    <div className="bg-cy-light rounded-2xl overflow-hidden border border-cy-border">
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
                          <p className="text-sm text-cy-gray">
                            Detailed program information will be added as initiatives
                            are launched.
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