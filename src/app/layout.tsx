import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import '@/app/_styles/reset.css';

import styles from '@/app/_styles/global.module.scss';
import { Suspense } from 'react';

const notoSans = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: '기록하자',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${styles.wrap} ${notoSans.className}`}>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  );
}
