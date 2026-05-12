import { useState } from 'react'
import { Lock, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react'
import styles from './PresenterAuth.module.css'

type PresenterAuthProps = {
  onAuthenticated: () => void
  onBack: () => void
}

export function PresenterAuth({ onAuthenticated, onBack }: PresenterAuthProps) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'likelion2026') {
      onAuthenticated()
    } else {
      setError(true)
      setPassword('')
    }
  }

  return (
    <main className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.iconWrapper}>
          <ShieldCheck size={48} />
        </div>
        <h1>진행자 인증</h1>
        <p>발표 대본을 확인하려면 비밀번호를 입력하세요.</p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <Lock size={18} className={styles.inputIcon} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              className={error ? `${styles.inputError} ${styles.inputWithToggle}` : styles.inputWithToggle}
              autoFocus
            />
            <button
              type="button"
              className={styles.toggleVisibility}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {error && <p className={styles.errorMsg}>비밀번호가 일치하지 않습니다.</p>}
          
          <button type="submit" className={styles.submitButton}>
            인증하기
            <ArrowRight size={18} />
          </button>
        </form>

        <button onClick={onBack} className={styles.backLink}>
          돌아가기
        </button>
      </div>
    </main>
  )
}
