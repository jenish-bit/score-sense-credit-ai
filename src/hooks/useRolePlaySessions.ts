
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

export interface RolePlaySession {
  id: string;
  scenario_type: string;
  difficulty_level: string;
  conversation_log: any[];
  performance_score: number | null;
  feedback: any;
  completed: boolean;
  duration_minutes: number | null;
  created_at: string;
}

export const useRolePlaySessions = () => {
  const [sessions, setSessions] = useState<RolePlaySession[]>([]);
  const [currentSession, setCurrentSession] = useState<RolePlaySession | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchSessions = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('role_play_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSessions(data || []);
    } catch (error: any) {
      console.error('Error fetching role play sessions:', error);
      toast.error('Failed to fetch sessions');
    } finally {
      setLoading(false);
    }
  };

  const startSession = async (scenarioType: string, difficultyLevel: string = 'beginner') => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('role_play_sessions')
        .insert([
          {
            user_id: user.id,
            scenario_type: scenarioType,
            difficulty_level: difficultyLevel,
            conversation_log: [],
            completed: false,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      setCurrentSession(data);
      await fetchSessions();
      toast.success('Role play session started!');
      return data;
    } catch (error: any) {
      console.error('Error starting role play session:', error);
      toast.error('Failed to start session');
      return null;
    }
  };

  const updateSession = async (sessionId: string, updates: Partial<RolePlaySession>) => {
    try {
      const { data, error } = await supabase
        .from('role_play_sessions')
        .update(updates)
        .eq('id', sessionId)
        .select()
        .single();

      if (error) throw error;
      
      if (currentSession?.id === sessionId) {
        setCurrentSession(data);
      }
      
      await fetchSessions();
      return data;
    } catch (error: any) {
      console.error('Error updating role play session:', error);
      toast.error('Failed to update session');
      return null;
    }
  };

  const completeSession = async (sessionId: string, performanceScore: number, feedback: any) => {
    return updateSession(sessionId, {
      completed: true,
      performance_score: performanceScore,
      feedback,
    });
  };

  useEffect(() => {
    fetchSessions();
  }, [user]);

  return {
    sessions,
    currentSession,
    loading,
    startSession,
    updateSession,
    completeSession,
    setCurrentSession,
    refetch: fetchSessions,
  };
};
