
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { CustomerIntelligence } from './CustomerIntelligence';
import { BehavioralProfile } from './BehavioralProfile';
import { RealTimeCoach } from './RealTimeCoach';
import { BestSelfSimulator } from './BestSelfSimulator';
import { GamificationDashboard } from './GamificationDashboard';
import { AdvancedAnalytics } from './AdvancedAnalytics';
import { SmartAutomation } from './SmartAutomation';
import { EmotionalWellness } from './EmotionalWellness';
import { PersonalizedProducts } from './PersonalizedProducts';
import { MobileIntegration } from './MobileIntegration';
import { AgentDNAChatbot } from './AgentDNAChatbot';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Users, 
  Zap, 
  Heart, 
  ShoppingBag, 
  Smartphone,
  User,
  LogOut,
  Home
} from 'lucide-react';

export const AgentDNADashboard = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const handleSignOut = async () => {
    await signOut();
  };

  const mockProfile = {
    personalityType: 'Empathetic Relationship Builder',
    conversionRate: 73,
    emotionalIntelligence: 89,
    communicationStyle: 'Story-driven with emotional connection',
    todaysMood: 78,
    strengths: [
      'Exceptional empathy and active listening',
      'Natural storytelling ability',
      'Strong emotional connection with customers',
      'Excellent at handling concerned customers'
    ],
    weaknesses: [
      'Sometimes avoids direct closing techniques',
      'Can get sidetracked by customer stories',
      'Needs improvement in objection handling',
      'Could be more assertive with pricing discussions'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Brain className="text-blue-600" size={32} />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AgentDNA</h1>
                <p className="text-sm text-gray-600">Your AI-Powered Sales Alter-Ego</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                AI Coach Active
              </Badge>
              <Button variant="outline" size="sm" asChild>
                <a href="/">
                  <Home size={16} className="mr-2" />
                  Back to Home
                </a>
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut size={16} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10">
            <TabsTrigger value="overview" className="text-xs">
              <User size={16} className="mr-1" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="intelligence" className="text-xs">
              <Brain size={16} className="mr-1" />
              Intelligence
            </TabsTrigger>
            <TabsTrigger value="coach" className="text-xs">
              <TrendingUp size={16} className="mr-1" />
              Coach
            </TabsTrigger>
            <TabsTrigger value="simulator" className="text-xs">
              <Target size={16} className="mr-1" />
              Simulator
            </TabsTrigger>
            <TabsTrigger value="gamification" className="text-xs">
              <Users size={16} className="mr-1" />
              Social
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs">
              <TrendingUp size={16} className="mr-1" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="automation" className="text-xs">
              <Zap size={16} className="mr-1" />
              Automation
            </TabsTrigger>
            <TabsTrigger value="wellness" className="text-xs">
              <Heart size={16} className="mr-1" />
              Wellness
            </TabsTrigger>
            <TabsTrigger value="products" className="text-xs">
              <ShoppingBag size={16} className="mr-1" />
              Products
            </TabsTrigger>
            <TabsTrigger value="mobile" className="text-xs">
              <Smartphone size={16} className="mr-1" />
              Mobile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Welcome to AgentDNA</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Your complete AI-powered sales coaching platform is ready! Explore each feature to unlock your full potential.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium">Today's Performance</h4>
                      <p className="text-2xl font-bold text-blue-600">92%</p>
                      <p className="text-sm text-gray-600">vs your best self</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-medium">AI Insights</h4>
                      <p className="text-2xl font-bold text-green-600">15</p>
                      <p className="text-sm text-gray-600">suggestions ready</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <BehavioralProfile profile={mockProfile} />
            </div>
          </TabsContent>

          <TabsContent value="intelligence">
            <CustomerIntelligence />
          </TabsContent>

          <TabsContent value="coach">
            <RealTimeCoach />
          </TabsContent>

          <TabsContent value="simulator">
            <BestSelfSimulator />
          </TabsContent>

          <TabsContent value="gamification">
            <GamificationDashboard />
          </TabsContent>

          <TabsContent value="analytics">
            <AdvancedAnalytics />
          </TabsContent>

          <TabsContent value="automation">
            <SmartAutomation />
          </TabsContent>

          <TabsContent value="wellness">
            <EmotionalWellness profile={mockProfile} />
          </TabsContent>

          <TabsContent value="products">
            <PersonalizedProducts profile={mockProfile} />
          </TabsContent>

          <TabsContent value="mobile">
            <MobileIntegration />
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Chatbot */}
      <AgentDNAChatbot />
    </div>
  );
};
