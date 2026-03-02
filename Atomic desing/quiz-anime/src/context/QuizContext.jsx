import { createContext, useContext, useMemo, useState } from "react";

const QuizContext = createContext(null);

export function QuizProvider({ children }) {
  const [session, setSession] = useState({
    category: null,
    questions: [],
    answers: [], // {id, chosenIndex, correctIndex, isCorrect}
    score: 0,
  });

  const api = useMemo(() => ({
    session,
    start: ({ category, questions }) => setSession({
      category,
      questions,
      answers: [],
      score: 0,
    }),
    answer: ({ qid, chosenIndex, correctIndex }) => setSession(prev => {
      const already = prev.answers.some(a => a.id === qid);
      if (already) return prev;
      const isCorrect = chosenIndex === correctIndex;
      const answers = [...prev.answers, { id: qid, chosenIndex, correctIndex, isCorrect }];
      const score = answers.filter(a => a.isCorrect).length;
      return { ...prev, answers, score };
    }),
    reset: () => setSession({ category: null, questions: [], answers: [], score: 0 })
  }), [session]);

  return <QuizContext.Provider value={api}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz debe usarse dentro de QuizProvider");
  return ctx;
}
