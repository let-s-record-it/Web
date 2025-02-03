'use client';

import { useEffect, useState } from 'react';

import styles from '@/app/invite/_styles/invite.module.scss';
import axios from 'axios';

type Props = {
  params: {
    inviteCode: string;
  };
};

type InviteInfo = {
  calendarId: number;
  calendarTitle: string;
  ownerId: number;
  ownerName: string;
};

export default function Invite({ params }: Props) {
  const [calendarTitle, setCalendarTitle] = useState<string>('');
  const [ownerName, setOwnerName] = useState<string>('');

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

  const getInviteInfo = async (): Promise<InviteInfo> => {
    return await axios.get(
      `http://localhost:8080/api/v1/invite/info/${params.inviteCode}`
    );
  };

  useEffect(() => {
    getInviteInfo().then((res) => {
      setCalendarTitle(res.calendarTitle);
      setOwnerName(res.ownerName);
    });
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.mainWrap}>
        <div className={styles.mainContainer}>
          <div className={styles.logo}>기록하자</div>
          <div className={styles.intro}>
            {`${ownerName} `} 님의
            <div className={styles.title}>{calendarTitle}</div>
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
