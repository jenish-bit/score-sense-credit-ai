
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Brain, 
  TrendingUp, 
  Mic, 
  Target, 
  Heart, 
  MessageCircle,
  Award,
  Zap,
  Users,
  BarChart3,
  Trophy,
  Eye,
  Smartphone
} from 'lucide-react';
import { BehavioralProfile } from './BehavioralProfile';
import { RealTimeCoach } from './RealTimeCoach';
import { BestSelfSimulator } from './BestSelfSimulator';
import { PersonalizedProducts } from './PersonalizedProducts';
import { EmotionalWellness } from './EmotionalWellness';
import { CustomerIntelligence } from './CustomerIntelligence';
import { GamificationDashboard } from './GamificationDashboard';
import { SmartAutomation } from './SmartAutomation';
import { AdvancedAnalytics } from './AdvancedAnalytics';

export const AgentDNADashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [agentProfile, setAgentProfile] = useState({
    personalityType: 'Empathetic Storyteller',
    conversionRate: 34,
    emotionalIntelligence: 87,
    communicationStyle: 'Story-driven',
    strengths: ['Building Trust', 'Emotional Connection', 'Product Knowledge'],
    weaknesses: ['Handling Objections', 'Time Management'],
    todaysMood: 85,
    weeklyTarget: 75,
    weeklyProgress: 58
  });

  const tabs = [
    { id: 'overview', label: 'DNA Overview', icon: Brain },
    { id: 'coach', label: 'Live Coach', icon: Mic },
    { id: 'intelligence', label: 'Customer Intel', icon: Eye },
    { id: 'simulator', label: 'Best Self', icon: Target },
    { id: 'automation', label: 'Smart Tools', icon: Zap },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'gamification', label: 'Achievements', icon: Trophy },
    { id: 'products', label: 'My Products', icon: Award },
    { id: 'wellness', label: 'Wellness', icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Brain className="text-blue-600" size={32} />
                AgentDNA
                <Badge variant="secondary" className="ml-2">Pro</Badge>
              </h1>
              <p className="text-gray-600 mt-1">Your AI-Powered Sales Alter-Ego - Complete Platform</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Welcome back,</p>
              <p className="font-semibold text-gray-900">{user?.email?.split('@')[0] || 'Agent'}</p>
              <Badge variant="outline" className="mt-1">Level: Gold Agent</Badge>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Conversion Rate</p>
                  <p className="text-2xl font-bold">{agentProfile.conversionRate}%</p>
                  <p className="text-xs text-blue-200">+23% with AI</p>
                </div>
                <TrendingUp size={24} className="text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">EQ Score</p>
                  <p className="text-2xl font-bold">{agentProfile.emotionalIntelligence}</p>
                  <p className="text-xs text-green-200">Top 15%</p>
                </div>
                <Heart size={24} className="text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">AI Usage</p>
                  <p className="text-2xl font-bold">89%</p>
                  <p className="text-xs text-purple-200">Last 30 days</p>
                </div>
                <Brain size={24} className="text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Rank</p>
                  <p className="text-2xl font-bold">#7</p>
                  <p className="text-xs text-orange-200">of 152</p>
                </div>
                <Trophy size={24} className="text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-sm">Revenue Impact</p>
                  <p className="text-2xl font-bold">₹1.2L</p>
                  <p className="text-xs text-pink-200">This month</p>
                </div>
                <Award size={24} className="text-pink-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-sm">Time Saved</p>
                  <p className="text-2xl font-bold">3.2h</p>
                  <p className="text-xs text-teal-200">Today</p>
                </div>
                <Zap size={24} className="text-teal-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 shadow-sm overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && <BehavioralProfile profile={agentProfile} />}
          {activeTab === 'coach' && <RealTimeCoach />}
          {activeTab === 'intelligence' && <CustomerIntelligence />}
          {activeTab === 'simulator' && <BestSelfSimulator />}
          {activeTab === 'automation' && <SmartAutomation />}
          {activeTab === 'analytics' && <AdvancedAnalytics />}
          {activeTab === 'gamification' && <GamificationDashboard />}
          {activeTab === 'products' && <PersonalizedProducts profile={agentProfile} />}
          {activeTab === 'wellness' && <EmotionalWellness profile={agentProfile} />}
        </div>

        {/* Mobile Quick Actions */}
        <div className="fixed bottom-4 right-4 md:hidden">
          <Button className="rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700">
            <Smartphone size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};
