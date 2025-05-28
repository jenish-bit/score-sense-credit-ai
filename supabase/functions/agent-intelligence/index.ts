
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
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
      case 'analyze_customer_personality':
        return await analyzeCustomerPersonality(data, supabase);
      case 'predict_buying_intent':
        return await predictBuyingIntent(data, supabase);
      case 'generate_coaching_suggestions':
        return await generateCoachingSuggestions(data, supabase);
      case 'track_performance':
        return await trackPerformance(data, supabase);
      default:
        throw new Error('Invalid action');
    }
  } catch (error) {
    console.error('Error in agent-intelligence function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function analyzeCustomerPersonality(data: any, supabase: any) {
  const { conversationData, userId } = data;
  
  // Use OpenAI to analyze customer personality
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in customer personality analysis. Analyze the conversation and return a JSON with personality_type, buying_intent (0-100), risk_level, communication_preference, and emotional_state.'
        },
        {
          role: 'user',
          content: `Analyze this customer conversation: ${conversationData}`
        }
      ],
    }),
  });

  const aiResult = await response.json();
  const analysis = JSON.parse(aiResult.choices[0].message.content);

  // Store in database
  const { error } = await supabase
    .from('customer_profiles')
    .upsert({
      user_id: userId,
      customer_name: data.customerName || 'Unknown',
      personality_type: analysis.personality_type,
      buying_intent: analysis.buying_intent,
      risk_level: analysis.risk_level,
      communication_preference: analysis.communication_preference,
      emotional_state: analysis.emotional_state,
      conversation_history: conversationData
    });

  if (error) throw error;

  return new Response(JSON.stringify({ analysis }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function predictBuyingIntent(data: any, supabase: any) {
  const { customerData, userId } = data;
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Analyze customer data and predict buying intent as a score from 0-100. Also predict likely objections and suggest response strategies. Return as JSON.'
        },
        {
          role: 'user',
          content: `Customer data: ${JSON.stringify(customerData)}`
        }
      ],
    }),
  });

  const aiResult = await response.json();
  const prediction = JSON.parse(aiResult.choices[0].message.content);

  return new Response(JSON.stringify({ prediction }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function generateCoachingSuggestions(data: any, supabase: any) {
  const { sessionData, userId } = data;
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert sales coach. Provide real-time coaching suggestions based on the conversation flow. Return specific, actionable advice as JSON.'
        },
        {
          role: 'user',
          content: `Session data: ${JSON.stringify(sessionData)}`
        }
      ],
    }),
  });

  const aiResult = await response.json();
  const suggestions = JSON.parse(aiResult.choices[0].message.content);

  // Store coaching session
  const { error } = await supabase
    .from('coaching_sessions')
    .insert({
      user_id: userId,
      session_type: sessionData.type,
      customer_profile: sessionData.customerProfile,
      insights: sessionData.insights,
      suggestions: suggestions,
      performance_score: sessionData.performanceScore || 0,
      duration_minutes: sessionData.duration || 0
    });

  if (error) throw error;

  return new Response(JSON.stringify({ suggestions }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function trackPerformance(data: any, supabase: any) {
  const { metrics, userId } = data;
  
  const { error } = await supabase
    .from('performance_metrics')
    .insert({
      user_id: userId,
      metric_type: metrics.type,
      metric_value: metrics.value,
      period_start: metrics.periodStart,
      period_end: metrics.periodEnd,
      additional_data: metrics.additionalData || {}
    });

  if (error) throw error;

  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
