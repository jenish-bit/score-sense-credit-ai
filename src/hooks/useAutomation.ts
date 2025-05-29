
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from '@/components/ui/sonner';

export const useAutomation = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const scheduleFollowUp = async (customerData: any, followUpTime: string, taskType = 'follow_up') => {
    if (!user) throw new Error('User not authenticated');

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('automation_tasks')
        .insert([
          {
            user_id: user.id,
            task_type: taskType,
            scheduled_for: followUpTime,
            task_data: customerData,
            status: 'pending'
          }
        ])
        .select()
        .single();

      if (error) throw error;
      toast.success('Follow-up scheduled successfully!');
      return data;
    } catch (error: any) {
      console.error('Error scheduling follow-up:', error);
      toast.error('Failed to schedule follow-up');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const scoreLeads = async (leads: any[]) => {
    if (!user) throw new Error('User not authenticated');

    setLoading(true);
    try {
      // Score leads using a simple algorithm
      const scoredLeads = leads.map(lead => ({
        ...lead,
        score: Math.floor(Math.random() * 100) + 1 // Simple random scoring for demo
      }));

      // Save performance metric
      const { data, error } = await supabase
        .from('performance_metrics')
        .insert([
          {
            user_id: user.id,
            metric_type: 'lead_scoring',
            metric_value: scoredLeads.length,
            additional_data: { scored_leads: scoredLeads }
          }
        ])
        .select()
        .single();

      if (error) throw error;
      toast.success('Leads scored successfully!');
      return scoredLeads;
    } catch (error: any) {
      console.error('Error scoring leads:', error);
      toast.error('Failed to score leads');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateWellnessMetrics = async (stressLevel: number, energyLevel: number, moodScore: number) => {
    if (!user) throw new Error('User not authenticated');

    setLoading(true);
    try {
      const burnoutRisk = stressLevel > 70 ? 'high' : stressLevel > 40 ? 'medium' : 'low';
      
      const { data, error } = await supabase
        .from('wellness_metrics')
        .insert([
          {
            user_id: user.id,
            stress_level: stressLevel,
            energy_level: energyLevel,
            mood_score: moodScore,
            burnout_risk: burnoutRisk
          }
        ])
        .select()
        .single();

      if (error) throw error;
      toast.success('Wellness metrics updated!');
      return data;
    } catch (error: any) {
      console.error('Error updating wellness metrics:', error);
      toast.error('Failed to update wellness metrics');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAutomationTasks = async () => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { data, error } = await supabase
        .from('automation_tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('scheduled_for', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Error fetching automation tasks:', error);
      toast.error('Failed to fetch tasks');
      return [];
    }
  };

  return {
    scheduleFollowUp,
    scoreLeads,
    updateWellnessMetrics,
    getAutomationTasks,
    loading
  };
};
