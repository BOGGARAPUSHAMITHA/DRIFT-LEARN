import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  topic: string;
  difficulty: string;
  questions: QuizQuestion[];
}

export interface QuizAttemptRow {
  id: string;
  quiz_id: string;
  student_id: string;
  answers: number[];
  score: number;
  total: number;
  time_taken: number;
  created_at: string;
}

export function useQuizzes() {
  return useQuery({
    queryKey: ["quizzes"],
    queryFn: async (): Promise<Quiz[]> => {
      const { data, error } = await supabase
        .from("quizzes")
        .select("*")
        .order("topic");
      if (error) throw error;
      return (data || []).map((q) => ({
        id: q.id,
        title: q.title,
        topic: q.topic,
        difficulty: q.difficulty,
        questions: q.questions as unknown as QuizQuestion[],
      }));
    },
  });
}

export function useQuiz(id: string | undefined) {
  return useQuery({
    queryKey: ["quiz", id],
    enabled: !!id,
    queryFn: async (): Promise<Quiz | null> => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("quizzes")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return {
        id: data.id,
        title: data.title,
        topic: data.topic,
        difficulty: data.difficulty,
        questions: data.questions as unknown as QuizQuestion[],
      };
    },
  });
}

export function useMyAttempts(studentId: string | undefined) {
  return useQuery({
    queryKey: ["quiz-attempts", studentId],
    enabled: !!studentId,
    queryFn: async (): Promise<QuizAttemptRow[]> => {
      if (!studentId) return [];
      const { data, error } = await supabase
        .from("quiz_attempts")
        .select("*")
        .eq("student_id", studentId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []).map((a) => ({
        ...a,
        answers: a.answers as unknown as number[],
      }));
    },
  });
}
