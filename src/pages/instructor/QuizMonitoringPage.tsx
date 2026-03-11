import { mockStudents } from "@/lib/mock-data";
import { allQuizAttempts, mockQuizzes } from "@/lib/quiz-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function QuizMonitoringPage() {
  // Per-student quiz summary
  const studentSummaries = mockStudents.map(s => {
    const attempts = allQuizAttempts[s.id] || [];
    const avgScore = attempts.length > 0
      ? Math.round(attempts.reduce((sum, a) => sum + (a.score / a.totalQuestions) * 100, 0) / attempts.length)
      : 0;

    // Weak topics
    const topicScores: Record<string, { total: number; correct: number }> = {};
    attempts.forEach(a => {
      if (!topicScores[a.topic]) topicScores[a.topic] = { total: 0, correct: 0 };
      topicScores[a.topic].total += a.totalQuestions;
      topicScores[a.topic].correct += a.score;
    });
    const weak = Object.entries(topicScores)
      .filter(([, v]) => v.total > 0 && (v.correct / v.total) < 0.6)
      .map(([t]) => t);

    return { ...s, attempts: attempts.length, avgScore, weakTopics: weak };
  });

  // Class avg per topic
  const topicAgg: Record<string, { total: number; correct: number }> = {};
  Object.values(allQuizAttempts).flat().forEach(a => {
    if (!topicAgg[a.topic]) topicAgg[a.topic] = { total: 0, correct: 0 };
    topicAgg[a.topic].total += a.totalQuestions;
    topicAgg[a.topic].correct += a.score;
  });
  const chartData = Object.entries(topicAgg).map(([topic, v]) => ({
    topic: topic.length > 12 ? topic.slice(0, 12) + "…" : topic,
    avg: v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0,
  }));

  // Difficulty analysis
  const diffAgg: Record<string, { total: number; correct: number }> = {};
  Object.values(allQuizAttempts).flat().forEach(a => {
    const quiz = mockQuizzes.find(q => q.id === a.quizId);
    if (!quiz) return;
    const d = quiz.difficulty;
    if (!diffAgg[d]) diffAgg[d] = { total: 0, correct: 0 };
    diffAgg[d].total += a.totalQuestions;
    diffAgg[d].correct += a.score;
  });
  const diffData = Object.entries(diffAgg).map(([level, v]) => ({
    level,
    avg: v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Quiz Monitoring</h1>
        <p className="text-sm text-muted-foreground mt-1">Track student quiz performance and identify knowledge gaps</p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Average Score by Topic</CardTitle></CardHeader>
          <CardContent>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="topic" tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                  <Bar dataKey="avg" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Avg Score by Difficulty</CardTitle></CardHeader>
          <CardContent>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={diffData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="level" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                  <Bar dataKey="avg" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student table */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2"><CardTitle className="text-sm">Student Quiz Scores</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead className="text-center">Quizzes Taken</TableHead>
                <TableHead className="text-center">Avg Score</TableHead>
                <TableHead>Weak Topics</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentSummaries.map(s => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="text-center">{s.attempts}</TableCell>
                  <TableCell className="text-center">
                    <span className={s.avgScore >= 60 ? "text-primary" : "text-[hsl(var(--chart-5))]"}>{s.avgScore}%</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {s.weakTopics.length > 0
                        ? s.weakTopics.map(t => <Badge key={t} variant="outline" className="text-[10px] border-[hsl(var(--chart-5))]/40 text-[hsl(var(--chart-5))]">{t}</Badge>)
                        : <span className="text-xs text-muted-foreground">—</span>}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
