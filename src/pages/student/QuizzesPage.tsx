import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { useQuizzes, useMyAttempts } from "@/hooks/use-quizzes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Clock, Trophy, TrendingDown, Loader2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const QUIZ_TOPICS = [
  "All", "Programming Basics", "Arrays", "Strings", "Recursion",
  "Sorting", "Searching", "Linked Lists", "Stacks and Queues", "Trees", "Graphs", "Dynamic Programming",
];

export default function QuizzesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [topicFilter, setTopicFilter] = useState("All");
  const [diffFilter, setDiffFilter] = useState("All");

  const { data: quizzes = [], isLoading: loadingQuizzes } = useQuizzes();
  const { data: attempts = [], isLoading: loadingAttempts } = useMyAttempts(user?.id);

  const filtered = quizzes.filter(q => {
    if (topicFilter !== "All" && q.topic !== topicFilter) return false;
    if (diffFilter !== "All" && q.difficulty !== diffFilter) return false;
    return true;
  });

  // Topic score analysis
  const topicScores: Record<string, { total: number; correct: number }> = {};
  attempts.forEach(a => {
    const quiz = quizzes.find(q => q.id === a.quiz_id);
    const topic = quiz?.topic || "Unknown";
    if (!topicScores[topic]) topicScores[topic] = { total: 0, correct: 0 };
    topicScores[topic].total += a.total;
    topicScores[topic].correct += a.score;
  });

  const weakTopics = Object.entries(topicScores)
    .filter(([, v]) => v.total > 0 && (v.correct / v.total) < 0.6)
    .map(([topic]) => topic);

  const chartData = Object.entries(topicScores).map(([topic, v]) => ({
    topic: topic.length > 12 ? topic.slice(0, 12) + "…" : topic,
    score: v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0,
  }));

  const getAttempt = (quizId: string) => attempts.find(a => a.quiz_id === quizId);

  const diffColor = (d: string) =>
    d === "Beginner" ? "bg-chart-1/20 text-[hsl(var(--chart-1))]" :
    d === "Intermediate" ? "bg-chart-4/20 text-[hsl(var(--chart-4))]" :
    "bg-chart-5/20 text-[hsl(var(--chart-5))]";

  if (loadingQuizzes || loadingAttempts) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Quizzes</h1>
        <p className="text-sm text-muted-foreground mt-1">Test your conceptual understanding across topics</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="flex items-center gap-3 p-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold text-foreground">{attempts.length}</p>
              <p className="text-xs text-muted-foreground">Quizzes Taken</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="flex items-center gap-3 p-4">
            <Trophy className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold text-foreground">
                {attempts.length > 0 ? Math.round(attempts.reduce((s, a) => s + (a.score / a.total) * 100, 0) / attempts.length) : 0}%
              </p>
              <p className="text-xs text-muted-foreground">Avg Score</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="flex items-center gap-3 p-4">
            <TrendingDown className="h-8 w-8 text-[hsl(var(--chart-5))]" />
            <div>
              <p className="text-2xl font-bold text-foreground">{weakTopics.length}</p>
              <p className="text-xs text-muted-foreground">Weak Topics</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weak topic recommendations */}
      {weakTopics.length > 0 && (
        <Card className="bg-card border-[hsl(var(--chart-4))]/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[hsl(var(--chart-4))]">Recommended Focus</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-2">You scored below 60% in these topics:</p>
            <div className="flex flex-wrap gap-2">
              {weakTopics.map(t => (
                <Badge key={t} variant="outline" className="border-[hsl(var(--chart-4))]/40 text-[hsl(var(--chart-4))]">{t}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chart */}
      {chartData.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Quiz Performance by Topic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="topic" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                  <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <Select value={topicFilter} onValueChange={setTopicFilter}>
          <SelectTrigger className="w-48 bg-card border-border"><SelectValue /></SelectTrigger>
          <SelectContent>
            {QUIZ_TOPICS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={diffFilter} onValueChange={setDiffFilter}>
          <SelectTrigger className="w-40 bg-card border-border"><SelectValue /></SelectTrigger>
          <SelectContent>
            {["All", "Beginner", "Intermediate", "Advanced"].map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Quiz list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(quiz => {
          const attempt = getAttempt(quiz.id);
          const pct = attempt ? Math.round((attempt.score / attempt.total) * 100) : null;
          return (
            <Card key={quiz.id} className="bg-card border-border hover:border-primary/40 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-sm leading-tight">{quiz.title}</CardTitle>
                  <Badge className={`text-[10px] ${diffColor(quiz.difficulty)}`}>{quiz.difficulty}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{quiz.topic} · {quiz.questions.length} questions</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {attempt ? (
                  <>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Score</span>
                      <span className={pct! >= 60 ? "text-primary" : "text-[hsl(var(--chart-5))]"}>{pct}%</span>
                    </div>
                    <Progress value={pct!} className="h-1.5" />
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {Math.floor(attempt.time_taken / 60)}m {attempt.time_taken % 60}s
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-muted-foreground italic">Not attempted yet</p>
                )}
                <Button
                  size="sm"
                  className="w-full"
                  variant={attempt ? "outline" : "default"}
                  onClick={() => navigate(`/student/quiz/${quiz.id}`)}
                >
                  {attempt ? "Retake Quiz" : "Start Quiz"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
