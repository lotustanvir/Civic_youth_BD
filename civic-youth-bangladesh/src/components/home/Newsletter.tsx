"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-20 lg:py-28 bg-cy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-cy-dark mb-4">
            STAY CONNECTED
          </h2>
          <p className="text-lg text-cy-gray mb-8">
            Get updates on CYB programs, opportunities, events, research and
            community initiatives.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-3 p-6 bg-cy-green-50 rounded-2xl border border-cy-green/20">
              <CheckCircle className="w-6 h-6 text-cy-green flex-shrink-0" />
              <p className="text-cy-green-dark font-medium">
                Thanks! Newsletter integration will be enabled when the backend
                is connected.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className="w-full px-5 py-3.5 bg-white border border-cy-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all"
                />
                {error && (
                  <p className="mt-2 text-sm text-cy-red text-left">{error}</p>
                )}
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-cy-green text-white font-semibold rounded-xl hover:bg-cy-green-dark transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
              >
                <Send className="w-4 h-4" />
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}