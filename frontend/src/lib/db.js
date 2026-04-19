import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const isNetlify = !!process.env.NETLIFY || !!process.env.LAMBDA_TASK_ROOT;

let db = null;

function findDatabasePath() {
  // We specify multiple paths as a fallback strategy.
  // On Netlify, process.cwd() should point to the root of the site (the 'frontend' folder if base is frontend).
  const possiblePaths = [
    path.resolve(process.cwd(), 'quran.db'),
    path.resolve('/var/task', 'quran.db'),
    path.resolve('/var/task/frontend', 'quran.db'),
    path.resolve(process.cwd(), 'public', 'quran.db'),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p) && fs.statSync(p).isFile()) {
      return p;
    }
  }

  throw new Error(`quran.db not found. Searched in: ${possiblePaths.join(', ')}. CWD: ${process.cwd()}`);
}

export function getDatabase() {
  if (!db) {
    const DB_PATH = findDatabasePath();
    
    try {
      // fileMustExist: true ensures we don't accidentally create an empty database
      db = new Database(DB_PATH, { 
        readonly: true, // Permanent readonly for both local and prod to avoid journal issues
        fileMustExist: true 
      });
      
      db.pragma('foreign_keys = ON');
      // journal_mode is already set to DELETE via the preparation script
      
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw new Error(`SQLite Connection Error: ${error.message} (Path: ${DB_PATH})`);
    }
  }
  return db;
}

export function closeDatabase() {
  if (db) {
    db.close();
    db = null;
  }
}
