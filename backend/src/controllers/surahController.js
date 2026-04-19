const { getDatabase } = require("../config/database");

function getAllSurahs(req, res, next) {
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

    res.json({ success: true, total: surahs.length, data: surahs });
  } catch (err) {
    next(err);
  }
}

function getSurahById(req, res, next) {
  try {
    const surahId = parseInt(req.params.id, 10);

    if (isNaN(surahId) || surahId < 1 || surahId > 114) {
      const err = new Error("Surah ID must be a number between 1 and 114.");
      err.statusCode = 400;
      throw err;
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
      const err = new Error(`Surah ${surahId} not found.`);
      err.statusCode = 404;
      throw err;
    }

    const ayahs = db
      .prepare(
        `SELECT ayah_number, arabic_text, translation_text, juz
         FROM   ayahs
         WHERE  surah_id = ?
         ORDER  BY ayah_number ASC`
      )
      .all(surahId);

    res.json({ success: true, data: { ...surah, ayahs } });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllSurahs, getSurahById };