'use client';

import { useEffect, useState } from 'react';

import styles from '@/app/(pages)/invite/_styles/invite.module.scss';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Props = {
  params: Promise<{
    inviteCode: string;
  }>;
};

type InviteInfo = {
  data: {
    calendarId: number;
    calendarTitle: string;
    ownerId: number;
    ownerName: string;
  };
};

export default function Invite({ params }: Props) {
  const router = useRouter();
  const [calendarTitle, setCalendarTitle] = useState<string>('');
  const [ownerName, setOwnerName] = useState<string>('');

  const appRun = () => {
    router.push('letsrecordit://invite');
  };

  const storeRun = () => {
    router.push('https://play.google.com/store/apps');
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
    const code = (await params).inviteCode;
    return await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/invite/info/${code}`
    );
  };

  useEffect(() => {
    getInviteInfo().then((res) => {
      setCalendarTitle(res.data.calendarTitle);
      setOwnerName(res.data.ownerName);
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
          <div className={styles.enterButton} onClick={() => onClickEnter()}>
            참가하기
          </div>
        </div>
      </div>
    </div>
  );
}
