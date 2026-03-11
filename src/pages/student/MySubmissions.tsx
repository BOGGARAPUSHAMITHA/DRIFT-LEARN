import { useAuth } from "@/lib/auth-context";
import { allSubmissions, mockStudents } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

export default function MySubmissions() {
  const { user } = useAuth();
  const studentId = mockStudents.find(s => s.email === user?.email)?.id || "s1";
  const submissions = allSubmissions[studentId] || allSubmissions["s1"];

  return (
    <div className="space-y-6 max-w-6xl">
      <h1 className="text-xl font-mono font-bold">My Submissions</h1>
      <Card className="border-border bg-card overflow-hidden">
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-muted-foreground">Problem</th>
                <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Language</th>
                <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-muted-foreground">Result</th>
                <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-muted-foreground hidden md:table-cell">Time</th>
                <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map(s => (
                <tr key={s.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-sm text-foreground">{s.questionTitle}</td>
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground hidden sm:table-cell">{s.language}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-mono ${s.result === "pass" ? "text-signal" : "text-alert"}`}>
                      {s.result === "pass" ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                      {s.result}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground hidden md:table-cell">{s.executionTime}ms</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground hidden lg:table-cell">{new Date(s.timestamp).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
