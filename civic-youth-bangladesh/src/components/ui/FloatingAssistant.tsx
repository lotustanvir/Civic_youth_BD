"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getTranslation } from "@/i18n";

export function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const t = getTranslation(language);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="mb-4 w-80 bg-white dark:bg-dark-bg rounded-2xl shadow-2xl border border-cy-border dark:border-dark-border overflow-hidden">
          {/* Header */}
          <div className="bg-cy-green px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  {t.assistant.title}
                </p>
                <p className="text-white/70 text-xs">
                  {t.assistant.subtitle}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label={t.assistant.closeLabel}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="p-5 h-64 flex flex-col justify-between">
            <div className="flex-1 flex items-center">
              <div className="bg-cy-light dark:bg-dark-card rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                <p className="text-sm text-cy-dark dark:text-dark-text leading-relaxed">
                  {t.assistant.greeting}
                </p>
                <p className="text-xs text-cy-gray dark:text-dark-text mt-1">
                  {t.assistant.time}
                </p>
              </div>
            </div>

            {/* Input area */}
            <div className="flex items-center gap-2 pt-3 border-t border-cy-border dark:border-dark-border">
              <input
                type="text"
                placeholder={t.assistant.placeholder}
                disabled
                className="flex-1 px-4 py-2.5 bg-cy-light dark:bg-dark-card border border-cy-border dark:border-dark-border rounded-xl text-sm focus:outline-none disabled:opacity-50 dark:text-dark-text"
              />
              <button
                disabled
                className="p-2.5 bg-cy-green/50 text-white/70 rounded-xl cursor-not-allowed"
                aria-label={t.assistant.openLabel}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-cy-green text-white rounded-full shadow-lg hover:bg-cy-green-dark hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
        aria-label={isOpen ? t.assistant.closeLabel : t.assistant.openLabel}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="flex flex-col items-center">
            <MessageCircle className="w-6 h-6" />
            <span className="text-[9px] font-bold mt-0.5 leading-none">
              {t.assistant.title}
            </span>
          </div>
        )}
      </button>
    </div>
  );
}
