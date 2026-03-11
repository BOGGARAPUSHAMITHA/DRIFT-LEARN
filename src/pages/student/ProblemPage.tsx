import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockQuestions, LANGUAGES } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, Send, ChevronDown, ChevronUp, CheckCircle, XCircle } from "lucide-react";
import Editor from "@monaco-editor/react";

export default function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const question = mockQuestions.find(q => q.id === id);
  const [language, setLanguage] = useState("Python");
  const [code, setCode] = useState(question?.starterCode[language] || "");
  const [showHints, setShowHints] = useState(false);
  const [result, setResult] = useState<"pass" | "fail" | null>(null);
  const [running, setRunning] = useState(false);

  if (!question) return <div className="text-muted-foreground p-8">Problem not found</div>;

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setCode(question.starterCode[lang] || "");
    setResult(null);
  };

  const handleRun = () => {
    setRunning(true);
    setResult(null);
    setTimeout(() => {
      setRunning(false);
      setResult(Math.random() > 0.4 ? "pass" : "fail");
    }, 1500);
  };

  const handleSubmit = () => {
    setRunning(true);
    setResult(null);
    setTimeout(() => {
      setRunning(false);
      const passed = Math.random() > 0.35;
      setResult(passed ? "pass" : "fail");
    }, 2000);
  };

  const monacoLang = language === "C++" ? "cpp" : language.toLowerCase();
  const diffColor = question.difficulty === "Beginner" ? "text-signal" : question.difficulty === "Intermediate" ? "text-drift-warning" : "text-alert";

  return (
    <div className="h-[calc(100vh-3.5rem-3rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 shrink-0">
        <button onClick={() => navigate("/student/practice")} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-mono font-bold">{question.title}</h1>
          <div className="flex gap-3 mt-1">
            <span className={`text-xs font-mono ${diffColor}`}>{question.difficulty}</span>
            <span className="text-xs text-muted-foreground">{question.topic}</span>
          </div>
        </div>
      </div>

      {/* Split pane */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
        {/* Left: problem description */}
        <Card className="border-border bg-card overflow-auto">
          <CardContent className="p-5 space-y-5">
            <div className="prose-sm text-foreground whitespace-pre-wrap text-sm leading-relaxed">{question.description}</div>

            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Examples</h3>
              {question.examples.map((ex, i) => (
                <div key={i} className="rounded-md bg-secondary p-3 space-y-1 font-mono text-xs">
                  <div><span className="text-muted-foreground">Input: </span><span className="text-foreground">{ex.input}</span></div>
                  <div><span className="text-muted-foreground">Output: </span><span className="text-signal">{ex.output}</span></div>
                  {ex.explanation && <div className="text-muted-foreground mt-1">{ex.explanation}</div>}
                </div>
              ))}
            </div>

            <button onClick={() => setShowHints(!showHints)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              {showHints ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              {showHints ? "Hide" : "Show"} Hints ({question.hints.length})
            </button>
            {showHints && (
              <div className="space-y-2">
                {question.hints.map((h, i) => (
                  <div key={i} className="rounded-md bg-secondary/50 p-2 text-xs text-muted-foreground">
                    <span className="text-drift-warning font-mono">Hint {i + 1}: </span>{h}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right: code editor */}
        <div className="flex flex-col min-h-0">
          <div className="flex items-center justify-between pb-2 shrink-0">
            <select value={language} onChange={e => handleLanguageChange(e.target.value)} className="rounded-md border border-border bg-secondary px-2 py-1 text-xs text-foreground">
              {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleRun} disabled={running} className="text-xs">
                <Play className="h-3 w-3 mr-1" />Run
              </Button>
              <Button size="sm" onClick={handleSubmit} disabled={running} className="text-xs">
                <Send className="h-3 w-3 mr-1" />Submit
              </Button>
            </div>
          </div>
          <div className="flex-1 rounded-md overflow-hidden border border-border min-h-[300px]">
            <Editor
              height="100%"
              language={monacoLang}
              value={code}
              onChange={v => setCode(v || "")}
              theme="vs-dark"
              options={{ fontSize: 13, minimap: { enabled: false }, padding: { top: 12 }, scrollBeyondLastLine: false }}
            />
          </div>
          {result && (
            <div className={`mt-2 flex items-center gap-2 rounded-md p-3 text-sm font-mono ${result === "pass" ? "bg-signal/10 text-signal" : "bg-alert/10 text-alert"}`}>
              {result === "pass" ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              {result === "pass" ? "All test cases passed" : "Some test cases failed. Try again."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
