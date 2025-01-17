import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';
import { Analytics as VercelAnalytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Header from '@/components/Header';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { Clarity } from '@/components/Clarity';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '小红书中英文互译 Xiaohongshu CN ≒ EN Translator',
  description: 'AI 驱动的中英文互译工具',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
        <Clarity />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <main className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
            <Header />
            <ThemeToggle />
            <div className="flex-1 pt-16">
              {children}
            </div>
            <Footer />
          </main>
        </ThemeProvider>
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
} 