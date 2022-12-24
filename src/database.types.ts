export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      games: {
        Row: {
          created_at: string;
          hint: string | null;
          id: number;
          players: string[];
          user_id: string;
          word: string;
        };
        Insert: {
          created_at?: string;
          hint?: string | null;
          id?: number;
          players?: string[];
          user_id?: string;
          word: string;
        };
        Update: {
          created_at?: string;
          hint?: string | null;
          id?: number;
          players?: string[];
          user_id?: string;
          word?: string;
        };
      };
      guesses: {
        Row: {
          answer_key: string[];
          attempt: number;
          correct: boolean;
          created_at: string;
          game_id: number;
          guess: string;
          user_id: string;
        };
        Insert: {
          answer_key: string[];
          attempt?: number;
          correct?: boolean;
          created_at?: string;
          game_id: number;
          guess: string;
          user_id?: string;
        };
        Update: {
          answer_key?: string[];
          attempt?: number;
          correct?: boolean;
          created_at?: string;
          game_id?: number;
          guess?: string;
          user_id?: string;
        };
      };
    };
    Views: {
      invited_games: {
        Row: {
          created_at: string;
          hint: string;
          id: number;
          word_length: number;
        };
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
