import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '小红书中英文翻译',
  description: 'AI驱动的中英文翻译工具',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <main className="root min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
          {children}
        </main>
      </body>
    </html>
  );
} 