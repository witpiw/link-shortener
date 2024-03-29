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
      link_visits: {
        Row: {
          date: string
          id: string
          link_id: string
          total_visits: number
          unique_visits: number
        }
        Insert: {
          date: string
          id?: string
          link_id: string
          total_visits?: number
          unique_visits?: number
        }
        Update: {
          date?: string
          id?: string
          link_id?: string
          total_visits?: number
          unique_visits?: number
        }
      }
      links: {
        Row: {
          id: string
          link_slug: string
          owner: string
          redirect_to: string
        }
        Insert: {
          id?: string
          link_slug: string
          owner: string
          redirect_to: string
        }
        Update: {
          id?: string
          link_slug?: string
          owner?: string
          redirect_to?: string
        }
      }
      profiles: {
        Row: {
          id: string
          username: string | null
        }
        Insert: {
          id: string
          username?: string | null
        }
        Update: {
          id?: string
          username?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_total: {
        Args: {
          link_uuid: string
          visit_date: string
        }
        Returns: undefined
      }
      increment_unique: {
        Args: {
          link_uuid: string
          visit_date: string
        }
        Returns: undefined
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
