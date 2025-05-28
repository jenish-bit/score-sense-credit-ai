
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { action, data } = await req.json();

    switch (action) {
      case 'schedule_follow_up':
        return await scheduleFollowUp(data, supabase);
      case 'score_leads':
        return await scoreLeads(data, supabase);
      case 'process_automation_tasks':
        return await processAutomationTasks(supabase);
      case 'update_wellness_metrics':
        return await updateWellnessMetrics(data, supabase);
      default:
        throw new Error('Invalid action');
    }
  } catch (error) {
    console.error('Error in automation-engine function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function scheduleFollowUp(data: any, supabase: any) {
  const { userId, customerData, followUpTime, taskType } = data;
  
  const { error } = await supabase
    .from('automation_tasks')
    .insert({
      user_id: userId,
      task_type: taskType || 'follow_up',
      scheduled_for: followUpTime,
      task_data: customerData,
      status: 'pending'
    });

  if (error) throw error;

  return new Response(JSON.stringify({ success: true, message: 'Follow-up scheduled successfully' }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function scoreLeads(data: any, supabase: any) {
  const { leads, userId } = data;
  
  // Simple lead scoring algorithm (can be enhanced with ML)
  const scoredLeads = leads.map((lead: any) => {
    let score = 0;
    
    // Score based on engagement
    if (lead.phoneAnswered) score += 20;
    if (lead.emailOpened) score += 15;
    if (lead.websiteVisited) score += 10;
    
    // Score based on profile
    if (lead.income > 50000) score += 25;
    if (lead.creditScore > 700) score += 20;
    if (lead.hasExistingProducts) score += 15;
    
    // Score based on timeline
    if (lead.timeToDecision === 'immediate') score += 30;
    else if (lead.timeToDecision === 'week') score += 20;
    else if (lead.timeToDecision === 'month') score += 10;
    
    return { ...lead, score: Math.min(score, 100) };
  });

  // Sort by score (highest first)
  scoredLeads.sort((a, b) => b.score - a.score);

  return new Response(JSON.stringify({ scoredLeads }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function processAutomationTasks(supabase: any) {
  // Get pending tasks that are due
  const { data: tasks, error } = await supabase
    .from('automation_tasks')
    .select('*')
    .eq('status', 'pending')
    .lte('scheduled_for', new Date().toISOString());

  if (error) throw error;

  const processedTasks = [];
  
  for (const task of tasks) {
    // Process each task based on type
    switch (task.task_type) {
      case 'follow_up':
        // Here you would integrate with email/SMS services
        console.log(`Processing follow-up task for user ${task.user_id}`);
        break;
      case 'reminder':
        // Here you would send push notifications
        console.log(`Processing reminder task for user ${task.user_id}`);
        break;
    }
    
    // Mark task as completed
    await supabase
      .from('automation_tasks')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString()
      })
      .eq('id', task.id);
    
    processedTasks.push(task.id);
  }

  return new Response(JSON.stringify({ processedTasks: processedTasks.length }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function updateWellnessMetrics(data: any, supabase: any) {
  const { userId, stressLevel, energyLevel, moodScore } = data;
  
  // Calculate burnout risk
  let burnoutRisk = 'low';
  const avgScore = (stressLevel + (100 - energyLevel) + (100 - moodScore)) / 3;
  
  if (avgScore > 70) burnoutRisk = 'high';
  else if (avgScore > 40) burnoutRisk = 'medium';
  
  const { error } = await supabase
    .from('wellness_metrics')
    .insert({
      user_id: userId,
      stress_level: stressLevel,
      energy_level: energyLevel,
      burnout_risk: burnoutRisk,
      mood_score: moodScore
    });

  if (error) throw error;

  return new Response(JSON.stringify({ 
    success: true, 
    burnoutRisk,
    recommendation: getBurnoutRecommendation(burnoutRisk)
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function getBurnoutRecommendation(burnoutRisk: string) {
  switch (burnoutRisk) {
    case 'high':
      return 'Consider taking a break and practicing stress management techniques. Your well-being is important!';
    case 'medium':
      return 'Monitor your stress levels and ensure you\'re taking regular breaks between calls.';
    default:
      return 'Great job maintaining a healthy work-life balance!';
  }
}
