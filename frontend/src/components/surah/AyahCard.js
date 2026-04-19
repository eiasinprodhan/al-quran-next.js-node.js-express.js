"use client";

import { useSettings } from "@/context/SettingsContext";

export default function AyahCard({ ayah, surahId }) {
  const { settings, arabicFontClass } = useSettings();

  return (
    <article className="card p-5 sm:p-6 animate-fade-up">
      {/* Header row */}
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-emerald-50 text-emerald-800 text-sm font-semibold border border-emerald-100">
          {ayah.ayah_number}
        </span>
        <span className="text-xs text-stone-400">
          {surahId}:{ayah.ayah_number}
        </span>
        {ayah.juz && (
          <span className="ml-auto badge bg-stone-100 text-stone-500">
            Juz {ayah.juz}
          </span>
        )}
      </div>

      {/* Arabic */}
      <p
        className={`${arabicFontClass} text-stone-900 text-right leading-[2.2] mb-4`}
        style={{ fontSize: settings.arabicFontSize }}
        dir="rtl"
      >
        {ayah.arabic_text}
      </p>

      <div className="border-t border-stone-100 mb-4" />

      {/* Translation */}
      <p
        className="text-stone-600 leading-relaxed"
        style={{ fontSize: settings.translationFontSize }}
      >
        {ayah.translation_text}
      </p>
    </article>
  );
}