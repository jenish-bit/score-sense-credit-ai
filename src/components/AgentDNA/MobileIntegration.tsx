
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Smartphone, 
  MessageCircle, 
  Zap, 
  Bell,
  Share2,
  Download,
  Wifi,
  Battery,
  Signal
} from 'lucide-react';

export const MobileIntegration = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('+91 98765 43210');
  const [isConnected, setIsConnected] = useState(true);

  const quickActions = [
    { id: 1, title: 'Quick Practice', icon: Zap, description: 'Start 5-min simulation', color: 'bg-blue-500' },
    { id: 2, title: 'Mood Check', icon: Bell, description: 'How are you feeling?', color: 'bg-green-500' },
    { id: 3, title: 'Daily Tip', icon: MessageCircle, description: 'Get today\'s tip', color: 'bg-purple-500' },
    { id: 4, title: 'Share Success', icon: Share2, description: 'Celebrate with team', color: 'bg-orange-500' }
  ];

  const whatsappFeatures = [
    '🎯 Practice scenarios on-the-go',
    '📊 Get daily performance summaries',
    '💡 Receive real-time coaching tips',
    '🏆 Share achievements with team',
    '⏰ Smart follow-up reminders',
    '📈 Weekly progress reports'
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* WhatsApp Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="text-green-600" size={20} />
            WhatsApp Coach
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="font-medium">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
            <Badge variant="outline" className="ml-auto">
              {whatsappNumber}
            </Badge>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Available Features:</h4>
            <div className="space-y-1">
              {whatsappFeatures.map((feature, index) => (
                <p key={index} className="text-sm text-gray-600">{feature}</p>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Input
              placeholder="Enter your WhatsApp number"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
            />
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <MessageCircle size={16} className="mr-2" />
              {isConnected ? 'Update Connection' : 'Connect WhatsApp'}
            </Button>
          </div>

          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              💬 Send "Hi" to start your mobile coaching experience!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Mobile App Simulation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="text-blue-600" size={20} />
            Mobile Companion
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Phone Frame */}
          <div className="mx-auto max-w-sm">
            <div className="bg-gray-900 rounded-[2rem] p-4">
              <div className="bg-white rounded-[1.5rem] overflow-hidden">
                {/* Status Bar */}
                <div className="flex items-center justify-between p-2 bg-gray-50 text-xs">
                  <div className="flex items-center gap-1">
                    <Signal size={12} />
                    <Wifi size={12} />
                  </div>
                  <span className="font-medium">9:41 AM</span>
                  <div className="flex items-center gap-1">
                    <span>100%</span>
                    <Battery size={12} />
                  </div>
                </div>

                {/* App Header */}
                <div className="p-4 bg-blue-600 text-white text-center">
                  <h3 className="font-bold">AgentDNA Mobile</h3>
                  <p className="text-xs text-blue-200">Your pocket coach</p>
                </div>

                {/* Quick Actions Grid */}
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                    {quickActions.map((action) => {
                      const IconComponent = action.icon;
                      return (
                        <div 
                          key={action.id}
                          className={`${action.color} text-white p-3 rounded-lg text-center`}
                        >
                          <IconComponent size={20} className="mx-auto mb-2" />
                          <p className="text-xs font-medium">{action.title}</p>
                          <p className="text-xs opacity-80">{action.description}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Today's Stats */}
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Today's Progress</h4>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div>
                        <p className="font-bold text-blue-600">12</p>
                        <p className="text-gray-600">Calls</p>
                      </div>
                      <div>
                        <p className="font-bold text-green-600">4</p>
                        <p className="text-gray-600">Converts</p>
                      </div>
                      <div>
                        <p className="font-bold text-purple-600">33%</p>
                        <p className="text-gray-600">Rate</p>
                      </div>
                    </div>
                  </div>

                  {/* Recent Notification */}
                  <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <p className="text-xs font-medium text-yellow-800">
                      💡 Tip: Your best conversion time is 2-4 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <Button variant="outline" className="mr-2">
              <Download size={16} className="mr-2" />
              Download App
            </Button>
            <Button variant="outline">
              <Share2 size={16} className="mr-2" />
              Share with Team
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Integration Status */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Connected Integrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 text-center">
              <MessageCircle className="mx-auto mb-2 text-green-600" size={24} />
              <h3 className="font-semibold">WhatsApp</h3>
              <p className="text-sm text-gray-600">Mobile coaching & tips</p>
              <Badge variant="secondary" className="mt-2">Connected</Badge>
            </div>
            
            <div className="border rounded-lg p-4 text-center">
              <Smartphone className="mx-auto mb-2 text-blue-600" size={24} />
              <h3 className="font-semibold">Mobile App</h3>
              <p className="text-sm text-gray-600">On-the-go access</p>
              <Badge variant="outline" className="mt-2">Coming Soon</Badge>
            </div>
            
            <div className="border rounded-lg p-4 text-center">
              <Bell className="mx-auto mb-2 text-purple-600" size={24} />
              <h3 className="font-semibold">Smart Notifications</h3>
              <p className="text-sm text-gray-600">Intelligent reminders</p>
              <Badge variant="secondary" className="mt-2">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
