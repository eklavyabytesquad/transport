'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabase'
import { useRouter } from 'next/navigation'

// Create auth context
const AuthContext = createContext()

// Export the provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Function to get user profile data
  const getUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching user profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in getUserProfile:', error.message)
      return null
    }
  }

  // Sign in with email and password
  const signIn = async (email, password) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Fetch user profile after successful login
      if (data.user) {
        const profileData = await getUserProfile(data.user.id)
        setProfile(profileData)
      }

      router.push('/dashboard')
      return { success: true }
    } catch (error) {
      console.error('Error signing in:', error.message)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Sign up new user
  const signUp = async (email, password, fullName, role) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      })

      if (error) throw error

      return { success: true }
    } catch (error) {
      console.error('Error signing up:', error.message)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Sign out
  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      setUser(null)
      setProfile(null)
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error.message)
    } finally {
      setLoading(false)
    }
  }

  // Check and set current session on mount and auth state changes
  useEffect(() => {
    const initialize = async () => {
      try {
        setLoading(true)

        // Get current session
        const { data: { session } } = await supabase.auth.getSession()
        
        // Set up auth state change listener
        const { data: { subscription } } = await supabase.auth.onAuthStateChange(
          async (event, currentSession) => {
            const currentUser = currentSession?.user || null
            setUser(currentUser)

            if (currentUser) {
              const profileData = await getUserProfile(currentUser.id)
              setProfile(profileData)
            } else {
              setProfile(null)
            }

            setLoading(false)
          }
        )

        // Initial user setup from current session
        if (session?.user) {
          setUser(session.user)
          const profileData = await getUserProfile(session.user.id)
          setProfile(profileData)
        }

        return () => {
          subscription?.unsubscribe()
        }
      } catch (error) {
        console.error('Error in auth initialization:', error.message)
      } finally {
        setLoading(false)
      }
    }

    initialize()
  }, [])

  // Create context value
  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
  }

  // Return provider with value
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}