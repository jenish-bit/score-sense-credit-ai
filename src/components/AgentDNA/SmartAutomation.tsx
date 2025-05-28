
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Clock, 
  Phone, 
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Target,
  BarChart3,
  RefreshCw
} from 'lucide-react';

export const SmartAutomation = () => {
  const [automationStats, setAutomationStats] = useState({
    leadsProcessed: 47,
    followupsScheduled: 23,
    callsOptimized: 15,
    timesSaved: '3.2 hours'
  });

  const prioritizedLeads = [
    {
      id: 1,
      name: 'Anjali Desai',
      score: 92,
      reason: 'Recently searched for term insurance + high income bracket',
      bestTime: 'Today 2:00 PM',
      product: 'Term Life Insurance',
      estimatedValue: '₹2.5L premium'
    },
    {
      id: 2,
      name: 'Vikash Mehta',
      score: 87,
      reason: 'Clicked email 3 times + visited comparison page',
      bestTime: 'Tomorrow 10:00 AM',
      product: 'Health Insurance',
      estimatedValue: '₹1.8L premium'
    },
    {
      id: 3,
      name: 'Pooja Iyer',
      score: 83,
      reason: 'Attended webinar + downloaded brochure',
      bestTime: 'Today 4:30 PM',
      product: 'Child Education Plan',
      estimatedValue: '₹3.2L premium'
    }
  ];

  const smartFollowups = [
    {
      id: 1,
      customer: 'Rahul Singh',
      lastContact: '3 days ago',
      nextAction: 'Send pricing comparison',
      scheduledTime: 'Today 11:00 AM',
      confidence: 'High',
      notes: 'Customer requested competitor analysis'
    },
    {
      id: 2,
      customer: 'Meera Jain',
      lastContact: '1 week ago',
      nextAction: 'Check decision status',
      scheduledTime: 'Tomorrow 3:00 PM',
      confidence: 'Medium',
      notes: 'Said will decide by end of week'
    },
    {
      id: 3,
      customer: 'Sandeep Kumar',
      lastContact: '5 days ago',
      nextAction: 'Share testimonials',
      scheduledTime: 'Friday 10:00 AM',
      confidence: 'Medium',
      notes: 'Expressed trust concerns'
    }
  ];

  const voiceFatigueData = {
    currentLevel: 23,
    status: 'Good',
    recommendation: 'Continue for 2 more hours',
    patternAnalysis: {
      pitch: 'Stable',
      pace: 'Optimal',
      energy: 'Good',
      clarity: 'Excellent'
    }
  };

  const performanceInsights = [
    {
      metric: 'Optimal Call Time',
      value: '2:00 PM - 4:00 PM',
      improvement: '+23% conversion',
      icon: Clock
    },
    {
      metric: 'Best Product Match',
      value: 'Term Insurance',
      improvement: '+31% success rate',
      icon: Target
    },
    {
      metric: 'Peak Energy Hours',
      value: '10:00 AM - 12:00 PM',
      improvement: '+18% call quality',
      icon: TrendingUp
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Smart Lead Prioritization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="text-yellow-600" size={20} />
            AI Lead Prioritization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {prioritizedLeads.map((lead) => (
            <div key={lead.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-sm">{lead.name}</h3>
                  <p className="text-xs text-gray-600">{lead.product}</p>
                </div>
                <div className="text-right">
                  <Badge variant={lead.score > 90 ? "destructive" : lead.score > 80 ? "default" : "secondary"}>
                    {lead.score}% likely
                  </Badge>
                  <p className="text-xs text-green-600 mt-1">{lead.estimatedValue}</p>
                </div>
              </div>
              
              <p className="text-xs text-gray-700 mb-2">{lead.reason}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-blue-600">📞 {lead.bestTime}</span>
                <Button size="sm" variant="outline">
                  <Phone size={12} className="mr-1" />
                  Call Now
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Voice Fatigue Monitor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="text-purple-600" size={20} />
            Voice Performance Monitor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${
                voiceFatigueData.currentLevel < 30 ? 'bg-green-500' :
                voiceFatigueData.currentLevel < 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              <span className="font-bold">{voiceFatigueData.status}</span>
            </div>
            <p className="text-sm text-gray-600">{voiceFatigueData.recommendation}</p>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Fatigue Level</span>
                <span>{voiceFatigueData.currentLevel}%</span>
              </div>
              <Progress value={voiceFatigueData.currentLevel} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2 bg-green-50 rounded text-center">
                <p className="font-medium">Pitch</p>
                <p className="text-green-600">{voiceFatigueData.patternAnalysis.pitch}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded text-center">
                <p className="font-medium">Pace</p>
                <p className="text-blue-600">{voiceFatigueData.patternAnalysis.pace}</p>
              </div>
              <div className="p-2 bg-yellow-50 rounded text-center">
                <p className="font-medium">Energy</p>
                <p className="text-yellow-600">{voiceFatigueData.patternAnalysis.energy}</p>
              </div>
              <div className="p-2 bg-purple-50 rounded text-center">
                <p className="font-medium">Clarity</p>
                <p className="text-purple-600">{voiceFatigueData.patternAnalysis.clarity}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Follow-ups */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="text-green-600" size={20} />
            Smart Follow-up Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {smartFollowups.map((followup) => (
              <div key={followup.id} className="border rounded-lg p-4 bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{followup.customer}</h3>
                    <p className="text-sm text-gray-600">{followup.nextAction}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={followup.confidence === 'High' ? "default" : "secondary"}>
                      {followup.confidence} confidence
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">Last contact: {followup.lastContact}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm">📅 {followup.scheduledTime}</p>
                    <p className="text-xs text-gray-600">{followup.notes}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Calendar size={12} className="mr-1" />
                      Reschedule
                    </Button>
                    <Button size="sm">
                      <CheckCircle size={12} className="mr-1" />
                      Execute
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="text-orange-600" size={20} />
            AI Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {performanceInsights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <div key={index} className="border rounded-lg p-4 text-center">
                  <IconComponent className="mx-auto mb-2 text-blue-600" size={24} />
                  <h3 className="font-semibold text-sm mb-1">{insight.metric}</h3>
                  <p className="text-lg font-bold text-gray-900 mb-1">{insight.value}</p>
                  <p className="text-xs text-green-600">{insight.improvement}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2">📊 Today's Automation Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">{automationStats.leadsProcessed}</p>
                <p className="text-xs text-gray-600">Leads Processed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{automationStats.followupsScheduled}</p>
                <p className="text-xs text-gray-600">Follow-ups Scheduled</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{automationStats.callsOptimized}</p>
                <p className="text-xs text-gray-600">Calls Optimized</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{automationStats.timesSaved}</p>
                <p className="text-xs text-gray-600">Time Saved</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
