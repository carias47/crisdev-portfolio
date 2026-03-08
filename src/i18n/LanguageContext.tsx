import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import en from "../locales/en.json";
import es from "../locales/es.json";

export type Language = "en" | "es";

const translations: Record<Language, typeof en> = { en, es };

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof en;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "portfolio-lang";

function getInitialLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "es") return stored;
  } catch {
    /* localStorage unavailable */
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* localStorage unavailable */
    }
    document.documentElement.lang = lang;
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextValue = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslation must be used within a LanguageProvider");
  return ctx;
}
