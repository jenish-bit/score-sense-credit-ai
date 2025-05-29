
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

export interface CoachingSession {
  id: string;
  session_type: string | null;
  customer_profile: any;
  insights: any;
  suggestions: any;
  performance_score: number;
  duration_minutes: number;
  created_at: string;
}

export const useCoachingSessions = () => {
  const [sessions, setSessions] = useState<CoachingSession[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchSessions = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('coaching_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setSessions(data || []);
    } catch (error: any) {
      console.error('Error fetching coaching sessions:', error);
      toast.error('Failed to fetch sessions');
    } finally {
      setLoading(false);
    }
  };

  const createSession = async (sessionData: Partial<CoachingSession>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('coaching_sessions')
        .insert([
          {
            user_id: user.id,
            ...sessionData,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      await fetchSessions();
      toast.success('Coaching session saved!');
      return data;
    } catch (error: any) {
      console.error('Error creating coaching session:', error);
      toast.error('Failed to save session');
      return null;
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [user]);

  return {
    sessions,
    loading,
    createSession,
    refetch: fetchSessions,
  };
};
