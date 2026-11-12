import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import { getSupabaseClient } from "../lib/supabase";
import type {
  AuthError,
  AuthChangeEvent,
  Session,
  User as SupabaseUser,
} from "@supabase/supabase-js";

type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  createdAt: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  initializationError: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const toUser = (user: SupabaseUser): User => ({
  id: user.id,
  name:
    (typeof user.user_metadata.full_name === "string" && user.user_metadata.full_name.trim()) ||
    (typeof user.user_metadata.name === "string" && user.user_metadata.name.trim()) ||
    user.email?.split("@")[0] ||
    "Member",
  email: user.email ?? "",
  avatarUrl:
    (typeof user.user_metadata.avatar_url === "string" && user.user_metadata.avatar_url) ||
    (typeof user.user_metadata.picture === "string" && user.user_metadata.picture) ||
    null,
  createdAt: user.created_at,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initializationError, setInitializationError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | undefined;

    try {
      const supabase = getSupabaseClient();
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event: AuthChangeEvent, session: Session | null) => {
          if (!active) return;
          setUser(session?.user ? toUser(session.user) : null);
          setLoading(false);
        },
      );
      unsubscribe = () => subscription.unsubscribe();

      void supabase.auth.getSession().then(
        (
          { data, error }: {
            data: { session: Session | null };
            error: AuthError | null;
          },
        ) => {
          if (!active) return;
          if (error) {
            setInitializationError(error.message);
          } else {
            setUser(data.session?.user ? toUser(data.session.user) : null);
          }
          setLoading(false);
        },
      ).catch((error: unknown) => {
        if (!active) return;
        setInitializationError(
          error instanceof Error ? error.message : "Unable to restore your Google session.",
        );
        setLoading(false);
      });
    } catch (error: unknown) {
      setInitializationError(
        error instanceof Error ? error.message : "Unable to initialize Supabase.",
      );
      setLoading(false);
    }

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  const login = async () => authService.login();

  const logout = async () => authService.logout();

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      initializationError,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
