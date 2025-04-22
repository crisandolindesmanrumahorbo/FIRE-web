import { ThemeProvider } from 'next-themes';
import '../globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import type { Metadata } from 'next';
import { allMessages } from '../appRouterI18n';
import { LinguiClientProvider } from '../LinguiClientProvider';
import { initLingui, PageLangParam } from '../initLingui';
import { PropsWithChildren } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Stockbit',
  description: 'Support by Next and Rust',
};

export default async function RootLayout({
  children,
  params,
}: PropsWithChildren<PageLangParam>) {
  const lang = (await params).lang;
  initLingui(lang);
  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-[#191919] text-[#37352f] dark:text-[#ffffffcf] `}
      >
        <LinguiClientProvider
          initialLocale={lang}
          initialMessages={allMessages[lang]!}
        >
          <ThemeProvider attribute='class' defaultTheme='system'>
            {children}
          </ThemeProvider>
        </LinguiClientProvider>
      </body>
    </html>
  );
}
