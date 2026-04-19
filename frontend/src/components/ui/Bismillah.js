'use client';

import { useSettings } from '@/context/SettingsContext';

export default function Bismillah() {
  const { getArabicFontClass, settings } = useSettings();

  return (
    <div className="text-center py-6">
      <p
        className={`${getArabicFontClass()} text-stone-700 leading-loose`}
        style={{ fontSize: `${settings.arabicFontSize + 4}px` }}
        dir="rtl"
      >
        بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
      </p>
      <div className="ornament-divider mt-4 max-w-xs mx-auto">
        <span className="text-gold-500">✦</span>
      </div>
    </div>
  );
}