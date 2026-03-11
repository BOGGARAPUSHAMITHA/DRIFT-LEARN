import { allAnalytics, mockStudents } from "@/lib/mock-data";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, AlertTriangle, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export default function InstructorDashboard() {
  const students = mockStudents.map(s => ({ ...s, analytics: allAnalytics[s.id] }));
  const avgAccuracy = Math.round(students.reduce((sum, s) => sum + s.analytics.accuracy, 0) / students.length);
  const driftAlerts = students.filter(s => s.analytics.driftScore > 0.7).length;
  const totalSubmissions = students.reduce((sum, s) => sum + s.analytics.totalSolved, 0);

  const topicAvg = Object.keys(allAnalytics["s1"].topicAccuracy).map(topic => {
    const avg = Math.round(students.reduce((sum, s) => sum + (s.analytics.topicAccuracy[topic] || 0), 0) / students.length);
    return { topic, accuracy: avg };
  }).filter(t => t.accuracy > 0).sort((a, b) => a.accuracy - b.accuracy);

  return (
    <div className="space-y-6 max-w-6xl">
      <h1 className="text-xl font-mono font-bold">Instructor Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value={students.length} icon={Users} />
        <StatCard title="Avg Accuracy" value={`${avgAccuracy}%`} icon={Target} variant={avgAccuracy < 60 ? "alert" : "signal"} />
        <StatCard title="Drift Alerts" value={driftAlerts} icon={AlertTriangle} variant={driftAlerts > 0 ? "alert" : "default"} />
        <StatCard title="Total Submissions" value={totalSubmissions} icon={Activity} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Class Topic Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topicAvg} layout="vertical" margin={{ left: 80 }}>
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis dataKey="topic" type="category" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} width={80} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6, fontSize: 12 }} />
                <Bar dataKey="accuracy" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Students Requiring Attention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {students.filter(s => s.analytics.driftScore > 0.5).sort((a, b) => b.analytics.driftScore - a.analytics.driftScore).map(s => {
                const weakest = Object.entries(s.analytics.topicAccuracy).filter(([, v]) => v > 0).sort(([, a], [, b]) => a - b)[0];
                return (
                  <div key={s.id} className="flex items-center justify-between rounded-md bg-secondary p-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{s.name}</p>
                      <p className="text-xs text-muted-foreground">Weak: {weakest?.[0] || "N/A"}</p>
                    </div>
                    <span className={`font-mono text-sm font-bold ${s.analytics.driftScore > 0.7 ? "text-alert" : "text-drift-warning"}`}>
                      {s.analytics.driftScore.toFixed(2)}
                    </span>
                  </div>
                );
              })}
              {students.filter(s => s.analytics.driftScore > 0.5).length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No students need attention</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
