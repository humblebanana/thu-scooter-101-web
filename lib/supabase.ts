import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// 定义反馈类型
export interface FeedbackType {
  page: string
  rating: number
  improvements: string
  suggestions: string
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 