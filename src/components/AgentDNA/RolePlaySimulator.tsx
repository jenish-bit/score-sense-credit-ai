
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  Square, 
  User, 
  Bot, 
  Star, 
  Trophy, 
  Target,
  Clock,
  MessageSquare
} from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  customerType: string;
  objective: string;
  duration: number;
  description: string;
}

interface Message {
  role: 'customer' | 'agent';
  content: string;
  timestamp: string;
  score?: number;
}

export const RolePlaySimulator = () => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);

  const scenarios: Scenario[] = [
    {
      id: '1',
      title: 'Price-Sensitive Life Insurance Prospect',
      difficulty: 'Beginner',
      customerType: 'Budget-Conscious Family Man',
      objective: 'Overcome price objections and close a term life policy',
      duration: 10,
      description: 'Customer is interested but concerned about monthly premiums affecting family budget.'
    },
    {
      id: '2',
      title: 'Skeptical Investment Client',
      difficulty: 'Intermediate',
      customerType: 'Risk-Averse Professional',
      objective: 'Build trust and recommend suitable investment products',
      duration: 15,
      description: 'Client has been burned by poor investment advice before and is very cautious.'
    },
    {
      id: '3',
      title: 'High-Net-Worth Individual',
      difficulty: 'Advanced',
      customerType: 'Wealthy Business Owner',
      objective: 'Present comprehensive wealth management solutions',
      duration: 20,
      description: 'Sophisticated client with complex needs requiring advanced product knowledge.'
    },
    {
      id: '4',
      title: 'Young Professional First-Timer',
      difficulty: 'Beginner',
      customerType: 'Recent Graduate',
      objective: 'Educate and sell first insurance policy',
      duration: 12,
      description: 'New to insurance, needs education about benefits and different product options.'
    }
  ];

  const startSimulation = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setIsActive(true);
    setMessages([{
      role: 'customer',
      content: getOpeningMessage(scenario),
      timestamp: new Date().toISOString()
    }]);
    setCurrentScore(0);
    setSessionTime(0);
  };

  const getOpeningMessage = (scenario: Scenario) => {
    switch (scenario.id) {
      case '1':
        return "Hi, I've been looking into life insurance for my family, but honestly, I'm worried about the cost. We're already stretched pretty thin with the mortgage and kids' expenses. Can you really find something affordable?";
      case '2':
        return "I'll be honest with you - I've had some bad experiences with financial advisors before. They promised great returns and I ended up losing money. Why should I trust you with my investments?";
      case '3':
        return "Good morning. I'm looking for comprehensive wealth management services for my business and personal assets. I currently have about $2M in liquid assets and need sophisticated strategies. What can you offer?";
      case '4':
        return "Hi! I just got my first real job and everyone's telling me I need insurance, but I don't really understand what that means. Isn't that something for older people with families?";
      default:
        return "Hello, I'm interested in learning about your financial products.";
    }
  };

  const endSimulation = () => {
    setIsActive(false);
    // Calculate final score based on conversation quality
    const finalScore = Math.min(100, currentScore + (messages.length * 5));
    setCurrentScore(finalScore);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Scenario Selection */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="text-blue-600" size={20} />
            Practice Scenarios
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {scenarios.map(scenario => (
            <div 
              key={scenario.id}
              className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => !isActive && startSimulation(scenario)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{scenario.title}</h4>
                <Badge className={getDifficultyColor(scenario.difficulty)}>
                  {scenario.difficulty}
                </Badge>
              </div>
              <p className="text-xs text-gray-600 mb-2">{scenario.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {scenario.duration}m
                </span>
                <span className="flex items-center gap-1">
                  <User size={12} />
                  {scenario.customerType}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Simulation Interface */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="text-purple-600" size={20} />
              {selectedScenario ? selectedScenario.title : 'Select a Scenario'}
            </CardTitle>
            {isActive && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Star size={12} />
                  Score: {currentScore}
                </Badge>
                <Button variant="destructive" size="sm" onClick={endSimulation}>
                  <Square size={16} />
                  End Session
                </Button>
              </div>
            )}
          </div>
          {selectedScenario && (
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Objective:</strong> {selectedScenario.objective}</p>
              <p><strong>Customer Type:</strong> {selectedScenario.customerType}</p>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {!selectedScenario ? (
            <div className="text-center py-12 text-gray-500">
              <Target size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Ready to Practice?</p>
              <p>Select a scenario to start your role-play training session</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Progress Bar */}
              {isActive && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Session Progress</span>
                    <span>{Math.min(100, (messages.length / 10) * 100)}%</span>
                  </div>
                  <Progress value={Math.min(100, (messages.length / 10) * 100)} />
                </div>
              )}

              {/* Conversation */}
              <div className="h-96 overflow-y-auto space-y-3 border rounded-lg p-4 bg-gray-50">
                {messages.map((message, index) => (
                  <div 
                    key={index}
                    className={`flex ${message.role === 'agent' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === 'agent' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white border'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        {message.role === 'customer' ? (
                          <User size={14} />
                        ) : (
                          <Bot size={14} />
                        )}
                        <span className="text-xs font-medium">
                          {message.role === 'customer' ? 'Customer' : 'You'}
                        </span>
                        {message.score && (
                          <Badge variant="secondary" className="text-xs">
                            +{message.score}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Session Results */}
              {!isActive && messages.length > 0 && (
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium flex items-center gap-2">
                        <Trophy className="text-yellow-500" size={20} />
                        Session Complete!
                      </h3>
                      <Badge className="bg-green-100 text-green-800">
                        Score: {currentScore}/100
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <p className="font-medium">Messages</p>
                        <p className="text-gray-600">{messages.length}</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">Difficulty</p>
                        <p className="text-gray-600">{selectedScenario.difficulty}</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">Performance</p>
                        <p className="text-gray-600">
                          {currentScore >= 80 ? 'Excellent' : 
                           currentScore >= 60 ? 'Good' : 'Needs Work'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
