
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  MessageSquare, 
  TrendingUp, 
  Target,
  Brain,
  Star,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface BehavioralProfileProps {
  profile: {
    personalityType: string;
    conversionRate: number;
    emotionalIntelligence: number;
    communicationStyle: string;
    strengths: string[];
    weaknesses: string[];
  };
}

export const BehavioralProfile = ({ profile }: BehavioralProfileProps) => {
  const personalityTraits = [
    { name: 'Empathy', score: 92, color: 'bg-green-500' },
    { name: 'Assertiveness', score: 67, color: 'bg-blue-500' },
    { name: 'Patience', score: 84, color: 'bg-purple-500' },
    { name: 'Persuasion', score: 73, color: 'bg-orange-500' },
    { name: 'Active Listening', score: 89, color: 'bg-teal-500' },
    { name: 'Adaptability', score: 76, color: 'bg-pink-500' }
  ];

  const communicationPatterns = [
    { pattern: 'Uses Stories', frequency: 78, description: 'You naturally weave narratives into conversations' },
    { pattern: 'Asks Questions', frequency: 82, description: 'You engage customers with thoughtful questions' },
    { pattern: 'Emotional Appeals', frequency: 71, description: 'You connect through emotions and values' },
    { pattern: 'Data-Driven', frequency: 45, description: 'You occasionally use statistics and facts' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Personality DNA */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="text-blue-600" size={20} />
            Your Sales DNA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="text-blue-600" size={24} />
            </div>
            <h3 className="font-bold text-lg text-gray-900">{profile.personalityType}</h3>
            <p className="text-sm text-gray-600 mt-1">{profile.communicationStyle}</p>
          </div>

          <div className="space-y-3">
            {personalityTraits.map((trait) => (
              <div key={trait.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{trait.name}</span>
                  <span className="text-gray-600">{trait.score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${trait.color}`}
                    style={{ width: `${trait.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Communication Patterns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="text-green-600" size={20} />
            Communication Patterns
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {communicationPatterns.map((pattern) => (
            <div key={pattern.pattern} className="border rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{pattern.pattern}</span>
                <Badge variant={pattern.frequency > 70 ? "default" : "secondary"}>
                  {pattern.frequency}%
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{pattern.description}</p>
              <Progress value={pattern.frequency} className="mt-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Strengths & Growth Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="text-yellow-600" size={20} />
            Your Superpowers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {profile.strengths.map((strength) => (
              <div key={strength} className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={16} />
                <span className="text-sm font-medium">{strength}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Growth Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="text-orange-600" size={20} />
            Growth Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {profile.weaknesses.map((weakness) => (
              <div key={weakness} className="flex items-center gap-2">
                <AlertCircle className="text-orange-500" size={16} />
                <span className="text-sm font-medium">{weakness}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-orange-50 rounded-lg">
            <p className="text-sm text-orange-800">
              <strong>AI Insight:</strong> Focus on practicing objection handling. Your empathy is perfect for addressing customer concerns!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
