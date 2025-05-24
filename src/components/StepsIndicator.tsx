
import React from "react";
import { Check, HelpCircle, FormInput, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface StepsIndicatorProps {
  currentStep: number;
}

export const StepsIndicator = ({ currentStep }: StepsIndicatorProps) => {
  const steps = [
    { id: 1, name: "Introduction", icon: HelpCircle },
    { id: 2, name: "Assessment Form", icon: FormInput },
    { id: 3, name: "Results", icon: TrendingUp },
  ];
  
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;
  
  return (
    <div className="mb-8">
      <Progress 
        value={progress} 
        className="h-2 mb-6 overflow-hidden bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-950 dark:to-indigo-950" 
      >
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-700 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </Progress>
      
      <div className="flex justify-between">
        {steps.map((step) => {
          const StepIcon = step.icon;
          const isActive = step.id <= currentStep;
          const isComplete = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          
          return (
            <div 
              key={step.id} 
              className={cn(
                "flex flex-col items-center transition-all duration-300",
                isCurrent ? "scale-110" : "",
                isActive ? "opacity-100" : "opacity-60"
              )}
            >
              <div 
                className={cn(
                  "rounded-full flex items-center justify-center w-12 h-12 mb-3 transition-all duration-500",
                  isComplete 
                    ? "bg-green-500 text-white" 
                    : isCurrent 
                      ? "bg-gradient-to-r from-blue-600 to-indigo-500 text-white ring-4 ring-blue-100 dark:ring-blue-900" 
                      : "bg-muted text-muted-foreground"
                )}
              >
                {isComplete ? (
                  <Check size={20} className="animate-fadeIn" />
                ) : (
                  <StepIcon size={20} className={isCurrent ? "animate-pulse" : ""} />
                )}
              </div>
              <div className={cn(
                "text-sm font-medium transition-all duration-300",
                isCurrent ? "text-primary" : "text-muted-foreground"
              )}>
                {step.name}
              </div>
              {isCurrent && (
                <div className="h-1 w-10 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full mt-1" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
