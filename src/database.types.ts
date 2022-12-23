export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      games: {
        Row: {
          created_at: string
          hint: string | null
          id: number
          user_id: string
          word: string
        }
        Insert: {
          created_at?: string
          hint?: string | null
          id?: number
          user_id?: string
          word: string
        }
        Update: {
          created_at?: string
          hint?: string | null
          id?: number
          user_id?: string
          word?: string
        }
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
  }
}

