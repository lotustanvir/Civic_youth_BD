import Link from "next/link";
import Image from "next/image";
import { featuredProgram } from "@/data/programs";
import { ArrowRight, Star } from "lucide-react";

export function FeaturedProgram() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-cy-dark to-cy-dark/95 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-cy-green blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-cy-red blur-3xl" />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center p-8 sm:p-12 lg:p-16">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cy-green/20 text-cy-green-light text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                <Star className="w-3.5 h-3.5" />
                {featuredProgram.badge}
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {featuredProgram.title}
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {featuredProgram.shortDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={featuredProgram.href}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-cy-green text-white font-semibold rounded-lg hover:bg-cy-green-light transition-all duration-200 shadow-sm hover:shadow-md group"
                >
                  View Program
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/get-involved"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200"
                >
                  Apply Now
                </Link>
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                <Image
                  src={featuredProgram.image || "/images/featured-program-group.jpg.png"}
                  alt="Young participants collaborating in a civic leadership program"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}