import { useEffect, useState } from 'react'
import { EyeOff, Home, Server, Timer, RotateCcw, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { SlideContent } from './SlideContent'
import type { LectureDeck } from '../types'
import styles from './PresenterPage.module.css'

type PresenterPageProps = {
  deck: LectureDeck
  onBack: () => void
}

export function PresenterPage({ deck, onBack }: PresenterPageProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [fontSize, setFontSize] = useState(18)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const activeSlide = deck.slides[activeIndex]
  const nextSlide = deck.slides[activeIndex + 1]
  const script = deck.presenterScripts?.[activeIndex] ?? []

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        setActiveIndex((i) => Math.min(i + 1, deck.slides.length - 1))
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        setActiveIndex((i) => Math.max(i - 1, 0))
      }
      if (event.key === 'b' || event.key === 'B') {
        setSidebarOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [deck.slides.length])

  useEffect(() => {
    let interval: number | undefined
    if (isRunning) {
      interval = window.setInterval(() => {
        setSeconds((s) => s + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <main className={sidebarOpen ? styles.presenterPage : `${styles.presenterPage} ${styles.sidebarCollapsed}`}>
      <aside className={styles.presenterNav} aria-label="발표자 슬라이드 목록">
        <div className={styles.brand}>
          <span className={styles.brandMark}>
            <Server aria-hidden="true" size={23} />
          </span>
          <div>
            <small>LIKELION 14기</small>
            <strong>스터디 진행자</strong>
            <small>{deck.title} 대본</small>
          </div>
        </div>
        
        <div className={styles.presenterTimer}>
          <div className={styles.timerDisplay}>
            <Timer size={18} />
            <span>{formatTime(seconds)}</span>
          </div>
          <div className={styles.timerControls}>
            <button onClick={() => setIsRunning(!isRunning)} type="button">
              {isRunning ? '정지' : '시작'}
            </button>
            <button onClick={() => { setSeconds(0); setIsRunning(false) }} type="button" aria-label="초기화">
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        <button
          className={styles.collapseButton}
          aria-label={sidebarOpen ? '목차 접기' : '목차 열기'}
          onClick={() => setSidebarOpen((open) => !open)}
          type="button"
        >
          {sidebarOpen ? (
            <PanelLeftClose aria-hidden="true" size={18} />
          ) : (
            <PanelLeftOpen aria-hidden="true" size={18} />
          )}
          <span>{sidebarOpen ? '접기' : '열기'}</span>
        </button>

        <button className={styles.backButton} onClick={onBack} type="button">
          <Home aria-hidden="true" size={17} />
          <span>선택 화면</span>
        </button>
        
        <nav className={styles.toc}>
          {deck.slides.map((slide, index) => (
            <button
              className={index === activeIndex ? `${styles.tocItem} ${styles.active}` : styles.tocItem}
              key={`${slide.eyebrow}-${slide.title}`}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {slide.title}
            </button>
          ))}
        </nav>
      </aside>

      <section className={styles.presenterMain}>
        <div className={styles.hoverTrigger} />
        <header className={styles.presenterHeader}>
          <div className={styles.headerTitleGroup}>
            {!sidebarOpen && (
              <button
                className={styles.miniCollapseButton}
                onClick={() => setSidebarOpen(true)}
                type="button"
                aria-label="목차 열기"
              >
                <PanelLeftOpen size={18} />
              </button>
            )}
            <span className="topbar-indicator">
              {activeIndex + 1} / {deck.slides.length}
            </span>
            <strong>{activeSlide.title}</strong>
          </div>
          <span className={styles.privateLabel}>
            <EyeOff aria-hidden="true" size={16} />
            진행자 전용
          </span>
        </header>

        <div className={styles.presenterGrid}>
          <div className={styles.presenterMaterial}>
            <SlideContent slide={activeSlide} index={activeIndex} />
          </div>

          <article className={styles.scriptPanel}>
            <header className={styles.panelHeader}>
              <h2>발표 대본</h2>
              <div className={styles.fontControls}>
                <button onClick={() => setFontSize((s) => Math.max(s - 2, 12))} type="button">-</button>
                <span>{fontSize}px</span>
                <button onClick={() => setFontSize((s) => Math.min(s + 2, 32))} type="button">+</button>
              </div>
            </header>
            
            <div className={styles.scriptContent}>
              <ol style={{ fontSize: `${fontSize}px` }}>
                {script.map((line) => (
                  <li key={line}>
                    {line}
                  </li>
                ))}
              </ol>
            </div>

            {nextSlide && (
              <div className={styles.nextPreview}>
                <strong>다음 슬라이드 미리보기</strong>
                <p>{nextSlide.title}</p>
                <small>{nextSlide.eyebrow}</small>
              </div>
            )}

            <div className={styles.tipBox}>
              <strong>진행 팁</strong>
              <p>{activeSlide.tip || '코드 슬라이드는 먼저 역할을 설명하고, 그 다음 핵심 어노테이션과 메서드만 짚습니다.'}</p>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}
