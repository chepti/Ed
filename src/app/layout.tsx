import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Image from 'next/image';
import { Navbar } from "@/components/layout/Navbar";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { AccessibilityControls } from "@/components/layout/AccessibilityControls";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "חולמים תקשוב | מאגר כלי AI למורים",
  description: "פלטפורמה לגילוי, סקירה וארגון כלי בינה מלאכותית לשימוש בחינוך ובהוראה.",
  authors: [{ name: "חולמים תקשוב" }],
  keywords: ["AI", "בינה מלאכותית", "חינוך", "הוראה", "כלים דיגיטליים", "חדשנות פדגוגית", "חולמים תקשוב"],
  creator: "חולמים תקשוב",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="light" suppressHydrationWarning>
        <body className="outfit-app min-h-screen bg-background antialiased transition-colors">
          <AccessibilityProvider>
            <Navbar />
            <main className="min-h-[calc(100vh-4rem)] container mx-auto px-4">
              {children}
            </main>
            <footer className="py-8 text-center text-sm text-gray-500 dark:text-gray-400 border-t">
              <div className="flex flex-col items-center justify-center space-y-3">
                <Image
                  src="/logo.png"
                  alt="חולמים תקשוב לוגו"
                  width={100}
                  height={100}
                  className="rounded-md"
                />
                <p className="font-semibold">חולמים תקשוב</p>
                <p>יוצרים כלים מעוררי השראה לקהילת החינוך.</p>
                <p>&copy; {new Date().getFullYear()} כל הזכויות שמורות.</p>
              </div>
            </footer>
            <AccessibilityControls />
            <Toaster />
          </AccessibilityProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
