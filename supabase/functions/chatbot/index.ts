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

const getSystemPrompt = (conversationType: string, userProfile?: any) => {
  const baseContext = `You are AgentDNA AI, an advanced sales coaching assistant with deep expertise in sales psychology, behavioral analysis, and performance optimization. You have access to cutting-edge sales methodologies and can provide personalized insights.

Core Capabilities:
- Advanced sales strategy and technique coaching
- Real-time performance analysis and feedback
- Customer psychology and behavioral insights
- Emotional intelligence coaching
- Objection handling and closing techniques
- CRM optimization and automation strategies
- Team leadership and motivation
- Stress management and wellness coaching

Your responses should be:
- Highly actionable and specific
- Based on proven sales methodologies
- Tailored to the user's experience level
- Encouraging yet realistic
- Data-driven when possible`;

  switch (conversationType) {
    case 'coaching':
      return `${baseContext}

COACHING MODE: You are in intensive coaching mode. Focus on:
- Identifying specific improvement areas
- Providing step-by-step action plans
- Role-playing scenarios and objection handling
- Performance metric analysis
- Goal setting and accountability
- Advanced sales techniques (SPIN, Challenger, Solution Selling)
- Building confidence and overcoming call reluctance

Ask probing questions to understand their challenges and provide personalized coaching strategies.`;

    case 'support':
      return `${baseContext}

SUPPORT MODE: You are providing technical and platform support. Help with:
- AgentDNA platform features and navigation
- Troubleshooting technical issues
- Data interpretation and analytics
- Integration setup and optimization
- Best practices for using the platform
- Training resources and tutorials

Be clear, patient, and provide step-by-step guidance.`;

    default:
      return `${baseContext}

GENERAL MODE: You are a comprehensive sales assistant. You can help with:
- Quick sales tips and strategies
- Motivation and mindset coaching
- Industry insights and trends
- General sales questions
- Platform guidance
- Performance improvement suggestions

Adapt your communication style to be conversational yet professional, providing value in every interaction.`;
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { message, conversationId, userId, conversationType = 'general' } = await req.json();

    console.log('Processing chatbot request:', { userId, conversationType, messageLength: message?.length });

    // Get user profile for personalization
    const { data: userProfile } = await supabase
      .from('agent_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    // Get or create conversation
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

    // Build conversation history with smart context management
    const messages = [...(conversation.messages || [])];
    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    messages.push(userMessage);

    // Keep last 20 messages for context, but prioritize recent and important messages
    const contextMessages = messages
      .slice(-20)
      .map(msg => ({ role: msg.role, content: msg.content }));

    // Enhanced system prompt with user context
    const systemPrompt = getSystemPrompt(conversationType, userProfile);
    
    // Add user profile context if available
    let profileContext = '';
    if (userProfile) {
      profileContext = `\n\nUser Profile Context:
- Personality Type: ${userProfile.personality_type || 'Not assessed'}
- Communication Style: ${userProfile.communication_style || 'Unknown'}
- Conversion Rate: ${userProfile.conversion_rate || 0}%
- Emotional Intelligence: ${userProfile.emotional_intelligence || 0}/100
- Key Strengths: ${userProfile.strengths?.join(', ') || 'Not identified'}
- Areas for Improvement: ${userProfile.weaknesses?.join(', ') || 'Not identified'}

Use this information to provide personalized advice and coaching.`;
    }

    console.log('Calling OpenAI with context:', { 
      messageCount: contextMessages.length, 
      hasProfile: !!userProfile,
      conversationType 
    });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { 
            role: 'system', 
            content: systemPrompt + profileContext
          },
          ...contextMessages
        ],
        max_tokens: 800,
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const aiResult = await response.json();
    const aiMessage = aiResult.choices[0].message.content;

    console.log('Generated AI response:', { responseLength: aiMessage?.length });

    // Add AI response to conversation
    const aiMessageObj = {
      role: 'assistant',
      content: aiMessage,
      timestamp: new Date().toISOString()
    };
    const updatedMessages = [...messages, aiMessageObj];

    // Update conversation in database
    const { error: updateError } = await supabase
      .from('chat_conversations')
      .update({
        messages: updatedMessages,
        updated_at: new Date().toISOString()
      })
      .eq('id', conversation.id);

    if (updateError) {
      console.error('Database update error:', updateError);
      throw updateError;
    }

    return new Response(JSON.stringify({
      message: aiMessage,
      conversationId: conversation.id,
      timestamp: new Date().toISOString(),
      conversationType
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chatbot function:', error);
    return new Response(JSON.stringify({ 
      error: 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment.',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
