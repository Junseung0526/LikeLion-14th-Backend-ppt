import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
  Server,
} from 'lucide-react'
import { CodePanel } from './CodePanel'
import { DeckVisual } from './DeckVisual'
import type { LectureDeck } from '../types'

type SlideDeckProps = {
  deck: LectureDeck
  onBack: () => void
}

export function SlideDeck({ deck, onBack }: SlideDeckProps) {
  const [current, setCurrent] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const slide = deck.slides[current]
  const progress = useMemo(
    () => Math.round(((current + 1) / deck.slides.length) * 100),
    [current, deck.slides.length],
  )

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
    <main className={sidebarOpen ? 'deck' : 'deck sidebar-collapsed'}>
      <aside className="sidebar" aria-label="강의 목차">
        <div className="brand">
          <span className="brand-mark">
            <Server aria-hidden="true" size={23} />
          </span>
          <div>
            <small>LIKELION 14기</small>
            <strong>Board CRUD</strong>
            <small>스터디 세션</small>
          </div>
        </div>
        <button
          className="collapse-button"
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
        <button className="back-button" onClick={onBack} type="button">
          <Home aria-hidden="true" size={17} />
          <span>선택 화면</span>
        </button>

        <nav className="toc">
          {deck.slides.map((item, index) => (
            <button
              className={index === current ? 'toc-item active' : 'toc-item'}
              key={`${item.eyebrow}-${item.title}`}
              onClick={() => move(index)}
              type="button"
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.title}
            </button>
          ))}
        </nav>
      </aside>

      <section className="stage" aria-live="polite">
        <header className="topbar">
          <button
            className="topbar-menu"
            aria-label={sidebarOpen ? '목차 접기' : '목차 열기'}
            onClick={() => setSidebarOpen((open) => !open)}
            type="button"
          >
            <BookOpen aria-hidden="true" size={17} />
            <span>목차</span>
          </button>
          <span className="topbar-cohort">LIKELION 14기</span>
          <div className="progress" aria-label={`진행률 ${progress}%`}>
            <i style={{ width: `${progress}%` }} />
          </div>
          <span>
            {current + 1} / {deck.slides.length}
          </span>
        </header>

        <article className={slide.code ? 'slide slide-with-code' : 'slide'} key={current}>
          <div className="slide-copy">
            <p className="eyebrow">{slide.eyebrow}</p>
            <h1>{slide.title}</h1>
            {slide.summary && <p className="summary">{slide.summary}</p>}

            {slide.bullets && (
              <ul className="bullets">
                {slide.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>

          {(slide.visual || slide.checklist) && (
            <aside className="visual-panel" aria-label="슬라이드 시각 자료">
              {slide.visual && <DeckVisual type={slide.visual} />}

              {slide.checklist && (
                <div className="check-grid">
                  {slide.checklist.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              )}
            </aside>
          )}

          {slide.table && (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    {slide.table.headers.map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {slide.table.rows.map((row) => (
                    <tr key={row.join('-')}>
                      {row.map((cell) => (
                        <td key={cell}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {slide.code && (
            <CodePanel code={slide.code} />
          )}
        </article>

        <footer className="controls">
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
