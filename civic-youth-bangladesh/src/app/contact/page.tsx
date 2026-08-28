import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Civic Youth Bangladesh. Reach out for inquiries, partnerships, media requests or general information.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cy-light pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold text-cy-dark mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-cy-gray leading-relaxed">
              Have a question, inquiry or want to connect? We&apos;d love to
              hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-cy-dark mb-6">
                Get In Touch
              </h2>
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cy-green-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-cy-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cy-dark text-sm mb-1">
                      Address
                    </h3>
                    <p className="text-cy-gray text-sm">
                      Dhaka, Bangladesh
                    </p>
                    <p className="text-xs text-cy-gray/60 mt-1">
                      Full address will be added.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cy-green-50 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-cy-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cy-dark text-sm mb-1">
                      Email
                    </h3>
                    <a
                      href="mailto:info@civicyouthbd.org"
                      className="text-cy-gray text-sm hover:text-cy-green transition-colors"
                    >
                      info@civicyouthbd.org
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cy-green-50 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-cy-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cy-dark text-sm mb-1">
                      Phone
                    </h3>
                    <a
                      href="tel:+8801XXXXXXXXX"
                      className="text-cy-gray text-sm hover:text-cy-green transition-colors"
                    >
                      +880 1XXXXXXXXX
                    </a>
                    <p className="text-xs text-cy-gray/60 mt-1">
                      Phone number will be updated.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-cy-light rounded-2xl p-6 border border-cy-border mb-6">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4">
                  <Image
                    src="/images/office-image.jpg.png"
                    alt="Professional workspace representing Civic Youth Bangladesh operations"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] font-semibold text-cy-dark mb-2">
                  Media Inquiries
                </h3>
                <p className="text-sm text-cy-gray">
                  For press and media inquiries, please email{" "}
                  <a
                    href="mailto:media@civicyouthbd.org"
                    className="text-cy-green hover:text-cy-green-dark font-medium"
                  >
                    media@civicyouthbd.org
                  </a>
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}