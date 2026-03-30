import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import crmRoutes from "./routes/crm";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 4000;

// Add a Root Welcome Route for straightforward Health checks
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Codegnan Ecosystem API Structure. The server is healthy and routing." });
});

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(cors({ origin: frontendUrl, credentials: true }));
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
  })
);
app.use(morgan("dev"));
app.use(express.json());

// Main API Routes
app.use("/api", crmRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Start server on 0.0.0.0 (all network interfaces) for cross-device access
app.listen(Number(port), "0.0.0.0", () => {
  console.log(`🚀 Backend server ready at 0.0.0.0:${port}`);
  console.log(`🔗 Accepting requests from: ${frontendUrl}`);
});

export { prisma };
