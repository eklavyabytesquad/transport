import { createClient } from '@supabase/supabase-js'

// Supabase Project URL and Anon Key
const supabaseUrl = 'https://zkxsjpulqiwbmedplnes.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpreHNqcHVscWl3Ym1lZHBsbmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NDI4MzQsImV4cCI6MjA1OTQxODgzNH0.8vtUbTkhY9MjVWquD4-JT6GgKJRey3Pjcv90vyA5EEI'

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Optional: Create server-side supabase client if needed
export const createServerSupabaseClient = (context) => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    // Optional additional configuration
    // auth: {
    //   persistSession: false
    // }
  })
}

export default supabase