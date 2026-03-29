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

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
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

// Start server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});

export { prisma };
