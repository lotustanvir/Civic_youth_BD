import Link from "next/link";
import { partners } from "@/data/partners";
import { ArrowRight } from "lucide-react";

export function Partners() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-cy-dark mb-4">
            PARTNERSHIPS FOR
            <br />
            COLLECTIVE IMPACT
          </h2>
          <p className="text-lg text-cy-gray max-w-2xl mx-auto">
            Building meaningful connections with institutions committed to youth
            development and civic engagement.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-10">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center bg-cy-light border border-cy-border rounded-xl p-6 h-28 hover:shadow-md transition-shadow grayscale hover:grayscale-0"
            >
              {partner.placeholder ? (
                <span className="text-sm text-cy-gray text-center font-medium">
                  {partner.name}
                </span>
              ) : (
                <span className="text-sm text-cy-dark font-semibold">
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/about#partners"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cy-green hover:text-cy-green-dark transition-colors"
          >
            View Partnerships
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}