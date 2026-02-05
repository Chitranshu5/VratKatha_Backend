import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { connectToDatabase } from "./model/db.js";

dotenv.config();

const app = express();

/* =========================
   RAILWAY TRUST PROXY
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
   SERVER
========================= */
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

/* =========================
   START SERVER FIRST
========================= */
server.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);

  // Connect DB AFTER server is live
  connectToDatabase()
    .then(() => {
      console.log("✅ MongoDB connected");
    })
    .catch((err) => {
      console.error("❌ MongoDB connection failed:", err.message);
    });
});
