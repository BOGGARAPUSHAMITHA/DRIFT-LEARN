import { useAuth } from "@/lib/auth-context";
import { allAnalytics, mockStudents } from "@/lib/mock-data";
import { StatCard } from "@/components/StatCard";
import { DriftHeartbeat } from "@/components/DriftHeartbeat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Target, TrendingUp, Flame, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line, CartesianGrid } from "recharts";

export default function StudentDashboard() {
  const { user } = useAuth();
  const studentId = mockStudents.find(s => s.email === user?.email)?.id || "s1";
  const analytics = allAnalytics[studentId] || allAnalytics["s1"];

  const weakTopics = Object.entries(analytics.topicAccuracy)
    .filter(([, acc]) => acc > 0 && acc < 50)
    .sort(([, a], [, b]) => a - b)
    .slice(0, 3);

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-xl font-mono font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back, {user?.name || "Student"}</p>
      </div>

      {/* Drift Heartbeat */}
      <Card className="border-border bg-card overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Drift Signal</span>
            <span className={`font-mono text-sm font-bold ${analytics.driftScore > 0.7 ? "text-alert" : analytics.driftScore > 0.4 ? "text-drift-warning" : "text-foreground"}`}>
              {analytics.driftScore.toFixed(2)}
            </span>
          </div>
          <DriftHeartbeat history={analytics.driftHistory} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Problems Solved" value={analytics.totalSolved} icon={CheckCircle} variant="signal" />
        <StatCard title="Accuracy" value={`${analytics.accuracy}%`} icon={Target} variant={analytics.accuracy < 50 ? "alert" : "default"} />
        <StatCard title="Current Level" value={analytics.currentLevel} icon={TrendingUp} />
        <StatCard title="Streak" value={`${analytics.streak} days`} icon={Flame} variant="warning" />
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
            <CardTitle className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={analytics.weeklySubmissions}>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6, fontSize: 12 }} />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {weakTopics.length > 0 && (
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-drift-warning" />
              Recommended Practice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weakTopics.map(([topic, acc]) => (
                <div key={topic} className="flex items-center justify-between rounded-md bg-secondary p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{topic}</p>
                    <p className="text-xs text-muted-foreground">Current accuracy: {acc}%</p>
                  </div>
                  <span className="rounded-full bg-alert/10 px-2 py-0.5 text-xs font-mono text-alert">Needs practice</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
