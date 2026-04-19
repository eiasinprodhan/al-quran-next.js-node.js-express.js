const { Router } = require("express");
const { getAllSurahs, getSurahById } = require("../controllers/surahController");

const router = Router();

router.get("/", getAllSurahs);
router.get("/:id", getSurahById);

module.exports = router;