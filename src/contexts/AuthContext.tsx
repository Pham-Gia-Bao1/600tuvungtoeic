import React, { createContext, useContext, useState } from "react";

type User = {
  id: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
};

// Tạo context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 👇 hack code: mặc định có user (đỡ phải login)
  const [user, setUser] = useState<User | null>({
    id: "1",
    name: "Demo User",
  });

  const login = (name: string) => setUser({ id: Date.now().toString(), name });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
