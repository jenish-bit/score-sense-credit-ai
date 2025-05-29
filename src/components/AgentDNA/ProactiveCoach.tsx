
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, Target, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface CoachingInsight {
  id: string;
  type: 'tip' | 'warning' | 'opportunity' | 'celebration';
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
  actionRequired?: boolean;
}

export const ProactiveCoach = () => {
  const [insights, setInsights] = useState<CoachingInsight[]>([]);
  const [currentInsight, setCurrentInsight] = useState<CoachingInsight | null>(null);

  const mockInsights: CoachingInsight[] = [
    {
      id: '1',
      type: 'opportunity',
      title: 'Perfect Timing for Upselling',
      message: 'Your last 3 customers showed high engagement. Consider introducing premium products in your next calls.',
      priority: 'high',
      timestamp: new Date().toISOString(),
      actionRequired: true
    },
    {
      id: '2',
      type: 'warning',
      title: 'Energy Level Alert',
      message: 'Your voice analysis shows decreased energy in afternoon calls. Consider a 10-minute break.',
      priority: 'medium',
      timestamp: new Date().toISOString(),
      actionRequired: false
    },
    {
      id: '3',
      type: 'celebration',
      title: 'Milestone Achievement!',
      message: 'Congratulations! You\'ve improved your closing rate by 15% this week. Keep up the excellent work!',
      priority: 'low',
      timestamp: new Date().toISOString(),
      actionRequired: false
    },
    {
      id: '4',
      type: 'tip',
      title: 'Customer Personality Insight',
      message: 'Your next prospect prefers data-driven conversations. Prepare statistical benefits and case studies.',
      priority: 'high',
      timestamp: new Date().toISOString(),
      actionRequired: true
    }
  ];

  useEffect(() => {
    // Simulate proactive insights generation
    const interval = setInterval(() => {
      const randomInsight = mockInsights[Math.floor(Math.random() * mockInsights.length)];
      const newInsight = {
        ...randomInsight,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };
      
      setInsights(prev => [newInsight, ...prev.slice(0, 4)]);
      setCurrentInsight(newInsight);

      // Auto-hide current insight after 8 seconds
      setTimeout(() => {
        setCurrentInsight(null);
      }, 8000);
    }, 15000); // New insight every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <Target className="text-green-600" size={20} />;
      case 'warning': return <AlertTriangle className="text-yellow-600" size={20} />;
      case 'celebration': return <CheckCircle className="text-blue-600" size={20} />;
      case 'tip': return <Brain className="text-purple-600" size={20} />;
      default: return <TrendingUp className="text-gray-600" size={20} />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'border-green-200 bg-green-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'celebration': return 'border-blue-200 bg-blue-50';
      case 'tip': return 'border-purple-200 bg-purple-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const dismissInsight = (id: string) => {
    setInsights(prev => prev.filter(insight => insight.id !== id));
    if (currentInsight?.id === id) {
      setCurrentInsight(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Current Active Insight - Floating */}
      {currentInsight && (
        <div className="fixed top-20 right-4 z-50 w-80">
          <Card className={`border-2 shadow-lg ${getInsightColor(currentInsight.type)} animate-in slide-in-from-right-full duration-500`}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getInsightIcon(currentInsight.type)}
                  <CardTitle className="text-sm font-medium">{currentInsight.title}</CardTitle>
                </div>
                <Badge variant={currentInsight.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                  {currentInsight.priority}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-700 mb-3">{currentInsight.message}</p>
              <div className="flex gap-2">
                {currentInsight.actionRequired && (
                  <Button size="sm" className="text-xs">
                    Take Action
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => dismissInsight(currentInsight.id)}
                >
                  Dismiss
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Insights History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="text-blue-600" size={20} />
            Proactive Coaching Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {insights.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Clock size={48} className="mx-auto mb-2 opacity-50" />
              <p>AI is analyzing your performance...</p>
              <p className="text-sm">Insights will appear here automatically</p>
            </div>
          ) : (
            insights.map(insight => (
              <div 
                key={insight.id}
                className={`p-3 rounded-lg border ${getInsightColor(insight.type)} transition-all hover:shadow-md`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{insight.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {new Date(insight.timestamp).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700">{insight.message}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => dismissInsight(insight.id)}
                    className="text-xs opacity-60 hover:opacity-100"
                  >
                    ×
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};
