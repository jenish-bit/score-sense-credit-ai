
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  User, 
  AlertTriangle,
  Target,
  Clock,
  Zap,
  Eye,
  MessageSquare
} from 'lucide-react';

export const CustomerIntelligence = () => {
  const [customerProfile, setCustomerProfile] = useState({
    name: 'Rajesh Kumar',
    personalityType: 'Analytical Decision Maker',
    buyingIntent: 78,
    riskLevel: 'Medium',
    preferredCommunication: 'Data-driven',
    emotionalState: 'Cautious but Interested',
    timeToDecision: 'Long (2-3 weeks)',
    pricesensitivity: 'High'
  });

  const [realTimeInsights, setRealTimeInsights] = useState([
    {
      timestamp: '14:23',
      insight: 'Customer asked about claim ratio - high analytical signal',
      confidence: 94,
      action: 'Share specific industry statistics'
    },
    {
      timestamp: '14:21',
      insight: 'Voice tone indicates price concern',
      confidence: 87,
      action: 'Emphasize long-term value over monthly cost'
    },
    {
      timestamp: '14:19',
      insight: 'Customer mentioned family twice - emotional trigger detected',
      confidence: 91,
      action: 'Use family protection storytelling approach'
    }
  ]);

  const objectionPredictor = [
    { objection: 'Premium too high', probability: 85, preparation: 'Value-based response ready' },
    { objection: 'Need to think about it', probability: 72, preparation: 'Urgency creation tactics prepared' },
    { objection: 'Compare with other providers', probability: 68, preparation: 'Unique benefits highlighted' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Customer Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="text-blue-600" size={20} />
            Live Customer Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <h3 className="font-bold text-lg">{customerProfile.name}</h3>
            <p className="text-sm text-gray-600">{customerProfile.personalityType}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Buying Intent</p>
              <div className="flex items-center gap-2">
                <Progress value={customerProfile.buyingIntent} className="flex-1" />
                <span className="font-medium">{customerProfile.buyingIntent}%</span>
              </div>
            </div>
            <div>
              <p className="text-gray-500">Risk Level</p>
              <Badge variant={customerProfile.riskLevel === 'High' ? 'destructive' : 'secondary'}>
                {customerProfile.riskLevel}
              </Badge>
            </div>
            <div>
              <p className="text-gray-500">Communication Style</p>
              <p className="font-medium">{customerProfile.preferredCommunication}</p>
            </div>
            <div>
              <p className="text-gray-500">Emotional State</p>
              <p className="font-medium">{customerProfile.emotionalState}</p>
            </div>
            <div>
              <p className="text-gray-500">Decision Timeline</p>
              <p className="font-medium">{customerProfile.timeToDecision}</p>
            </div>
            <div>
              <p className="text-gray-500">Price Sensitivity</p>
              <p className="font-medium">{customerProfile.pricesensitivity}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="text-green-600" size={20} />
            AI Conversation Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {realTimeInsights.map((insight, index) => (
            <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-gray-500">{insight.timestamp}</span>
                <Badge variant="outline" className="text-xs">
                  {insight.confidence}% confidence
                </Badge>
              </div>
              <p className="text-sm font-medium mb-1">{insight.insight}</p>
              <p className="text-xs text-green-700 bg-green-100 p-2 rounded">
                💡 {insight.action}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Objection Predictor */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="text-orange-600" size={20} />
            Objection Predictor & Response Prep
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {objectionPredictor.map((obj, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-sm">{obj.objection}</span>
                  <Badge variant={obj.probability > 80 ? 'destructive' : obj.probability > 70 ? 'default' : 'secondary'}>
                    {obj.probability}%
                  </Badge>
                </div>
                <Progress value={obj.probability} className="mb-2" />
                <p className="text-xs text-gray-600">{obj.preparation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
