
import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, MinusCircle, Maximize, Bot, User, Sparkles, Brain, Target, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  mood?: 'confident' | 'uncertain' | 'excited' | 'frustrated';
  actionItems?: string[];
}

interface QuickAction {
  label: string;
  prompt: string;
  icon: React.ReactNode;
  category: string;
}

const quickActions: QuickAction[] = [
  {
    label: "Voice coaching session",
    prompt: "Start a voice coaching session to practice my sales pitch and get real-time feedback on my tone and delivery.",
    icon: <Target size={14} />,
    category: "coaching"
  },
  {
    label: "Analyze my mood",
    prompt: "Analyze my current emotional state and energy level, then suggest coaching strategies that match my mood today.",
    icon: <Brain size={14} />,
    category: "coaching"
  },
  {
    label: "Role-play difficult customer",
    prompt: "Let's role-play a challenging customer scenario where I need to handle multiple objections and close the deal.",
    icon: <Sparkles size={14} />,
    category: "coaching"
  },
  {
    label: "Performance insights",
    prompt: "Give me detailed insights about my recent performance trends and specific areas where I can improve immediately.",
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
      content: "🎯 **Welcome to AgentDNA AI Premium!**\n\nI'm your advanced AI sales coach with voice capabilities, mood analysis, and proactive coaching. I can:\n\n• Provide voice-enabled coaching sessions\n• Analyze your emotional state and energy\n• Conduct interactive role-play scenarios\n• Offer real-time performance insights\n• Predict optimal coaching moments\n\nSpeak to me or type - I'm here to help you excel! 🚀",
      timestamp: new Date().toISOString(),
      mood: 'excited'
    },
  ]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversationType, setConversationType] = useState<'general' | 'coaching' | 'support'>('general');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [speakResponses, setSpeakResponses] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Voice hooks
  const { 
    isListening, 
    transcript, 
    startListening, 
    stopListening, 
    resetTranscript,
    isSupported: voiceSupported 
  } = useVoiceRecognition();
  
  const { speak, stop, isSpeaking } = useTextToSpeech();
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Auto-send voice transcript when user stops speaking
  useEffect(() => {
    if (transcript && !isListening && voiceEnabled) {
      setMessage(transcript);
      resetTranscript();
    }
  }, [transcript, isListening, voiceEnabled, resetTranscript]);

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
    setVoiceEnabled(!voiceEnabled);
  };

  const handleSpeakToggle = () => {
    if (isSpeaking) {
      stop();
    }
    setSpeakResponses(!speakResponses);
  };

  const analyzeMood = (content: string): 'confident' | 'uncertain' | 'excited' | 'frustrated' => {
    const lowerContent = content.toLowerCase();
    if (lowerContent.includes('unsure') || lowerContent.includes('confused') || lowerContent.includes('don\'t know')) {
      return 'uncertain';
    }
    if (lowerContent.includes('great') || lowerContent.includes('excellent') || lowerContent.includes('amazing')) {
      return 'excited';
    }
    if (lowerContent.includes('frustrated') || lowerContent.includes('difficult') || lowerContent.includes('struggling')) {
      return 'frustrated';
    }
    return 'confident';
  };

  const extractActionItems = (content: string): string[] => {
    const actionKeywords = ['practice', 'improve', 'work on', 'focus on', 'try'];
    const sentences = content.split(/[.!?]/);
    return sentences
      .filter(sentence => actionKeywords.some(keyword => sentence.toLowerCase().includes(keyword)))
      .map(sentence => sentence.trim())
      .filter(sentence => sentence.length > 0)
      .slice(0, 3);
  };

  const handleSubmit = async (e: React.FormEvent, quickPrompt?: string) => {
    e.preventDefault();
    const messageToSend = quickPrompt || message;
    if (!messageToSend.trim() || !user || isLoading) return;

    const userMood = analyzeMood(messageToSend);
    const userMessage: Message = {
      role: 'user',
      content: messageToSend,
      timestamp: new Date().toISOString(),
      mood: userMood
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
          conversationType,
          userMood,
          voiceEnabled
        }
      });

      if (error) throw error;

      const actionItems = extractActionItems(data.message);
      const aiMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: data.timestamp,
        actionItems
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      
      // Speak the response if enabled
      if (speakResponses && !isSpeaking) {
        speak(data.message);
      }
      
      if (!conversationId) {
        setConversationId(data.conversationId);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I apologize, but I'm experiencing technical difficulties. Please try again, and I'll be right back to help you achieve your sales excellence! 🚀",
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
        mood: 'excited'
      },
    ]);
  };

  const getWelcomeMessage = (type: string) => {
    switch (type) {
      case 'coaching':
        return "🎯 **Intensive AI Coaching Mode Activated!**\n\nI'm now your dedicated performance coach with advanced capabilities:\n\n• **Voice Analysis**: Real-time feedback on tone, pace, and confidence\n• **Mood-Adaptive Coaching**: Strategies that match your current energy\n• **Behavioral Insights**: Deep analysis of your selling patterns\n• **Interactive Role-Play**: Practice with AI customers\n• **Predictive Coaching**: Anticipate challenges before they happen\n\nReady to unlock your sales potential? Let's begin! 🚀";
      case 'support':
        return "🛠️ **Premium Technical Support & Analytics**\n\nI'm here to optimize your AgentDNA experience:\n\n• **Advanced Analytics**: Deep dive into your performance data\n• **Platform Optimization**: Maximize your tool efficiency\n• **Integration Support**: Connect with your existing workflows\n• **Custom Coaching**: Personalized AI training modules\n• **Troubleshooting**: Solve any technical challenges\n\nWhat would you like to optimize today?";
      default:
        return "🚀 **AgentDNA AI Premium Ready!**\n\nI'm your comprehensive AI sales assistant with premium features:\n\n• **Voice-Enabled Coaching** - Speak naturally for real-time feedback\n• **Mood Intelligence** - Adaptive coaching based on your energy\n• **Proactive Insights** - Predictive performance suggestions\n• **Interactive Training** - Dynamic role-play scenarios\n• **Advanced Analytics** - Deep performance intelligence\n\nHow can I help you excel today? 💪";
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

  const getMoodEmoji = (mood?: string) => {
    switch (mood) {
      case 'confident': return '💪';
      case 'uncertain': return '🤔';
      case 'excited': return '🚀';
      case 'frustrated': return '😤';
      default: return '💬';
    }
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
            AI Coach Pro
          </div>
        </div>
      )}

      {isOpen && (
        <Card className={`w-96 shadow-2xl transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[45rem]'} flex flex-col border-2 border-purple-200`}>
          <CardHeader className="p-3 border-b flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bot className="text-white h-6 w-6" />
                <Sparkles size={12} className="absolute -top-1 -right-1 text-yellow-300" />
              </div>
              <div>
                <h3 className="font-bold text-white">AgentDNA AI Pro</h3>
                <p className="text-xs text-purple-100">Premium Sales Intelligence</p>
              </div>
            </div>
            <div className="flex gap-1">
              {voiceSupported && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleVoiceToggle}
                  className={`h-8 w-8 text-white rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'hover:bg-purple-700'}`}
                >
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleSpeakToggle}
                className={`h-8 w-8 text-white rounded-full ${speakResponses ? 'bg-green-500' : 'hover:bg-purple-700'}`}
              >
                {speakResponses ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </Button>
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
                <div className="flex gap-1 mb-2">
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
                {voiceSupported && (
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant={isListening ? 'destructive' : 'secondary'} className="text-xs">
                      {isListening ? '🎤 Listening...' : '🎤 Voice Ready'}
                    </Badge>
                    {speakResponses && (
                      <Badge variant="secondary" className="text-xs">
                        🔊 Voice Responses On
                      </Badge>
                    )}
                  </div>
                )}
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
                        {msg.role === 'user' && (
                          <div className="flex items-center gap-1">
                            <User size={16} className="mt-1" />
                            <span className="text-xs">{getMoodEmoji(msg.mood)}</span>
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                          {msg.actionItems && msg.actionItems.length > 0 && (
                            <div className="mt-2 space-y-1">
                              <p className="text-xs font-medium opacity-80">Action Items:</p>
                              {msg.actionItems.map((item, idx) => (
                                <div key={idx} className="text-xs opacity-70 flex items-center gap-1">
                                  <Target size={10} />
                                  {item}
                                </div>
                              ))}
                            </div>
                          )}
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
                    <p className="text-sm font-medium text-gray-600 text-center">Premium Quick Actions:</p>
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
                        <span className="text-xs text-purple-600 ml-2">Processing...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>
              <CardFooter className="p-3 pt-0 bg-gradient-to-r from-purple-50 to-blue-50">
                <form onSubmit={handleSubmit} className="flex w-full gap-2">
                  <Input
                    placeholder={isListening ? "Listening... speak now" : "Ask about sales strategies, coaching, or speak to me..."}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 border-purple-200 focus:border-purple-400"
                    disabled={isLoading || isListening}
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
