
import React from "react";
import { Check, HelpCircle, FormInput } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface StepsIndicatorProps {
  currentStep: number;
}

export const StepsIndicator = ({ currentStep }: StepsIndicatorProps) => {
  const steps = [
    { id: 1, name: "Introduction", icon: HelpCircle },
    { id: 2, name: "Assessment Form", icon: FormInput },
    { id: 3, name: "Results", icon: Check },
  ];
  
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;
  
  return (
    <div className="mb-8">
      <Progress value={progress} className="h-2 mb-6" />
      <div className="flex justify-between">
        {steps.map((step) => {
          const StepIcon = step.icon;
          const isActive = step.id <= currentStep;
          const isComplete = step.id < currentStep;
          
          return (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`
                rounded-full flex items-center justify-center w-10 h-10 mb-2
                ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
              `}>
                <StepIcon size={18} />
              </div>
              <div className="text-xs font-medium">{step.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
