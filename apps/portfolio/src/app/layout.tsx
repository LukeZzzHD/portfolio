import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import { Footer } from '@/app/components/footer';
import { Header } from '@/app/components/header';
import { TRPCReactProvider } from '@/trpc/react';
import { ThemeProvider } from 'next-themes';

export const metadata: Metadata = {
  title: 'Lukas Schwab',
  description: 'Fullstack developer portfolio',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning lang="en" className={`${montserrat.variable}`}>
      <body className="bg-[#ece7e1] dark:bg-[#1a1a1a]">
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main id="page-container" className="pt-16">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
