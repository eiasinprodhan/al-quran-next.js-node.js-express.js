const cors = require("cors");
require("dotenv").config();

const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  "https://al-quran-task.netlify.app",
  "http://localhost:3000",
  "http://localhost:3001",
];

const corsOptions = {
  origin(origin, callback) {
    // allow REST clients (Postman, curl) that send no Origin header
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  methods: ["GET"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
  maxAge: 86400,
};

module.exports = cors(corsOptions);