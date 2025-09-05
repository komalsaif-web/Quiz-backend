import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// ✅ Get all quizzes
export const getQuizzes = async (req, res) => {
  const { data, error } = await supabase.from("quizzes").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

// ✅ Add a new quiz
export const addQuiz = async (req, res) => {
  const { question, options, correct_option } = req.body;

  const { data, error } = await supabase
    .from("quizzes")
    .insert([{ question, options, correct_option }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

// ✅ Submit quiz answers & calculate result
export const submitQuiz = async (req, res) => {
  const { answers } = req.body; // answers = [{id:1, answer:0}, {id:2, answer:2}]

  let correct = 0;
  let wrong = 0;

  for (let ans of answers) {
    const { data, error } = await supabase
      .from("quizzes")
      .select("correct_option")
      .eq("id", ans.id)
      .single();

    if (!error && data) {
      if (data.correct_option === ans.answer) {
        correct++;
      } else {
        wrong++;
      }
    }
  }

  res.json({ correct, wrong, total: answers.length });
};
