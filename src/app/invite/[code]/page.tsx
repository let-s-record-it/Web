import styles from '@/app/invite/_styles/invite.module.scss';

export default function Invite() {
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
          <div className={styles.login}>참가하기</div>
          <div className={styles.loginWrap}>
            로그인을 안하셨다면?
            <div className={styles.loginButton}>로그인</div>
          </div>
        </div>
      </div>
    </div>
  );
}
