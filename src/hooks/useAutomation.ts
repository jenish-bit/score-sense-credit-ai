
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useAutomation = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const scheduleFollowUp = async (customerData: any, followUpTime: string, taskType = 'follow_up') => {
    if (!user) throw new Error('User not authenticated');

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('automation-engine', {
        body: {
          action: 'schedule_follow_up',
          data: {
            userId: user.id,
            customerData,
            followUpTime,
            taskType
          }
        }
      });

      if (error) throw error;
      return data;
    } finally {
      setLoading(false);
    }
  };

  const scoreLeads = async (leads: any[]) => {
    if (!user) throw new Error('User not authenticated');

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('automation-engine', {
        body: {
          action: 'score_leads',
          data: {
            leads,
            userId: user.id
          }
        }
      });

      if (error) throw error;
      return data;
    } finally {
      setLoading(false);
    }
  };

  const updateWellnessMetrics = async (stressLevel: number, energyLevel: number, moodScore: number) => {
    if (!user) throw new Error('User not authenticated');

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('automation-engine', {
        body: {
          action: 'update_wellness_metrics',
          data: {
            userId: user.id,
            stressLevel,
            energyLevel,
            moodScore
          }
        }
      });

      if (error) throw error;
      return data;
    } finally {
      setLoading(false);
    }
  };

  // Temporary mock data until database types are updated
  const getAutomationTasks = async () => {
    if (!user) throw new Error('User not authenticated');
    
    // Return mock data for now
    return [
      {
        id: '1',
        task_type: 'follow_up',
        status: 'pending',
        scheduled_for: new Date().toISOString(),
        task_data: { customer: 'John Doe' },
        created_at: new Date().toISOString()
      }
    ];
  };

  return {
    scheduleFollowUp,
    scoreLeads,
    updateWellnessMetrics,
    getAutomationTasks,
    loading
  };
};
