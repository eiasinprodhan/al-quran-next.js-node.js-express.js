"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const STORAGE_KEY = "quran-settings";

const DEFAULTS = {
  arabicFont: "amiri",       // amiri | scheherazade | noto
  arabicFontSize: 30,        // px, 20-52
  translationFontSize: 16,   // px, 12-26
};

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULTS);
  const [ready, setReady] = useState(false);

  /* Load from localStorage once on mount */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings((prev) => ({ ...prev, ...JSON.parse(raw) }));
    } catch {
      // ignore parse errors
    }
    setReady(true);
  }, []);

  /* Persist whenever settings change (after initial load) */
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore quota errors
    }
  }, [settings, ready]);

  const update = useCallback((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => setSettings(DEFAULTS), []);

  const arabicFontClass = {
    amiri: "font-arabic-amiri",
    scheherazade: "font-arabic-scheherazade",
    noto: "font-arabic-noto",
  }[settings.arabicFont] ?? "font-arabic-amiri";

  return (
    <SettingsContext.Provider
      value={{ settings, update, reset, arabicFontClass, ready }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be inside <SettingsProvider>");
  return ctx;
}