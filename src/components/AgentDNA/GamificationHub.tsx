
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Target, 
  Flame, 
  Crown, 
  Medal, 
  Award,
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: string;
  deadline: string;
  progress: number;
  maxProgress: number;
  active: boolean;
}

export const GamificationHub = () => {
  const [activeTab, setActiveTab] = useState<'achievements' | 'leaderboard' | 'challenges'>('achievements');

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Sale Superstar',
      description: 'Complete your first successful sales call',
      icon: <Star className="text-yellow-500" size={24} />,
      progress: 1,
      maxProgress: 1,
      unlocked: true,
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Objection Crusher',
      description: 'Successfully handle 50 customer objections',
      icon: <Target className="text-blue-500" size={24} />,
      progress: 32,
      maxProgress: 50,
      unlocked: false,
      rarity: 'rare'
    },
    {
      id: '3',
      title: 'Hot Streak',
      description: 'Close 5 deals in a single day',
      icon: <Flame className="text-red-500" size={24} />,
      progress: 3,
      maxProgress: 5,
      unlocked: false,
      rarity: 'epic'
    },
    {
      id: '4',
      title: 'Sales Royalty',
      description: 'Achieve 95%+ customer satisfaction for 30 days',
      icon: <Crown className="text-purple-500" size={24} />,
      progress: 12,
      maxProgress: 30,
      unlocked: false,
      rarity: 'legendary'
    },
    {
      id: '5',
      title: 'AI Coach Graduate',
      description: 'Complete 100 AI coaching sessions',
      icon: <Medal className="text-green-500" size={24} />,
      progress: 67,
      maxProgress: 100,
      unlocked: false,
      rarity: 'rare'
    },
    {
      id: '6',
      title: 'Perfect Closer',
      description: 'Maintain 100% closing rate for a week',
      icon: <Award className="text-orange-500" size={24} />,
      progress: 0,
      maxProgress: 7,
      unlocked: false,
      rarity: 'legendary'
    }
  ];

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Weekly Sales Sprint',
      description: 'Close 10 deals this week',
      reward: '500 XP + Exclusive Badge',
      deadline: '3 days',
      progress: 6,
      maxProgress: 10,
      active: true
    },
    {
      id: '2',
      title: 'Customer Delight',
      description: 'Achieve 90%+ satisfaction in 20 calls',
      reward: '300 XP + Premium Coaching Session',
      deadline: '5 days',
      progress: 14,
      maxProgress: 20,
      active: true
    },
    {
      id: '3',
      title: 'Skill Master',
      description: 'Complete 5 role-play scenarios with 80%+ score',
      reward: '400 XP + Advanced Training Unlock',
      deadline: '7 days',
      progress: 2,
      maxProgress: 5,
      active: true
    }
  ];

  const leaderboardData = [
    { rank: 1, name: 'Rajesh Kumar', score: 12450, streak: 15, badge: '👑' },
    { rank: 2, name: 'Priya Sharma', score: 11890, streak: 12, badge: '🥈' },
    { rank: 3, name: 'Amit Patel', score: 11200, streak: 8, badge: '🥉' },
    { rank: 4, name: 'You', score: 10850, streak: 6, badge: '⭐' },
    { rank: 5, name: 'Sneha Gupta', score: 10200, streak: 4, badge: '🔥' },
    { rank: 6, name: 'Vikram Singh', score: 9800, streak: 3, badge: '💎' },
    { rank: 7, name: 'Kavya Reddy', score: 9500, streak: 2, badge: '🎯' },
    { rank: 8, name: 'Rahul Verma', score: 9100, streak: 1, badge: '⚡' }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'common': return <Badge variant="secondary">Common</Badge>;
      case 'rare': return <Badge className="bg-blue-100 text-blue-800">Rare</Badge>;
      case 'epic': return <Badge className="bg-purple-100 text-purple-800">Epic</Badge>;
      case 'legendary': return <Badge className="bg-yellow-100 text-yellow-800">Legendary</Badge>;
      default: return <Badge variant="secondary">Common</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="mx-auto mb-2 text-yellow-500" size={32} />
            <p className="text-2xl font-bold">1,485</p>
            <p className="text-sm text-gray-600">Total XP</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Flame className="mx-auto mb-2 text-red-500" size={32} />
            <p className="text-2xl font-bold">6</p>
            <p className="text-sm text-gray-600">Day Streak</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Medal className="mx-auto mb-2 text-green-500" size={32} />
            <p className="text-2xl font-bold">8</p>
            <p className="text-sm text-gray-600">Achievements</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="mx-auto mb-2 text-blue-500" size={32} />
            <p className="text-2xl font-bold">#4</p>
            <p className="text-sm text-gray-600">Leaderboard</p>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2">
        <Button 
          variant={activeTab === 'achievements' ? 'default' : 'outline'}
          onClick={() => setActiveTab('achievements')}
          className="flex items-center gap-2"
        >
          <Trophy size={16} />
          Achievements
        </Button>
        <Button 
          variant={activeTab === 'leaderboard' ? 'default' : 'outline'}
          onClick={() => setActiveTab('leaderboard')}
          className="flex items-center gap-2"
        >
          <Users size={16} />
          Leaderboard
        </Button>
        <Button 
          variant={activeTab === 'challenges' ? 'default' : 'outline'}
          onClick={() => setActiveTab('challenges')}
          className="flex items-center gap-2"
        >
          <Calendar size={16} />
          Challenges
        </Button>
      </div>

      {/* Tab Content */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map(achievement => (
            <Card 
              key={achievement.id} 
              className={`transition-all hover:shadow-lg ${getRarityColor(achievement.rarity)} ${
                achievement.unlocked ? 'border-2' : 'opacity-75'
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={achievement.unlocked ? '' : 'grayscale'}>
                      {achievement.icon}
                    </div>
                    <div>
                      <CardTitle className="text-sm">{achievement.title}</CardTitle>
                      {getRarityBadge(achievement.rarity)}
                    </div>
                  </div>
                  {achievement.unlocked && (
                    <Badge className="bg-green-100 text-green-800">Unlocked</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{achievement.progress}/{achievement.maxProgress}</span>
                  </div>
                  <Progress 
                    value={(achievement.progress / achievement.maxProgress) * 100} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="text-blue-600" size={20} />
              Weekly Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {leaderboardData.map(player => (
                <div 
                  key={player.rank}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    player.name === 'You' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                      {player.rank}
                    </div>
                    <div>
                      <p className="font-medium">{player.name}</p>
                      <p className="text-sm text-gray-600">
                        {player.streak} day streak {player.badge}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{player.score.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">XP</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'challenges' && (
        <div className="space-y-4">
          {challenges.map(challenge => (
            <Card key={challenge.id} className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <p className="text-sm text-gray-600">{challenge.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-orange-100 text-orange-800 mb-1">
                      Ends in {challenge.deadline}
                    </Badge>
                    <p className="text-sm font-medium text-green-600">{challenge.reward}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{challenge.progress}/{challenge.maxProgress}</span>
                  </div>
                  <Progress 
                    value={(challenge.progress / challenge.maxProgress) * 100} 
                    className="h-3"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
