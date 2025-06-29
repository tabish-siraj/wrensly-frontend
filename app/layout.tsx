"use client";

import "./globals.css";
import QueryProvider from "@/src/providers/query/QueryProvider";
import { AuthRedirectProvider } from "@/src/providers/auth/AuthRedirectProvider";


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AuthRedirectProvider>{children}</AuthRedirectProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
