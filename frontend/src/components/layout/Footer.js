import { BookOpen, ExternalLink, Github, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />

      <div className="bg-gradient-to-b from-white to-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Main footer content */}
          <div className="py-12">
            {/* Islamic ornament */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 shadow-lg shadow-emerald-500/20 mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>

              <div className="py-3">
                <p
                  className="font-arabic-amiri text-emerald-900"
                  style={{ fontSize: "36px", lineHeight: "1.8" }}
                  dir="rtl"
                >
                  ٱلْقُرْآنُ ٱلْكَرِيمُ
                </p>
              </div>

              <p className="text-stone-500 text-sm max-w-sm mx-auto leading-relaxed">
                The Noble Quran — Read, reflect, and find peace in every verse
              </p>
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <Link
                href="/"
                className="px-4 py-2 rounded-xl text-sm font-medium text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200"
              >
                All Surahs
              </Link>
              <span className="w-1 h-1 rounded-full bg-stone-300" />
              <Link
                href="/search"
                className="px-4 py-2 rounded-xl text-sm font-medium text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200"
              >
                Search Ayahs
              </Link>
              <span className="w-1 h-1 rounded-full bg-stone-300" />
              <Link
                href="/surah/1"
                className="px-4 py-2 rounded-xl text-sm font-medium text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200"
              >
                Al-Fatiha
              </Link>
              <span className="w-1 h-1 rounded-full bg-stone-300" />
              <Link
                href="/surah/36"
                className="px-4 py-2 rounded-xl text-sm font-medium text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200"
              >
                Ya-Sin
              </Link>
            </div>

            {/* Decorative divider */}
            <div className="flex items-center gap-4 max-w-xs mx-auto mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-300" />
              <span className="text-amber-400 text-lg">✦</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-300" />
            </div>

            {/* Credits */}
            <div className="text-center space-y-3">
              <p className="text-stone-400 text-xs">
                Translation: Sahih International · Data:{" "}
                <a
                  href="https://alquran.cloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 hover:underline"
                >
                  alquran.cloud
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>

              <p className="text-stone-400 text-xs flex items-center justify-center gap-1.5">
                Built with
                <Heart className="w-3 h-3 text-red-400 fill-red-400" />
                using Next.js & Express
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-stone-200/60 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="text-stone-300 text-xs">
                © {new Date().getFullYear()} QuranApp. For educational purposes.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-300 hover:text-stone-500 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400" />
    </footer>
  );
}