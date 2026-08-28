"use client";

import { Send } from "lucide-react";

export function ContactForm() {
  return (
    <div className="bg-cy-light rounded-2xl p-8 lg:p-10 border border-cy-border">
      <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-cy-dark mb-6">
        Send Us a Message
      </h2>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="contact-name"
              className="block text-sm font-medium text-cy-dark mb-1.5"
            >
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3 bg-white border border-cy-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all"
            />
          </div>
          <div>
            <label
              htmlFor="contact-email"
              className="block text-sm font-medium text-cy-dark mb-1.5"
            >
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-white border border-cy-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="contact-subject"
            className="block text-sm font-medium text-cy-dark mb-1.5"
          >
            Subject
          </label>
          <input
            id="contact-subject"
            type="text"
            placeholder="How can we help?"
            className="w-full px-4 py-3 bg-white border border-cy-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all"
          />
        </div>
        <div>
          <label
            htmlFor="contact-message"
            className="block text-sm font-medium text-cy-dark mb-1.5"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            rows={5}
            placeholder="Write your message here..."
            className="w-full px-4 py-3 bg-white border border-cy-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all resize-none"
          />
        </div>
        <div className="bg-cy-green-50 rounded-xl p-4 border border-cy-green/10">
          <p className="text-sm text-cy-gray flex items-center gap-2">
            <Send className="w-4 h-4 text-cy-green flex-shrink-0" />
            Contact form will be functional when backend is connected.
          </p>
        </div>
      </form>
    </div>
  );
}