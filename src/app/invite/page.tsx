'use client';

import { useEffect } from 'react';

import styles from '@/app/invite/_styles/invite.module.scss';
import axios from 'axios';

export default function Invite() {
  const appRun = () => {
    window.location.href = 'letsrecordit://invite';
  };

  const storeRun = () => {
    window.location.href = 'https://play.google.com/store/apps';
  };

  const onClickEnter = () => {
    if (
      window.confirm(
        '캘린더에 참가하시겠습니까?\n앱이 없을 경우 스토어로 이동합니다'
      )
    ) {
      setTimeout(storeRun, 1000);
      setTimeout(appRun, 0);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/invite/info/123').then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.mainWrap}>
        <div className={styles.mainContainer}>
          <div className={styles.logo}>기록하자</div>
          <div className={styles.intro}>
            워농농 님의
            <div className={styles.title}>일반</div>
            캘린더
          </div>
          <div className={styles.login} onClick={() => onClickEnter()}>
            참가하기
          </div>
          <div className={styles.loginWrap}>
            로그인을 안하셨다면?
            <div className={styles.loginButton}>로그인</div>
          </div>
        </div>
      </div>
    </div>
  );
}
