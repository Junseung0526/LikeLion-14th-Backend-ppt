import { useEffect } from 'react'
import { ArrowRight, Plus, Server, Code, Box, Layers, GitBranch, Database, ExternalLink, Mail } from 'lucide-react'
import type { LectureDeck } from '../types'
import styles from './Library.module.css'

type LibraryProps = {
  decks: LectureDeck[]
  onSelectDeck: (deckId: string) => void
  currentDeckId?: string
}

function getDeckIcon(deckId: string) {
  if (deckId.includes('crud')) return <Database aria-hidden="true" size={25} />
  if (deckId.includes('syntax')) return <Code aria-hidden="true" size={25} />
  if (deckId.includes('oop')) return <Box aria-hidden="true" size={25} />
  if (deckId.includes('advanced')) return <Layers aria-hidden="true" size={25} />
  if (deckId.includes('git')) return <GitBranch aria-hidden="true" size={25} />
  return <Server aria-hidden="true" size={25} />
}

export function Library({ decks, onSelectDeck, currentDeckId }: LibraryProps) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isVisible)
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(`.${styles.reveal}`);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.library}>
      <div className={styles.ticker}>
        <div className={styles.tickerTrack}>
          <span>SPRING BOOT CRUD STUDY</span>
          <span>LIKELION 14th</span>
          <span>JAVA ADVANCED</span>
          <span>GIT & GITHUB</span>
          <span>SPRING BOOT CRUD STUDY</span>
          <span>LIKELION 14th</span>
          <span>JAVA ADVANCED</span>
          <span>GIT & GITHUB</span>
          <span>SPRING BOOT CRUD STUDY</span>
          <span>LIKELION 14th</span>
          <span>JAVA ADVANCED</span>
          <span>GIT & GITHUB</span>
        </div>
      </div>

      <div className={styles.bgBlobs} aria-hidden="true">
        <div className={styles.blob1} />
        <div className={styles.blob2} />
      </div>

      {/* Lesson Materials Section */}
      <section className={`${styles.section} ${styles.heroSection}`}>
        <div className={`${styles.container} ${styles.reveal}`}>
          <div className={styles.heroContent}>
            <span className={styles.cohortBadge}>LIKELION 14기</span>
            <p className="eyebrow">Study Session</p>
            <div className={styles.titleWrapper}>
              <h1 className={styles.revealText}>백엔드 수업 자료</h1>
            </div>
            <p className={styles.summary}>
              함께 실습하며 볼 자료를 선택하세요.
            </p>
          </div>

          <div className={styles.deckList} aria-label="강의 자료 목록">
            {decks.map((deck, index) => {
              const isCurrent = deck.id === currentDeckId
              return (
                <button
                  className={`${styles.deckCard} ${styles.reveal}`}
                  key={deck.id}
                  onClick={() => onSelectDeck(deck.id)}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  type="button"
                >
                  <span className={styles.deckCardMark}>
                    {getDeckIcon(deck.id)}
                  </span>
                  <span>
                    <div className={styles.titleRow}>
                      <strong>{deck.title}</strong>
                      {isCurrent && (
                        <span className={styles.currentBadge}>진행 중</span>
                      )}
                    </div>
                    <small>{deck.description}</small>
                  </span>
                  <em>
                    강의 시작
                    <ArrowRight aria-hidden="true" size={18} />
                  </em>
                </button>
              )
            })}

            <div className={`${styles.deckCard} ${styles.mutedCard} ${styles.reveal}`} aria-hidden="true">
              <span className={`${styles.deckCardMark} ${styles.muted}`}>
                <Plus aria-hidden="true" size={23} />
              </span>
              <span>
                <strong>다음 자료</strong>
                <small>새로운 실습 주제가 곧 추가될 예정입니다.</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="24"
                height="24"
              >
                <path d="M12 2L4 9l2 11h12l2-11-8-7z" />
                <path d="M8 11l4-2 4 2-4 6-4-6z" />
              </svg>
              <strong>LIKELION YC</strong>
            </div>
            <p>연암공과대학교 멋쟁이사자처럼 14기 스터디 허브</p>
          </div>

          <div className={styles.footerLinks}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GitBranch size={20} />
            </a>
            <a href="mailto:contact@example.com" aria-label="Mail">
              <Mail size={20} />
            </a>
            <a href="https://likelion.university" target="_blank" rel="noopener noreferrer" aria-label="Likelion University">
              <ExternalLink size={20} />
            </a>
          </div>

          <div className={styles.footerBottom}>
            <p>&copy; 2026 LIKELION YIT 14th. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default Library
