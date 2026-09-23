import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./globals.css";
import ConvexClerkProvider from "@/components/providers/ConvexClerkProvider";
import Navbar from "@/components/Navbar";
import LandingPage from "@/components/LandingPage";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevScreen — Better Technical Interviews",
  description:
    "Conduct professional technical interviews with real-time video, collaborative coding, scheduling, and secure candidate access.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SignedIn>
              <div className="min-h-screen app-shell">
                <Navbar />
                <main className="px-3 sm:px-5 lg:px-7">{children}</main>
              </div>
            </SignedIn>

            <SignedOut>
              <LandingPage />
            </SignedOut>
          </ThemeProvider>

          <Toaster position="bottom-right" />
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
