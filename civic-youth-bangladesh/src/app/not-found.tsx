"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { getTranslation } from "@/i18n";

export default function NotFound() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = getTranslation(language);
  const isDark = theme === "dark";

  return (
    <section className={`min-h-[60vh] flex items-center justify-center px-4 ${isDark ? "bg-dark-bg" : "bg-white"}`}>
      <div className="text-center max-w-md">
        <h1 className={`font-[family-name:var(--font-heading)] text-6xl sm:text-7xl font-extrabold mb-4 ${isDark ? "text-dark-text" : "text-cy-dark"}`}>
          404
        </h1>
        <p className={`text-lg mb-8 ${isDark ? "text-dark-muted" : "text-cy-gray"}`}>
          {language === "bn"
            ? "আপনি যা খুঁজছেন তা পাওয়া যায়নি।"
            : "The page you are looking for could not be found."}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-cy-green text-white font-semibold rounded-lg hover:bg-cy-green-dark transition-all"
        >
          {t.nav.home}
        </Link>
      </div>
    </section>
  );
}
