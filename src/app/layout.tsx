import type { Metadata } from 'next';
import './globals.css';
import { bowlby, dmMono } from './fonts';
import Header from '@/components/Header';
import { SVGFilters } from '@/components/SVGFilters';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bowlby.variable} ${dmMono.variable} antialiased font-mono font-medium text-zinc-800`}
      >
        <main>
          <Header />
          {children}
          <Footer />
        </main>
        <SVGFilters />
      </body>
    </html>
  );
}
