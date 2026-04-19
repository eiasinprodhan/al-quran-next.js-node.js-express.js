"use client";

import AyahCard from "@/components/surah/AyahCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { getSurahById } from "@/lib/api";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SurahPage() {
  const { id } = useParams();
  const surahId = parseInt(id, 10);

  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isNaN(surahId) || surahId < 1 || surahId > 114) {
      setError("Invalid surah number.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    getSurahById(surahId)
      .then(setSurah)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [surahId]);

  if (loading) return <LoadingSpinner message="Loading surah…" />;

  if (error) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <p className="text-red-500 font-medium mb-4">{error}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 text-white rounded-xl text-sm font-medium hover:bg-emerald-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Surahs
        </Link>
      </div>
    );
  }

  if (!surah) return null;

  const showBismillah = surahId !== 1 && surahId !== 9;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        All Surahs
      </Link>

      {/* Surah header card */}
      <div className="card p-6 sm:p-8 text-center mb-8">
        {/* Number badge */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-700 text-white font-bold text-xl shadow">
            {surah.id}
          </div>
        </div>

        {/* Arabic name */}
        <div className="mb-6 py-4">
          <h1
            className="font-arabic-amiri text-emerald-900"
            style={{ fontSize: "48px", lineHeight: "1.8" }}
            dir="rtl"
          >
            {surah.name_arabic}
          </h1>
        </div>

        {/* English name */}
        <div className="mb-3">
          <h2 className="text-xl font-semibold text-stone-800">
            {surah.name_english}
          </h2>
        </div>

        {/* Meta info */}
        <div className="mb-4">
          <p className="text-sm text-stone-500">
            {surah.name_transliteration} · {surah.total_ayahs} verses ·{" "}
            {surah.revelation_type}
          </p>
        </div>

        {/* Bismillah */}
        {showBismillah && (
          <div className="mt-6">
            <div className="gold-divider mx-auto max-w-xs" />
            <div className="py-4">
              <p
                className="font-arabic-amiri text-stone-700"
                style={{ fontSize: "30px", lineHeight: "1.8" }}
                dir="rtl"
              >
                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Ayahs */}
      <div className="space-y-4">
        {surah.ayahs.map((ayah) => (
          <AyahCard key={ayah.ayah_number} ayah={ayah} surahId={surah.id} />
        ))}
      </div>

      {/* Prev / Next navigation */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-stone-200">
        {surahId > 1 ? (
          <Link
            href={`/surah/${surahId - 1}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-200 bg-white text-sm font-medium text-stone-700 hover:bg-stone-50 shadow-sm transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Surah
          </Link>
        ) : (
          <span />
        )}

        {surahId < 114 ? (
          <Link
            href={`/surah/${surahId + 1}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 shadow-sm transition-colors"
          >
            Next Surah
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}