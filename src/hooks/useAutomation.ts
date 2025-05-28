
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useAutomation = () => {
  const { user } = useAuth();

  const scheduleFollowUp = async (customerData: any, followUpTime: string, taskType = 'follow_up') => {
    if (!user) throw new Error('User not authenticated');

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
  };

  const scoreLeads = async (leads: any[]) => {
    if (!user) throw new Error('User not authenticated');

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
  };

  const updateWellnessMetrics = async (stressLevel: number, energyLevel: number, moodScore: number) => {
    if (!user) throw new Error('User not authenticated');

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
  };

  const getAutomationTasks = async () => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('automation_tasks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  };

  return {
    scheduleFollowUp,
    scoreLeads,
    updateWellnessMetrics,
    getAutomationTasks
  };
};
