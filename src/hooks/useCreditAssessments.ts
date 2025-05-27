
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

export interface CreditAssessment {
  id: string;
  score: number;
  income: number;
  employment_status: string;
  assessment_date: string;
  factors: any;
}

export const useCreditAssessments = () => {
  const [assessments, setAssessments] = useState<CreditAssessment[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchAssessments = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('credit_assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('assessment_date', { ascending: false });

      if (error) throw error;
      setAssessments(data || []);
    } catch (error: any) {
      toast.error('Failed to fetch assessments', {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const saveAssessment = async (assessmentData: any) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('credit_assessments')
        .insert([
          {
            user_id: user.id,
            score: assessmentData.score,
            income: assessmentData.formData.financial.income,
            employment_status: assessmentData.formData.personal.employmentStatus,
            factors: assessmentData.factors || {},
          },
        ])
        .select()
        .single();

      if (error) throw error;
      
      toast.success('Assessment saved!', {
        description: 'Your credit assessment has been saved to your profile.',
      });
      
      await fetchAssessments();
      return data;
    } catch (error: any) {
      toast.error('Failed to save assessment', {
        description: error.message,
      });
      return null;
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, [user]);

  return {
    assessments,
    loading,
    saveAssessment,
    fetchAssessments,
  };
};
