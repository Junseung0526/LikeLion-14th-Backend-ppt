import { useState } from 'react'
import { EyeOff, Home, Server } from 'lucide-react'
import { CodePanel } from './CodePanel'
import type { LectureDeck } from '../types'

type PresenterPageProps = {
  deck: LectureDeck
  onBack: () => void
}

export function PresenterPage({ deck, onBack }: PresenterPageProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeSlide = deck.slides[activeIndex]
  const script = deck.presenterScripts?.[activeIndex] ?? []

  return (
    <main className="presenter-page">
      <aside className="presenter-nav" aria-label="발표자 슬라이드 목록">
        <div className="brand">
          <span className="brand-mark">
            <Server aria-hidden="true" size={23} />
          </span>
          <div>
            <small>LIKELION 14기</small>
            <strong>스터디 진행자</strong>
            <small>{deck.title} 대본</small>
          </div>
        </div>
        <button className="back-button" onClick={onBack} type="button">
          <Home aria-hidden="true" size={17} />
          <span>선택 화면</span>
        </button>
        <nav className="toc">
          {deck.slides.map((slide, index) => (
            <button
              className={index === activeIndex ? 'toc-item active' : 'toc-item'}
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

      <section className="presenter-main">
        <header className="presenter-header">
          <span>
            {activeIndex + 1} / {deck.slides.length}
          </span>
          <strong>{activeSlide.title}</strong>
          <span className="private-label">
            <EyeOff aria-hidden="true" size={16} />
            진행자 전용
          </span>
        </header>

        <div className="presenter-grid">
          <article className="presenter-material">
            <p className="eyebrow">{activeSlide.eyebrow}</p>
            <h1>{activeSlide.title}</h1>
            {activeSlide.summary && <p className="summary">{activeSlide.summary}</p>}
            {activeSlide.bullets && (
              <ul className="bullets">
                {activeSlide.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
            {activeSlide.checklist && (
              <div className="check-grid">
                {activeSlide.checklist.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            )}
            {activeSlide.code && (
              <CodePanel code={activeSlide.code} />
            )}
            {activeSlide.table && (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      {activeSlide.table.headers.map((header) => (
                        <th key={header}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {activeSlide.table.rows.map((row) => (
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
          </article>

          <article className="script-panel">
            <h2>발표 대본</h2>
            <ol>
              {script.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
            <div className="tip-box">
              <strong>진행 팁</strong>
              <p>코드 슬라이드는 먼저 역할을 설명하고, 그 다음 핵심 어노테이션과 메서드만 짚습니다.</p>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}
