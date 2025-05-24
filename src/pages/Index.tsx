
import React, { useState, useEffect } from "react";
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
import { ChatAssistant } from "@/components/ChatAssistant";
import { toast } from "@/components/ui/sonner";
import { FileSpreadsheet, BarChart3, RefreshCw } from "lucide-react";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [creditScore, setCreditScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [showTip, setShowTip] = useState(false);
  
  useEffect(() => {
    // Show a welcome tip after a short delay
    const timer = setTimeout(() => {
      setShowTip(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (showTip) {
      toast("💡 Pro Tip", {
        description: "Chat with our AI assistant for personalized credit advice!",
        action: {
          label: "Got it",
          onClick: () => setShowTip(false),
        },
      });
    }
  }, [showTip]);
  
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
      
      toast.success("Credit assessment complete!", {
        description: "Your credit profile has been analyzed successfully."
      });
    }, 1500);
  };

  const resetForm = () => {
    setCreditScore(null);
    setFormData({});
    setCurrentStep(1);
    toast("Assessment reset", {
      description: "You can start a new credit assessment."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <LogoHeader />

      <main className="container mx-auto px-4 py-8 relative">
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="assessment" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 shadow-md">
              <TabsTrigger value="assessment" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-500 data-[state=active]:text-white">
                Credit Assessment
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-500 data-[state=active]:text-white">
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="information" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-500 data-[state=active]:text-white">
                Information
              </TabsTrigger>
            </TabsList>
            
            {/* Credit Assessment Tab */}
            <TabsContent value="assessment">
              <StepsIndicator currentStep={currentStep} />
              
              {currentStep === 1 && (
                <div className="space-y-6">
                  <Card className="overflow-hidden shadow-lg border-t-4 border-t-blue-500 animate-fadeIn">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                      <CardTitle className="text-2xl">Welcome to ScoreSense Credit AI</CardTitle>
                      <CardDescription className="text-base">
                        Discover your credit score potential using alternative data sources
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="mb-6 text-lg">
                        Our AI-powered platform analyzes a variety of data points to provide you with:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start gap-3">
                          <div className="rounded-full p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                            <BarChart3 size={20} />
                          </div>
                          <div>
                            <h3 className="font-medium mb-1">Comprehensive Analysis</h3>
                            <p className="text-sm text-muted-foreground">Get a full credit score assessment using both traditional and alternative data sources</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="rounded-full p-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400">
                            <FileSpreadsheet size={20} />
                          </div>
                          <div>
                            <h3 className="font-medium mb-1">Personalized Insights</h3>
                            <p className="text-sm text-muted-foreground">Receive AI-generated explanations and recommendations tailored to your situation</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                        <h3 className="text-lg font-medium mb-2 text-blue-700 dark:text-blue-400">Why alternative data matters</h3>
                        <p className="text-sm">
                          Traditional credit scores only look at your credit history. Our AI considers additional factors like utility payments, rent history, and mobile phone usage patterns to give you a more complete picture.
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                      <Button 
                        onClick={() => setCurrentStep(2)} 
                        className="bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 shadow-md"
                      >
                        Get Started
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              )}
              
              {currentStep === 2 && (
                <div className="animate-fadeIn">
                  <CreditScoreForm onSubmit={handleFormSubmit} isLoading={isLoading} />
                </div>
              )}
              
              {currentStep === 3 && creditScore !== null && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-1 shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-blue-500">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                        <CardTitle>Your Credit Score</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <CreditScoreDisplay score={creditScore} />
                      </CardContent>
                    </Card>
                    
                    <Card className="md:col-span-2 shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-indigo-500">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                        <CardTitle>AI-Powered Explanation</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <AIExplanation score={creditScore} formData={formData} />
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                      <CardTitle>Credit Factors</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <CreditFactors score={creditScore} />
                    </CardContent>
                  </Card>
                  
                  <RecommendedProducts score={creditScore} />
                  
                  <div className="flex justify-center">
                    <Button 
                      onClick={resetForm} 
                      variant="outline" 
                      className="mx-2 flex gap-2"
                    >
                      <RefreshCw size={16} />
                      Start Over
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
            
            {/* Dashboard Tab */}
            <TabsContent value="dashboard">
              <Card className="shadow-lg border-t-4 border-t-indigo-500">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                  <CardTitle>Credit Score Dashboard</CardTitle>
                  <CardDescription>
                    Track your progress and manage your credit health
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center p-12 text-center">
                    <div className="rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-6 mb-4">
                      <BarChart3 size={48} className="text-blue-500" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No Dashboard Data Available</h3>
                    <p className="text-muted-foreground max-w-lg mb-6">
                      Complete a credit assessment to view your personalized dashboard with score trends, improvement opportunities, and financial insights.
                    </p>
                    <Button 
                      className="bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 shadow-md"
                      onClick={() => {
                        setCurrentStep(1);
                        document.querySelector('[value="assessment"]')?.dispatchEvent(
                          new MouseEvent('click', { bubbles: true })
                        );
                      }}
                    >
                      Start Assessment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Information Tab */}
            <TabsContent value="information">
              <InfoSection />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <ChatAssistant />
      
      <footer className="border-t bg-background py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-medium text-lg mb-3">ScoreSense Credit AI</h3>
              <p className="text-sm text-muted-foreground">
                Advanced credit scoring powered by AI and alternative data sources.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-3">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Credit Guide</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Financial Literacy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
            <p>© 2025 ScoreSense Credit AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
