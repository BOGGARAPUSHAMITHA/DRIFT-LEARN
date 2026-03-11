import { allAnalytics, mockStudents } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DriftAlertsPage() {
  const navigate = useNavigate();
  const alerts = mockStudents
    .map(s => ({ ...s, analytics: allAnalytics[s.id] }))
    .filter(s => s.analytics.driftScore > 0.7)
    .sort((a, b) => b.analytics.driftScore - a.analytics.driftScore);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-alert" />
        <h1 className="text-xl font-mono font-bold">Drift Alerts</h1>
      </div>

      {alerts.length === 0 ? (
        <Card className="border-border bg-card">
          <CardContent className="p-8 text-center text-sm text-muted-foreground">No drift alerts at this time.</CardContent>
        </Card>
      ) : (
        <Card className="border-border bg-card overflow-hidden">
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-muted-foreground">Student</th>
                  <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-muted-foreground">Drift Score</th>
                  <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-muted-foreground">Weak Topic</th>
                  <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Intervention</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map(s => {
                  const weakest = Object.entries(s.analytics.topicAccuracy).filter(([, v]) => v > 0).sort(([, a], [, b]) => a - b)[0];
                  return (
                    <tr key={s.id} onClick={() => navigate(`/instructor/students/${s.id}`)} className="border-b border-border last:border-0 cursor-pointer hover:bg-secondary/50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{s.name}</td>
                      <td className="px-4 py-3 font-mono text-sm font-bold text-alert">{s.analytics.driftScore.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{weakest?.[0] || "—"}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground hidden sm:table-cell">Assign targeted {weakest?.[0]} exercises</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
