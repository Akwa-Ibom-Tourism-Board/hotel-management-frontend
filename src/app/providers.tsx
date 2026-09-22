import type { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { QueryClientProvider } from "@tanstack/react-query";
import { theme, darkTheme, GlobalStyle, ThemeModeProvider, useThemeMode } from "@/theme";
import { queryClient } from "@/shared/lib/queryClient";
import { Toaster } from "@/shared/ui";
import { AuthProvider } from "@/features/auth";

const StyledThemeBridge = ({ children }: { children: ReactNode }) => {
  const { mode } = useThemeMode();
  return (
    <ThemeProvider theme={mode === "dark" ? darkTheme : theme}>
      <GlobalStyle />
      {children}
      <Toaster />
    </ThemeProvider>
  );
};

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <ThemeModeProvider>
    <StyledThemeBridge>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </StyledThemeBridge>
  </ThemeModeProvider>
);
