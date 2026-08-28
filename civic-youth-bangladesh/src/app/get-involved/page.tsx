import type { Metadata } from "next";
import Image from "next/image";
import {
  Users,
  Heart,
  Handshake,
  DollarSign,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Join Civic Youth Bangladesh as a member, volunteer, partner or supporter. Multiple ways to contribute to civic leadership and community engagement.",
};

const involvementOptions = [
  {
    id: "member",
    icon: Users,
    title: "Become a Member",
    description:
      "Join CYB as a member and be part of a growing community of young civic leaders across Bangladesh. Members gain access to programs, resources and networking opportunities.",
    color: "green",
    cta: "Membership form will be available when backend is connected.",
  },
  {
    id: "volunteer",
    icon: Heart,
    title: "Volunteer With CYB",
    description:
      "Contribute your time and skills to civic education, community engagement and youth development initiatives. Volunteers are the backbone of our community programs.",
    color: "red",
    cta: "Volunteer application will be available when backend is connected.",
  },
  {
    id: "partner",
    icon: Handshake,
    title: "Partner With Us",
    description:
      "Organizations, institutions and businesses can partner with CYB to amplify youth civic engagement and community development impact.",
    color: "green",
    cta: "Partnership inquiry form will be available when backend is connected.",
  },
  {
    id: "donate",
    icon: DollarSign,
    title: "Donate",
    description:
      "Support CYB's mission to develop civic leadership among young Bangladeshis. Your contribution helps us reach more communities and create lasting impact.",
    color: "red",
    cta: "Donation integration will be available when backend is connected.",
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cy-light pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold text-cy-dark mb-6">
              Get Involved
            </h1>
            <p className="text-lg text-cy-gray leading-relaxed">
              There are many ways to be part of CYB&apos;s mission. Find the
              path that&apos;s right for you.
            </p>
          </div>
        </div>
      </section>

      {/* Options */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden mb-12 border border-cy-border">
            <div className="relative aspect-[21/9]">
              <Image
                src="/images/community-outreach.png.png"
                alt="Young volunteers participating in community outreach"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cy-dark/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold text-white mb-2">
                  Make a Difference
                </h2>
                <p className="text-white/80 text-sm max-w-xl">
                  Every contribution matters. Join thousands of young Bangladeshis building stronger communities through civic action.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {involvementOptions.map((option) => {
              const isGreen = option.color === "green";
              return (
                <div
                  key={option.id}
                  id={option.id}
                  className="scroll-mt-24 rounded-2xl border border-cy-border p-8 lg:p-10 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                    <div
                      className={`w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center ${
                        isGreen ? "bg-cy-green-50" : "bg-cy-red-50"
                      }`}
                    >
                      <option.icon
                        className={`w-7 h-7 ${
                          isGreen ? "text-cy-green" : "text-cy-red"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-cy-dark mb-3">
                        {option.title}
                      </h2>
                      <p className="text-cy-gray leading-relaxed mb-4">
                        {option.description}
                      </p>
                      <div className="bg-cy-light rounded-xl p-4 border border-cy-border">
                        <p className="text-sm text-cy-gray flex items-center gap-2">
                          <ArrowRight className="w-4 h-4 text-cy-green flex-shrink-0" />
                          {option.cta}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}