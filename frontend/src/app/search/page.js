"use client";

import SearchBar from "@/components/search/SearchBar";
import SearchResults from "@/components/search/SearchResults";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { searchAyahs } from "@/lib/api";
import { Search } from "lucide-react";
import { useCallback, useState } from "react";

export default function SearchPage() {
  const [state, setState] = useState({
    results: null,
    pagination: null,
    query: "",
    loading: false,
    error: null,
  });

  const doSearch = useCallback(async (query, page = 1) => {
    if (!query) {
      setState({ results: null, pagination: null, query: "", loading: false, error: null });
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null, query }));

    try {
      const res = await searchAyahs(query, page);
      setState({
        results: res.data,
        pagination: res.pagination,
        query: res.query,
        loading: false,
        error: null,
      });
    } catch (e) {
      setState((prev) => ({ ...prev, loading: false, error: e.message }));
    }
  }, []);

  const handlePage = useCallback(
    (page) => {
      doSearch(state.query, page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [state.query, doSearch]
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-8 gap-3">
        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-medium px-3 py-1 rounded-full">
          <Search className="w-3.5 h-3.5" />
          <span>Search</span>
        </span>

        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">
          Search the Quran
        </h1>

        <p className="text-stone-500 text-sm">
          Search through English translations of all 6,236 verses
        </p>
      </div>

      <SearchBar onSearch={doSearch} defaultValue={state.query} />

      <div className="mt-10">
        {state.loading && <LoadingSpinner message="Searching…" />}

        {!state.loading && state.error && (
          <p className="text-center text-red-500 py-8">{state.error}</p>
        )}

        {!state.loading && !state.error && state.results && (
          <SearchResults
            results={state.results}
            query={state.query}
            pagination={state.pagination}
            onPage={handlePage}
          />
        )}

        {!state.loading && !state.error && !state.results && (
          <div className="flex flex-col items-center text-center py-20 text-stone-400 gap-2">
            <Search className="w-12 h-12 opacity-20" />
            <p className="text-lg">Enter a word or phrase above</p>
            <p className="text-sm">
              Try &ldquo;mercy&rdquo;, &ldquo;patience&rdquo;, &ldquo;forgiveness&rdquo;, &ldquo;paradise&rdquo;
            </p>
          </div>
        )}
      </div>
    </div>
  );
}