export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName: string;
          query: string;
          variables: Json;
          extensions: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
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
      completed_plays: {
        Row: {
          game_id: number | null;
          user_id: string | null;
        };
        Insert: {
          game_id?: number | null;
          user_id?: string | null;
        };
        Update: {
          game_id?: number | null;
          user_id?: string | null;
        };
      };
      invited_games: {
        Row: {
          created_at: string;
          hint: string;
          id: number;
          word_length: number;
        };
      };
      user_email: {
        Row: {
          email: string;
          id: string;
        };
        Insert: {
          email?: string | null;
          id?: string | null;
        };
        Update: {
          email?: string | null;
          id?: string | null;
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          created_at: string | null;
          id: string;
          name: string;
          owner: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          name: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      extension: {
        Args: { name: string };
        Returns: string;
      };
      filename: {
        Args: { name: string };
        Returns: string;
      };
      foldername: {
        Args: { name: string };
        Returns: string[];
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: { size: number; bucket_id: string }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits: number;
          levels: number;
          offsets: number;
          search: string;
          sortcolumn: string;
          sortorder: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
