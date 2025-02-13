import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthWrapper from "@/components/wrapper/auth-wrapper";
import Provider from "@/provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  metadataBase: new URL("https://systemdesign.vercel.app/"),
  title: {
    default: 'System Design Daily',
    template: `%s | System Design Daily`
  },
  description:
    "Daily articles and discussions about software engineering, system design, and engineering best practices. Join our community to learn and grow together.",
  openGraph: {
    description:
      "Join our community of software engineers sharing daily insights about system design, engineering practices, and technical architecture. Learn, discuss, and grow together.",
    images: [
      "/og-image.png", // You'll need to add your own OG image
    ],
    url: "https://systemdesign.vercel.app/",
  },
  twitter: {
    card: "summary_large_image",
    title: "System Design Daily",
    description:
      "Daily articles and discussions about software engineering, system design, and engineering best practices. Join our community to learn and grow together.",
    siteId: "",
    creator: "@yourtwitterhandle", // Replace with your Twitter handle
    creatorId: "",
    images: [
      "/og-image.png", // You'll need to add your own Twitter card image
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthWrapper>
      <html lang="en" suppressHydrationWarning>
        <body className={GeistSans.className}>
          <Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </Provider>
          <Analytics />
        </body>
      </html>
    </AuthWrapper>
  );
}
