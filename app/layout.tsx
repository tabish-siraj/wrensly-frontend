import type { Metadata, Viewport } from "next";
import "./globals.css";
import QueryProvider from "@/src/providers/query/QueryProvider";
import { AuthRedirectProvider } from "@/src/providers/auth/AuthRedirectProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import { NetworkStatusIndicator } from "@/components/ui/network-status";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Wrensly - Connect and Share",
  description: "Join the flock and start chirping with Wrensly, a modern social platform.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        <ErrorBoundary>
          <NetworkStatusIndicator />
          <QueryProvider>
            <AuthRedirectProvider>
              {children}
            </AuthRedirectProvider>
          </QueryProvider>
          <Toaster
            position="top-right"
            expand={true}
            richColors={true}
            closeButton={true}
          />
        </ErrorBoundary>
      </body>
    </html>
  );
}
