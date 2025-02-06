'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { LegacyRef, RefObject, useEffect, useRef, useState } from 'react';

import styles from '@/app/(pages)/_styles/allpage.module.scss';

import { IoExitOutline } from 'react-icons/io5';
import { ACCESS, REFRESH } from '@/app/_consts/const';
import { getMember } from '@/app/(pages)/_lib/GetMember';

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  const current = path + (params.toString() ? `?${params.toString()}` : '');
  const [accessToken, setAccessToken] = useState('');
  const [member, setMember] = useState(null);
  const [openSettings, setOpenSettings] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const settingsRef = useRef<HTMLDivElement | null>(null);

  const writeUrl = () => {
    const previous = sessionStorage.getItem('CURRENT_URL');

    if (previous === '') {
      sessionStorage.setItem('PREVIOUS_URL', previous);
    }
    sessionStorage.setItem('CURRENT_URL', current);
  };

  const logout = () => {
    sessionStorage.removeItem(ACCESS);
    sessionStorage.removeItem(REFRESH);
    window.location.reload();
  };

  useEffect(() => {
    writeUrl();
    setAccessToken(sessionStorage.getItem(ACCESS));

    if (sessionStorage.getItem(ACCESS)) {
      getMember().then((res) => {
        setMember(res);
      });
    }
  }, [path, params]);

  useEffect(() => {
    function handleInteraction(e: Event) {
      const target = e.target as HTMLElement;
      if (!profileRef.current || !settingsRef.current) {
        return;
      }

      if (
        !profileRef.current!.contains(target) &&
        !settingsRef.current!.contains(target)
      ) {
        setOpenSettings(false);
      }
    }
    document.addEventListener('click', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
    };
  }, []);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>기록하자</div>
        <div className={styles.userAccess}>
          {accessToken && (
            <div className={styles.profileBox}>
              <div
                className={styles.profile}
                onClick={() => setOpenSettings(!openSettings)}
                ref={profileRef as RefObject<HTMLDivElement>}
              >
                {member && <img src={`${member.profileImageUrl}`} alt='' />}
              </div>
              {openSettings && (
                <div
                  className={styles.settings}
                  ref={settingsRef as RefObject<HTMLDivElement>}
                >
                  <div className={styles.memberName}>{member.name}</div>
                  <div className={styles.memberJob}>
                    {member.job === '' ? '기록러' : member.job}
                  </div>
                  <div className={styles.logoutButton} onClick={() => logout()}>
                    로그아웃
                    <IoExitOutline />
                  </div>
                </div>
              )}
            </div>
          )}
          {!accessToken && (
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
