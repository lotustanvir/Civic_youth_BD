import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Civic Youth Bangladesh - a national, non-partisan, youth-led civic leadership organization developing active citizenship, ethical leadership and community engagement.",
};

const values = [
  {
    icon: Shield,
    title: "Non-Partisanship",
    description:
      "We remain independent from political parties and work across ideological lines.",
  },
  {
    icon: Users,
    title: "Inclusivity",
    description:
      "We welcome young people from all backgrounds, regions and identities.",
  },
  {
    icon: Heart,
    title: "Ethics & Integrity",
    description:
      "We uphold transparency, accountability and ethical conduct in everything we do.",
  },
  {
    icon: Lightbulb,
    title: "Evidence-Informed",
    description:
      "Our work is grounded in research, data and evidence-based practice.",
  },
  {
    icon: Globe,
    title: "Community-Oriented",
    description:
      "We prioritize community needs and grassroots engagement in our programs.",
  },
  {
    icon: Target,
    title: "Impact-Driven",
    description:
      "We measure success by meaningful outcomes in communities and young lives.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cy-light pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold text-cy-dark mb-6">
              About Us
            </h1>
            <p className="text-lg text-cy-gray leading-relaxed">
              Learn about our mission, values and the people building Civic Youth
              Bangladesh.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section id="who-we-are" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-cy-dark mb-6">
                Who We Are
              </h2>
              <div className="space-y-4 text-cy-gray leading-relaxed">
                <p>
                  Civic Youth Bangladesh (CYB) is envisioned as a national,
                  non-partisan, youth-led civic leadership organization dedicated
                  to developing a new generation of informed, ethical and active
                  citizens across Bangladesh.
                </p>
                <p>
                  We believe that young people have the potential to transform
                  communities and strengthen democratic governance when equipped
                  with the right knowledge, skills and opportunities. CYB works to
                  bridge the gap between civic potential and civic participation.
                </p>
                <p>
                  Our programs and initiatives are designed to nurture civic
                  literacy, ethical leadership, community engagement, research
                  capacity and social innovation among young Bangladeshis.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden border border-cy-border">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/office-image.jpg.png"
                    alt="Professional workspace representing Civic Youth Bangladesh operations"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-cy-border">
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
      <section id="vision-mission" className="py-20 lg:py-28 bg-cy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-white rounded-2xl p-8 lg:p-10 border border-cy-border shadow-sm">
              <div className="w-14 h-14 rounded-xl bg-cy-green-50 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-cy-green" />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-cy-dark mb-4">
                Our Vision
              </h3>
              <p className="text-cy-gray leading-relaxed">
                A Bangladesh where every young person is an informed, active and
                ethical citizen, contributing to just, inclusive and sustainable
                communities.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 lg:p-10 border border-cy-border shadow-sm">
              <div className="w-14 h-14 rounded-xl bg-cy-red-50 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-cy-red" />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-cy-dark mb-4">
                Our Mission
              </h3>
              <p className="text-cy-gray leading-relaxed">
                To empower young people across Bangladesh with civic knowledge,
                leadership skills and community engagement opportunities through
                research-driven, inclusive and youth-led programs and partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-cy-dark mb-4">
              Our Values
            </h2>
            <p className="text-lg text-cy-gray max-w-2xl mx-auto">
              The principles that guide our work and define who we are.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-cy-light rounded-2xl p-8 border border-cy-border hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-5">
                  <value.icon className="w-6 h-6 text-cy-green" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-cy-dark mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-cy-gray leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section id="governance" className="py-20 lg:py-28 bg-cy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-cy-dark mb-4">
              Governance
            </h2>
            <p className="text-lg text-cy-gray max-w-2xl mx-auto">
              CYB is committed to transparent, accountable and ethical
              governance.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-10 border border-cy-border text-center max-w-3xl mx-auto">
            <p className="text-cy-gray">
              Governance structure details are being finalized. CYB will maintain
              a transparent governance framework led by an advisory board and
              youth executive team.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-cy-dark mb-4">
              LEADERS & SUPPORTERS
            </h2>
            <p className="text-lg text-cy-gray max-w-2xl mx-auto">
              The people guiding and supporting CYB&apos;s mission.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-cy-light rounded-2xl p-6 border border-cy-border text-center hover:shadow-md transition-shadow"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-cy-green/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-cy-green/50" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold text-cy-dark">
                  {member.name}
                </h3>
                <p className="text-sm text-cy-gray mt-1">{member.role}</p>
                <p className="text-xs text-cy-gray/60 mt-2">
                  Profile details will be added upon approval.
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
            JOIN OUR MISSION
          </h2>
          <p className="text-lg text-cy-green-light mb-8 max-w-2xl mx-auto">
            Be part of the movement building civic leadership across Bangladesh.
          </p>
          <Link
            href="/get-involved"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-cy-green font-semibold rounded-lg hover:bg-gray-50 transition-all group"
          >
            Get Involved
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}