
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Users,
  DollarSign,
  Clock,
  Award,
  MessageSquare,
  Zap,
  Calendar
} from 'lucide-react';

export const AdvancedAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');
  
  const performanceMetrics = {
    conversionRate: { current: 34, benchmark: 28, trend: '+6%' },
    avgCallDuration: { current: 8.5, benchmark: 12.2, trend: '-30%' },
    customerSatisfaction: { current: 4.7, benchmark: 4.2, trend: '+12%' },
    revenuePerCall: { current: 2850, benchmark: 2100, trend: '+36%' }
  };

  const benchmarkComparison = [
    { category: 'Objection Handling', you: 78, topPerformer: 94, teamAvg: 72, improvement: '+16 points needed' },
    { category: 'Product Knowledge', you: 92, topPerformer: 98, teamAvg: 85, improvement: '+6 points needed' },
    { category: 'Emotional Intelligence', you: 87, topPerformer: 96, teamAvg: 79, improvement: '+9 points needed' },
    { category: 'Closing Techniques', you: 72, topPerformer: 89, teamAvg: 68, improvement: '+17 points needed' },
    { category: 'Follow-up Consistency', you: 85, topPerformer: 93, teamAvg: 77, improvement: '+8 points needed' }
  ];

  const conversationQuality = {
    overallScore: 87,
    breakdown: {
      opening: 92,
      needsDiscovery: 85,
      presentation: 89,
      objectionHandling: 78,
      closing: 86
    },
    improvements: [
      'Work on objection handling - 16 points below top performer',
      'Strengthen closing techniques with urgency creation',
      'Improve follow-up question quality during needs discovery'
    ]
  };

  const revenueImpact = {
    agentDNAUsage: 89,
    conversionImprovement: '+23%',
    revenueIncrease: '₹1.2L',
    timeToClose: '-35%',
    callQuality: '+41%'
  };

  const weeklyTrends = [
    { week: 'Week 1', calls: 45, conversions: 12, revenue: 34500 },
    { week: 'Week 2', calls: 52, conversions: 16, revenue: 42800 },
    { week: 'Week 3', calls: 48, conversions: 18, revenue: 51200 },
    { week: 'Week 4', calls: 41, conversions: 15, revenue: 47300 }
  ];

  const topPerformerInsights = [
    {
      insight: 'Top performers spend 40% more time on needs discovery',
      action: 'Extend your discovery phase by 2-3 questions',
      impact: 'Potential +15% conversion increase'
    },
    {
      insight: 'They use storytelling 3x more frequently than average',
      action: 'Prepare 3 customer success stories for different scenarios',
      impact: 'Potential +20% emotional connection score'
    },
    {
      insight: 'Follow up within 2 hours vs your average of 6 hours',
      action: 'Set immediate follow-up reminders after each call',
      impact: 'Potential +25% close rate improvement'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold">{performanceMetrics.conversionRate.current}%</p>
                <p className="text-xs text-green-600">{performanceMetrics.conversionRate.trend} vs benchmark</p>
              </div>
              <Target className="text-blue-600" size={24} />
            </div>
            <Progress value={(performanceMetrics.conversionRate.current / 50) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Call Duration</p>
                <p className="text-2xl font-bold">{performanceMetrics.avgCallDuration.current}m</p>
                <p className="text-xs text-green-600">{performanceMetrics.avgCallDuration.trend} more efficient</p>
              </div>
              <Clock className="text-green-600" size={24} />
            </div>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Customer Satisfaction</p>
                <p className="text-2xl font-bold">{performanceMetrics.customerSatisfaction.current}/5</p>
                <p className="text-xs text-green-600">{performanceMetrics.customerSatisfaction.trend} vs benchmark</p>
              </div>
              <Award className="text-yellow-600" size={24} />
            </div>
            <Progress value={(performanceMetrics.customerSatisfaction.current / 5) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue per Call</p>
                <p className="text-2xl font-bold">₹{performanceMetrics.revenuePerCall.current}</p>
                <p className="text-xs text-green-600">{performanceMetrics.revenuePerCall.trend} vs benchmark</p>
              </div>
              <DollarSign className="text-purple-600" size={24} />
            </div>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Benchmark Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="text-blue-600" size={20} />
              Benchmark Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {benchmarkComparison.map((metric) => (
              <div key={metric.category} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{metric.category}</span>
                  <span className="text-gray-600">{metric.improvement}</span>
                </div>
                <div className="relative">
                  {/* Your Performance */}
                  <Progress value={metric.you} className="h-2" />
                  {/* Top Performer Line */}
                  <div 
                    className="absolute top-0 h-2 w-0.5 bg-green-500"
                    style={{ left: `${metric.topPerformer}%` }}
                  />
                  {/* Team Average Line */}
                  <div 
                    className="absolute top-0 h-2 w-0.5 bg-yellow-500"
                    style={{ left: `${metric.teamAvg}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <span>You: {metric.you}%</span>
                  <span className="text-yellow-600">Team: {metric.teamAvg}%</span>
                  <span className="text-green-600">Top: {metric.topPerformer}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AgentDNA Impact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="text-purple-600" size={20} />
              AgentDNA Impact Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">AgentDNA Usage</p>
              <p className="text-3xl font-bold text-purple-600">{revenueImpact.agentDNAUsage}%</p>
              <p className="text-xs text-gray-500">of your calls</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded">
                <p className="text-lg font-bold text-green-600">{revenueImpact.conversionImprovement}</p>
                <p className="text-xs text-gray-600">Conversion Improvement</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded">
                <p className="text-lg font-bold text-blue-600">{revenueImpact.revenueIncrease}</p>
                <p className="text-xs text-gray-600">Additional Revenue</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded">
                <p className="text-lg font-bold text-orange-600">{revenueImpact.timeToClose}</p>
                <p className="text-xs text-gray-600">Faster Closing</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded">
                <p className="text-lg font-bold text-yellow-600">{revenueImpact.callQuality}</p>
                <p className="text-xs text-gray-600">Quality Improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversation Quality Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="text-green-600" size={20} />
            Conversation Quality Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Overall Quality Score</h3>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-green-600">{conversationQuality.overallScore}</div>
                <div className="text-sm text-gray-600">out of 100</div>
              </div>
              
              <div className="space-y-3">
                {Object.entries(conversationQuality.breakdown).map(([phase, score]) => (
                  <div key={phase} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{phase.replace(/([A-Z])/g, ' $1')}</span>
                      <span>{score}%</span>
                    </div>
                    <Progress value={score} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Improvement Recommendations</h3>
              <div className="space-y-3">
                {conversationQuality.improvements.map((improvement, index) => (
                  <div key={index} className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <p className="text-sm text-yellow-800">{improvement}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-2">Top Performer Insights</h4>
                <div className="space-y-2">
                  {topPerformerInsights.map((insight, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded text-sm">
                      <p className="font-medium text-blue-800 mb-1">{insight.insight}</p>
                      <p className="text-blue-700 mb-1">💡 {insight.action}</p>
                      <p className="text-green-700 text-xs">📈 {insight.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="text-orange-600" size={20} />
            Performance Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {weeklyTrends.map((week) => (
              <div key={week.week} className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold text-sm mb-2">{week.week}</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-lg font-bold">{week.calls}</p>
                    <p className="text-xs text-gray-600">Calls Made</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-green-600">{week.conversions}</p>
                    <p className="text-xs text-gray-600">Conversions</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-blue-600">₹{week.revenue.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">Revenue</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
