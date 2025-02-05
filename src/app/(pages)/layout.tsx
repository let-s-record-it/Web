'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import styles from '@/app/(pages)/_styles/allpage.module.scss';
import { ACCESS } from '@/app/_consts/const';

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const params = useSearchParams();
  const current = path + (params.toString() ? `?${params.toString()}` : '');

  const writeUrl = () => {
    const previous = sessionStorage.getItem('CURRENT_URL');

    if (previous) {
      sessionStorage.setItem('PREVIOUS_URL', previous);
    }
    sessionStorage.setItem('CURRENT_URL', current);
  };

  useEffect(() => {
    writeUrl();
  }, [path, params]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>기록하자</div>
        <div className={styles.userAccess}>
          {sessionStorage.getItem(ACCESS) && (
            <div className={styles.profile}>
              <img src='' alt='' />
            </div>
          )}
          {!sessionStorage.getItem(ACCESS) && (
            <a
              href={`/login?redirect=${current}`}
              className={styles.loginButton}
            >
              로그인
            </a>
          )}
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </>
  );
}
