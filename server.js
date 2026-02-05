import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { connectToDatabase } from "./model/db.js";

dotenv.config();

const app = express();

/* =========================
   TRUST PROXY (Railway)
========================= */
app.set("trust proxy", 1);

/* =========================
   MIDDLEWARES
========================= */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || true,
    credentials: true,
  })
);

/* =========================
   ROUTES
========================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Server is running successfully",
  });
});

/* =========================
   SERVER SETUP (HTTP)
========================= */
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

/* =========================
   START SERVER
========================= */
const startServer = async () => {
  try {
    await connectToDatabase();
    server.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
