require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const corsMiddleware = require("./middleware/corsMiddleware");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");
const surahRoutes = require("./routes/surahRoutes");
const searchRoutes = require("./routes/searchRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

/* ── Security ── */
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(corsMiddleware);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      error: { message: "Too many requests — try again later." },
    },
  })
);

/* ── Logging & parsing ── */
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));
app.use(express.json());

/* ── Routes ── */
app.get("/api/health", (_req, res) =>
  res.json({ success: true, message: "OK", ts: new Date().toISOString() })
);
app.use("/api/surahs", surahRoutes);
app.use("/api/search", searchRoutes);

/* ── Error handling ── */
app.use(notFoundHandler);
app.use(errorHandler);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n🚀  Backend running → http://localhost:${PORT}`);
    console.log(`   Health check  → http://localhost:${PORT}/api/health\n`);
  });
}

module.exports = app;