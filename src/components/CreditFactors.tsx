
import React from "react";
import { Progress } from "@/components/ui/progress";

interface CreditFactorProps {
  name: string;
  value: number;
  color: string;
}

const CreditFactor = ({ name, value, color }: CreditFactorProps) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{name}</span>
        <span className="font-medium">{value}%</span>
      </div>
      <Progress value={value} className={`h-2 ${color}`} />
    </div>
  );
};

interface CreditFactorsProps {
  score: number;
}

export const CreditFactors = ({ score }: CreditFactorsProps) => {
  // Generate factors based on the credit score
  const generateFactors = (baseScore: number) => {
    const paymentHistory = Math.min(100, Math.max(40, baseScore / 8.5));
    const creditUtilization = Math.min(100, Math.max(30, baseScore / 10));
    const creditHistory = Math.min(100, Math.max(25, baseScore / 14));
    const creditMix = Math.min(100, Math.max(20, baseScore / 17));
    const alternativeData = Math.min(100, Math.max(30, baseScore / 12));
    
    return [
      { name: "Payment History", value: Math.round(paymentHistory), color: getColorClass(paymentHistory) },
      { name: "Credit Utilization", value: Math.round(creditUtilization), color: getColorClass(creditUtilization) },
      { name: "Length of Credit History", value: Math.round(creditHistory), color: getColorClass(creditHistory) },
      { name: "Credit Mix", value: Math.round(creditMix), color: getColorClass(creditMix) },
      { name: "Alternative Data Signals", value: Math.round(alternativeData), color: getColorClass(alternativeData) },
    ];
  };
  
  const getColorClass = (value: number) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return "bg-emerald-500";
    if (value >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  const factors = generateFactors(score);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {factors.slice(0, 3).map((factor, index) => (
            <div key={index} className="mb-4">
              <CreditFactor {...factor} />
            </div>
          ))}
        </div>
        <div>
          {factors.slice(3).map((factor, index) => (
            <div key={index} className="mb-4">
              <CreditFactor {...factor} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t pt-4 text-sm text-muted-foreground">
        <p>Factor weights are based on alternative credit scoring methodologies that incorporate traditional credit factors along with alternative data signals.</p>
      </div>
    </div>
  );
};
