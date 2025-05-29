
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

export interface WellnessMetric {
  id: string;
  stress_level: number | null;
  energy_level: number | null;
  burnout_risk: string | null;
  mood_score: number | null;
  created_at: string;
}

export const useWellnessMetrics = () => {
  const [metrics, setMetrics] = useState<WellnessMetric[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState<WellnessMetric | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchMetrics = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('wellness_metrics')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMetrics(data || []);
      if (data && data.length > 0) {
        setCurrentMetrics(data[0]);
      }
    } catch (error: any) {
      console.error('Error fetching wellness metrics:', error);
      toast.error('Failed to fetch wellness data');
    } finally {
      setLoading(false);
    }
  };

  const saveMetrics = async (metricsData: Partial<WellnessMetric>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('wellness_metrics')
        .insert([
          {
            user_id: user.id,
            ...metricsData,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      await fetchMetrics();
      toast.success('Wellness data saved!');
      return data;
    } catch (error: any) {
      console.error('Error saving wellness metrics:', error);
      toast.error('Failed to save wellness data');
      return null;
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, [user]);

  return {
    metrics,
    currentMetrics,
    loading,
    saveMetrics,
    refetch: fetchMetrics,
  };
};
