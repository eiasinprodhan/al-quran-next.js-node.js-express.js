import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '20';

    const term = q.trim();
    if (term.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Query must be at least 2 characters.' },
        { status: 400 }
      );
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 20));
    const offset = (pageNum - 1) * limitNum;
    const pattern = `%${term}%`;

    const db = getDatabase();

    const { total } = db
      .prepare(
        `SELECT COUNT(*) AS total
         FROM   ayahs  a
         JOIN   surahs s ON s.id = a.surah_id
         WHERE  a.translation_text LIKE ?`
      )
      .get(pattern);

    const rows = db
      .prepare(
        `SELECT a.surah_id, a.ayah_number,
                a.arabic_text, a.translation_text,
                s.name_arabic, s.name_english, s.name_transliteration
         FROM   ayahs  a
         JOIN   surahs s ON s.id = a.surah_id
         WHERE  a.translation_text LIKE ?
         ORDER  BY a.surah_id, a.ayah_number
         LIMIT  ? OFFSET ?`
      )
      .all(pattern, limitNum, offset);

    const totalPages = Math.ceil(total / limitNum);

    return NextResponse.json({
      success: true,
      query: term,
      data: rows,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalResults: total,
        limit: limitNum,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
    });
  } catch (error) {
    console.error('API Error (search):', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
