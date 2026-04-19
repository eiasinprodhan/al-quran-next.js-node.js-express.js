/**
 * Seed script — fetches the full Quran from api.alquran.cloud
 * and stores it in a local SQLite file.
 *
 * Run once:  npm run seed
 */

require("dotenv").config();
const { getDatabase, closeDatabase } = require("../config/database");

const BASE = "https://api.alquran.cloud/v1";

async function fetchJSON(url) {
  console.log(`  → GET ${url}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const json = await res.json();
  return json.data;
}

async function seed() {
  console.log("\n🕌  Quran DB Seeder\n");

  const db = getDatabase();

  /* ── skip if already seeded ── */
  const { surahCount } = db
    .prepare("SELECT COUNT(*) AS surahCount FROM surahs")
    .get();
  const { ayahCount } = db
    .prepare("SELECT COUNT(*) AS ayahCount FROM ayahs")
    .get();

  if (surahCount === 114 && ayahCount > 6000) {
    console.log("✅  Database already seeded — nothing to do.\n");
    closeDatabase();
    return;
  }

  /* ── fetch from API ── */
  console.log("📡  Fetching data from alquran.cloud …\n");

  const [metaList, arabicQuran, englishQuran] = await Promise.all([
    fetchJSON(`${BASE}/surah`),
    fetchJSON(`${BASE}/quran/quran-uthmani`),
    fetchJSON(`${BASE}/quran/en.sahih`),
  ]);

  /* ── insert in one transaction ── */
  const insertSurah = db.prepare(`
    INSERT OR REPLACE INTO surahs
      (id, name_arabic, name_english, name_transliteration, revelation_type, total_ayahs)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const insertAyah = db.prepare(`
    INSERT OR REPLACE INTO ayahs
      (surah_id, ayah_number, arabic_text, translation_text, juz)
    VALUES (?, ?, ?, ?, ?)
  `);

  const runAll = db.transaction(() => {
    for (const s of metaList) {
      insertSurah.run(
        s.number,
        s.name,
        s.englishName,
        s.englishNameTranslation,
        s.revelationType,
        s.numberOfAyahs
      );
    }

    for (let i = 0; i < arabicQuran.surahs.length; i++) {
      const arSurah = arabicQuran.surahs[i];
      const enSurah = englishQuran.surahs[i];

      for (let j = 0; j < arSurah.ayahs.length; j++) {
        const ar = arSurah.ayahs[j];
        const en = enSurah.ayahs[j];
        insertAyah.run(arSurah.number, ar.numberInSurah, ar.text, en.text, ar.juz);
      }
    }
  });

  runAll();

  const final = db.prepare("SELECT COUNT(*) AS c FROM ayahs").get();
  console.log(`\n✅  Seeded 114 surahs and ${final.c} ayahs.\n`);
  closeDatabase();
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err.message);
  process.exit(1);
});