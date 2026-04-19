const { Router } = require("express");
const { searchAyahs } = require("../controllers/searchController");

const router = Router();

router.get("/", searchAyahs);

module.exports = router;