
import React from "react";
import { Progress } from "@/components/ui/progress";

interface CreditScoreDisplayProps {
  score: number;
}

export const CreditScoreDisplay = ({ score }: CreditScoreDisplayProps) => {
  // Calculate score range and color
  const getScoreCategory = (score: number) => {
    if (score >= 800) return { category: "Excellent", color: "bg-green-500" };
    if (score >= 740) return { category: "Very Good", color: "bg-emerald-500" };
    if (score >= 670) return { category: "Good", color: "bg-blue-500" };
    if (score >= 580) return { category: "Fair", color: "bg-yellow-500" };
    return { category: "Poor", color: "bg-red-500" };
  };

  const { category, color } = getScoreCategory(score);
  const progressValue = ((score - 300) / (850 - 300)) * 100; // Convert to percentage based on 300-850 scale

  return (
    <div className="text-center">
      <div className="relative mx-auto w-48 h-48 mb-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl font-bold">{score}</div>
        </div>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            className="text-muted stroke-current"
            strokeWidth="6"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
          />
          <circle
            className={`${color} stroke-current`}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${progressValue * 2.51} 1000`}
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
          />
        </svg>
      </div>
      <div className="mb-2 text-lg font-medium">{category}</div>
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-1">
          <span>300</span>
          <span>850</span>
        </div>
        <Progress value={progressValue} className={`h-2 ${color}`} />
      </div>
      <div className="text-center text-sm text-muted-foreground">
        <p>Your score is {category.toLowerCase()} compared to the U.S. average.</p>
      </div>
    </div>
  );
};
