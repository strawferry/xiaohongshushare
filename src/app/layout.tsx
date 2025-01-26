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
import GithubCorner from '@/components/GithubCorner';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://xiaohongshushare.online'),
  title: {
    template: '%s | Xiaohongshu Share',
    default: '小红书分享 | Xiaohongshu Share'
  },
  description: '小红书分享 AI 智能工具集,中英文互译,起名,翻译,AI 工具',
  keywords: ['小红书', '中英文翻译', '中文名起名', '教程', 'xiaohongshu', 'translation', 'chinese name generator', 'tutorials'],
  authors: [{ name: 'ferryvip' }],
  creator: 'ferryvip',
  publisher: '小红书分享 AI 工具集',
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: 'website',
    siteName: '小红书分享 AI 工具集',
    images: [{
      url: 'https://xiaohongshushare.online/icon.png'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@ferryvip'
  },
  verification: {
    google: 'google-site-verification=bvwtpu1cl2gE_ugWVp7eq1_RKDGezcpMI4vEnB6q77M'
  }
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
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5925237141739939" crossOrigin="anonymous"></script>
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
            <GithubCorner />
          </main>
        </ThemeProvider>
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
} 