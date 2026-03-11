import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { mockQuestions, TOPICS } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ChevronRight } from "lucide-react";

const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"];

export default function PracticeCoding() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All");
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    return mockQuestions.filter(q => {
      if (search && !q.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (difficulty !== "All" && q.difficulty !== difficulty) return false;
      if (topic !== "All" && q.topic !== topic) return false;
      return true;
    });
  }, [search, difficulty, topic]);

  const diffColor = (d: string) => {
    if (d === "Beginner") return "text-signal";
    if (d === "Intermediate") return "text-drift-warning";
    return "text-alert";
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <h1 className="text-xl font-mono font-bold">Practice Coding</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search problems..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-secondary border-border" />
        </div>
        <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground">
          {DIFFICULTIES.map(d => <option key={d} value={d}>{d === "All" ? "All Levels" : d}</option>)}
        </select>
        <select value={topic} onChange={e => setTopic(e.target.value)} className="rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground">
          <option value="All">All Topics</option>
          {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Problems table */}
      <Card className="border-border bg-card overflow-hidden">
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-muted-foreground">Title</th>
                <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Topic</th>
                <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-muted-foreground">Difficulty</th>
                <th className="px-4 py-3 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(q => (
                <tr key={q.id} onClick={() => navigate(`/student/practice/${q.id}`)} className="border-b border-border last:border-0 cursor-pointer hover:bg-secondary/50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{q.title}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">{q.topic}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-mono ${diffColor(q.difficulty)}`}>{q.difficulty}</span>
                  </td>
                  <td className="px-4 py-3"><ChevronRight className="h-4 w-4 text-muted-foreground" /></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-sm text-muted-foreground">No problems found</td></tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
