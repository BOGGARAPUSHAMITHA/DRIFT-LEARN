import { useState } from "react";
import { allAnalytics, mockStudents } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const students = mockStudents
    .map(s => ({ ...s, analytics: allAnalytics[s.id] }))
    .filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 max-w-6xl">
      <h1 className="text-xl font-mono font-bold">Students</h1>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-secondary border-border" />
      </div>

      <Card className="border-border bg-card overflow-hidden">
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Solved</th>
                <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-muted-foreground">Accuracy</th>
                <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-muted-foreground">Drift</th>
                <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-muted-foreground hidden md:table-cell">Weak Topic</th>
                <th className="px-4 py-3 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => {
                const weakest = Object.entries(s.analytics.topicAccuracy).filter(([, v]) => v > 0).sort(([, a], [, b]) => a - b)[0];
                return (
                  <tr key={s.id} onClick={() => navigate(`/instructor/students/${s.id}`)} className="border-b border-border last:border-0 cursor-pointer hover:bg-secondary/50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{s.name}</td>
                    <td className="px-4 py-3 text-sm font-mono text-muted-foreground hidden sm:table-cell">{s.analytics.totalSolved}</td>
                    <td className="px-4 py-3 text-sm font-mono text-foreground">{s.analytics.accuracy}%</td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-mono font-bold ${s.analytics.driftScore > 0.7 ? "text-alert" : s.analytics.driftScore > 0.4 ? "text-drift-warning" : "text-signal"}`}>
                        {s.analytics.driftScore.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell">{weakest?.[0] || "—"}</td>
                    <td className="px-4 py-3"><ChevronRight className="h-4 w-4 text-muted-foreground" /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
