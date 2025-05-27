
import { useAuth } from "@/contexts/AuthContext";
import { UserDashboard } from "@/components/UserDashboard";
import { AgentDNADashboard } from "@/components/AgentDNA/AgentDNADashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, ArrowRight, Shield, TrendingUp } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const { user, loading } = useAuth();
  const [showAgentDNA, setShowAgentDNA] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="text-blue-600" size={48} />
              <h1 className="text-4xl font-bold text-gray-900">AgentDNA</h1>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              Your AI-Powered Sales Alter-Ego for Financial Products
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Revolutionizing how GroMo Partners sell with deep AI integration, 
              behavioral science, and personalized coaching that evolves with every interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="border-2 hover:border-blue-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="text-blue-600" size={24} />
                  Behavioral DNA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  AI analyzes your unique selling style, personality traits, and communication patterns 
                  to build your personal sales DNA profile.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="text-green-600" size={24} />
                  Real-Time Coach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get live suggestions during calls, customer mood analysis, and personalized 
                  tips based on your conversation patterns.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-purple-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="text-purple-600" size={24} />
                  Best Self Simulator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Practice with AI customers and compare your performance to your "best self" 
                  across different scenarios and objections.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" className="mr-4" asChild>
              <a href="/auth">
                Get Started with AgentDNA
                <ArrowRight className="ml-2" size={20} />
              </a>
            </Button>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Why AgentDNA is Revolutionary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-left">
                <h3 className="font-bold text-lg mb-2">🧠 Multimodal AI Integration</h3>
                <p className="text-gray-600">
                  Combines voice analysis, text sentiment, behavioral patterns, and emotional intelligence 
                  to create your unique digital twin.
                </p>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg mb-2">🎯 Hyper-Personalization</h3>
                <p className="text-gray-600">
                  Every recommendation is tailored to YOUR personality, YOUR strengths, 
                  and YOUR proven successful patterns.
                </p>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg mb-2">🚀 Real-Time Guidance</h3>
                <p className="text-gray-600">
                  Live coaching during calls with customer personality detection and 
                  contextual conversation suggestions.
                </p>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg mb-2">💝 Emotional Wellness</h3>
                <p className="text-gray-600">
                  Proactive burnout detection, stress monitoring, and wellness recommendations 
                  to keep you at peak performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showAgentDNA) {
    return <AgentDNADashboard />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome to GroMo</h1>
            <p className="text-gray-600">Choose your experience</p>
          </div>
          <Button 
            onClick={() => setShowAgentDNA(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Brain className="mr-2" size={20} />
            Launch AgentDNA
          </Button>
        </div>
        
        <UserDashboard />
      </div>
    </div>
  );
};

export default Index;
