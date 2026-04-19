import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const surahId = parseInt(id, 10);

    if (isNaN(surahId) || surahId < 1 || surahId > 114) {
      return NextResponse.json(
        { success: false, error: 'Surah ID must be a number between 1 and 114.' },
        { status: 400 }
      );
    }

    const db = getDatabase();

    const surah = db
      .prepare(
        `SELECT id, name_arabic, name_english, name_transliteration,
                revelation_type, total_ayahs
         FROM   surahs
         WHERE  id = ?`
      )
      .get(surahId);

    if (!surah) {
      return NextResponse.json(
        { success: false, error: `Surah ${surahId} not found.` },
        { status: 404 }
      );
    }

    const ayahs = db
      .prepare(
        `SELECT ayah_number, arabic_text, translation_text, juz
         FROM   ayahs
         WHERE  surah_id = ?
         ORDER  BY ayah_number ASC`
      )
      .all(surahId);

    // Strip Bismillah from the first ayah of surahs (except Surah 1 and 9)
    // The Bismillah is redundantly displayed because the header already shows it.
    const cleanedAyahs = ayahs.map((ayah) => {
      if (surahId !== 1 && surahId !== 9 && ayah.ayah_number === 1) {
        // Common Bismillah prefix variations
        const bismillahPrefix = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
        const bismillahPrefixAlt = "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ";
        
        if (ayah.arabic_text.startsWith(bismillahPrefix)) {
          return {
            ...ayah,
            arabic_text: ayah.arabic_text.replace(bismillahPrefix, '').trim()
          };
        } else if (ayah.arabic_text.startsWith(bismillahPrefixAlt)) {
          return {
            ...ayah,
            arabic_text: ayah.arabic_text.replace(bismillahPrefixAlt, '').trim()
          };
        }
      }
      return ayah;
    });

    return NextResponse.json({ success: true, data: { ...surah, ayahs: cleanedAyahs } });
  } catch (error) {
    console.error('API Error (surah id):', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
