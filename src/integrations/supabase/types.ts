export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agent_profiles: {
        Row: {
          communication_style: string | null
          conversion_rate: number | null
          created_at: string | null
          emotional_intelligence: number | null
          id: string
          personality_type: string | null
          strengths: string[] | null
          updated_at: string | null
          user_id: string
          weaknesses: string[] | null
        }
        Insert: {
          communication_style?: string | null
          conversion_rate?: number | null
          created_at?: string | null
          emotional_intelligence?: number | null
          id?: string
          personality_type?: string | null
          strengths?: string[] | null
          updated_at?: string | null
          user_id: string
          weaknesses?: string[] | null
        }
        Update: {
          communication_style?: string | null
          conversion_rate?: number | null
          created_at?: string | null
          emotional_intelligence?: number | null
          id?: string
          personality_type?: string | null
          strengths?: string[] | null
          updated_at?: string | null
          user_id?: string
          weaknesses?: string[] | null
        }
        Relationships: []
      }
      automation_tasks: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          scheduled_for: string
          status: string | null
          task_data: Json | null
          task_type: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          scheduled_for: string
          status?: string | null
          task_data?: Json | null
          task_type: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          scheduled_for?: string
          status?: string | null
          task_data?: Json | null
          task_type?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_conversations: {
        Row: {
          conversation_type: string | null
          created_at: string | null
          id: string
          messages: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          conversation_type?: string | null
          created_at?: string | null
          id?: string
          messages?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          conversation_type?: string | null
          created_at?: string | null
          id?: string
          messages?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      coaching_sessions: {
        Row: {
          created_at: string | null
          customer_profile: Json | null
          duration_minutes: number | null
          id: string
          insights: Json | null
          performance_score: number | null
          session_type: string | null
          suggestions: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          customer_profile?: Json | null
          duration_minutes?: number | null
          id?: string
          insights?: Json | null
          performance_score?: number | null
          session_type?: string | null
          suggestions?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          customer_profile?: Json | null
          duration_minutes?: number | null
          id?: string
          insights?: Json | null
          performance_score?: number | null
          session_type?: string | null
          suggestions?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      credit_assessments: {
        Row: {
          assessment_date: string | null
          created_at: string | null
          employment_status: string | null
          factors: Json | null
          id: string
          income: number | null
          score: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          assessment_date?: string | null
          created_at?: string | null
          employment_status?: string | null
          factors?: Json | null
          id?: string
          income?: number | null
          score: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          assessment_date?: string | null
          created_at?: string | null
          employment_status?: string | null
          factors?: Json | null
          id?: string
          income?: number | null
          score?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      customer_profiles: {
        Row: {
          buying_intent: number | null
          communication_preference: string | null
          conversation_history: string | null
          created_at: string | null
          customer_name: string | null
          emotional_state: string | null
          id: string
          personality_type: string | null
          risk_level: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          buying_intent?: number | null
          communication_preference?: string | null
          conversation_history?: string | null
          created_at?: string | null
          customer_name?: string | null
          emotional_state?: string | null
          id?: string
          personality_type?: string | null
          risk_level?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          buying_intent?: number | null
          communication_preference?: string | null
          conversation_history?: string | null
          created_at?: string | null
          customer_name?: string | null
          emotional_state?: string | null
          id?: string
          personality_type?: string | null
          risk_level?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      gamification_progress: {
        Row: {
          achievement_id: string
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          id: string
          progress: number | null
          user_id: string
        }
        Insert: {
          achievement_id: string
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          progress?: number | null
          user_id: string
        }
        Update: {
          achievement_id?: string
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          progress?: number | null
          user_id?: string
        }
        Relationships: []
      }
      performance_metrics: {
        Row: {
          additional_data: Json | null
          created_at: string | null
          id: string
          metric_type: string
          metric_value: number
          period_end: string | null
          period_start: string | null
          user_id: string
        }
        Insert: {
          additional_data?: Json | null
          created_at?: string | null
          id?: string
          metric_type: string
          metric_value: number
          period_end?: string | null
          period_start?: string | null
          user_id: string
        }
        Update: {
          additional_data?: Json | null
          created_at?: string | null
          id?: string
          metric_type?: string
          metric_value?: number
          period_end?: string | null
          period_start?: string | null
          user_id?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          interest_rate: number | null
          max_score: number | null
          min_score: number | null
          name: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          interest_rate?: number | null
          max_score?: number | null
          min_score?: number | null
          name: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          interest_rate?: number | null
          max_score?: number | null
          min_score?: number | null
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      role_play_sessions: {
        Row: {
          completed: boolean | null
          conversation_log: Json | null
          created_at: string | null
          difficulty_level: string | null
          duration_minutes: number | null
          feedback: Json | null
          id: string
          performance_score: number | null
          scenario_type: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          conversation_log?: Json | null
          created_at?: string | null
          difficulty_level?: string | null
          duration_minutes?: number | null
          feedback?: Json | null
          id?: string
          performance_score?: number | null
          scenario_type: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          conversation_log?: Json | null
          created_at?: string | null
          difficulty_level?: string | null
          duration_minutes?: number | null
          feedback?: Json | null
          id?: string
          performance_score?: number | null
          scenario_type?: string
          user_id?: string
        }
        Relationships: []
      }
      wellness_metrics: {
        Row: {
          burnout_risk: string | null
          created_at: string | null
          energy_level: number | null
          id: string
          mood_score: number | null
          stress_level: number | null
          user_id: string
        }
        Insert: {
          burnout_risk?: string | null
          created_at?: string | null
          energy_level?: number | null
          id?: string
          mood_score?: number | null
          stress_level?: number | null
          user_id: string
        }
        Update: {
          burnout_risk?: string | null
          created_at?: string | null
          energy_level?: number | null
          id?: string
          mood_score?: number | null
          stress_level?: number | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
