import questions from "../data/questions";
import { shuffle } from "../utils/random";

export function getCategories() {
  return [...new Set(questions.map(q => q.category))].sort();
}

export function getRandomQuestionsByCategory(category, count = 15) {
  const pool = category === "Mix"
    ? questions
    : questions.filter(q => q.category === category);

  return shuffle(pool).slice(0, Math.min(count, pool.length));
}
