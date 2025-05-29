
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

export interface AgentProfile {
  id: string;
  personality_type: string | null;
  communication_style: string | null;
  conversion_rate: number;
  emotional_intelligence: number;
  strengths: string[] | null;
  weaknesses: string[] | null;
  created_at: string;
  updated_at: string;
}

export const useAgentProfile = () => {
  const [profile, setProfile] = useState<AgentProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('agent_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      console.error('Error fetching agent profile:', error);
      toast.error('Failed to fetch profile', {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<AgentProfile>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('agent_profiles')
        .upsert([
          {
            user_id: user.id,
            ...updates,
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      toast.success('Profile updated successfully!');
      return data;
    } catch (error: any) {
      console.error('Error updating agent profile:', error);
      toast.error('Failed to update profile', {
        description: error.message,
      });
      return null;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return {
    profile,
    loading,
    updateProfile,
    refetch: fetchProfile,
  };
};
