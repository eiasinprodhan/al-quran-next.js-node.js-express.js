"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

export default function SearchBar({ onSearch, defaultValue = "" }) {
  const [q, setQ] = useState(defaultValue);

  const submit = (e) => {
    e.preventDefault();
    const trimmed = q.trim();
    if (trimmed.length >= 2) onSearch(trimmed);
  };

  const clear = () => {
    setQ("");
    onSearch("");
  };

  return (
    <form onSubmit={submit} className="relative max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder='Search translation — e.g. "patience", "mercy", "paradise"'
        className="w-full pl-12 pr-28 py-4 bg-white border border-stone-200 rounded-2xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
        {q && (
          <button
            type="button"
            onClick={clear}
            className="p-2 text-stone-400 hover:text-stone-600 transition-colors"
            aria-label="Clear"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium rounded-xl transition-colors shadow"
        >
          Search
        </button>
      </div>
    </form>
  );
}