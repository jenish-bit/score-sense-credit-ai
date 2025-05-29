
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useAgentProfile } from '@/hooks/useAgentProfile';
import { useWellnessMetrics } from '@/hooks/useWellnessMetrics';
import { useGamification } from '@/hooks/useGamification';
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
import { ProactiveCoach } from './ProactiveCoach';
import { RolePlaySimulator } from './RolePlaySimulator';
import { GamificationHub } from './GamificationHub';
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
  Home,
  Trophy,
  Gamepad2,
  MessageSquare,
  Crown
} from 'lucide-react';

export const AgentDNADashboard = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const { profile } = useAgentProfile();
  const { currentMetrics } = useWellnessMetrics();
  const { achievements } = useGamification();

  const handleSignOut = async () => {
    await signOut();
  };

  // Use real data from backend or fallback to defaults
  const displayProfile = profile || {
    personalityType: 'Empathetic Relationship Builder',
    conversionRate: 73,
    emotionalIntelligence: 89,
    communicationStyle: 'Story-driven with emotional connection',
    todaysMood: currentMetrics?.mood_score || 78,
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

  const completedAchievements = achievements.filter(a => a.completed).length;
  const aiScore = profile?.conversion_rate || 96;
  const activeInsights = 23; // This could come from coaching sessions

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Brain className="text-white" size={32} />
                <Crown size={16} className="absolute -top-1 -right-1 text-yellow-300" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AgentDNA Premium</h1>
                <p className="text-sm text-purple-100">Advanced AI-Powered Sales Intelligence Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1">
                ⚡ AI Coach Pro Active
              </Badge>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1">
                🎯 Premium Features
              </Badge>
              <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-purple-600" asChild>
                <a href="/">
                  <Home size={16} className="mr-2" />
                  Home
                </a>
              </Button>
              <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-purple-600" onClick={handleSignOut}>
                <LogOut size={16} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12 gap-1">
            <TabsTrigger value="overview" className="text-xs flex-col h-16">
              <User size={16} className="mb-1" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="proactive" className="text-xs flex-col h-16">
              <Brain size={16} className="mb-1" />
              AI Coach
            </TabsTrigger>
            <TabsTrigger value="roleplay" className="text-xs flex-col h-16">
              <Gamepad2 size={16} className="mb-1" />
              Role Play
            </TabsTrigger>
            <TabsTrigger value="gamification" className="text-xs flex-col h-16">
              <Trophy size={16} className="mb-1" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="intelligence" className="text-xs flex-col h-16">
              <Brain size={16} className="mb-1" />
              Intelligence
            </TabsTrigger>
            <TabsTrigger value="coach" className="text-xs flex-col h-16">
              <TrendingUp size={16} className="mb-1" />
              Real-Time
            </TabsTrigger>
            <TabsTrigger value="simulator" className="text-xs flex-col h-16">
              <Target size={16} className="mb-1" />
              Simulator
            </TabsTrigger>
            <TabsTrigger value="social" className="text-xs flex-col h-16">
              <Users size={16} className="mb-1" />
              Social
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs flex-col h-16">
              <TrendingUp size={16} className="mb-1" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="automation" className="text-xs flex-col h-16">
              <Zap size={16} className="mb-1" />
              Automation
            </TabsTrigger>
            <TabsTrigger value="wellness" className="text-xs flex-col h-16">
              <Heart size={16} className="mb-1" />
              Wellness
            </TabsTrigger>
            <TabsTrigger value="mobile" className="text-xs flex-col h-16">
              <Smartphone size={16} className="mb-1" />
              Mobile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="text-purple-600" size={20} />
                    Welcome to AgentDNA Premium
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Your premium AI-powered sales coaching platform with voice intelligence, mood analysis, and predictive coaching is ready! 🚀
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900">Today's AI Score</h4>
                      <p className="text-3xl font-bold text-blue-600">{aiScore}%</p>
                      <p className="text-sm text-blue-700">vs your best self</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-900">Active Insights</h4>
                      <p className="text-3xl font-bold text-green-600">{activeInsights}</p>
                      <p className="text-sm text-green-700">AI suggestions ready</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <MessageSquare className="mx-auto mb-1 text-purple-600" size={20} />
                      <p className="text-xs font-medium">Voice Coach</p>
                      <p className="text-xs text-gray-600">Active</p>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <Trophy className="mx-auto mb-1 text-yellow-600" size={20} />
                      <p className="text-xs font-medium">Achievements</p>
                      <p className="text-xs text-gray-600">{completedAchievements} Unlocked</p>
                    </div>
                    <div className="text-center p-3 bg-pink-50 rounded-lg">
                      <Heart className="mx-auto mb-1 text-pink-600" size={20} />
                      <p className="text-xs font-medium">Wellness</p>
                      <p className="text-xs text-gray-600">
                        {currentMetrics?.burnout_risk === 'low' ? 'Optimal' : 
                         currentMetrics?.burnout_risk === 'medium' ? 'Good' : 'Monitor'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <BehavioralProfile profile={displayProfile} />
            </div>
          </TabsContent>

          <TabsContent value="proactive">
            <ProactiveCoach />
          </TabsContent>

          <TabsContent value="roleplay">
            <RolePlaySimulator />
          </TabsContent>

          <TabsContent value="gamification">
            <GamificationHub />
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

          <TabsContent value="social">
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

          <TabsContent value="mobile">
            <MobileIntegration />
          </TabsContent>
        </Tabs>
      </div>

      {/* Enhanced AI Chatbot */}
      <AgentDNAChatbot />
    </div>
  );
};
