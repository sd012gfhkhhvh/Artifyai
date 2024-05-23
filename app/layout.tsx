import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { Inter } from 'next/font/google';
import './globals.css';

import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

//providers
import Providers from '@/lib/providers';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Artify AI',
  description: 'AI photo editor',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          montserrat.variable
        )}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
