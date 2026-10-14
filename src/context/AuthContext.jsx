import { createContext, useContext, useEffect, useState } from 'react'
import { hasSupabaseConfig, requireSupabase, supabase } from '../lib/supabaseClient'

const ADMIN_EMAILS = (
  import.meta.env.VITE_ADMIN_EMAILS ||
  import.meta.env.VITE_ADMIN_EMAIL ||
  'jasonf8080@gmail.com'
)
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean)

const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setUser(null)
      setLoading(false)
      return undefined
    }

    let isMounted = true

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isMounted) {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        setUser(session?.user ?? null)
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const withSupabase = async (action, fallbackMessage) => {
    if (!hasSupabaseConfig || !supabase) {
      return {
        error: {
          message:
            fallbackMessage ||
            'Supabase is not configured yet. Add a valid project URL and publishable key to your .env file.',
        },
      }
    }

    try {
      return await action(requireSupabase())
    } catch (error) {
      return { error }
    }
  }

  const signInWithGoogle = async () =>
    withSupabase(
      (client) =>
        client.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: `${window.location.origin}/` },
        }),
      'Google sign-in is unavailable because Supabase is not configured or the project is not reachable.'
    )

  const signInWithPassword = async (email, password) =>
    withSupabase(
      (client) => client.auth.signInWithPassword({ email, password }),
      'Email sign-in is unavailable because Supabase is not configured or the project is not reachable.'
    )

  const checkEmailExists = async (email) =>
    withSupabase(
      async (client) => {
        const normalizedEmail = String(email || '').trim().toLowerCase()
        if (!normalizedEmail) {
          return false
        }

        const { data, error } = await client
          .from('profiles')
          .select('id')
          .eq('email', normalizedEmail)
          .limit(1)

        if (error) {
          if (error.code === '42P01' || error.code === 'PGRST301') {
            return {
              error: {
                message:
                  'The profiles table is missing in Supabase. Run the database SQL setup to enable duplicate-email checks.',
              },
            }
          }

          throw error
        }

        return Boolean(data?.length)
      },
      'Email lookup is unavailable because Supabase is not configured or the project is not reachable.'
    )

  const signUpWithEmail = async (email, password, fullName) =>
    withSupabase(
      async (client) => {
        const result = await client.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName || '' },
            emailRedirectTo: `${window.location.origin}/`,
          },
        })

        if (result?.error?.message) {
          const normalized = result.error.message.toLowerCase()
          if (normalized.includes('already registered') || normalized.includes('already exists')) {
            return {
              error: {
                message: 'This email is already registered. Please sign in instead.',
              },
            }
          }
        }

        return result
      },
      'Account creation is unavailable because Supabase is not configured or the project is not reachable.'
    )

  const signInWithEmail = async (email) =>
    withSupabase(
      (client) =>
        client.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: `${window.location.origin}/` },
        }),
      'Magic-link sign-in is unavailable because Supabase is not configured or the project is not reachable.'
    )

  const signOut = async () =>
    withSupabase(
      (client) => client.auth.signOut(),
      'Sign out is unavailable because Supabase is not configured or the project is not reachable.'
    )

  const updateProfile = async ({ fullName, email, phone }) =>
    withSupabase(
      async (client) => {
        const normalizedEmail = String(email || '').trim().toLowerCase()
        const normalizedName = String(fullName || '').trim()
        const normalizedPhone = String(phone || '').trim()

        const updatePayload = {
          data: {
            full_name: normalizedName,
            phone: normalizedPhone,
          },
        }

        if (normalizedEmail) {
          updatePayload.email = normalizedEmail
        }

        const result = await client.auth.updateUser(updatePayload)

        if (!result?.error && result?.data?.user) {
          setUser(result.data.user)
        }

        if (result?.error?.message) {
          const normalizedMessage = result.error.message.toLowerCase()
          if (
            normalizedMessage.includes('already registered') ||
            normalizedMessage.includes('already exists') ||
            normalizedMessage.includes('duplicate')
          ) {
            return {
              error: {
                message: 'This email is already registered. Please use a different email.',
              },
            }
          }
        }

        return result
      },
      'Profile updates are unavailable because Supabase is not configured or the project is not reachable.'
    )

  const isAdmin = Boolean(user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase()))

  const value = {
    user,
    loading,
    isConfigured: hasSupabaseConfig,
    isAdmin,
    signInWithGoogle,
    signInWithPassword,
    checkEmailExists,
    signUpWithEmail,
    signInWithEmail,
    signOut,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
