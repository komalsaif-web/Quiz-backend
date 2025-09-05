import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import quizRoutes from "./routes/quizRoutes.js";

dotenv.config();

const app = express();

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.use(cors());
app.use(express.json());

// Root route
app.get("/", async (req, res) => {
  // Test Supabase connection
  const { data, error } = await supabase.from("quizzes").select("*").limit(1);

  if (error) {
    console.error("❌ Supabase connection failed:", error.message);
    return res.send("Supabase connection failed! Check console.");
  }

  console.log("✅ Supabase connected successfully!");
  res.send("🚀 Quiz Backend API is running and connected to Supabase!");
});

// Quiz API routes
app.use("/api/quizzes", quizRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
