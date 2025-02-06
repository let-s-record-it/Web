'use client';

import styles from '@/app/_styles/main.module.scss';
import { usePathname } from 'next/navigation';

export default function Home() {
  const path = usePathname();

  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <div className={styles.logo}>기록하자</div>
        <div>웹 서비스는 아직 준비중입니다!</div>
        <a href={`/login?redirect=${path}`} className={styles.loginButton}>
          로그인 하러 가기
        </a>
      </div>
    </div>
  );
}
