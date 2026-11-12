"use client";

import { Provider } from "react-redux";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { VocabProvider } from "@/features/vocab/hooks/VocabProvider";
import { store } from "@/store";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <VocabProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </VocabProvider>
      </AuthProvider>
    </Provider>
  );
}
