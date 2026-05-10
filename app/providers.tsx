'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
});

export function Providers({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);

        if (session?.user) {
          const { data } = await supabase
            .from('admin_users')
            .select('role')
            .eq('user_id', session.user.id)
            .maybeSingle();

          setIsAdmin(data?.role === 'admin' || data?.role === 'moderator');
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);

      (async () => {
        if (session?.user) {
          const { data } = await supabase
            .from('admin_users')
            .select('role')
            .eq('user_id', session.user.id)
            .maybeSingle();

          setIsAdmin(data?.role === 'admin' || data?.role === 'moderator');
        } else {
          setIsAdmin(false);
        }
      })();
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin }}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within Providers');
  }
  return context;
}
