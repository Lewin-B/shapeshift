"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { TRPCReactProvider } from "~/trpc/react";
import type { Session } from "next-auth";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {<TRPCReactProvider>{children}</TRPCReactProvider>}
    </NextThemesProvider>
  );
}

type Props = {
  children?: React.ReactNode;
  session: Session;
};

export const NextAuthProvider = ({ children, session }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
