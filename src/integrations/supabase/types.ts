export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      aisha_conversations: {
        Row: {
          created_at: string | null
          id: string
          language: string | null
          message: string
          mood_detected: string | null
          platform: string | null
          role: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          language?: string | null
          message: string
          mood_detected?: string | null
          platform?: string | null
          role: string
        }
        Update: {
          created_at?: string | null
          id?: string
          language?: string | null
          message?: string
          mood_detected?: string | null
          platform?: string | null
          role?: string
        }
        Relationships: []
      }
      aisha_finance: {
        Row: {
          amount: number
          category: string | null
          created_at: string | null
          currency: string | null
          date: string | null
          description: string
          goal_by: string | null
          goal_target: number | null
          id: string
          is_recurring: boolean | null
          recur_freq: string | null
          type: string
        }
        Insert: {
          amount: number
          category?: string | null
          created_at?: string | null
          currency?: string | null
          date?: string | null
          description: string
          goal_by?: string | null
          goal_target?: number | null
          id?: string
          is_recurring?: boolean | null
          recur_freq?: string | null
          type: string
        }
        Update: {
          amount?: number
          category?: string | null
          created_at?: string | null
          currency?: string | null
          date?: string | null
          description?: string
          goal_by?: string | null
          goal_target?: number | null
          id?: string
          is_recurring?: boolean | null
          recur_freq?: string | null
          type?: string
        }
        Relationships: []
      }
      aisha_goals: {
        Row: {
          achieved_at: string | null
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          progress: number | null
          status: string | null
          target_date: string | null
          timeframe: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          achieved_at?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          progress?: number | null
          status?: string | null
          target_date?: string | null
          timeframe?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          achieved_at?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          progress?: number | null
          status?: string | null
          target_date?: string | null
          timeframe?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      aisha_journal: {
        Row: {
          aisha_note: string | null
          created_at: string | null
          date: string | null
          entry: string
          id: string
          mood: string | null
          mood_score: number | null
          tags: string[] | null
        }
        Insert: {
          aisha_note?: string | null
          created_at?: string | null
          date?: string | null
          entry: string
          id?: string
          mood?: string | null
          mood_score?: number | null
          tags?: string[] | null
        }
        Update: {
          aisha_note?: string | null
          created_at?: string | null
          date?: string | null
          entry?: string
          id?: string
          mood?: string | null
          mood_score?: number | null
          tags?: string[] | null
        }
        Relationships: []
      }
      aisha_memory: {
        Row: {
          category: string
          content: string
          created_at: string | null
          embedding: string | null
          id: string
          importance: number | null
          is_active: boolean | null
          source: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          content: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          importance?: number | null
          is_active?: boolean | null
          source?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          content?: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          importance?: number | null
          is_active?: boolean | null
          source?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      aisha_mood_tracker: {
        Row: {
          created_at: string | null
          date: string | null
          id: string
          mood: string
          mood_score: number | null
          notes: string | null
          time_of_day: string | null
          triggers: string[] | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          id?: string
          mood: string
          mood_score?: number | null
          notes?: string | null
          time_of_day?: string | null
          triggers?: string[] | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          id?: string
          mood?: string
          mood_score?: number | null
          notes?: string | null
          time_of_day?: string | null
          triggers?: string[] | null
        }
        Relationships: []
      }
      aisha_schedule: {
        Row: {
          created_at: string | null
          description: string | null
          due_date: string | null
          due_time: string | null
          id: string
          is_recurring: boolean | null
          priority: string | null
          recur_days: string[] | null
          reminder_sent: boolean | null
          status: string | null
          title: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          due_time?: string | null
          id?: string
          is_recurring?: boolean | null
          priority?: string | null
          recur_days?: string[] | null
          reminder_sent?: boolean | null
          status?: string | null
          title: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          due_time?: string | null
          id?: string
          is_recurring?: boolean | null
          priority?: string | null
          recur_days?: string[] | null
          reminder_sent?: boolean | null
          status?: string | null
          title?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      ajay_profile: {
        Row: {
          created_at: string | null
          current_mood: string | null
          id: string
          languages: string[] | null
          name: string
          nickname: string | null
          personality_notes: string | null
          preferred_lang: string | null
          timezone: string | null
          updated_at: string | null
          voice_preference: string | null
        }
        Insert: {
          created_at?: string | null
          current_mood?: string | null
          id?: string
          languages?: string[] | null
          name?: string
          nickname?: string | null
          personality_notes?: string | null
          preferred_lang?: string | null
          timezone?: string | null
          updated_at?: string | null
          voice_preference?: string | null
        }
        Update: {
          created_at?: string | null
          current_mood?: string | null
          id?: string
          languages?: string[] | null
          name?: string
          nickname?: string | null
          personality_notes?: string | null
          preferred_lang?: string | null
          timezone?: string | null
          updated_at?: string | null
          voice_preference?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          subject: string
          visitor_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          subject: string
          visitor_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          subject?: string
          visitor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_visitor_id_fkey"
            columns: ["visitor_id"]
            isOneToOne: false
            referencedRelation: "visitors"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_logs: {
        Row: {
          channel: string
          created_at: string
          error: string | null
          id: string
          message_id: string | null
          provider_message_id: string | null
          provider_type: string
          recipient_email: string | null
          recipient_phone: string | null
          recipient_type: string
          status: string
        }
        Insert: {
          channel: string
          created_at?: string
          error?: string | null
          id?: string
          message_id?: string | null
          provider_message_id?: string | null
          provider_type?: string
          recipient_email?: string | null
          recipient_phone?: string | null
          recipient_type: string
          status?: string
        }
        Update: {
          channel?: string
          created_at?: string
          error?: string | null
          id?: string
          message_id?: string | null
          provider_message_id?: string | null
          provider_type?: string
          recipient_email?: string | null
          recipient_phone?: string | null
          recipient_type?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_logs_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_limits: {
        Row: {
          action: string
          attempts: number | null
          created_at: string | null
          id: string
          identifier: string
          window_start: string | null
        }
        Insert: {
          action: string
          attempts?: number | null
          created_at?: string | null
          id?: string
          identifier: string
          window_start?: string | null
        }
        Update: {
          action?: string
          attempts?: number | null
          created_at?: string | null
          id?: string
          identifier?: string
          window_start?: string | null
        }
        Relationships: []
      }
      visitors: {
        Row: {
          browser: string | null
          city: string | null
          country: string | null
          created_at: string | null
          device_type: string | null
          id: string
          ip_address: unknown
          operating_system: string | null
          page_visited: string | null
          referrer: string | null
          user_agent: string | null
          visited_at: string | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          id?: string
          ip_address?: unknown
          operating_system?: string | null
          page_visited?: string | null
          referrer?: string | null
          user_agent?: string | null
          visited_at?: string | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          id?: string
          ip_address?: unknown
          operating_system?: string | null
          page_visited?: string | null
          referrer?: string | null
          user_agent?: string | null
          visited_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_rate_limit: {
        Args: {
          p_action: string
          p_identifier: string
          p_max_attempts?: number
          p_window_minutes?: number
        }
        Returns: boolean
      }
      secure_insert_message: {
        Args: {
          p_email: string
          p_message: string
          p_name: string
          p_phone: string
          p_subject: string
          p_visitor_id?: string
        }
        Returns: string
      }
      secure_insert_message_v2: {
        Args: {
          p_email: string
          p_message: string
          p_name: string
          p_phone?: string
          p_subject: string
          p_visitor_id?: string
        }
        Returns: string
      }
      secure_insert_notification_log: {
        Args: {
          p_channel: string
          p_error?: string
          p_message_id: string
          p_recipient_email?: string
          p_recipient_phone?: string
          p_recipient_type: string
          p_status?: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
