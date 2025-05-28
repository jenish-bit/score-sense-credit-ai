
import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, MinusCircle, Maximize, Bot, User, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface QuickAction {
  label: string;
  prompt: string;
  icon: React.ReactNode;
}

const quickActions: QuickAction[] = [
  {
    label: "What is AgentDNA?",
    prompt: "What is AgentDNA and how can it help me with sales?",
    icon: <Bot size={14} />
  },
  {
    label: "How to get started?",
    prompt: "How do I get started with AgentDNA? What are the first steps?",
    icon: <ArrowRight size={14} />
  },
  {
    label: "Pricing & Plans",
    prompt: "What are the pricing plans and features available?",
    icon: <Sparkles size={14} />
  },
  {
    label: "Demo Request",
    prompt: "I'd like to see a demo of AgentDNA in action.",
    icon: <User size={14} />
  }
];

export const NavigationChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "👋 Welcome to AgentDNA! I'm here to help you understand how our AI-powered sales platform can transform your performance.\n\nWhat would you like to know about AgentDNA?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const getResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("what is") || lowerQuery.includes("agentdna")) {
      return "AgentDNA is your AI-Powered Sales Alter-Ego that revolutionizes how you sell financial products. It combines:\n\n🧠 **Behavioral DNA Analysis** - Understanding your unique selling style\n🎯 **Real-Time Coaching** - Live suggestions during calls\n💡 **Customer Intelligence** - Deep insights into prospect behavior\n🚀 **Best Self Simulator** - Practice scenarios with AI customers\n\nIt's like having a world-class sales coach available 24/7!";
    } else if (lowerQuery.includes("start") || lowerQuery.includes("begin") || lowerQuery.includes("get started")) {
      return "Getting started with AgentDNA is simple:\n\n1️⃣ **Sign Up** - Click 'Get Started with AgentDNA' to create your account\n2️⃣ **Complete Assessment** - Our AI analyzes your sales personality\n3️⃣ **Set Goals** - Define your targets and objectives\n4️⃣ **Start Coaching** - Begin receiving personalized AI coaching\n\nThe whole process takes less than 10 minutes, and you'll see insights immediately!";
    } else if (lowerQuery.includes("price") || lowerQuery.includes("cost") || lowerQuery.includes("plan")) {
      return "AgentDNA offers flexible pricing plans:\n\n💼 **Starter Plan** - Perfect for individual sales professionals\n🏢 **Team Plan** - Ideal for sales teams up to 25 members\n🏭 **Enterprise Plan** - Complete solution for large organizations\n\nAll plans include AI coaching, behavioral analysis, and real-time insights. Contact our team for detailed pricing and custom enterprise solutions!";
    } else if (lowerQuery.includes("demo") || lowerQuery.includes("try") || lowerQuery.includes("test")) {
      return "I'd love to show you AgentDNA in action! 🎬\n\nYou can:\n📱 **Try the Live Demo** - Click 'Watch Demo' to see AgentDNA working\n💬 **Schedule a Call** - Get a personalized walkthrough with our team\n🚀 **Start Free Trial** - Sign up and explore all features risk-free\n\nWhich option interests you most?";
    } else if (lowerQuery.includes("feature") || lowerQuery.includes("what can") || lowerQuery.includes("capabilities")) {
      return "AgentDNA is packed with powerful features:\n\n🎯 **Real-Time Coach** - Live guidance during customer calls\n🧠 **Behavioral Profiling** - Deep personality and style analysis\n📊 **Advanced Analytics** - Performance tracking and insights\n🤖 **Smart Automation** - Automate follow-ups and tasks\n💝 **Emotional Wellness** - Burnout prevention and stress monitoring\n📱 **Mobile Integration** - Full functionality on any device\n\nWhich feature would you like to learn more about?";
    } else if (lowerQuery.includes("help") || lowerQuery.includes("support") || lowerQuery.includes("contact")) {
      return "I'm here to help! 🤝\n\nYou can:\n💬 **Continue chatting** - Ask me anything about AgentDNA\n📧 **Email support** - Reach our team directly\n📞 **Schedule a call** - Book a consultation\n📚 **Browse resources** - Check our knowledge base\n\nWhat specific information do you need?";
    } else if (lowerQuery.includes("thank")) {
      return "You're very welcome! 😊 I'm thrilled to help you discover how AgentDNA can transform your sales performance.\n\nReady to get started? Click 'Get Started with AgentDNA' and begin your journey to sales excellence!";
    } else {
      return "Great question! AgentDNA is designed to help sales professionals like you achieve peak performance through AI-powered coaching and insights.\n\nI can help you learn about:\n• Platform features and capabilities\n• Getting started guide\n• Pricing and plans\n• Scheduling a demo\n• Technical support\n\nWhat interests you most?";
    }
  };

  const handleSubmit = async (e: React.FormEvent, quickPrompt?: string) => {
    e.preventDefault();
    const messageToSend = quickPrompt || message;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: messageToSend,
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);
    setShowQuickActions(false);
    
    // Simulate AI thinking time
    setTimeout(() => {
      const aiMessage: Message = {
        role: 'assistant',
        content: getResponse(messageToSend),
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
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

  const handleQuickAction = (action: QuickAction) => {
    const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
    handleSubmit(fakeEvent, action.prompt);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {!isOpen && (
        <div className="relative">
          <Button 
            onClick={toggleChat}
            className="h-16 w-16 rounded-full shadow-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 p-0 animate-pulse"
          >
            <div className="relative">
              <MessageSquare size={28} />
              <Sparkles size={12} className="absolute -top-1 -right-1 text-yellow-300" />
            </div>
          </Button>
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-bounce">
            Ask Me!
          </div>
        </div>
      )}

      {isOpen && (
        <Card className={`w-96 shadow-2xl transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[35rem]'} flex flex-col border-2 border-blue-200`}>
          <CardHeader className="p-3 border-b flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            <div className="flex items-center gap-2">
              <div className="relative">
                <MessageSquare className="text-white h-6 w-6" />
                <Sparkles size={12} className="absolute -top-1 -right-1 text-yellow-300" />
              </div>
              <div>
                <h3 className="font-bold text-white">AgentDNA Assistant</h3>
                <p className="text-xs text-blue-100">Here to help you get started</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={toggleMinimize} className="h-8 w-8 text-white hover:bg-blue-700 rounded-full">
                {isMinimized ? <Maximize size={16} /> : <MinusCircle size={16} />}
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8 text-white hover:bg-blue-700 rounded-full">
                <X size={16} />
              </Button>
            </div>
          </CardHeader>
          
          {!isMinimized && (
            <>
              <CardContent className="flex-1 overflow-auto p-4 space-y-4 bg-gradient-to-b from-white to-blue-50">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-4 py-3 ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'bg-white text-gray-900 shadow-md border border-blue-100'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {msg.role === 'assistant' && (
                          <div className="relative">
                            <Bot size={16} className="mt-1 text-blue-600" />
                            <Sparkles size={8} className="absolute -top-1 -right-1 text-blue-400" />
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
                    <p className="text-sm font-medium text-gray-600 text-center">Quick Questions:</p>
                    <div className="grid grid-cols-1 gap-2">
                      {quickActions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="justify-start text-left h-auto p-3 hover:bg-blue-50 hover:border-blue-300 transition-colors"
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
                    <div className="bg-white rounded-lg px-4 py-3 max-w-[85%] shadow-md border border-blue-100">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Bot size={16} className="text-blue-600" />
                          <Sparkles size={8} className="absolute -top-1 -right-1 text-blue-400" />
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-xs text-blue-600 ml-2">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>
              <CardFooter className="p-3 pt-0 bg-gradient-to-r from-blue-50 to-purple-50">
                <form onSubmit={handleSubmit} className="flex w-full gap-2">
                  <Input
                    placeholder="Ask about AgentDNA features, pricing, demo..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 border-blue-200 focus:border-blue-400"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 shadow-lg"
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
