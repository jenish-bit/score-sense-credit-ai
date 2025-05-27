
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Award, 
  TrendingUp, 
  Users, 
  Heart,
  Shield,
  DollarSign,
  Target,
  Zap
} from 'lucide-react';

interface PersonalizedProductsProps {
  profile: {
    personalityType: string;
    conversionRate: number;
  };
}

export const PersonalizedProducts = ({ profile }: PersonalizedProductsProps) => {
  const recommendedProducts = [
    {
      name: 'Family Health Shield',
      type: 'Health Insurance',
      matchScore: 94,
      reason: 'Your empathetic style connects perfectly with family-focused customers',
      avgConversionRate: 42,
      yourConversionRate: 48,
      customerSegment: 'Young families',
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      name: 'SecureLife Term Plan',
      type: 'Term Life Insurance',
      matchScore: 87,
      reason: 'Your storytelling approach works well for explaining life coverage benefits',
      avgConversionRate: 38,
      yourConversionRate: 44,
      customerSegment: 'Working professionals',
      icon: Shield,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'WealthBuilder ULIP',
      type: 'Investment Plan',
      matchScore: 73,
      reason: 'Growth opportunity - your trust-building skills suit investment products',
      avgConversionRate: 28,
      yourConversionRate: 31,
      customerSegment: 'Affluent investors',
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    }
  ];

  const customerSegments = [
    {
      segment: 'Young Families (25-35)',
      matchScore: 92,
      products: ['Health Insurance', 'Child Plans'],
      conversionTips: ['Focus on family protection', 'Use emotional stories', 'Highlight claim ease']
    },
    {
      segment: 'Working Professionals (30-45)',
      matchScore: 85,
      products: ['Term Life', 'Health Insurance'],
      conversionTips: ['Emphasize income replacement', 'Quick decision process', 'Digital features']
    },
    {
      segment: 'Senior Citizens (50+)',
      matchScore: 78,
      products: ['Senior Health', 'Pension Plans'],
      conversionTips: ['Patient explanation', 'Family involvement', 'Simple language']
    }
  ];

  const dailyRecommendations = [
    {
      time: 'Morning (9-11 AM)',
      energy: 'High',
      recommendedProduct: 'Health Insurance',
      customerType: 'Young families',
      reason: 'Your energy levels peak - perfect for emotional family discussions'
    },
    {
      time: 'Afternoon (2-4 PM)',
      energy: 'Medium',
      recommendedProduct: 'Term Life',
      customerType: 'Working professionals',
      reason: 'Stable energy for detailed product explanations'
    },
    {
      time: 'Evening (5-7 PM)',
      energy: 'Medium',
      recommendedProduct: 'Investment Plans',
      customerType: 'Affluent customers',
      reason: 'Customers have time for detailed investment discussions'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Product Recommendations */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="text-yellow-600" size={20} />
            Products Matched to Your DNA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendedProducts.map((product, index) => (
            <div key={index} className={`border rounded-lg p-4 ${product.bgColor}`}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-white`}>
                    <product.icon className={product.color} size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.type}</p>
                  </div>
                </div>
                <Badge variant="default" className="bg-green-500">
                  {product.matchScore}% Match
                </Badge>
              </div>
              
              <p className="text-sm text-gray-700 mb-3">{product.reason}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-500">Average Conversion</p>
                  <p className="font-semibold">{product.avgConversionRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Your Conversion</p>
                  <p className="font-semibold text-green-600">{product.yourConversionRate}%</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <Badge variant="outline">{product.customerSegment}</Badge>
                <Button size="sm">
                  <Target size={16} className="mr-1" />
                  Focus Today
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Right Sidebar */}
      <div className="space-y-6">
        {/* Customer Segments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users size={18} />
              Your Best Segments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {customerSegments.map((segment, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-sm">{segment.segment}</h4>
                  <Badge variant="outline">{segment.matchScore}%</Badge>
                </div>
                <div className="text-xs text-gray-600 mb-2">
                  Best Products: {segment.products.join(', ')}
                </div>
                <div className="space-y-1">
                  {segment.conversionTips.slice(0, 2).map((tip, tipIndex) => (
                    <p key={tipIndex} className="text-xs text-gray-500">• {tip}</p>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Daily Schedule Optimization */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap size={18} />
              Optimal Daily Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {dailyRecommendations.map((rec, index) => (
              <div key={index} className="border-l-4 border-blue-400 pl-3 py-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm">{rec.time}</span>
                  <Badge variant={rec.energy === 'High' ? 'default' : 'secondary'} className="text-xs">
                    {rec.energy}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-blue-600">{rec.recommendedProduct}</p>
                <p className="text-xs text-gray-600">{rec.customerType}</p>
                <p className="text-xs text-gray-500 mt-1">{rec.reason}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
