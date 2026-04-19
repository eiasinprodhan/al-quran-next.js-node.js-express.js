"use client";

import SurahList from "@/components/surah/SurahList";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { getAllSurahs } from "@/lib/api";
import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllSurahs()
      .then(setSurahs)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner message="Loading surahs…" />;

  if (error) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <p className="text-red-500 font-medium mb-2">{error}</p>
        <p className="text-stone-400 text-sm mb-4">
          Make sure the backend is running on{" "}
          <code className="bg-stone-100 px-1 rounded">
            http://localhost:5000
          </code>
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 bg-emerald-700 text-white rounded-xl text-sm font-medium hover:bg-emerald-800 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-medium px-3 py-1 rounded-full">
            <BookOpen className="w-3.5 h-3.5" />
            <span>114 Surahs · 6,236 Ayahs</span>
          </span>
        </div>

        <div className="mb-6 py-4">
          <h1
            className="font-arabic-amiri text-emerald-900"
            style={{ fontSize: "48px", lineHeight: "1.8" }}
            dir="rtl"
          >
            ٱلْقُرْآنُ ٱلْكَرِيمُ
          </h1>
        </div>

        <div>
          <p className="text-stone-500 max-w-md mx-auto text-base">
            Read, search, and reflect on every verse of the Noble Quran.
          </p>
        </div>
      </div>

      <SurahList surahs={surahs} />
    </div>
  );
}