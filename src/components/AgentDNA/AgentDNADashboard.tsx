
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
  BarChart3
} from 'lucide-react';
import { BehavioralProfile } from './BehavioralProfile';
import { RealTimeCoach } from './RealTimeCoach';
import { BestSelfSimulator } from './BestSelfSimulator';
import { PersonalizedProducts } from './PersonalizedProducts';
import { EmotionalWellness } from './EmotionalWellness';

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
    { id: 'simulator', label: 'Best Self', icon: Target },
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
                <Badge variant="secondary" className="ml-2">Beta</Badge>
              </h1>
              <p className="text-gray-600 mt-1">Your AI-Powered Sales Alter-Ego</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Welcome back,</p>
              <p className="font-semibold text-gray-900">{user?.email?.split('@')[0] || 'Agent'}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Conversion Rate</p>
                  <p className="text-2xl font-bold">{agentProfile.conversionRate}%</p>
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
                </div>
                <Heart size={24} className="text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Weekly Progress</p>
                  <p className="text-2xl font-bold">{agentProfile.weeklyProgress}%</p>
                </div>
                <BarChart3 size={24} className="text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Energy Level</p>
                  <p className="text-2xl font-bold">{agentProfile.todaysMood}%</p>
                </div>
                <Zap size={24} className="text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
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
          {activeTab === 'simulator' && <BestSelfSimulator />}
          {activeTab === 'products' && <PersonalizedProducts profile={agentProfile} />}
          {activeTab === 'wellness' && <EmotionalWellness profile={agentProfile} />}
        </div>
      </div>
    </div>
  );
};
