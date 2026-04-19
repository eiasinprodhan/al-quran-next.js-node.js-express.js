import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export async function GET() {
  try {
    const db = getDatabase();
    const surahs = db
      .prepare(
        `SELECT id, name_arabic, name_english, name_transliteration,
                revelation_type, total_ayahs
         FROM   surahs
         ORDER  BY id ASC`
      )
      .all();

    return NextResponse.json({ success: true, total: surahs.length, data: surahs });
  } catch (error) {
    console.error('API Error (surah):', error);
    return NextResponse.json(
      { success: false, error: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}
