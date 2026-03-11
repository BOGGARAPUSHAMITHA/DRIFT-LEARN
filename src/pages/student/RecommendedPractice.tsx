import { useAuth } from "@/lib/auth-context";
import { allAnalytics, mockStudents, mockQuestions } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ChevronRight, Target } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";

export default function RecommendedPractice() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const studentId = mockStudents.find(s => s.email === user?.email)?.id || "s1";
  const analytics = allAnalytics[studentId] || allAnalytics["s1"];

  const topicData = Object.entries(analytics.topicAccuracy)
    .filter(([, acc]) => acc > 0)
    .map(([topic, accuracy]) => ({ topic, accuracy }))
    .sort((a, b) => a.accuracy - b.accuracy);

  const weakTopics = topicData.filter(t => t.accuracy < 60);
  const recommended = weakTopics.flatMap(wt =>
    mockQuestions.filter(q => q.topic === wt.topic).slice(0, 2)
  );

  return (
    <div className="space-y-6 max-w-6xl">
      <h1 className="text-xl font-mono font-bold">Recommended Practice</h1>

      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Topic Accuracy</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topicData} layout="vertical" margin={{ left: 80 }}>
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis dataKey="topic" type="category" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} width={80} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6, fontSize: 12 }} />
              <Bar dataKey="accuracy" radius={[0, 4, 4, 0]}>
                {topicData.map((entry, i) => (
                  <Cell key={i} fill={entry.accuracy < 50 ? "hsl(var(--alert-red))" : entry.accuracy < 70 ? "hsl(var(--drift-warning))" : "hsl(var(--signal-green))"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {recommended.length > 0 ? (
        <div className="space-y-3">
          <h2 className="text-sm font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Target className="h-4 w-4 text-drift-warning" />
            Recommended Problems
          </h2>
          {recommended.map(q => (
            <Card key={q.id} onClick={() => navigate(`/student/practice/${q.id}`)} className="border-border bg-card cursor-pointer hover:bg-secondary/50 transition-colors">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{q.title}</p>
                  <p className="text-xs text-muted-foreground">{q.topic} · {q.difficulty}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-border bg-card">
          <CardContent className="p-8 text-center text-sm text-muted-foreground">
            Great work! No weak areas detected. Keep practicing to maintain your skills.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
