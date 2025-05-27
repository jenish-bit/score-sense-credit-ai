
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  MessageCircle,
  Brain,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Volume2
} from 'lucide-react';

export const RealTimeCoach = () => {
  const [isListening, setIsListening] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState('');
  const [customerMood, setCustomerMood] = useState('neutral');
  const [callDuration, setCallDuration] = useState(0);

  const realTimeSuggestions = [
    {
      type: 'warning',
      message: "Customer sounds hesitant. Try asking: 'What specific concerns do you have about this policy?'",
      timestamp: '00:45'
    },
    {
      type: 'success',
      message: "Great emotional connection! Customer trust level is high. Perfect time to introduce premium features.",
      timestamp: '01:23'
    },
    {
      type: 'tip',
      message: "You mentioned 'claims' 3 times. Switch to storytelling - share a success story instead.",
      timestamp: '02:15'
    }
  ];

  const customerInsights = {
    mood: 'Interested but cautious',
    personality: 'Analytical type',
    concerns: ['Premium cost', 'Claim process'],
    triggers: ['Family security', 'Financial stability']
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleCall = () => {
    setCallActive(!callActive);
    if (!callActive) {
      setCallDuration(0);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Call Control */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="text-blue-600" size={20} />
            AI Sales Coach - Live Session
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Call Status */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${callActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              <span className="font-medium">
                {callActive ? 'Call Active' : 'Ready to Coach'}
              </span>
              {callActive && (
                <Badge variant="outline">{formatTime(callDuration)}</Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant={isListening ? "destructive" : "outline"}
                size="sm"
                onClick={() => setIsListening(!isListening)}
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                {isListening ? 'Stop Listening' : 'Start Listening'}
              </Button>
              <Button
                variant={callActive ? "destructive" : "default"}
                onClick={toggleCall}
              >
                {callActive ? <Pause size={16} /> : <Play size={16} />}
                {callActive ? 'End Session' : 'Start Session'}
              </Button>
            </div>
          </div>

          {/* Live Suggestions */}
          {callActive && (
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <MessageCircle size={18} />
                Live Coaching Suggestions
              </h3>
              {realTimeSuggestions.map((suggestion, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border-l-4 ${
                    suggestion.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                    suggestion.type === 'success' ? 'bg-green-50 border-green-400' :
                    'bg-blue-50 border-blue-400'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {suggestion.type === 'warning' && <AlertTriangle className="text-yellow-600 mt-0.5" size={16} />}
                    {suggestion.type === 'success' && <CheckCircle className="text-green-600 mt-0.5" size={16} />}
                    {suggestion.type === 'tip' && <TrendingUp className="text-blue-600 mt-0.5" size={16} />}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{suggestion.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{suggestion.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Voice Analysis */}
          {isListening && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium flex items-center gap-2 mb-2">
                <Volume2 size={16} />
                Voice Analysis
              </h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Tone</p>
                  <p className="font-medium">Confident</p>
                </div>
                <div>
                  <p className="text-gray-600">Pace</p>
                  <p className="font-medium">Optimal</p>
                </div>
                <div>
                  <p className="text-gray-600">Energy</p>
                  <p className="font-medium">High</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Customer Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Customer Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Current Mood</p>
            <Badge variant="outline" className="w-full justify-center">
              {customerInsights.mood}
            </Badge>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Personality Type</p>
            <p className="font-medium">{customerInsights.personality}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Key Concerns</p>
            <div className="space-y-1">
              {customerInsights.concerns.map((concern, index) => (
                <Badge key={index} variant="secondary" className="mr-1 mb-1">
                  {concern}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Emotional Triggers</p>
            <div className="space-y-1">
              {customerInsights.triggers.map((trigger, index) => (
                <Badge key={index} variant="outline" className="mr-1 mb-1">
                  {trigger}
                </Badge>
              ))}
            </div>
          </div>

          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>AI Recommendation:</strong> Focus on family protection stories. This customer values security over savings.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
