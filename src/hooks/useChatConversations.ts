
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatConversation {
  id: string;
  conversation_type: string;
  messages: ChatMessage[];
  created_at: string;
  updated_at: string;
}

export const useChatConversations = () => {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<ChatConversation | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchConversations = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('chat_conversations')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      
      const formattedConversations: ChatConversation[] = (data || []).map(conv => ({
        id: conv.id,
        conversation_type: conv.conversation_type || 'general',
        messages: Array.isArray(conv.messages) ? conv.messages as ChatMessage[] : [],
        created_at: conv.created_at || '',
        updated_at: conv.updated_at || ''
      }));
      
      setConversations(formattedConversations);
    } catch (error: any) {
      console.error('Error fetching conversations:', error);
      toast.error('Failed to fetch conversations');
    } finally {
      setLoading(false);
    }
  };

  const saveMessage = async (message: ChatMessage, conversationType = 'general') => {
    if (!user) return;

    try {
      let conversation = currentConversation;
      
      if (!conversation) {
        // Create new conversation
        const { data: newConv, error: createError } = await supabase
          .from('chat_conversations')
          .insert([
            {
              user_id: user.id,
              conversation_type: conversationType,
              messages: [message],
            },
          ])
          .select()
          .single();

        if (createError) throw createError;
        
        const formattedConv: ChatConversation = {
          id: newConv.id,
          conversation_type: newConv.conversation_type || 'general',
          messages: Array.isArray(newConv.messages) ? newConv.messages as ChatMessage[] : [message],
          created_at: newConv.created_at || '',
          updated_at: newConv.updated_at || ''
        };
        
        conversation = formattedConv;
        setCurrentConversation(conversation);
      } else {
        // Update existing conversation
        const updatedMessages = [...conversation.messages, message];
        const { data: updatedConv, error: updateError } = await supabase
          .from('chat_conversations')
          .update({
            messages: updatedMessages,
            updated_at: new Date().toISOString(),
          })
          .eq('id', conversation.id)
          .select()
          .single();

        if (updateError) throw updateError;
        
        const formattedConv: ChatConversation = {
          id: updatedConv.id,
          conversation_type: updatedConv.conversation_type || 'general',
          messages: Array.isArray(updatedConv.messages) ? updatedConv.messages as ChatMessage[] : updatedMessages,
          created_at: updatedConv.created_at || '',
          updated_at: updatedConv.updated_at || ''
        };
        
        conversation = formattedConv;
        setCurrentConversation(conversation);
      }

      await fetchConversations();
    } catch (error: any) {
      console.error('Error saving message:', error);
      toast.error('Failed to save message');
    }
  };

  const startNewConversation = () => {
    setCurrentConversation(null);
  };

  useEffect(() => {
    fetchConversations();
  }, [user]);

  return {
    conversations,
    currentConversation,
    loading,
    saveMessage,
    startNewConversation,
    setCurrentConversation,
    refetch: fetchConversations,
  };
};
