import { useEffect } from 'react'
import { ArrowRight, Plus, Server, Code, Box, Layers, GitBranch, Database, ExternalLink, Mail } from 'lucide-react'
import type { LectureDeck } from '../types'
import styles from './Library.module.css'
import univLogo from '../assets/연암공대_로고.png'

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
          <span>POSSIBILITY TO REALITY</span>
          <span>LIKELION 14th</span>
          <span>멋쟁이사자처럼 연암공과대학교</span>
          <span>GROW WITH US</span>
          <span>POSSIBILITY TO REALITY</span>
          <span>LIKELION 14th</span>
          <span>멋쟁이사자처럼 연암공과대학교</span>
          <span>GROW WITH US</span>
          <span>POSSIBILITY TO REALITY</span>
          <span>LIKELION 14th</span>
          <span>멋쟁이사자처럼 연암공과대학교</span>
          <span>GROW WITH US</span>
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
            <div className={styles.titleWrapper}>
              <h1 className={styles.revealText}>멋쟁이사자처럼<br />백엔드 스터디</h1>
            </div>
            <p className={styles.slogan}>POSSIBILITY TO REALITY</p>
            <p className={styles.summary}>
              내일의 가치를 만드는 코딩 공부, <br />
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
                <strong>다음 주제</strong>
                <small>새로운 실습 자료가 곧 추가될 예정입니다.</small>
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
              <img src={univLogo} alt="연암공대" className={styles.footerUnivLogo} />
            </div>
            <p>연암공과대학교 멋쟁이사자처럼 14기 스터디 허브</p>
          </div>

          <div className={styles.footerLinks}>
            <a href="https://github.com/likelion-yit" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GitBranch size={20} />
            </a>
            <a href="mailto:contact@likelion.net" aria-label="Mail">
              <Mail size={20} />
            </a>
            <a href="https://likelion.university" target="_blank" rel="noopener noreferrer" aria-label="Likelion University">
              <ExternalLink size={20} />
            </a>
          </div>

          <div className={styles.footerBottom}>
            <p>&copy; 2026 LIKELION 연암공과대학교 14th. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default Library
