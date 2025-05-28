
import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, MinusCircle, Maximize, Bot, User, Sparkles, Brain, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface QuickAction {
  label: string;
  prompt: string;
  icon: React.ReactNode;
  category: string;
}

const quickActions: QuickAction[] = [
  {
    label: "Improve closing rate",
    prompt: "I'm struggling with closing deals. Can you help me improve my closing techniques and identify why prospects aren't converting?",
    icon: <Target size={14} />,
    category: "coaching"
  },
  {
    label: "Handle objections",
    prompt: "I need help with objection handling. What are the most effective frameworks and responses for common objections?",
    icon: <Brain size={14} />,
    category: "coaching"
  },
  {
    label: "Motivate my team",
    prompt: "I'm leading a sales team and need strategies to keep them motivated and hitting their targets consistently.",
    icon: <Sparkles size={14} />,
    category: "coaching"
  },
  {
    label: "Platform help",
    prompt: "I need help understanding how to use the AgentDNA platform features effectively.",
    icon: <Bot size={14} />,
    category: "support"
  }
];

export const AgentDNAChatbot = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "👋 Welcome to AgentDNA AI! I'm your advanced sales coach with deep expertise in psychology, strategy, and performance optimization. I can help you with closing techniques, objection handling, team leadership, customer analysis, and much more.\n\nHow can I help you excel today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversationType, setConversationType] = useState<'general' | 'coaching' | 'support'>('general');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent, quickPrompt?: string) => {
    e.preventDefault();
    const messageToSend = quickPrompt || message;
    if (!messageToSend.trim() || !user || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: messageToSend,
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);
    setShowQuickActions(false);
    
    try {
      const { data, error } = await supabase.functions.invoke('chatbot', {
        body: {
          message: messageToSend,
          conversationId,
          userId: user.id,
          conversationType
        }
      });

      if (error) throw error;

      const aiMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: data.timestamp,
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      
      if (!conversationId) {
        setConversationId(data.conversationId);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I apologize, but I'm experiencing technical difficulties right now. Please try again in a moment, and I'll be right back to help you achieve your sales goals! 🚀",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const switchConversationType = (type: 'general' | 'coaching' | 'support') => {
    setConversationType(type);
    setConversationId(null);
    setShowQuickActions(true);
    setMessages([
      {
        role: 'assistant',
        content: getWelcomeMessage(type),
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const getWelcomeMessage = (type: string) => {
    switch (type) {
      case 'coaching':
        return "🎯 **Intensive Coaching Mode Activated!**\n\nI'm now your dedicated sales performance coach. I'll help you:\n• Master advanced closing techniques\n• Handle any objection with confidence\n• Develop winning sales strategies\n• Build unshakeable confidence\n• Optimize your sales process\n\nWhat specific area would you like to work on today?";
      case 'support':
        return "🛠️ **Technical Support Mode**\n\nI'm here to help you master the AgentDNA platform and resolve any technical questions. I can assist with:\n• Platform navigation and features\n• Data analysis and insights\n• Integration setup\n• Troubleshooting issues\n• Best practices\n\nWhat do you need help with?";
      default:
        return "🚀 **AgentDNA AI Ready!**\n\nI'm your comprehensive sales assistant with expertise in psychology, strategy, and performance optimization. Ask me about sales techniques, motivation, customer insights, platform guidance, or anything sales-related!\n\nHow can I help you excel today?";
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    if (action.category !== conversationType) {
      switchConversationType(action.category as 'general' | 'coaching' | 'support');
    }
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      handleSubmit(fakeEvent, action.prompt);
    }, 100);
  };

  if (!user) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <div className="relative">
          <Button 
            onClick={toggleChat}
            className="h-16 w-16 rounded-full shadow-xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 transition-all duration-300 p-0 animate-pulse"
          >
            <div className="relative">
              <Bot size={28} />
              <Sparkles size={12} className="absolute -top-1 -right-1 text-yellow-300" />
            </div>
          </Button>
          <div className="absolute -top-2 -left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-bounce">
            AI Coach
          </div>
        </div>
      )}

      {isOpen && (
        <Card className={`w-96 shadow-2xl transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[40rem]'} flex flex-col border-2 border-purple-200`}>
          <CardHeader className="p-3 border-b flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bot className="text-white h-6 w-6" />
                <Sparkles size={12} className="absolute -top-1 -right-1 text-yellow-300" />
              </div>
              <div>
                <h3 className="font-bold text-white">AgentDNA AI Coach</h3>
                <p className="text-xs text-purple-100">Advanced Sales Intelligence</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={toggleMinimize} className="h-8 w-8 text-white hover:bg-purple-700 rounded-full">
                {isMinimized ? <Maximize size={16} /> : <MinusCircle size={16} />}
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8 text-white hover:bg-purple-700 rounded-full">
                <X size={16} />
              </Button>
            </div>
          </CardHeader>
          
          {!isMinimized && (
            <>
              <div className="p-2 border-b bg-gradient-to-r from-purple-50 to-blue-50">
                <div className="flex gap-1">
                  <Badge 
                    variant={conversationType === 'general' ? 'default' : 'outline'}
                    className="cursor-pointer text-xs hover:bg-purple-100 transition-colors"
                    onClick={() => switchConversationType('general')}
                  >
                    💬 General
                  </Badge>
                  <Badge 
                    variant={conversationType === 'coaching' ? 'default' : 'outline'}
                    className="cursor-pointer text-xs hover:bg-purple-100 transition-colors"
                    onClick={() => switchConversationType('coaching')}
                  >
                    🎯 Coaching
                  </Badge>
                  <Badge 
                    variant={conversationType === 'support' ? 'default' : 'outline'}
                    className="cursor-pointer text-xs hover:bg-purple-100 transition-colors"
                    onClick={() => switchConversationType('support')}
                  >
                    🛠️ Support
                  </Badge>
                </div>
              </div>

              <CardContent className="flex-1 overflow-auto p-4 space-y-4 bg-gradient-to-b from-white to-purple-50">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-4 py-3 ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                          : 'bg-white text-gray-900 shadow-md border border-purple-100'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {msg.role === 'assistant' && (
                          <div className="relative">
                            <Bot size={16} className="mt-1 text-purple-600" />
                            <Sparkles size={8} className="absolute -top-1 -right-1 text-purple-400" />
                          </div>
                        )}
                        {msg.role === 'user' && <User size={16} className="mt-1" />}
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                          <p className="text-xs opacity-70 mt-2">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {showQuickActions && messages.length <= 1 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600 text-center">Quick Actions:</p>
                    <div className="grid grid-cols-1 gap-2">
                      {quickActions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="justify-start text-left h-auto p-3 hover:bg-purple-50 hover:border-purple-300 transition-colors"
                          onClick={() => handleQuickAction(action)}
                        >
                          <div className="flex items-center gap-2">
                            {action.icon}
                            <span className="text-xs">{action.label}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white rounded-lg px-4 py-3 max-w-[85%] shadow-md border border-purple-100">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Bot size={16} className="text-purple-600" />
                          <Sparkles size={8} className="absolute -top-1 -right-1 text-purple-400" />
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-xs text-purple-600 ml-2">Analyzing...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>
              <CardFooter className="p-3 pt-0 bg-gradient-to-r from-purple-50 to-blue-50">
                <form onSubmit={handleSubmit} className="flex w-full gap-2">
                  <Input
                    placeholder="Ask about sales strategies, coaching, or platform help..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 border-purple-200 focus:border-purple-400"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 shadow-lg"
                    disabled={isLoading}
                  >
                    <Send size={18} />
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </div>
  );
};
