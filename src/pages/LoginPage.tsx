import { useState } from "react";
import { useAuth, UserRole } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Activity, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("All fields are required"); return; }
    setSubmitting(true);

    let result;
    if (isRegister) {
      if (!name) { setError("Name is required"); setSubmitting(false); return; }
      result = await register(name, email, password, role);
    } else {
      result = await login(email, password);
    }

    if (!result.success) {
      setError(result.error || "Authentication failed");
    }
    setSubmitting(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2">
            <Activity className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-mono font-bold text-foreground">Drift Learn</h1>
          </div>
          <p className="text-sm text-muted-foreground">Concept Drift Detection System</p>
        </div>

        <Card className="border-border bg-card">
          <CardHeader className="pb-4">
            <div className="flex gap-1 rounded-md bg-secondary p-1">
              <button
                onClick={() => setIsRegister(false)}
                className={`flex-1 rounded-sm px-3 py-1.5 text-sm font-medium transition-colors ${!isRegister ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsRegister(true)}
                className={`flex-1 rounded-sm px-3 py-1.5 text-sm font-medium transition-colors ${isRegister ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Register
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-muted-foreground text-xs uppercase tracking-wider">Name</Label>
                  <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="bg-secondary border-border" />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-muted-foreground text-xs uppercase tracking-wider">Email</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@university.edu" className="bg-secondary border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-muted-foreground text-xs uppercase tracking-wider">Password</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="bg-secondary border-border" />
              </div>
              {isRegister && (
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">Role</Label>
                  <div className="flex gap-2">
                    {(["student", "instructor"] as UserRole[]).map(r => (
                      <button key={r} type="button" onClick={() => setRole(r)}
                        className={`flex-1 rounded-md border px-3 py-2 text-sm capitalize transition-colors ${role === r ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-foreground/30"}`}
                      >{r}</button>
                    ))}
                  </div>
                </div>
              )}
              {error && <p className="text-xs text-alert">{error}</p>}
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isRegister ? "Create Account" : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
