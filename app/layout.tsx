import type { Metadata, Viewport } from "next";
import "./globals.css";
import QueryProvider from "@/src/providers/query/QueryProvider";
import { AuthRedirectProvider } from "@/src/providers/auth/AuthRedirectProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import { NetworkStatusIndicator } from "@/components/ui/network-status";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "Wrensly - Connect and Share",
    template: "%s | Wrensly"
  },
  description: "Join the flock and start chirping with Wrensly, a modern social platform for meaningful connections.",
  keywords: ["social media", "networking", "community", "posts", "sharing"],
  authors: [{ name: "Wrensly Team" }],
  creator: "Wrensly",
  publisher: "Wrensly",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Wrensly - Connect and Share",
    description: "Join the flock and start chirping with Wrensly, a modern social platform for meaningful connections.",
    siteName: "Wrensly",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wrensly - Connect and Share",
    description: "Join the flock and start chirping with Wrensly, a modern social platform for meaningful connections.",
    creator: "@wrensly",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-white antialiased">
        <ErrorBoundary>
          <NetworkStatusIndicator />
          <QueryProvider>
            <AuthRedirectProvider>
              <div className="min-h-screen flex flex-col">
                {children}
              </div>
            </AuthRedirectProvider>
          </QueryProvider>
          <Toaster
            position="top-right"
            expand={true}
            richColors={true}
            closeButton={true}
            duration={4000}
            toastOptions={{
              style: {
                background: 'white',
                border: '1px solid #e5e7eb',
                color: '#374151',
              },
            }}
          />
        </ErrorBoundary>
      </body>
    </html>
  );
}
