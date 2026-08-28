import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden pt-20">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-cy-green blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-cy-red blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="max-w-2xl">
            <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              <span className="text-cy-green">Engage Today,</span>{" "}
              <span className="text-cy-red">Lead Tomorrow.</span>
            </h1>
            <p className="text-sm md:text-base lg:text-[17px] text-cy-gray leading-7 mb-8 max-w-xl">
              Civic Youth Bangladesh (CYB) is a non-profit, non-partisan,
              youth-led organization committed to raising awareness and advocating
              for civil and political rights. CYB empowers young people aged
              16–35 through capacity building and civic education, equipping them
              with the knowledge, leadership skills, and opportunities needed to
              participate meaningfully and peacefully in democratic life. CYB
              envisions a generation of informed, skilled, and engaged young
              leaders who contribute to democratic development and strengthen
              community resilience in Bangladesh. Its approach combines leadership
              development, civic education, and youth-led community action with
              creative cultural tools and social media. By making civic
              engagement more accessible, relatable, and engaging, CYB seeks to
              inspire young people to become active contributors to their
              communities and to Bangladesh&apos;s democratic future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/programs"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-cy-green text-white font-semibold rounded-lg hover:bg-cy-green-dark transition-all duration-200 shadow-sm hover:shadow-md group"
              >
                Our Programmes
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex items-center gap-8 text-sm text-cy-gray">
              <div className="flex flex-col">
                <span className="font-[family-name:var(--font-heading)] text-2xl font-bold text-cy-dark">
                  Youth-Led
                </span>
                <span className="text-xs uppercase tracking-wider">
                  Organization
                </span>
              </div>
              <div className="w-px h-10 bg-cy-border" />
              <div className="flex flex-col">
                <span className="font-[family-name:var(--font-heading)] text-2xl font-bold text-cy-dark">
                  Non-Partisan
                </span>
                <span className="text-xs uppercase tracking-wider">
                  Platform
                </span>
              </div>
              <div className="w-px h-10 bg-cy-border hidden sm:block" />
              <div className="flex-col hidden sm:flex">
                <span className="font-[family-name:var(--font-heading)] text-2xl font-bold text-cy-dark">
                  National
                </span>
                <span className="text-xs uppercase tracking-wider">Reach</span>
              </div>
            </div>
          </div>

          {/* Image / Visual */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <Image
                src="/images/hero-youth-group-jpg.png"
                alt="Young people representing civic leadership and youth engagement in Bangladesh"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                priority
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-cy-red/10 -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-xl bg-cy-green/10 -z-10" />
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
            fill="#F5F7F6"
          />
        </svg>
      </div>
    </section>
  );
}
