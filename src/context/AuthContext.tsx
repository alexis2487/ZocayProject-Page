import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isDemoMode: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  enableDemoMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER_STORAGE_KEY = 'zocay_demo_admin_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check if demo session is stored
    const storedDemo = localStorage.getItem(DEMO_USER_STORAGE_KEY);
    if (storedDemo) {
      try {
        const parsed = JSON.parse(storedDemo);
        setUser(parsed);
        setIsDemoMode(true);
        setLoading(false);
        return;
      } catch {
        localStorage.removeItem(DEMO_USER_STORAGE_KEY);
      }
    }

    // 2. Check Supabase session if configured
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // If Supabase is configured, attempt real authentication
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          // If auth fails on Supabase, return Spanish user-friendly error
          let msg = error.message;
          if (msg.includes('Invalid login credentials')) {
            msg = 'Credenciales inválidas. Verifica tu correo y contraseña en Supabase Auth.';
          } else if (msg.includes('Email not confirmed')) {
            msg = 'El correo electrónico no ha sido confirmado en Supabase.';
          }
          return { success: false, error: msg };
        }

        setUser(data.user);
        setSession(data.session);
        setIsDemoMode(false);
        localStorage.removeItem(DEMO_USER_STORAGE_KEY);
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message || 'Error de conexión con Supabase.' };
      }
    }

    // Fallback: Demo / Offline Mode when Supabase keys are not configured yet
    if (email.trim() && password.length >= 4) {
      const demoUser = {
        id: 'demo-xyomara-admin',
        email: email.trim().toLowerCase(),
        user_metadata: {
          full_name: 'Dra. Xyomara Carretero-Pinzón',
          role: 'Director & Lead Researcher',
        },
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      } as unknown as User;

      setUser(demoUser);
      setIsDemoMode(true);
      localStorage.setItem(DEMO_USER_STORAGE_KEY, JSON.stringify(demoUser));
      return { success: true };
    }

    return { success: false, error: 'Por favor ingresa un correo válido y contraseña (mínimo 4 caracteres).' };
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.error('Error signing out from Supabase', e);
      }
    }
    setUser(null);
    setSession(null);
    setIsDemoMode(false);
    localStorage.removeItem(DEMO_USER_STORAGE_KEY);
  };

  const enableDemoMode = () => {
    const demoUser = {
      id: 'demo-xyomara-admin',
      email: 'xyomara@zocayproject.org',
      user_metadata: {
        full_name: 'Dra. Xyomara Carretero-Pinzón',
        role: 'Directora Científica',
      },
      app_metadata: {},
      aud: 'authenticated',
      created_at: new Date().toISOString(),
    } as unknown as User;

    setUser(demoUser);
    setIsDemoMode(true);
    localStorage.setItem(DEMO_USER_STORAGE_KEY, JSON.stringify(demoUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isDemoMode,
        isConfigured: isSupabaseConfigured,
        signIn,
        signOut,
        enableDemoMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
