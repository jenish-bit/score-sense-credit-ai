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
import { UserDashboard } from "@/components/UserDashboard";
import { useAuth } from "@/contexts/AuthContext";
import { useCreditAssessments } from "@/hooks/useCreditAssessments";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { FileSpreadsheet, BarChart3, RefreshCw, LogIn } from "lucide-react";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [creditScore, setCreditScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [showTip, setShowTip] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const { saveAssessment } = useCreditAssessments();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!authLoading && !user) {
      const timer = setTimeout(() => {
        setShowTip(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [authLoading, user]);
  
  useEffect(() => {
    if (showTip) {
      toast("💡 Sign In Required", {
        description: "Sign in to save your assessments and track your progress!",
        action: {
          label: "Sign In",
          onClick: () => navigate('/auth'),
        },
      });
    }
  }, [showTip, navigate]);
  
  const handleFormSubmit = async (data: any) => {
    setIsLoading(true);
    setFormData({ ...formData, ...data });
    
    setTimeout(async () => {
      const score = Math.floor(Math.random() * 300) + 550;
      setCreditScore(score);
      setIsLoading(false);
      setCurrentStep(3);
      
      // Save assessment if user is logged in
      if (user) {
        await saveAssessment({
          score,
          formData: { ...formData, ...data },
          factors: generateCreditFactors(score),
        });
      }
      
      toast.success("Credit assessment complete!", {
        description: user 
          ? "Your credit profile has been analyzed and saved to your account."
          : "Your credit profile has been analyzed. Sign in to save your results."
      });
    }, 1500);
  };

  const generateCreditFactors = (score: number) => {
    const paymentHistory = Math.min(100, Math.max(40, score / 8.5));
    const creditUtilization = Math.min(100, Math.max(30, score / 10));
    const creditHistory = Math.min(100, Math.max(25, score / 14));
    const creditMix = Math.min(100, Math.max(20, score / 17));
    const alternativeData = Math.min(100, Math.max(30, score / 12));
    
    return {
      paymentHistory: Math.round(paymentHistory),
      creditUtilization: Math.round(creditUtilization),
      creditHistory: Math.round(creditHistory),
      creditMix: Math.round(creditMix),
      alternativeData: Math.round(alternativeData),
    };
  };

  const resetForm = () => {
    setCreditScore(null);
    setFormData({});
    setCurrentStep(1);
    toast("Assessment reset", {
      description: "You can start a new credit assessment."
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-blue-200 rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <LogoHeader />

      <main className="container mx-auto px-4 py-8 relative">
        <div className="max-w-5xl mx-auto">
          {user ? (
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 shadow-md">
                <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-500 data-[state=active]:text-white">
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="assessment" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-500 data-[state=active]:text-white">
                  New Assessment
                </TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-500 data-[state=active]:text-white">
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="information" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-500 data-[state=active]:text-white">
                  Information
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard">
                <UserDashboard />
              </TabsContent>
              
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
              
              <TabsContent value="analytics">
                <Card className="shadow-lg border-t-4 border-t-indigo-500">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                    <CardTitle>Credit Analytics</CardTitle>
                    <CardDescription>
                      Advanced analytics and insights for your credit profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="text-center py-12">
                      <BarChart3 size={64} className="mx-auto text-blue-500 mb-4" />
                      <h3 className="text-xl font-medium mb-2">Advanced Analytics Coming Soon</h3>
                      <p className="text-muted-foreground">
                        We're building advanced analytics features to help you understand your credit trends better.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="information">
                <InfoSection />
              </TabsContent>
            </Tabs>
          ) : (
            // Non-authenticated view
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
              
              <TabsContent value="assessment">
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-blue-900">Get the full experience</h3>
                      <p className="text-sm text-blue-700">Sign in to save your assessments and track your progress over time</p>
                    </div>
                    <Button onClick={() => navigate('/auth')} className="bg-blue-600 hover:bg-blue-700">
                      <LogIn size={16} className="mr-2" />
                      Sign In
                    </Button>
                  </div>
                </div>
                
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
              
              <TabsContent value="dashboard">
                <Card className="shadow-lg border-t-4 border-t-indigo-500">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                    <CardTitle>Credit Score Dashboard</CardTitle>
                    <CardDescription>
                      Sign in to access your personalized dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center justify-center p-12 text-center">
                      <div className="rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-6 mb-4">
                        <BarChart3 size={48} className="text-blue-500" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">Sign In Required</h3>
                      <p className="text-muted-foreground max-w-lg mb-6">
                        Create an account or sign in to access your personalized dashboard with saved assessments, progress tracking, and detailed analytics.
                      </p>
                      <Button 
                        className="bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 shadow-md"
                        onClick={() => navigate('/auth')}
                      >
                        <LogIn size={16} className="mr-2" />
                        Sign In / Sign Up
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="information">
                <InfoSection />
              </TabsContent>
            </Tabs>
          )}
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
