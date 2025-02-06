import { Bowlby_One_SC, DM_Mono } from 'next/font/google';

export const bowlby = Bowlby_One_SC({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bowlby-one-sc',
  weight: '400',
});

export const dmMono = DM_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-mono',
  weight: '500',
});
