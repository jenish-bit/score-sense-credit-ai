
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

export interface CustomerProfile {
  id: string;
  customer_name: string | null;
  personality_type: string | null;
  buying_intent: number | null;
  risk_level: string | null;
  communication_preference: string | null;
  emotional_state: string | null;
  conversation_history: string | null;
  created_at: string;
  updated_at: string;
}

export const useCustomerProfiles = () => {
  const [profiles, setProfiles] = useState<CustomerProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchProfiles = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('customer_profiles')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
    } catch (error: any) {
      console.error('Error fetching customer profiles:', error);
      toast.error('Failed to fetch customer profiles');
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (profileData: Partial<CustomerProfile>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('customer_profiles')
        .insert([
          {
            user_id: user.id,
            ...profileData,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      await fetchProfiles();
      toast.success('Customer profile created!');
      return data;
    } catch (error: any) {
      console.error('Error creating customer profile:', error);
      toast.error('Failed to create profile');
      return null;
    }
  };

  const updateProfile = async (id: string, updates: Partial<CustomerProfile>) => {
    try {
      const { data, error } = await supabase
        .from('customer_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      await fetchProfiles();
      toast.success('Profile updated!');
      return data;
    } catch (error: any) {
      console.error('Error updating customer profile:', error);
      toast.error('Failed to update profile');
      return null;
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [user]);

  return {
    profiles,
    loading,
    createProfile,
    updateProfile,
    refetch: fetchProfiles,
  };
};
