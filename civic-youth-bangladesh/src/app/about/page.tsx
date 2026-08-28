"use client";

import Link from "next/link";
import Image from "next/image";
import { teamMembers } from "@/data/team";
import {
  Target,
  Eye,
  Heart,
  Users,
  Shield,
  Lightbulb,
  Globe,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { getTranslation } from "@/i18n";

const valuesData = [
  { key: "nonPartisanship" as const, Icon: Shield },
  { key: "inclusivity" as const, Icon: Users },
  { key: "ethics" as const, Icon: Heart },
  { key: "evidence" as const, Icon: Lightbulb },
  { key: "community" as const, Icon: Globe },
  { key: "impact" as const, Icon: Target },
];

export default function AboutPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = getTranslation(language);

  const isDark = theme === "dark";

  const roleMap: Record<string, string> = {
    "Founder & Lead": t.teamRoles.founder,
    "Co-Founder & Research Lead": t.teamRoles.coFounder,
    "Senior Advisor": t.teamRoles.seniorAdvisor,
    "Advisory Board Member": t.teamRoles.advisory,
    "Program Lead": t.teamRoles.programLead,
    "Research Lead": t.teamRoles.researchLead,
    "Program Coordinator": t.teamRoles.coordinator,
    "Communications Lead": t.teamRoles.communications,
    "Operations Lead": t.teamRoles.operations,
  };

  return (
    <>
      {/* Hero */}
      <section className={`pt-32 pb-16 lg:pt-40 lg:pb-20 ${isDark ? "bg-dark-secondary" : "bg-cy-light"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className={`font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? "text-dark-text" : "text-cy-dark"}`}>
              {t.about.title}
            </h1>
            <p className={`text-lg leading-relaxed ${isDark ? "text-dark-muted" : "text-cy-gray"}`}>
              {t.about.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section id="who-we-are" className={`py-20 lg:py-28 ${isDark ? "bg-dark-bg" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className={`font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold mb-6 ${isDark ? "text-dark-text" : "text-cy-dark"}`}>
                {t.about.whoWeAre}
              </h2>
              <div className={`space-y-4 leading-relaxed ${isDark ? "text-dark-muted" : "text-cy-gray"}`}>
                <p>{t.about.whoWeAreP1}</p>
                <p>{t.about.whoWeAreP2}</p>
                <p>{t.about.whoWeAreP3}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className={`relative rounded-2xl overflow-hidden border ${isDark ? "border-dark-border" : "border-cy-border"}`}>
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/office-image.jpg.png"
                    alt="Professional workspace representing Civic Youth Bangladesh operations"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className={`absolute bottom-3 left-3 rounded-lg p-1.5 shadow-md ${isDark ? "bg-dark-card/90" : "bg-white/90"} backdrop-blur-sm`}>
                    <Image
                      src="/images/cyb-logo.png"
                      alt="Civic Youth Bangladesh Logo"
                      width={80}
                      height={50}
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
              <div className={`relative rounded-2xl overflow-hidden border ${isDark ? "border-dark-border" : "border-cy-border"}`}>
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/hero-leadership-team.png.png"
                    alt="Civic Youth Bangladesh leadership team collaborating"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision-mission" className={`py-20 lg:py-28 ${isDark ? "bg-dark-secondary" : "bg-cy-light"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className={`rounded-2xl p-8 lg:p-10 border shadow-sm ${isDark ? "bg-dark-card border-dark-border" : "bg-white border-cy-border"}`}>
              <div className="w-14 h-14 rounded-xl bg-cy-green-50 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-cy-green" />
              </div>
              <h3 className={`font-[family-name:var(--font-heading)] text-2xl font-bold mb-4 ${isDark ? "text-dark-text" : "text-cy-dark"}`}>
                {t.about.visionTitle}
              </h3>
              <p className={isDark ? "text-dark-muted" : "text-cy-gray"}>
                {t.about.vision}
              </p>
            </div>
            <div className={`rounded-2xl p-8 lg:p-10 border shadow-sm ${isDark ? "bg-dark-card border-dark-border" : "bg-white border-cy-border"}`}>
              <div className="w-14 h-14 rounded-xl bg-cy-red-50 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-cy-red" />
              </div>
              <h3 className={`font-[family-name:var(--font-heading)] text-2xl font-bold mb-4 ${isDark ? "text-dark-text" : "text-cy-dark"}`}>
                {t.about.missionTitle}
              </h3>
              <p className={isDark ? "text-dark-muted" : "text-cy-gray"}>
                {t.about.mission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className={`py-20 lg:py-28 ${isDark ? "bg-dark-bg" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className={`font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold mb-4 ${isDark ? "text-dark-text" : "text-cy-dark"}`}>
              {t.about.valuesTitle}
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-dark-muted" : "text-cy-gray"}`}>
              {t.about.valuesSubtitle}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {valuesData.map(({ key, Icon }) => {
              const value = t.about.values[key];
              return (
                <div
                  key={key}
                  className={`rounded-2xl p-8 border hover:shadow-md transition-shadow ${isDark ? "bg-dark-secondary border-dark-border" : "bg-cy-light border-cy-border"}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${isDark ? "bg-dark-card" : "bg-white"}`}>
                    <Icon className="w-6 h-6 text-cy-green" />
                  </div>
                  <h3 className={`font-[family-name:var(--font-heading)] text-lg font-semibold mb-2 ${isDark ? "text-dark-text" : "text-cy-dark"}`}>
                    {value.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-dark-muted" : "text-cy-gray"}`}>
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section id="governance" className={`py-20 lg:py-28 ${isDark ? "bg-dark-secondary" : "bg-cy-light"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className={`font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold mb-4 ${isDark ? "text-dark-text" : "text-cy-dark"}`}>
              {t.about.governanceTitle}
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-dark-muted" : "text-cy-gray"}`}>
              {t.about.governanceSubtitle}
            </p>
          </div>
          <div className={`rounded-2xl p-10 border text-center max-w-3xl mx-auto ${isDark ? "bg-dark-card border-dark-border" : "bg-white border-cy-border"}`}>
            <p className={isDark ? "text-dark-muted" : "text-cy-gray"}>
              {t.about.governanceText}
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className={`py-20 lg:py-28 ${isDark ? "bg-dark-bg" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className={`font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold mb-4 ${isDark ? "text-dark-text" : "text-cy-dark"}`}>
              {t.about.teamTitle}
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-dark-muted" : "text-cy-gray"}`}>
              {t.about.teamSubtitle}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className={`rounded-2xl p-6 border text-center hover:shadow-md transition-shadow ${isDark ? "bg-dark-secondary border-dark-border" : "bg-cy-light border-cy-border"}`}
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-cy-green/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-cy-green/50" />
                </div>
                <h3 className={`font-[family-name:var(--font-heading)] text-base font-semibold ${isDark ? "text-dark-text" : "text-cy-dark"}`}>
                  {member.name}
                </h3>
                <p className={`text-sm mt-1 ${isDark ? "text-dark-muted" : "text-cy-gray"}`}>{roleMap[member.role] || member.role}</p>
                <p className={`text-xs mt-2 ${isDark ? "text-dark-muted/60" : "text-cy-gray/60"}`}>
                  {t.about.teamNote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-cy-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-white mb-4">
            {language === "bn" ? "আমাদের মিশনে যোগ দিন" : "JOIN OUR MISSION"}
          </h2>
          <p className="text-lg text-cy-green-light mb-8 max-w-2xl mx-auto">
            {t.about.joinMissionText}
          </p>
          <Link
            href="/get-involved"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-cy-green font-semibold rounded-lg hover:bg-gray-50 transition-all group"
          >
            {t.about.getInvolved}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
