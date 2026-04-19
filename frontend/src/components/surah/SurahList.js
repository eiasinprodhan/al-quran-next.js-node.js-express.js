"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import SurahCard from "./SurahCard";

const TYPES = ["All", "Meccan", "Medinan"];

export default function SurahList({ surahs }) {
  const [filter, setFilter] = useState("");
  const [type, setType] = useState("All");

  const filtered = useMemo(
    () =>
      surahs.filter((s) => {
        const q = filter.trim().toLowerCase();
        const matchesText =
          !q ||
          s.name_english.toLowerCase().includes(q) ||
          s.name_transliteration.toLowerCase().includes(q) ||
          String(s.id) === filter.trim();

        const matchesType =
          type === "All" || s.revelation_type === type;

        return matchesText && matchesType;
      }),
    [surahs, filter, type]
  );

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search by name or number…"
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
          />
        </div>

        {/* Type tabs */}
        <div className="flex gap-1 bg-white border border-stone-200 rounded-xl p-1 shrink-0">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                type === t
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-stone-400 mb-4">
        Showing <strong className="text-stone-600">{filtered.length}</strong>{" "}
        of {surahs.length} surahs
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {filtered.map((s) => (
            <SurahCard key={s.id} surah={s} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-stone-400">
          No surahs match your filter.
        </div>
      )}
    </div>
  );
}