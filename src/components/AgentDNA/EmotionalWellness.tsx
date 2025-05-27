
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  Battery, 
  Brain, 
  Coffee,
  Moon,
  Sun,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  TrendingUp,
  PlayCircle
} from 'lucide-react';

interface EmotionalWellnessProps {
  profile: {
    todaysMood: number;
  };
}

export const EmotionalWellness = ({ profile }: EmotionalWellnessProps) => {
  const [breathingExercise, setBreathingExercise] = useState(false);
  
  const wellnessMetrics = {
    energyLevel: 85,
    stressLevel: 32,
    voiceFatigue: 28,
    emotionalBandwidth: 78,
    burnoutRisk: 'Low'
  };

  const todaysPattern = [
    { time: '9:00', energy: 95, mood: 'Energetic', calls: 3 },
    { time: '11:00', energy: 88, mood: 'Focused', calls: 5 },
    { time: '13:00', energy: 72, mood: 'Neutral', calls: 2 },
    { time: '15:00', energy: 65, mood: 'Tired', calls: 4 },
    { time: '17:00', energy: 58, mood: 'Drained', calls: 1 }
  ];

  const recommendations = [
    {
      type: 'immediate',
      icon: Coffee,
      title: 'Take a 10-minute break',
      description: 'Your voice shows signs of fatigue. A short break will help.',
      action: 'Start Break Timer'
    },
    {
      type: 'wellness',
      icon: Brain,
      title: 'Breathing Exercise',
      description: 'Reduce stress and reset your emotional state.',
      action: 'Start Exercise'
    },
    {
      type: 'energy',
      icon: Sun,
      title: 'Energy Boost',
      description: 'Light stretching or a quick walk can restore energy.',
      action: 'View Exercises'
    }
  ];

  const weeklyTrends = [
    { day: 'Mon', energy: 82, stress: 25, performance: 88 },
    { day: 'Tue', energy: 78, stress: 35, performance: 85 },
    { day: 'Wed', energy: 85, stress: 28, performance: 92 },
    { day: 'Thu', energy: 71, stress: 42, performance: 78 },
    { day: 'Fri', energy: 68, stress: 48, performance: 75 }
  ];

  const startBreathingExercise = () => {
    setBreathingExercise(true);
    // Simulate breathing exercise
    setTimeout(() => setBreathingExercise(false), 10000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Current Wellness State */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="text-red-500" size={20} />
            Emotional Wellness Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Real-time Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Battery className="mx-auto text-green-600 mb-2" size={24} />
              <p className="text-sm text-gray-600">Energy</p>
              <p className="text-xl font-bold text-green-600">{wellnessMetrics.energyLevel}%</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="mx-auto text-yellow-600 mb-2" size={24} />
              <p className="text-sm text-gray-600">Stress</p>
              <p className="text-xl font-bold text-yellow-600">{wellnessMetrics.stressLevel}%</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Brain className="mx-auto text-blue-600 mb-2" size={24} />
              <p className="text-sm text-gray-600">Voice Fatigue</p>
              <p className="text-xl font-bold text-blue-600">{wellnessMetrics.voiceFatigue}%</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Heart className="mx-auto text-purple-600 mb-2" size={24} />
              <p className="text-sm text-gray-600">EQ Bandwidth</p>
              <p className="text-xl font-bold text-purple-600">{wellnessMetrics.emotionalBandwidth}%</p>
            </div>
          </div>

          {/* Today's Energy Pattern */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingDown size={18} />
              Today's Energy Pattern
            </h3>
            <div className="space-y-2">
              {todaysPattern.map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium w-12">{entry.time}</span>
                    <div className="flex-1">
                      <Progress value={entry.energy} className="w-24 h-2" />
                    </div>
                    <Badge variant={
                      entry.mood === 'Energetic' ? 'default' :
                      entry.mood === 'Focused' ? 'secondary' :
                      entry.mood === 'Neutral' ? 'outline' :
                      'destructive'
                    }>
                      {entry.mood}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-500">{entry.calls} calls</span>
                </div>
              ))}
            </div>
          </div>

          {/* Breathing Exercise */}
          {breathingExercise && (
            <div className="p-6 bg-blue-50 rounded-lg text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-4 animate-pulse" />
              <h4 className="font-semibold mb-2">Breathe In... Breathe Out...</h4>
              <p className="text-sm text-gray-600">Follow the circle rhythm</p>
              <Button variant="outline" size="sm" className="mt-3" onClick={() => setBreathingExercise(false)}>
                Stop Exercise
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Wellness Actions & Trends */}
      <div className="space-y-6">
        {/* Burnout Risk Assessment */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle size={18} />
              Burnout Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${
                wellnessMetrics.burnoutRisk === 'Low' ? 'bg-green-100' :
                wellnessMetrics.burnoutRisk === 'Medium' ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                {wellnessMetrics.burnoutRisk === 'Low' ? 
                  <CheckCircle className="text-green-600" size={24} /> :
                  <AlertTriangle className="text-yellow-600" size={24} />
                }
              </div>
              <h3 className="font-bold text-lg">{wellnessMetrics.burnoutRisk} Risk</h3>
              <p className="text-sm text-gray-600">Based on last 7 days</p>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Call Volume</span>
                <span className="text-green-600">Healthy</span>
              </div>
              <div className="flex justify-between">
                <span>Recovery Time</span>
                <span className="text-green-600">Adequate</span>
              </div>
              <div className="flex justify-between">
                <span>Stress Patterns</span>
                <span className="text-yellow-600">Monitor</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wellness Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Smart Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex items-start gap-3">
                  <rec.icon className="text-blue-600 mt-1" size={18} />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{rec.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">{rec.description}</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs"
                      onClick={rec.title === 'Breathing Exercise' ? startBreathingExercise : undefined}
                    >
                      {rec.title === 'Breathing Exercise' && breathingExercise ? 'In Progress...' : rec.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weekly Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp size={18} />
              Weekly Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weeklyTrends.map((day, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{day.day}</span>
                    <span className="text-gray-600">Performance: {day.performance}%</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="flex justify-between text-xs">
                        <span>Energy</span>
                        <span>{day.energy}%</span>
                      </div>
                      <Progress value={day.energy} className="h-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs">
                        <span>Stress</span>
                        <span>{day.stress}%</span>
                      </div>
                      <Progress value={day.stress} className="h-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
