import { Home, ArrowRight, ArrowLeft } from 'lucide-react'
import styles from './NotFound.module.css'

type NotFoundProps = {
  onBack: () => void
}

export function NotFound({ onBack }: NotFoundProps) {
  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <main className={styles.notFound} aria-labelledby="not-found-title">
      <section className={styles.content}>
        <div className={styles.illustrationContainer} aria-hidden="true">
          <svg
            viewBox="0 0 200 200"
            className={styles.illustration}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="80" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 8" />
            <path
              d="M70 100C70 83.4315 83.4315 70 100 70C116.569 70 130 83.4315 130 100C130 116.569 116.569 130 100 130C83.4315 130 70 116.569 70 100Z"
              fill="var(--navy)"
            />
            <path
              d="M90 95L110 105M110 95L90 105"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="100" cy="145" r="5" fill="var(--lion)" />
            <circle cx="60" cy="70" r="3" fill="var(--forest)" opacity="0.5" />
            <circle cx="140" cy="130" r="4" fill="var(--lion)" opacity="0.3" />
          </svg>
          <span className={styles.errorCodeBadge}>404 ERROR</span>
        </div>

        <span className={styles.cohortBadge}>LIKELION 14기</span>
        <p className="eyebrow">Page Not Found</p>
        <h1 id="not-found-title">길을 잃으신 것 같아요</h1>
        <p className="summary">
          요청하신 페이지가 존재하지 않거나, 주소가 변경되었을 수 있습니다.<br />
          아래 버튼을 클릭하여 메인 라이브러리로 안전하게 돌아가세요.
        </p>

        <div className={styles.actionArea}>
          <button 
            onClick={handleGoBack} 
            className={`${styles.backButton} ${styles.secondaryButton}`}
            aria-label="이전 페이지로 돌아가기"
          >
            <span className={`${styles.buttonIcon} ${styles.secondaryIcon}`}>
              <ArrowLeft size={22} />
            </span>
            <span>
              <strong>이전으로 돌아가기</strong>
              <small>방금 전 페이지로 이동합니다.</small>
            </span>
            <em>
              <ArrowRight size={18} />
              이동
            </em>
          </button>

          <button 
            onClick={onBack} 
            className={styles.backButton}
            aria-label="라이브러리 메인 페이지로 돌아가기"
          >
            <span className={styles.buttonIcon}>
              <Home size={22} />
            </span>
            <span>
              <strong>라이브러리로 돌아가기</strong>
              <small>전체 강의 자료 목록을 확인합니다.</small>
            </span>
            <em>
              <ArrowRight size={18} />
              이동
            </em>
          </button>
        </div>
      </section>
    </main>
  )
}
