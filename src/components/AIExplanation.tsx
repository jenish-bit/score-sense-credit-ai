
import React, { useEffect, useState } from "react";
import { Lightbulb, AlertCircle, CheckCircle } from "lucide-react";

interface AIExplanationProps {
  score: number;
  formData: any;
}

export const AIExplanation = ({ score, formData }: AIExplanationProps) => {
  const [explanation, setExplanation] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate AI explanation generation
    const generateExplanation = () => {
      setIsLoading(true);
      
      // This would be an API call to an LLM in production
      setTimeout(() => {
        // Generate an explanation based on the score and form data
        let aiExplanation = "";
        
        if (score >= 750) {
          aiExplanation = "Your credit score is excellent! Based on our analysis of your profile, you have several positive factors contributing to this high score. Your consistent payment history, especially with utility bills and phone contracts, demonstrates strong financial responsibility. Your income-to-expenses ratio is healthy, showing good financial management. The alternative data sources we analyzed, including your stable phone usage patterns and online activity, further support your creditworthiness profile.";
        } else if (score >= 670) {
          aiExplanation = "You have a good credit score that's above the national average. Our analysis shows you have a positive payment history with occasional variations. Your income covers your expenses well, which is a positive signal for lenders. Your alternative data points, including your online shopping habits and phone usage patterns, indicate responsible financial management. To improve your score further, consider maintaining a more consistent payment schedule for all your bills.";
        } else if (score >= 580) {
          aiExplanation = "Your credit score is fair, placing you near the average range. While your financial profile shows some strengths, there are areas for improvement. Our analysis indicates some inconsistency in payment histories, particularly with utility bills or phone contracts. Your income-to-expenses ratio is manageable but could be improved. The alternative data we analyzed suggests moderate stability in your financial behaviors. Focus on consistent on-time payments and reducing expenses relative to income to improve your score.";
        } else {
          aiExplanation = "Your credit score is currently below average, but there are clear opportunities for improvement. Our analysis identified several factors affecting your score: irregular payment history, a high expense-to-income ratio, and limited savings. The alternative data sources we analyzed show patterns that lenders might interpret as financial instability. We recommend focusing on establishing consistent payment habits, reducing unnecessary expenses, and gradually building emergency savings to improve your credit profile.";
        }
        
        setExplanation(aiExplanation);
        setIsLoading(false);
      }, 1000);
    };
    
    generateExplanation();
  }, [score, formData]);
  
  // Determine which icon to show based on score
  const getIcon = () => {
    if (score >= 750) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (score >= 580) return <Lightbulb className="h-5 w-5 text-yellow-500" />;
    return <AlertCircle className="h-5 w-5 text-red-500" />;
  };
  
  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-24">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex gap-3">
            {getIcon()}
            <p className="text-sm">{explanation}</p>
          </div>
          
          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Key Improvement Opportunities:</h4>
            {score < 700 ? (
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  Establish consistent payment history across all bills
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  Reduce your expense-to-income ratio by cutting unnecessary costs
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  Build up emergency savings to improve financial stability
                </li>
              </ul>
            ) : (
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  Maintain your excellent payment history
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  Consider diversifying your credit mix for even higher scores
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  Continue your responsible financial management
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
