
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useAgentIntelligence = () => {
  const { user } = useAuth();

  const analyzeCustomerPersonality = async (conversationData: any, customerName?: string) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase.functions.invoke('agent-intelligence', {
      body: {
        action: 'analyze_customer_personality',
        data: {
          conversationData,
          customerName,
          userId: user.id
        }
      }
    });

    if (error) throw error;
    return data;
  };

  const predictBuyingIntent = async (customerData: any) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase.functions.invoke('agent-intelligence', {
      body: {
        action: 'predict_buying_intent',
        data: {
          customerData,
          userId: user.id
        }
      }
    });

    if (error) throw error;
    return data;
  };

  const generateCoachingSuggestions = async (sessionData: any) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase.functions.invoke('agent-intelligence', {
      body: {
        action: 'generate_coaching_suggestions',
        data: {
          sessionData,
          userId: user.id
        }
      }
    });

    if (error) throw error;
    return data;
  };

  const trackPerformance = async (metrics: any) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase.functions.invoke('agent-intelligence', {
      body: {
        action: 'track_performance',
        data: {
          metrics,
          userId: user.id
        }
      }
    });

    if (error) throw error;
    return data;
  };

  return {
    analyzeCustomerPersonality,
    predictBuyingIntent,
    generateCoachingSuggestions,
    trackPerformance
  };
};
