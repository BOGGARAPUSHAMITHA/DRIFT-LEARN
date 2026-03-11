import { useMemo } from "react";

interface DriftHeartbeatProps {
  history: number[];
  className?: string;
}

export function DriftHeartbeat({ history, className = "" }: DriftHeartbeatProps) {
  const currentScore = history[history.length - 1] || 0;
  const animClass = currentScore > 0.7 ? "drift-alert" : currentScore > 0.4 ? "drift-moderate" : "drift-calm";
  const strokeColor = currentScore > 0.7 ? "hsl(var(--alert-red))" : "hsl(var(--foreground) / 0.4)";

  const pathD = useMemo(() => {
    const w = 100;
    const h = 24;
    const step = w / (history.length - 1 || 1);
    return history.map((v, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - v * h}`).join(" ");
  }, [history]);

  return (
    <div className={`w-full ${animClass} ${className}`}>
      <svg viewBox="0 0 100 24" className="w-full h-6" preserveAspectRatio="none">
        <path d={pathD} fill="none" stroke={strokeColor} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
