import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
  Server,
  Maximize,
  Minimize,
  Presentation,
} from 'lucide-react'
import { SlideContent } from './SlideContent'
import type { LectureDeck } from '../types'
import styles from './SlideDeck.module.css'

type SlideDeckProps = {
  deck: LectureDeck
  onBack: () => void
}

export function SlideDeck({ deck, onBack }: SlideDeckProps) {
  const [current, setCurrent] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const slide = deck.slides[current]
  const progress = useMemo(
    () => Math.round(((current + 1) / deck.slides.length) * 100),
    [current, deck.slides.length],
  )

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const move = useCallback((next: number) => {
    setCurrent(Math.min(Math.max(next, 0), deck.slides.length - 1))
  }, [deck.slides.length])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        move(current + 1)
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        move(current - 1)
      }
      if (event.key === 'Home') {
        move(0)
      }
      if (event.key === 'End') {
        move(deck.slides.length - 1)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [current, deck.slides.length, move])

  return (
    <main className={sidebarOpen ? styles.deck : `${styles.deck} ${styles.sidebarCollapsed}`}>
      <aside className={styles.sidebar} aria-label="강의 목차">
        <div className={styles.brand}>
          <span className={styles.brandMark}>
            <Server aria-hidden="true" size={23} />
          </span>
          <div>
            <small>LIKELION 14기</small>
            <strong>Board CRUD</strong>
            <small>스터디 세션</small>
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
          {deck.slides.map((item, index) => (
            <button
              className={index === current ? `${styles.tocItem} ${styles.active}` : styles.tocItem}
              key={`${item.eyebrow}-${item.title}`}
              onClick={() => move(index)}
              type="button"
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.title}
            </button>
          ))}
        </nav>

        <button 
          className={styles.presenterLink} 
          onClick={() => window.location.hash = `#/${deck.id}/presenter`} 
          type="button"
          title="Presenter Mode"
        >
          <Presentation aria-hidden="true" size={14} />
        </button>
      </aside>

      <section className={styles.stage} aria-live="polite">
        <div className={styles.hoverTrigger} />
        <header className={styles.topbar}>
          <button
            className={styles.topbarMenu}
            aria-label={sidebarOpen ? '목차 접기' : '목차 열기'}
            onClick={() => setSidebarOpen((open) => !open)}
            type="button"
          >
            <BookOpen aria-hidden="true" size={17} />
            <span>목차</span>
          </button>
          <span className={styles.topbarCohort}>LIKELION 14기</span>
          <div className={styles.progress} aria-label={`진행률 ${progress}%`}>
            <i style={{ width: `${progress}%` }} />
          </div>
          <button
            className={styles.topbarMenu}
            onClick={toggleFullscreen}
            type="button"
            title={isFullscreen ? '전체화면 종료' : '전체화면 시작'}
          >
            {isFullscreen ? <Minimize size={17} /> : <Maximize size={17} />}
            <span>{isFullscreen ? '축소' : '확대'}</span>
          </button>
          <span className={styles.topbarIndicator}>
            {current + 1} / {deck.slides.length}
          </span>
        </header>

        <SlideContent slide={slide} index={current} />

        <footer className={styles.controls}>
          <button
            aria-label="이전 슬라이드"
            type="button"
            onClick={() => move(current - 1)}
            disabled={current === 0}
          >
            <ChevronLeft aria-hidden="true" size={22} />
            <span>이전</span>
          </button>
          <input
            aria-label="슬라이드 선택"
            max={deck.slides.length}
            min={1}
            onChange={(event) => move(Number(event.target.value) - 1)}
            type="range"
            value={current + 1}
          />
          <button
            aria-label="다음 슬라이드"
            type="button"
            onClick={() => move(current + 1)}
            disabled={current === deck.slides.length - 1}
          >
            <span>다음</span>
            <ChevronRight aria-hidden="true" size={22} />
          </button>
        </footer>
      </section>
    </main>
  )
}
