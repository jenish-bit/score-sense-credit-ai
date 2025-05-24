
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { ArrowUp, Award, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreditScoreDisplayProps {
  score: number;
}

export const CreditScoreDisplay = ({ score }: CreditScoreDisplayProps) => {
  const [animatedScore, setAnimatedScore] = useState(300);
  
  useEffect(() => {
    const duration = 1500; // animation duration in ms
    const startTime = Date.now();
    const startScore = 300;
    
    const animateScore = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing function for smoother animation
      const easeOutQuad = (x: number): number => 1 - (1 - x) * (1 - x);
      const easedProgress = easeOutQuad(progress);
      
      setAnimatedScore(Math.floor(startScore + (score - startScore) * easedProgress));
      
      if (progress < 1) {
        requestAnimationFrame(animateScore);
      }
    };
    
    animateScore();
  }, [score]);

  // Calculate score range and color
  const getScoreCategory = (score: number) => {
    if (score >= 800) return { category: "Excellent", color: "bg-green-500", textColor: "text-green-500" };
    if (score >= 740) return { category: "Very Good", color: "bg-emerald-500", textColor: "text-emerald-500" };
    if (score >= 670) return { category: "Good", color: "bg-blue-500", textColor: "text-blue-500" };
    if (score >= 580) return { category: "Fair", color: "bg-yellow-500", textColor: "text-yellow-500" };
    return { category: "Poor", color: "bg-red-500", textColor: "text-red-500" };
  };

  const { category, color, textColor } = getScoreCategory(score);
  const progressValue = ((animatedScore - 300) / (850 - 300)) * 100; // Convert to percentage based on 300-850 scale
  
  // Calculate position for the marker
  const markerPosition = `calc(${progressValue}% - 15px)`;

  return (
    <div className="text-center">
      <div className="relative mx-auto w-56 h-56 mb-8">
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <div className="text-5xl font-bold bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
            {animatedScore}
          </div>
          <div className={cn("text-lg font-medium mt-2", textColor)}>
            {category}
          </div>
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
            className={`${color} stroke-current transition-all duration-1500 ease-out`}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${progressValue * 2.51} 1000`}
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            style={{ transition: "stroke-dasharray 1.5s ease-out" }}
          />
        </svg>
        {/* Add glowing effect */}
        <div className={cn(
          "absolute inset-0 rounded-full opacity-20 blur-xl",
          color
        )} />
        <Award className={cn(
          "absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
          textColor
        )} size={28} />
      </div>
      
      <div className="mb-8">
        <div className="mb-8 relative">
          <div className="flex justify-between text-sm text-muted-foreground mb-1">
            <span>300</span>
            <span>500</span>
            <span>700</span>
            <span>850</span>
          </div>
          <div className="h-3 bg-gradient-to-r from-red-500 via-yellow-500 via-blue-500 to-green-500 rounded-full relative">
            <div 
              className="absolute top-0 transform -translate-y-full -translate-x-1/2 mt-[-8px]"
              style={{ left: markerPosition }}
            >
              <div className="animate-bounce">
                <TrendingUp className={cn("text-primary", textColor)} size={18} />
              </div>
            </div>
          </div>
          <div className="relative h-6 mt-1">
            <div className="absolute h-6 border-l border-dashed border-muted-foreground" style={{ left: `${progressValue}%` }}></div>
          </div>
        </div>
        
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-center justify-center gap-2 text-base">
            <ArrowUp className={cn("text-lg", textColor)} size={18} />
            <p>
              Your score is <span className="font-semibold">{category.toLowerCase()}</span> compared to the U.S. average.
            </p>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Your credit score puts you in the top {Math.max(5, 100 - Math.round((score / 850) * 100))}% of U.S. consumers.
          </p>
        </div>
      </div>
    </div>
  );
};
