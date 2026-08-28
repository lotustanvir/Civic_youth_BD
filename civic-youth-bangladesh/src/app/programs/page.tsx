import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { programs } from "@/data/programs";
import { ArrowRight, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore CYB's programs: fellowships, academies, community labs, research programs and civic engagement initiatives.",
};

export default function ProgramsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cy-light pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold text-cy-dark mb-6">
              Our Programs
            </h1>
            <p className="text-lg text-cy-gray leading-relaxed">
              Structured initiatives designed to develop civic knowledge,
              leadership skills and community impact capacity among young
              Bangladeshis.
            </p>
          </div>
        </div>
      </section>

      {/* Programs List */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {programs.map((program) => (
              <div
                key={program.id}
                id={program.id}
                className={`scroll-mt-24 rounded-2xl border p-8 lg:p-10 hover:shadow-lg transition-all duration-300 ${
                  program.featured
                    ? "bg-cy-dark border-cy-dark text-white"
                    : "bg-white border-cy-border hover:border-cy-green/30"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {program.image && (
                    <div className="relative w-full lg:w-48 h-48 flex-shrink-0 rounded-xl overflow-hidden">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 192px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {program.featured && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cy-green/20 text-cy-green-light text-xs font-bold uppercase tracking-wider rounded-full">
                          <Star className="w-3 h-3" />
                          Featured
                        </span>
                      )}
                    </div>
                    <h2
                      className={`font-[family-name:var(--font-heading)] text-xl sm:text-2xl font-bold mb-3 ${
                        program.featured ? "text-white" : "text-cy-dark"
                      }`}
                    >
                      {program.title}
                    </h2>
                    <p
                      className={`leading-relaxed ${
                        program.featured ? "text-gray-300" : "text-cy-gray"
                      }`}
                    >
                      {program.shortDescription}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Link
                      href={`/get-involved${program.featured ? "#member" : ""}`}
                      className={`inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all group ${
                        program.featured
                          ? "bg-cy-green text-white hover:bg-cy-green-light"
                          : "bg-cy-green-50 text-cy-green hover:bg-cy-green hover:text-white"
                      }`}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}