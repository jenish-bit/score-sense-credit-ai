
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Users, 
  Target,
  Award,
  TrendingUp,
  Zap,
  Crown,
  Medal,
  Gift
} from 'lucide-react';

export const GamificationDashboard = () => {
  const [agentStats, setAgentStats] = useState({
    currentRank: 7,
    totalAgents: 152,
    pointsThisMonth: 2850,
    level: 'Gold Agent',
    nextLevelPoints: 3500,
    streak: 12
  });

  const achievements = [
    { id: 1, title: 'Conversion Master', description: '5 consecutive successful calls', earned: true, points: 500, icon: Target },
    { id: 2, title: 'Objection Handler', description: 'Successfully handled 20 objections', earned: true, points: 300, icon: Award },
    { id: 3, title: 'Speed Demon', description: 'Complete call in under 10 minutes', earned: false, points: 200, icon: Zap },
    { id: 4, title: 'Customer Whisperer', description: 'Perfect customer satisfaction score', earned: true, points: 400, icon: Star },
    { id: 5, title: 'Team Player', description: 'Help 3 colleagues this week', earned: false, points: 250, icon: Users },
    { id: 6, title: 'Premium Seller', description: 'Sell 10 premium policies', earned: false, points: 600, icon: Crown }
  ];

  const leaderboard = [
    { rank: 1, name: 'Priya Sharma', points: 4250, level: 'Platinum', change: '+2' },
    { rank: 2, name: 'Arjun Patel', points: 3890, level: 'Gold', change: '-1' },
    { rank: 3, name: 'Sneha Reddy', points: 3750, level: 'Gold', change: '+1' },
    { rank: 4, name: 'Rajesh Kumar', points: 3600, level: 'Gold', change: '0' },
    { rank: 5, name: 'Amit Singh', points: 3450, level: 'Gold', change: '+3' },
    { rank: 6, name: 'Kavita Joshi', points: 3200, level: 'Silver', change: '-2' },
    { rank: 7, name: 'You', points: 2850, level: 'Gold', change: '+1', isCurrentUser: true }
  ];

  const challenges = [
    {
      id: 1,
      title: 'Weekly Challenge: Family Focus',
      description: 'Sell 5 family protection policies this week',
      progress: 3,
      target: 5,
      timeLeft: '3 days',
      reward: '500 points + Family Protection Badge',
      participants: 45
    },
    {
      id: 2,
      title: 'Team Challenge: Regional Champions',
      description: 'Mumbai team vs Delhi team - highest conversion rate wins',
      progress: 67,
      target: 100,
      timeLeft: '1 week',
      reward: 'Team lunch + 1000 points each',
      participants: 28
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Agent Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="text-yellow-600" size={20} />
            Your Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Medal className="text-yellow-600" size={24} />
              <span className="font-bold text-lg">{agentStats.level}</span>
            </div>
            <p className="text-sm text-gray-600">Rank #{agentStats.currentRank} of {agentStats.totalAgents}</p>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Points This Month</span>
                <span className="font-medium">{agentStats.pointsThisMonth}/{agentStats.nextLevelPoints}</span>
              </div>
              <Progress value={(agentStats.pointsThisMonth / agentStats.nextLevelPoints) * 100} />
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-2 bg-blue-50 rounded">
                <p className="text-xl font-bold text-blue-600">{agentStats.streak}</p>
                <p className="text-xs text-gray-600">Day Streak</p>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <p className="text-xl font-bold text-green-600">650</p>
                <p className="text-xs text-gray-600">Points to Platinum</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="text-purple-600" size={20} />
            Regional Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {leaderboard.map((agent) => (
              <div 
                key={agent.rank} 
                className={`flex items-center justify-between p-2 rounded ${
                  agent.isCurrentUser ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    agent.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                    agent.rank === 2 ? 'bg-gray-100 text-gray-800' :
                    agent.rank === 3 ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {agent.rank}
                  </div>
                  <div>
                    <p className={`font-medium text-sm ${agent.isCurrentUser ? 'text-blue-800' : ''}`}>
                      {agent.name}
                    </p>
                    <p className="text-xs text-gray-500">{agent.level}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">{agent.points}</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp size={12} className={agent.change.startsWith('+') ? 'text-green-500' : 'text-red-500'} />
                    <span className="text-xs">{agent.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="text-green-600" size={20} />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <div 
                  key={achievement.id}
                  className={`flex items-center gap-3 p-2 rounded border ${
                    achievement.earned ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className={`p-2 rounded ${
                    achievement.earned ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <IconComponent 
                      size={16} 
                      className={achievement.earned ? 'text-green-600' : 'text-gray-400'} 
                    />
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium text-sm ${
                      achievement.earned ? 'text-green-800' : 'text-gray-600'
                    }`}>
                      {achievement.title}
                    </p>
                    <p className="text-xs text-gray-500">{achievement.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium">{achievement.points} pts</p>
                    {achievement.earned && (
                      <Badge variant="secondary" className="text-xs">Earned</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Active Challenges */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="text-red-600" size={20} />
            Active Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-sm">{challenge.title}</h3>
                    <p className="text-xs text-gray-600">{challenge.description}</p>
                  </div>
                  <Badge variant="outline">{challenge.timeLeft}</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{challenge.progress}/{challenge.target}</span>
                  </div>
                  <Progress value={(challenge.progress / challenge.target) * 100} />
                  
                  <div className="flex justify-between items-center mt-3">
                    <div className="text-xs">
                      <p className="text-green-700 font-medium">🎁 {challenge.reward}</p>
                      <p className="text-gray-500">{challenge.participants} participants</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Gift size={14} className="mr-1" />
                      Join
                    </Button>
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
