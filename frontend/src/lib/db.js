import Database from 'better-sqlite3';
import path from 'path';

const isNetlify = !!process.env.NETLIFY || !!process.env.LAMBDA_TASK_ROOT;
const DB_PATH = path.resolve(
  process.env.DB_PATH || path.join(process.cwd(), 'quran.db')
);

let db = null;

export function getDatabase() {
  if (!db) {
    // In Netlify serverless functions, the file system is read-only
    db = new Database(DB_PATH, { readonly: isNetlify });
    
    if (!isNetlify) {
      db.pragma('journal_mode = WAL');
    }
    db.pragma('foreign_keys = ON');
    
    // Standard initialization if not in production
    if (!isNetlify) {
      initializeTables(db);
    }
  }
  return db;
}

function initializeTables(dbInstance) {
  dbInstance.exec(`
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

export function closeDatabase() {
  if (db) {
    db.close();
    db = null;
  }
}
