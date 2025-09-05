import express from "express";
import { getQuizzes, addQuiz, submitQuiz } from "../controllers/quizController.js";

const router = express.Router();

router.get("/", getQuizzes);        // Get all quizzes
router.post("/", addQuiz);          // Add a quiz
router.post("/submit", submitQuiz); // Submit answers & get result

export default router;
