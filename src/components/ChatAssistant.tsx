
import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, MinusCircle, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your credit advisor. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Sample responses for the chatbot
  const getResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("credit score") || lowerQuery.includes("score")) {
      return "Your credit score is calculated using various factors including payment history, credit utilization, length of credit history, and alternative data sources like your utility payment records.";
    } else if (lowerQuery.includes("improve") || lowerQuery.includes("better")) {
      return "To improve your credit score: 1) Pay bills on time 2) Reduce debt 3) Don't close old credit accounts 4) Limit new credit applications 5) Regularly check your credit report for errors.";
    } else if (lowerQuery.includes("loan") || lowerQuery.includes("credit card")) {
      return "We offer several financial products tailored to your needs. Complete the assessment to see your personalized recommendations with the best rates available for your profile.";
    } else if (lowerQuery.includes("help") || lowerQuery.includes("support")) {
      return "I can help with questions about credit scores, financial products, improving your credit, and using this application. What specific information do you need?";
    } else if (lowerQuery.includes("thank")) {
      return "You're welcome! Is there anything else you'd like to know about your credit?";
    } else {
      return "I'm your AI credit assistant. I can answer questions about credit scores, financial products, and help you navigate this application. How else can I assist you?";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: message,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    
    // Simulate AI thinking
    setTimeout(() => {
      const botResponse: Message = {
        text: getResponse(message),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
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

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button 
          onClick={toggleChat}
          className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 p-0"
        >
          <MessageSquare size={24} />
        </Button>
      )}

      {isOpen && (
        <Card className={`w-80 sm:w-96 shadow-xl transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[30rem]'} flex flex-col`}>
          <CardHeader className="p-3 border-b flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-blue-600 to-indigo-500">
            <div className="flex items-center gap-2">
              <MessageSquare className="text-white h-5 w-5" />
              <h3 className="font-medium text-white">Credit Advisor</h3>
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
              <CardContent className="flex-1 overflow-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        msg.isUser
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs opacity-50 mt-1">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </CardContent>
              <CardFooter className="p-2 pt-0">
                <form onSubmit={handleSubmit} className="flex w-full gap-2">
                  <Input
                    placeholder="Ask a question..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" className="bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600">
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
