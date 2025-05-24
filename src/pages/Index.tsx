
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditScoreForm } from "@/components/CreditScoreForm";
import { CreditScoreDisplay } from "@/components/CreditScoreDisplay";
import { RecommendedProducts } from "@/components/RecommendedProducts";
import { CreditFactors } from "@/components/CreditFactors";
import { AIExplanation } from "@/components/AIExplanation";
import { InfoSection } from "@/components/InfoSection";
import { StepsIndicator } from "@/components/StepsIndicator";
import { LogoHeader } from "@/components/LogoHeader";

const Index = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [creditScore, setCreditScore] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  
  // Simulate form submission and score calculation
  const handleFormSubmit = (data: any) => {
    setIsLoading(true);
    setFormData({ ...formData, ...data });
    
    // Simulating API call to backend
    setTimeout(() => {
      // This would be an API call in production
      const score = Math.floor(Math.random() * 300) + 550; // Generate score between 550-850
      setCreditScore(score);
      setIsLoading(false);
      setCurrentStep(3);
    }, 1500);
  };

  const resetForm = () => {
    setCreditScore(null);
    setFormData({});
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <LogoHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="assessment" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="assessment">Credit Assessment</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="information">Information</TabsTrigger>
            </TabsList>
            
            {/* Credit Assessment Tab */}
            <TabsContent value="assessment">
              <StepsIndicator currentStep={currentStep} />
              
              {currentStep === 1 && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Welcome to ScoreSense Credit AI</CardTitle>
                      <CardDescription>
                        Discover your credit score potential using alternative data sources
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">
                        Our AI-powered platform analyzes a variety of data points to provide you with:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>A comprehensive credit score assessment</li>
                        <li>Personalized insights and recommendations</li>
                        <li>Tailored financial product suggestions</li>
                        <li>Clear AI-powered explanations of your results</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={() => setCurrentStep(2)} className="w-full sm:w-auto">
                        Get Started
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              )}
              
              {currentStep === 2 && (
                <CreditScoreForm onSubmit={handleFormSubmit} isLoading={isLoading} />
              )}
              
              {currentStep === 3 && creditScore !== null && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-1">
                      <CardHeader>
                        <CardTitle>Your Credit Score</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CreditScoreDisplay score={creditScore} />
                      </CardContent>
                    </Card>
                    
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle>AI-Powered Explanation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <AIExplanation score={creditScore} formData={formData} />
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Credit Factors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CreditFactors score={creditScore} />
                    </CardContent>
                  </Card>
                  
                  <RecommendedProducts score={creditScore} />
                  
                  <div className="flex justify-center">
                    <Button onClick={resetForm} variant="outline" className="mx-2">
                      Start Over
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
            
            {/* Dashboard Tab */}
            <TabsContent value="dashboard">
              <Card>
                <CardHeader>
                  <CardTitle>Credit Score Dashboard</CardTitle>
                  <CardDescription>
                    Track your progress and manage your credit health
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center p-6 text-muted-foreground">
                    Complete a credit assessment to view your personalized dashboard
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button onClick={() => {
                    setCurrentStep(1);
                    document.querySelector('[value="assessment"]')?.dispatchEvent(
                      new MouseEvent('click', { bubbles: true })
                    );
                  }}>
                    Start Assessment
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Information Tab */}
            <TabsContent value="information">
              <InfoSection />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="border-t bg-background py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 ScoreSense Credit AI. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="underline hover:text-foreground">Privacy Policy</a> · 
            <a href="#" className="underline hover:text-foreground ml-2">Terms of Service</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
