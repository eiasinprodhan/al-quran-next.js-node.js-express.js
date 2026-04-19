"use client";

import { useSettings } from "@/context/SettingsContext";
import { RotateCcw } from "lucide-react";

const FONTS = [
  {
    value: "amiri",
    label: "Amiri",
    className: "font-arabic-amiri",
  },
  {
    value: "scheherazade",
    label: "Scheherazade New",
    className: "font-arabic-scheherazade",
  },
  {
    value: "noto",
    label: "Noto Naskh Arabic",
    className: "font-arabic-noto",
  },
];

const PREVIEW_ARABIC = "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ";
const PREVIEW_EN =
  "In the name of Allah, the Entirely Merciful, the Especially Merciful.";

function SectionTitle({ children }) {
  return (
    <h3 className="text-[11px] font-semibold text-stone-400 uppercase tracking-widest mb-3">
      {children}
    </h3>
  );
}

function SizeSlider({ label, value, min, max, step = 1, onChange }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-stone-700">{label}</span>
        <span className="text-xs font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">
          {value}px
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 appearance-none rounded-full bg-stone-200 accent-emerald-600 cursor-pointer"
      />
      <div className="flex justify-between text-[10px] text-stone-400">
        <span>Smaller</span>
        <span>Larger</span>
      </div>
    </div>
  );
}

export default function SettingsPanel() {
  const { settings, update, reset, arabicFontClass } = useSettings();

  return (
    <div className="p-6 space-y-8">
      {/* ── Font family ── */}
      <section>
        <SectionTitle>Arabic Font</SectionTitle>
        <div className="space-y-2">
          {FONTS.map((f) => {
            const selected = settings.arabicFont === f.value;
            return (
              <button
                key={f.value}
                onClick={() => update("arabicFont", f.value)}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                  selected
                    ? "border-emerald-600 bg-emerald-50"
                    : "border-stone-200 bg-white hover:border-stone-300"
                }`}
              >
                <span className="block text-xs font-medium text-stone-500 mb-1">
                  {f.label}
                </span>
                <span
                  className={`${f.className} text-xl text-stone-800`}
                  dir="rtl"
                >
                  {PREVIEW_ARABIC}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Font sizes ── */}
      <section className="space-y-6">
        <SectionTitle>Font Sizes</SectionTitle>

        <SizeSlider
          label="Arabic text"
          value={settings.arabicFontSize}
          min={20}
          max={52}
          step={2}
          onChange={(v) => update("arabicFontSize", v)}
        />

        <SizeSlider
          label="Translation"
          value={settings.translationFontSize}
          min={12}
          max={26}
          onChange={(v) => update("translationFontSize", v)}
        />
      </section>

      {/* ── Live preview ── */}
      <section>
        <SectionTitle>Preview</SectionTitle>
        <div className="card p-4 space-y-3">
          <p
            className={`${arabicFontClass} text-stone-900 text-right leading-loose`}
            style={{ fontSize: settings.arabicFontSize }}
            dir="rtl"
          >
            {PREVIEW_ARABIC}
          </p>
          <div className="border-t border-stone-100" />
          <p
            className="text-stone-600 leading-relaxed"
            style={{ fontSize: settings.translationFontSize }}
          >
            {PREVIEW_EN}
          </p>
        </div>
      </section>

      {/* ── Reset ── */}
      <section className="pt-2 border-t border-stone-100">
        <button
          onClick={reset}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-medium transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset to defaults
        </button>
      </section>
    </div>
  );
}