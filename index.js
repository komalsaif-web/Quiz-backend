import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import quizRoutes from "./routes/quizRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route (friendly message)
app.get("/", (req, res) => {
  res.send("🚀 Quiz Backend API is running!");
});

// Quiz API routes
app.use("/api/quizzes", quizRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
