import { allAnalytics, mockStudents } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ReportsPage() {
  const students = mockStudents.map(s => ({ ...s, analytics: allAnalytics[s.id] }));

  const handleExport = () => {
    const csv = [
      "Name,Email,Solved,Accuracy,Drift Score,Level",
      ...students.map(s => `${s.name},${s.email},${s.analytics.totalSolved},${s.analytics.accuracy}%,${s.analytics.driftScore.toFixed(2)},${s.analytics.currentLevel}`)
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "student-report.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-mono font-bold">Reports</h1>
        <Button variant="outline" size="sm" onClick={handleExport} className="text-xs">
          <Download className="h-3 w-3 mr-1" />Export CSV
        </Button>
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Class Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            ["Total Students", students.length],
            ["Avg Accuracy", `${Math.round(students.reduce((s, st) => s + st.analytics.accuracy, 0) / students.length)}%`],
            ["Students with Drift > 0.7", students.filter(s => s.analytics.driftScore > 0.7).length],
            ["Total Problems Solved", students.reduce((s, st) => s + st.analytics.totalSolved, 0)],
          ].map(([label, value]) => (
            <div key={label as string} className="flex justify-between py-2 border-b border-border last:border-0">
              <span className="text-sm text-muted-foreground">{label}</span>
              <span className="text-sm font-mono text-foreground">{value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border bg-card overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Individual Reports</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-mono uppercase text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left text-xs font-mono uppercase text-muted-foreground">Solved</th>
                <th className="px-4 py-3 text-left text-xs font-mono uppercase text-muted-foreground">Accuracy</th>
                <th className="px-4 py-3 text-left text-xs font-mono uppercase text-muted-foreground">Drift</th>
                <th className="px-4 py-3 text-left text-xs font-mono uppercase text-muted-foreground">Level</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-sm text-foreground">{s.name}</td>
                  <td className="px-4 py-3 text-sm font-mono text-muted-foreground">{s.analytics.totalSolved}</td>
                  <td className="px-4 py-3 text-sm font-mono text-foreground">{s.analytics.accuracy}%</td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-mono font-bold ${s.analytics.driftScore > 0.7 ? "text-alert" : "text-foreground"}`}>{s.analytics.driftScore.toFixed(2)}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{s.analytics.currentLevel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
