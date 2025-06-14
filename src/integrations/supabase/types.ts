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
      applications: {
        Row: {
          academic_gpa: number | null
          academic_level: string | null
          country: string
          created_at: string
          documents_urls: Json | null
          education_level: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          english_proficiency: string | null
          financial_support_needed: boolean | null
          full_name: string
          id: string
          language_of_instruction: string
          motivation_letter: string | null
          nationality: string
          preferred_start_date: string | null
          previous_degree: string | null
          profile_picture_url: string | null
          scholarship_interest: boolean | null
          status: string | null
          study_field: string
          updated_at: string
          whatsapp: string
        }
        Insert: {
          academic_gpa?: number | null
          academic_level?: string | null
          country: string
          created_at?: string
          documents_urls?: Json | null
          education_level: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          english_proficiency?: string | null
          financial_support_needed?: boolean | null
          full_name: string
          id?: string
          language_of_instruction: string
          motivation_letter?: string | null
          nationality: string
          preferred_start_date?: string | null
          previous_degree?: string | null
          profile_picture_url?: string | null
          scholarship_interest?: boolean | null
          status?: string | null
          study_field: string
          updated_at?: string
          whatsapp: string
        }
        Update: {
          academic_gpa?: number | null
          academic_level?: string | null
          country?: string
          created_at?: string
          documents_urls?: Json | null
          education_level?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          english_proficiency?: string | null
          financial_support_needed?: boolean | null
          full_name?: string
          id?: string
          language_of_instruction?: string
          motivation_letter?: string | null
          nationality?: string
          preferred_start_date?: string | null
          previous_degree?: string | null
          profile_picture_url?: string | null
          scholarship_interest?: boolean | null
          status?: string | null
          study_field?: string
          updated_at?: string
          whatsapp?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          nationality: string | null
          phone: string | null
          profile_picture_url: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          nationality?: string | null
          phone?: string | null
          profile_picture_url?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          nationality?: string | null
          phone?: string | null
          profile_picture_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      universities: {
        Row: {
          country: string
          created_at: string
          deadline: string | null
          id: string | null
          name: string
          ranking: string | null
          status: string
          tuition: string | null
          updated_at: string
        }
        Insert: {
          country: string
          created_at?: string
          deadline?: string | null
          id?: string | null
          name: string
          ranking?: string | null
          status?: string
          tuition?: string | null
          updated_at?: string
        }
        Update: {
          country?: string
          created_at?: string
          deadline?: string | null
          id?: string | null
          name?: string
          ranking?: string | null
          status?: string
          tuition?: string | null
          updated_at?: string
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
