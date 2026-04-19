import Link from "next/link";

const REVELATION_COLORS = {
  Meccan: "bg-amber-50 text-amber-700",
  Medinan: "bg-sky-50 text-sky-700",
};

export default function SurahCard({ surah }) {
  return (
    <Link href={`/surah/${surah.id}`}>
      <article className="card p-4 flex items-center gap-4 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
        {/* Number */}
        <div className="shrink-0 w-11 h-11 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-semibold text-sm shadow group-hover:bg-emerald-800 transition-colors">
          {surah.id}
        </div>

        {/* English info */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-stone-900 text-sm truncate">
            {surah.name_english}
          </p>
          <p className="text-xs text-stone-500 truncate">
            {surah.name_transliteration} &bull; {surah.total_ayahs} verses
          </p>
          <span
            className={`badge mt-1 text-[10px] ${
              REVELATION_COLORS[surah.revelation_type] ??
              "bg-stone-100 text-stone-600"
            }`}
          >
            {surah.revelation_type}
          </span>
        </div>

        {/* Arabic name */}
        <div className="shrink-0 text-right">
          <p
            className="font-arabic-amiri text-2xl text-emerald-800 leading-none"
            dir="rtl"
          >
            {surah.name_arabic}
          </p>
        </div>
      </article>
    </Link>
  );
}