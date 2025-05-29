
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

export interface GamificationProgress {
  id: string;
  achievement_id: string;
  progress: number;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
}

export const useGamification = () => {
  const [achievements, setAchievements] = useState<GamificationProgress[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchAchievements = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gamification_progress')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAchievements(data || []);
    } catch (error: any) {
      console.error('Error fetching achievements:', error);
      toast.error('Failed to fetch achievements');
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (achievementId: string, progress: number) => {
    if (!user) return null;

    try {
      const isCompleted = progress >= 100;
      const { data, error } = await supabase
        .from('gamification_progress')
        .upsert([
          {
            user_id: user.id,
            achievement_id: achievementId,
            progress,
            completed: isCompleted,
            completed_at: isCompleted ? new Date().toISOString() : null,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      await fetchAchievements();
      
      if (isCompleted) {
        toast.success('Achievement unlocked!', {
          description: `You've completed: ${achievementId}`,
        });
      }
      
      return data;
    } catch (error: any) {
      console.error('Error updating achievement progress:', error);
      toast.error('Failed to update progress');
      return null;
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, [user]);

  return {
    achievements,
    loading,
    updateProgress,
    refetch: fetchAchievements,
  };
};
