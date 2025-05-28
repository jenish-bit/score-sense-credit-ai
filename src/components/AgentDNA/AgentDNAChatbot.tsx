
import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, MinusCircle, Maximize, Bot, User } from "lucide-react";
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

export const AgentDNAChatbot = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AgentDNA AI coach. I can help you with sales strategies, customer insights, performance tips, and platform guidance. How can I assist you today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversationType, setConversationType] = useState<'general' | 'coaching' | 'support'>('general');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('chatbot', {
        body: {
          message: message,
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
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
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
    setConversationId(null); // Start new conversation
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
        return "I'm your personal sales coach! I can help you improve your techniques, handle objections, and boost your performance. What would you like to work on?";
      case 'support':
        return "I'm here to help you with any technical questions or issues with the AgentDNA platform. What do you need assistance with?";
      default:
        return "Hi! I'm your AgentDNA AI assistant. I can help with sales strategies, platform guidance, and general questions. How can I help you today?";
    }
  };

  if (!user) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {!isOpen && (
        <Button 
          onClick={toggleChat}
          className="h-16 w-16 rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 transition-all duration-300 p-0"
        >
          <Bot size={28} />
        </Button>
      )}

      {isOpen && (
        <Card className={`w-80 sm:w-96 shadow-xl transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[35rem]'} flex flex-col`}>
          <CardHeader className="p-3 border-b flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-purple-600 to-blue-500">
            <div className="flex items-center gap-2">
              <Bot className="text-white h-5 w-5" />
              <h3 className="font-medium text-white">AgentDNA AI Coach</h3>
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
              <div className="p-2 border-b bg-gray-50">
                <div className="flex gap-1">
                  <Badge 
                    variant={conversationType === 'general' ? 'default' : 'outline'}
                    className="cursor-pointer text-xs"
                    onClick={() => switchConversationType('general')}
                  >
                    General
                  </Badge>
                  <Badge 
                    variant={conversationType === 'coaching' ? 'default' : 'outline'}
                    className="cursor-pointer text-xs"
                    onClick={() => switchConversationType('coaching')}
                  >
                    Coaching
                  </Badge>
                  <Badge 
                    variant={conversationType === 'support' ? 'default' : 'outline'}
                    className="cursor-pointer text-xs"
                    onClick={() => switchConversationType('support')}
                  >
                    Support
                  </Badge>
                </div>
              </div>

              <CardContent className="flex-1 overflow-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-4 py-2 ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {msg.role === 'assistant' && <Bot size={16} className="mt-1 text-purple-600" />}
                        {msg.role === 'user' && <User size={16} className="mt-1" />}
                        <div className="flex-1">
                          <p className="text-sm">{msg.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[85%]">
                      <div className="flex items-center gap-2">
                        <Bot size={16} className="text-purple-600" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>
              <CardFooter className="p-2 pt-0">
                <form onSubmit={handleSubmit} className="flex w-full gap-2">
                  <Input
                    placeholder="Ask me anything about sales or AgentDNA..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
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
