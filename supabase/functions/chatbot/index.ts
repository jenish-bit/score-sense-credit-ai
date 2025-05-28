
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
    const { message, conversationId, userId, conversationType = 'general' } = await req.json();

    // Get conversation history
    let conversation;
    if (conversationId) {
      const { data } = await supabase
        .from('chat_conversations')
        .select('*')
        .eq('id', conversationId)
        .eq('user_id', userId)
        .single();
      conversation = data;
    }

    if (!conversation) {
      // Create new conversation
      const { data, error } = await supabase
        .from('chat_conversations')
        .insert({
          user_id: userId,
          conversation_type: conversationType,
          messages: []
        })
        .select()
        .single();
      
      if (error) throw error;
      conversation = data;
    }

    // Add user message to conversation
    const messages = [...(conversation.messages || []), {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    }];

    // Generate AI response based on conversation type
    let systemPrompt = '';
    switch (conversationType) {
      case 'coaching':
        systemPrompt = 'You are an expert sales coach specializing in financial products. Provide personalized coaching advice, tips, and encouragement. Be supportive and actionable.';
        break;
      case 'support':
        systemPrompt = 'You are a helpful support assistant for the AgentDNA platform. Help users with technical questions, feature explanations, and troubleshooting.';
        break;
      default:
        systemPrompt = 'You are a friendly AI assistant for AgentDNA, a sales coaching platform. Help users with general questions about sales, motivation, and using the platform effectively.';
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.slice(-10).map(msg => ({ role: msg.role, content: msg.content })) // Last 10 messages for context
        ],
        max_tokens: 500,
        temperature: 0.7
      }),
    });

    const aiResult = await response.json();
    const aiMessage = aiResult.choices[0].message.content;

    // Add AI response to conversation
    const updatedMessages = [...messages, {
      role: 'assistant',
      content: aiMessage,
      timestamp: new Date().toISOString()
    }];

    // Update conversation in database
    const { error: updateError } = await supabase
      .from('chat_conversations')
      .update({
        messages: updatedMessages,
        updated_at: new Date().toISOString()
      })
      .eq('id', conversation.id);

    if (updateError) throw updateError;

    return new Response(JSON.stringify({
      message: aiMessage,
      conversationId: conversation.id,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chatbot function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
