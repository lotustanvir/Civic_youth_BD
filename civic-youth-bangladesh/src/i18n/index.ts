import en from "./en";
import bn from "./bn";

export const translations = { en, bn } as const;

export type Language = "en" | "bn";

export function getTranslation(lang: Language) {
  return translations[lang];
}
