"use client";

import { useSettings } from "@/context/SettingsContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

/** Wraps matched substrings in a <mark> */
function Highlighted({ text, query }) {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-amber-200 text-stone-900 rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function SearchResults({ results, query, pagination, onPage }) {
  const { settings, arabicFontClass } = useSettings();

  if (!results.length) {
    return (
      <div className="text-center py-20 text-stone-400 space-y-2">
        <p className="text-lg font-medium">No results found</p>
        <p className="text-sm">Try a different search term</p>
      </div>
    );
  }

  return (
    <div>
      {/* Summary */}
      <p className="text-sm text-stone-500 text-center mb-6">
        <strong className="text-stone-800">{pagination.totalResults}</strong>{" "}
        results for{" "}
        <strong className="text-emerald-700">&ldquo;{query}&rdquo;</strong>
      </p>

      {/* Result cards */}
      <div className="space-y-3">
        {results.map((r, i) => (
          <Link
            key={`${r.surah_id}-${r.ayah_number}-${i}`}
            href={`/surah/${r.surah_id}`}
          >
            <article className="card p-5 hover:shadow-md transition-shadow cursor-pointer mb-3">
              {/* Row: reference + Arabic surah name */}
              <div className="flex items-center justify-between mb-3 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="badge bg-emerald-50 text-emerald-800 shrink-0">
                    {r.surah_id}:{r.ayah_number}
                  </span>
                  <span className="text-sm font-medium text-stone-700 truncate">
                    {r.name_english}
                  </span>
                  <span className="text-xs text-stone-400 hidden sm:inline truncate">
                    ({r.name_transliteration})
                  </span>
                </div>
                <span
                  className="font-arabic-amiri text-xl text-emerald-700 shrink-0"
                  dir="rtl"
                >
                  {r.name_arabic}
                </span>
              </div>

              {/* Arabic ayah (smaller cap to keep card tidy) */}
              <p
                className={`${arabicFontClass} text-stone-800 text-right leading-[2] mb-3`}
                style={{
                  fontSize: Math.min(settings.arabicFontSize, 22),
                }}
                dir="rtl"
              >
                {r.arabic_text}
              </p>

              <div className="border-t border-stone-100 mb-3" />

              {/* Translation with highlight */}
              <p
                className="text-stone-600 leading-relaxed"
                style={{ fontSize: settings.translationFontSize }}
              >
                <Highlighted text={r.translation_text} query={query} />
              </p>
            </article>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => onPage(pagination.currentPage - 1)}
            disabled={!pagination.hasPrevPage}
            className="flex items-center gap-1 px-4 py-2 rounded-xl border border-stone-200 bg-white text-sm font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>

          <span className="text-sm text-stone-500">
            {pagination.currentPage} / {pagination.totalPages}
          </span>

          <button
            onClick={() => onPage(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage}
            className="flex items-center gap-1 px-4 py-2 rounded-xl border border-stone-200 bg-white text-sm font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}