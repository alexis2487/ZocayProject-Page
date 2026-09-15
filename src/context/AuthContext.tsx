import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { isValidEmail } from '../lib/security';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1. Limpieza de cualquier sesión de prueba / demo obsoleta por seguridad
    if (typeof window !== 'undefined') {
      localStorage.removeItem('zocay_demo_admin_user');
    }

    // 2. Comprobar sesión activa de Supabase
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

  const signIn = async (emailInput: string, passwordInput: string): Promise<{ success: boolean; error?: string }> => {
    const email = emailInput.trim().toLowerCase();
    const password = passwordInput.trim();

    // Validación básica de entrada
    if (!email || !password) {
      return { success: false, error: 'Por favor ingresa tanto el correo como la contraseña.' };
    }

    if (!isValidEmail(email)) {
      return { success: false, error: 'El formato de correo electrónico no es válido.' };
    }

    if (!isSupabaseConfigured) {
      return { 
        success: false, 
        error: 'El servicio de autenticación con la base de datos no está disponible. Verifica las credenciales.' 
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Protección contra enumeración de usuarios: Respuesta genérica de seguridad
        return { 
          success: false, 
          error: 'Credenciales incorrectas o acceso no autorizado. Por favor verifica tus datos.' 
        };
      }

      if (!data.session || !data.user) {
        return { 
          success: false, 
          error: 'No se pudo inicializar la sesión de administrador.' 
        };
      }

      setUser(data.user);
      setSession(data.session);
      return { success: true };
    } catch {
      return { 
        success: false, 
        error: 'Error de red o comunicación al contactar el servidor de autenticación.' 
      };
    }
  };

  const signOut = async () => {
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
    } catch (e) {
      console.error('Error al cerrar sesión', e);
    } finally {
      setUser(null);
      setSession(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isConfigured: isSupabaseConfigured,
        signIn,
        signOut,
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
