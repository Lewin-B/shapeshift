import "~/styles/globals.css";

import { type Metadata } from "next";
import { ThemeProvider, NextAuthProvider } from "./_components/providers";
import { AuthProvider } from "./providers";
import Navbar from "./_components/nav/Navbar";
import type { Session } from "next-auth";
import type React from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "shapeshift",
  description: "shapeshift your svgs into cool 3d models",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    session: Session; // Optional session object
    [key: string]: unknown; // Any additional props
  };
}

export default function RootLayout({
  children,
  params: { session },
}: RootLayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider session={session}>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              {children}
            </ThemeProvider>
          </AuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
