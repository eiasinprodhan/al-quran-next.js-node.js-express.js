const { getDatabase } = require("../config/database");

function searchAyahs(req, res, next) {
  try {
    const { q = "", page = "1", limit = "20" } = req.query;

    const term = q.trim();
    if (term.length < 2) {
      const err = new Error("Query must be at least 2 characters.");
      err.statusCode = 400;
      throw err;
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

    res.json({
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
  } catch (err) {
    next(err);
  }
}

module.exports = { searchAyahs };