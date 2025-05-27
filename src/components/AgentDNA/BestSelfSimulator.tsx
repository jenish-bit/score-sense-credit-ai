
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Play, 
  RotateCcw, 
  Award,
  MessageCircle,
  TrendingUp,
  Star,
  User,
  CheckCircle
} from 'lucide-react';

export const BestSelfSimulator = () => {
  const [activeScenario, setActiveScenario] = useState(null);
  const [simulationScore, setSimulationScore] = useState(0);
  const [practiceHistory, setPracticeHistory] = useState([
    { date: '2024-01-20', scenario: 'Health Insurance Objection', score: 87, improvement: '+12%' },
    { date: '2024-01-19', scenario: 'Term Life Upsell', score: 92, improvement: '+8%' },
    { date: '2024-01-18', scenario: 'First Time Customer', score: 78, improvement: '+15%' }
  ]);

  const scenarios = [
    {
      id: 1,
      title: 'Handling Premium Objections',
      difficulty: 'Intermediate',
      description: 'Customer thinks the premium is too high',
      customerProfile: 'Price-sensitive family man',
      yourBestApproach: 'Storytelling + Value demonstration',
      estimatedTime: '5-7 minutes'
    },
    {
      id: 2,
      title: 'First-Time Insurance Buyer',
      difficulty: 'Beginner',
      description: 'Young professional, new to insurance',
      customerProfile: 'Tech-savvy, wants quick decisions',
      yourBestApproach: 'Educational + Digital tools',
      estimatedTime: '3-5 minutes'
    },
    {
      id: 3,
      title: 'Competitive Comparison',
      difficulty: 'Advanced',
      description: 'Customer comparing with other providers',
      customerProfile: 'Well-researched, analytical',
      yourBestApproach: 'Data-driven + Unique benefits',
      estimatedTime: '8-10 minutes'
    }
  ];

  const startSimulation = (scenario: any) => {
    setActiveScenario(scenario);
    setSimulationScore(0);
  };

  const skillMetrics = [
    { skill: 'Objection Handling', current: 78, bestSelf: 94, gap: 16 },
    { skill: 'Product Knowledge', current: 92, bestSelf: 98, gap: 6 },
    { skill: 'Emotional Connection', current: 85, bestSelf: 96, gap: 11 },
    { skill: 'Closing Techniques', current: 72, bestSelf: 89, gap: 17 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Practice Scenarios */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="text-purple-600" size={20} />
            Your Best Self Simulator™
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!activeScenario ? (
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">
                Practice with AI customers and compare your performance to your best self
              </p>
              
              {scenarios.map((scenario) => (
                <div key={scenario.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{scenario.title}</h3>
                      <p className="text-sm text-gray-600">{scenario.description}</p>
                    </div>
                    <Badge variant={
                      scenario.difficulty === 'Beginner' ? 'secondary' :
                      scenario.difficulty === 'Intermediate' ? 'default' : 'destructive'
                    }>
                      {scenario.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-gray-500">Customer Type</p>
                      <p className="font-medium">{scenario.customerProfile}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Your Best Approach</p>
                      <p className="font-medium">{scenario.yourBestApproach}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{scenario.estimatedTime}</span>
                    <Button size="sm" onClick={() => startSimulation(scenario)}>
                      <Play size={16} className="mr-1" />
                      Start Practice
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{activeScenario.title}</h3>
                <Button variant="outline" size="sm" onClick={() => setActiveScenario(null)}>
                  <RotateCcw size={16} className="mr-1" />
                  Back to Scenarios
                </Button>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Scenario Setup</h4>
                <p className="text-sm text-gray-700 mb-2">{activeScenario.description}</p>
                <p className="text-sm"><strong>Customer:</strong> {activeScenario.customerProfile}</p>
              </div>
              
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                <MessageCircle size={48} className="mx-auto text-gray-400 mb-4" />
                <h4 className="font-medium text-gray-900 mb-2">AI Customer Simulation</h4>
                <p className="text-gray-600 mb-4">Voice simulation would start here</p>
                <Button className="mr-2">
                  <Play size={16} className="mr-1" />
                  Start Conversation
                </Button>
                <Button variant="outline">
                  <Mic size={16} className="mr-1" />
                  Voice Practice
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Tracking */}
      <div className="space-y-6">
        {/* Skill Gap Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp size={18} />
              Skill Gap Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {skillMetrics.map((metric) => (
              <div key={metric.skill} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{metric.skill}</span>
                  <span className="text-gray-600">{metric.current}% / {metric.bestSelf}%</span>
                </div>
                <div className="relative">
                  <Progress value={metric.current} className="h-2" />
                  <div 
                    className="absolute top-0 h-2 bg-green-200 rounded-full"
                    style={{ width: `${metric.bestSelf}%`, opacity: 0.5 }}
                  />
                </div>
                <p className="text-xs text-orange-600">Gap: {metric.gap} points to your best self</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Practice */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Award size={18} />
              Practice History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {practiceHistory.map((practice, index) => (
              <div key={index} className="flex justify-between items-center p-2 border rounded">
                <div>
                  <p className="font-medium text-sm">{practice.scenario}</p>
                  <p className="text-xs text-gray-500">{practice.date}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-500" />
                    <span className="font-medium">{practice.score}</span>
                  </div>
                  <p className="text-xs text-green-600">{practice.improvement}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
