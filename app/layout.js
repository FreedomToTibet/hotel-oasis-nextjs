import Header from '@/app/_components/Header';

import '@/app/_styles/globals.css';

import {Josefin_Sans} from 'next/font/google';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  variants: ['400', '700'],
  display: 'swap',
});

export const metadata = {
  title: {
    template: '%s / The Hotel Oasis',
    default: 'Welcome / The Hotel Oasis',
  },
  description: 'The Hotel Oasis is the perfect place to relax and unwind.',
};

export default function RootLayout({children}) {
  return (
    <html lang="eng">
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
      >
        <header>
          <Header />
        </header>

        <div className="flex-1 px-8 py-12">
          <main className="max-w-7xl mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
