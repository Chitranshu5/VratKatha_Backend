import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { connectToDatabase } from "./model/db.js";

dotenv.config();

console.log("🔥 Server file started");

const app = express();
app.set("trust proxy", 1);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || true,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ success: true, message: "🚀 Server is running successfully" });
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server listening on ${PORT}`);

  connectToDatabase()
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) =>
      console.error("❌ MongoDB connection failed:", err.message)
    );
});
