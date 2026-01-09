import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ConditionScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  comparison?: number; // Market average for comparison
}

export function ConditionScore({ score, size = "md", showLabel = true, comparison }: ConditionScoreProps) {
  const getScoreColor = () => {
    if (score >= 85) return "text-success";
    if (score >= 70) return "text-primary";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const getScoreBg = () => {
    if (score >= 85) return "bg-success";
    if (score >= 70) return "bg-primary";
    if (score >= 50) return "bg-warning";
    return "bg-destructive";
  };

  const getLabel = () => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Fair";
    return "Poor";
  };

  const getDiff = () => {
    if (!comparison) return null;
    const diff = score - comparison;
    if (diff > 5) return { type: "above", value: diff, icon: TrendingUp };
    if (diff < -5) return { type: "below", value: Math.abs(diff), icon: TrendingDown };
    return { type: "average", value: 0, icon: Minus };
  };

  const diff = getDiff();

  const sizeClasses = {
    sm: "w-12 h-12 text-lg",
    md: "w-20 h-20 text-2xl",
    lg: "w-28 h-28 text-4xl",
  };

  const ringSize = {
    sm: 44,
    md: 72,
    lg: 104,
  };

  const strokeWidth = size === "sm" ? 4 : size === "md" ? 6 : 8;
  const radius = (ringSize[size] - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Circular Progress */}
      <div className={cn("relative flex items-center justify-center", sizeClasses[size])}>
        <svg
          className="absolute -rotate-90"
          width={ringSize[size]}
          height={ringSize[size]}
        >
          {/* Background Ring */}
          <circle
            cx={ringSize[size] / 2}
            cy={ringSize[size] / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted/30"
          />
          {/* Progress Ring */}
          <circle
            cx={ringSize[size] / 2}
            cy={ringSize[size] / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn("transition-all duration-1000", getScoreColor())}
          />
        </svg>
        <span className={cn("font-display font-bold", getScoreColor())}>
          {score}
        </span>
      </div>

      {/* Label */}
      {showLabel && (
        <div className="text-center">
          <div className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium", getScoreBg(), "text-primary-foreground")}>
            {getLabel()} Condition
          </div>
          
          {/* Market Comparison */}
          {diff && (
            <div className={cn(
              "flex items-center justify-center gap-1 mt-1 text-xs",
              diff.type === "above" ? "text-success" : diff.type === "below" ? "text-destructive" : "text-muted-foreground"
            )}>
              <diff.icon className="h-3 w-3" />
              {diff.type === "above" && `${diff.value}% above market avg`}
              {diff.type === "below" && `${diff.value}% below market avg`}
              {diff.type === "average" && "At market average"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
