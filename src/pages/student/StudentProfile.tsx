import { useAuth } from "@/lib/auth-context";
import { allAnalytics, mockStudents } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentProfile() {
  const { user } = useAuth();
  const studentId = mockStudents.find(s => s.email === user?.email)?.id || "s1";
  const analytics = allAnalytics[studentId] || allAnalytics["s1"];

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-xl font-mono font-bold">Profile</h1>
      <Card className="border-border bg-card">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center text-lg font-mono font-bold text-primary">
              {(user?.name || "S").split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <p className="text-lg font-medium text-foreground">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            ["Problems Solved", analytics.totalSolved],
            ["Accuracy", `${analytics.accuracy}%`],
            ["Current Level", analytics.currentLevel],
            ["Streak", `${analytics.streak} days`],
            ["Drift Score", analytics.driftScore.toFixed(2)],
          ].map(([label, value]) => (
            <div key={label as string} className="flex justify-between py-2 border-b border-border last:border-0">
              <span className="text-sm text-muted-foreground">{label}</span>
              <span className="text-sm font-mono text-foreground">{value}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
