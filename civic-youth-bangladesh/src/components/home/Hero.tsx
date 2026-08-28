import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-white overflow-hidden pt-24 pb-16 lg:pt-28 lg:pb-20">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-cy-green blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-cy-red blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large horizontal hero image */}
        <div className="relative w-full aspect-[16/6] md:aspect-[16/6] lg:aspect-[16/5.5] overflow-hidden rounded-2xl shadow-xl mb-10 md:mb-14">
          <Image
            src="/images/hero-youth-group-jpg.png"
            alt="Young people representing civic leadership and youth engagement in Bangladesh"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Approved description */}
        <div className="max-w-5xl mx-auto text-left">
          <p className="text-base md:text-lg leading-7 md:leading-8 text-cy-gray">
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

          {/* Our Programmes button */}
          <div className="mt-8">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-cy-green text-white font-semibold rounded-lg hover:bg-cy-green-dark transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              Our Programmes
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
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
