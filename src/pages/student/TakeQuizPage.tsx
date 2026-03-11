import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { useQuiz } from "@/hooks/use-quizzes";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock, ChevronLeft, ChevronRight, CheckCircle2, XCircle, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function TakeQuizPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: quiz, isLoading } = useQuiz(id);

  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!started || submitted) return;
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, [started, submitted]);

  const handleStart = useCallback(() => {
    if (!quiz) return;
    setAnswers(new Array(quiz.questions.length).fill(null));
    setCurrentQ(0);
    setElapsed(0);
    setSubmitted(false);
    setStarted(true);
  }, [quiz]);

  const handleSubmit = useCallback(async () => {
    if (!quiz || !user || submitting) return;
    setSubmitting(true);
    const score = answers.filter((a, i) => a === quiz.questions[i].correctAnswer).length;

    const { error } = await supabase.from("quiz_attempts").insert({
      quiz_id: quiz.id,
      student_id: user.id,
      answers: answers.map(a => a ?? -1),
      score,
      total: quiz.questions.length,
      time_taken: elapsed,
    });

    if (error) {
      toast.error("Failed to save quiz attempt");
      console.error(error);
      setSubmitting(false);
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["quiz-attempts"] });
    setSubmitted(true);
    setSubmitting(false);
  }, [quiz, user, answers, elapsed, submitting, queryClient]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!quiz) return <div className="text-muted-foreground">Quiz not found.</div>;

  // Pre-start screen
  if (!started) {
    return (
      <div className="max-w-lg mx-auto mt-12 space-y-6">
        <Button variant="ghost" size="sm" onClick={() => navigate("/student/quizzes")} className="text-muted-foreground">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>{quiz.title}</CardTitle>
            <div className="flex gap-2 mt-1">
              <Badge variant="outline">{quiz.topic}</Badge>
              <Badge variant="outline">{quiz.difficulty}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{quiz.questions.length} multiple-choice questions</p>
            <Button onClick={handleStart} className="w-full">Start Quiz</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const q = quiz.questions[currentQ];
  const progress = ((currentQ + 1) / quiz.questions.length) * 100;
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  // Result screen
  if (submitted) {
    const score = answers.filter((a, i) => a === quiz.questions[i].correctAnswer).length;
    const pct = Math.round((score / quiz.questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Button variant="ghost" size="sm" onClick={() => navigate("/student/quizzes")} className="text-muted-foreground">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Quizzes
        </Button>
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Quiz Complete!</CardTitle>
            <p className="text-sm text-muted-foreground">{quiz.title}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className={`text-3xl font-bold ${pct >= 60 ? "text-primary" : "text-[hsl(var(--chart-5))]"}`}>{pct}%</p>
                <p className="text-xs text-muted-foreground">Score</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">{score}/{quiz.questions.length}</p>
                <p className="text-xs text-muted-foreground">Correct</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">{minutes}:{seconds.toString().padStart(2, "0")}</p>
                <p className="text-xs text-muted-foreground">Time</p>
              </div>
            </div>

            {pct < 60 && (
              <div className="rounded-md border border-[hsl(var(--chart-4))]/30 bg-[hsl(var(--chart-4))]/5 p-3">
                <p className="text-xs text-[hsl(var(--chart-4))]">💡 We recommend practicing more <strong>{quiz.topic}</strong> problems and retaking this quiz.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detailed review */}
        <div className="space-y-3">
          {quiz.questions.map((question, i) => {
            const correct = answers[i] === question.correctAnswer;
            return (
              <Card key={question.id} className={`bg-card border-border ${correct ? "border-l-2 border-l-primary" : "border-l-2 border-l-[hsl(var(--chart-5))]"}`}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    {correct ? <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /> : <XCircle className="h-4 w-4 text-[hsl(var(--chart-5))] mt-0.5 shrink-0" />}
                    <p className="text-sm font-medium text-foreground">{i + 1}. {question.question}</p>
                  </div>
                  <div className="ml-6 space-y-1">
                    {question.options.map((opt, oi) => (
                      <p key={oi} className={`text-xs ${oi === question.correctAnswer ? "text-primary font-medium" : oi === answers[i] && !correct ? "text-[hsl(var(--chart-5))] line-through" : "text-muted-foreground"}`}>
                        {String.fromCharCode(65 + oi)}. {opt}
                      </p>
                    ))}
                    <p className="text-xs text-muted-foreground italic mt-1">{question.explanation}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex gap-3">
          <Button onClick={handleStart} variant="outline">Retake Quiz</Button>
          <Button onClick={() => navigate("/student/quizzes")}>Browse Quizzes</Button>
        </div>
      </div>
    );
  }

  // Question screen
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground font-mono">{quiz.title}</p>
        <div className="flex items-center gap-1 text-sm text-muted-foreground font-mono">
          <Clock className="h-4 w-4" />
          {minutes}:{seconds.toString().padStart(2, "0")}
        </div>
      </div>

      <Progress value={progress} className="h-1.5" />

      <div className="flex gap-1.5 flex-wrap">
        {quiz.questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentQ(i)}
            className={`h-7 w-7 rounded text-xs font-mono transition-colors ${
              i === currentQ
                ? "bg-primary text-primary-foreground"
                : answers[i] !== null
                ? "bg-secondary text-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <p className="text-xs text-muted-foreground">Question {currentQ + 1} of {quiz.questions.length}</p>
          <CardTitle className="text-base leading-relaxed">{q.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[currentQ] !== null ? String(answers[currentQ]) : undefined}
            onValueChange={(v) => {
              const next = [...answers];
              next[currentQ] = parseInt(v);
              setAnswers(next);
            }}
            className="space-y-3"
          >
            {q.options.map((opt, i) => (
              <div key={i} className="flex items-center gap-3 rounded-md border border-border p-3 hover:border-primary/40 transition-colors cursor-pointer">
                <RadioGroupItem value={String(i)} id={`opt-${i}`} />
                <Label htmlFor={`opt-${i}`} className="text-sm cursor-pointer flex-1">{opt}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" disabled={currentQ === 0} onClick={() => setCurrentQ(c => c - 1)}>
          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
        </Button>
        {currentQ < quiz.questions.length - 1 ? (
          <Button size="sm" onClick={() => setCurrentQ(c => c + 1)}>
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button size="sm" onClick={handleSubmit} disabled={answers.some(a => a === null) || submitting}>
            {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
            Submit Quiz
          </Button>
        )}
      </div>
    </div>
  );
}
