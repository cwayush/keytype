import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import { Header } from '@/components/header';
import './globals.css';
import { Providers } from './provider';

const geistMono = Geist_Mono({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'KEYTYPE',
  description: 'Practice typing with KEYTYPE',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.className} antialiased min-h-screen bg-gradient-to-b from-neutral-900 to-black text-neutral-400`}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
