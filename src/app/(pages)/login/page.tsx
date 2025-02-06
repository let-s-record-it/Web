'use client';

import styles from '@/app/(pages)/login/_styles/login.module.scss';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { REDIRECT } from '@/app/_consts/const';

export default function Login() {
  const params = useSearchParams();

  useEffect(() => {
    const redirect = params.get('redirect');
    if (redirect) {
      sessionStorage.setItem(REDIRECT, redirect);
    }
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.mainWrap}>
        <div className={styles.mainContainer}>
          <div className={styles.logo}>기록하자</div>
          <div className={styles.loginBox}>
            <a
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorize/google`}
              className={styles.google}
            >
              <img src='/google_png.png' alt='구글 로고' />
              구글로 시작하기
            </a>
            <a
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorize/kakao`}
              className={styles.kakao}
            >
              <img src='/kakao_png.png' alt='카카오 로고' />
              카카오로 시작하기
            </a>
            <a
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorize/naver`}
              className={styles.naver}
            >
              <img src='/naver_png.png' alt='네이버 로고' />
              네이버로 시작하기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
