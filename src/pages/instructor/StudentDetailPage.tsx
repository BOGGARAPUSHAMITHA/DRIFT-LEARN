import { useParams, useNavigate } from "react-router-dom";
import { allAnalytics, allSubmissions, mockStudents } from "@/lib/mock-data";
import { DriftHeartbeat } from "@/components/DriftHeartbeat";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Target, Activity, XCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, BarChart, Bar, Cell } from "recharts";

export default function StudentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = mockStudents.find(s => s.id === id);
  const analytics = allAnalytics[id || ""];
  const submissions = allSubmissions[id || ""] || [];

  if (!student || !analytics) return <div className="text-muted-foreground p-8">Student not found</div>;

  const topicData = Object.entries(analytics.topicAccuracy).filter(([, v]) => v > 0).map(([topic, accuracy]) => ({ topic, accuracy })).sort((a, b) => a.accuracy - b.accuracy);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/instructor/students")} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-xl font-mono font-bold">{student.name}</h1>
          <p className="text-sm text-muted-foreground">{student.email}</p>
        </div>
      </div>

      <Card className="border-border bg-card overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Drift Signal</span>
            <span className={`font-mono text-sm font-bold ${analytics.driftScore > 0.7 ? "text-alert" : "text-foreground"}`}>{analytics.driftScore.toFixed(2)}</span>
          </div>
          <DriftHeartbeat history={analytics.driftHistory} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Problems Solved" value={analytics.totalSolved} icon={CheckCircle} variant="signal" />
        <StatCard title="Accuracy" value={`${analytics.accuracy}%`} icon={Target} variant={analytics.accuracy < 50 ? "alert" : "default"} />
        <StatCard title="Level" value={analytics.currentLevel} icon={Activity} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Accuracy Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={analytics.accuracyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6, fontSize: 12 }} />
                <Line type="monotone" dataKey="accuracy" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Topic Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={topicData} layout="vertical" margin={{ left: 70 }}>
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis dataKey="topic" type="category" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} width={70} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6, fontSize: 12 }} />
                <Bar dataKey="accuracy" radius={[0, 4, 4, 0]}>
                  {topicData.map((e, i) => <Cell key={i} fill={e.accuracy < 50 ? "hsl(var(--alert-red))" : "hsl(var(--signal-green))"} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Recent Submissions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-2 text-left text-xs font-mono uppercase text-muted-foreground">Problem</th>
                <th className="px-4 py-2 text-left text-xs font-mono uppercase text-muted-foreground">Result</th>
                <th className="px-4 py-2 text-left text-xs font-mono uppercase text-muted-foreground hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {submissions.slice(0, 10).map(s => (
                <tr key={s.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-2 text-sm text-foreground">{s.questionTitle}</td>
                  <td className="px-4 py-2">
                    <span className={`inline-flex items-center gap-1 text-xs font-mono ${s.result === "pass" ? "text-signal" : "text-alert"}`}>
                      {s.result === "pass" ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}{s.result}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-xs text-muted-foreground hidden sm:table-cell">{new Date(s.timestamp).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
