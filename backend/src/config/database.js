const Database = require("better-sqlite3");
const path = require("path");
require("dotenv").config();

const isNetlify = !!process.env.NETLIFY || !!process.env.LAMBDA_TASK_ROOT;
const DB_PATH = path.resolve(
  process.env.DB_PATH || path.join(process.cwd(), "quran.db")
);

let db = null;

function getDatabase() {
  if (!db) {
    db = new Database(DB_PATH, { readonly: isNetlify });
    if (!isNetlify) {
      db.pragma("journal_mode = WAL");
    }
    db.pragma("foreign_keys = ON");
    if (!isNetlify) {
      initializeTables();
    }
  }
  return db;
}

function initializeTables() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS surahs (
      id                   INTEGER PRIMARY KEY,
      name_arabic          TEXT NOT NULL,
      name_english         TEXT NOT NULL,
      name_transliteration TEXT NOT NULL,
      revelation_type      TEXT NOT NULL,
      total_ayahs          INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS ayahs (
      id               INTEGER PRIMARY KEY AUTOINCREMENT,
      surah_id         INTEGER NOT NULL,
      ayah_number      INTEGER NOT NULL,
      arabic_text      TEXT NOT NULL,
      translation_text TEXT NOT NULL,
      juz              INTEGER DEFAULT 1,
      FOREIGN KEY (surah_id) REFERENCES surahs(id),
      UNIQUE(surah_id, ayah_number)
    );

    CREATE INDEX IF NOT EXISTS idx_ayahs_surah_id
      ON ayahs(surah_id);

    CREATE INDEX IF NOT EXISTS idx_ayahs_translation
      ON ayahs(translation_text);
  `);
}

function closeDatabase() {
  if (db) {
    db.close();
    db = null;
  }
}

module.exports = { getDatabase, closeDatabase };