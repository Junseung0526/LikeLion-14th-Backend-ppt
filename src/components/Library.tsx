import { ArrowRight, Plus, Server } from 'lucide-react'
import type { LectureDeck } from '../types'
import styles from './Library.module.css'

type LibraryProps = {
  decks: LectureDeck[]
  onSelectDeck: (deckId: string) => void
}

export function Library({ decks, onSelectDeck }: LibraryProps) {
  return (
    <main className={styles.library}>
      <section className={styles.libraryHero}>
        <span className={styles.cohortBadge}>LIKELION 14기</span>
        <p className="eyebrow">Study Session</p>
        <h1>스터디 자료 선택</h1>
        <p className="summary">
          함께 실습하며 볼 자료를 선택하세요. 발표자는 별도 엔드포인트에서 대본과 함께
          진행할 수 있습니다.
        </p>
      </section>

      <section className={styles.deckList} aria-label="강의 자료 목록">
        {decks.map((deck) => (
          <button
            className={styles.deckCard}
            key={deck.id}
            onClick={() => onSelectDeck(deck.id)}
            type="button"
          >
            <span className={styles.deckCardMark}>
              <Server aria-hidden="true" size={25} />
            </span>
            <span>
              <strong>{deck.title}</strong>
              <small>{deck.description}</small>
            </span>
            <em>
              <ArrowRight aria-hidden="true" size={18} />
              열기
            </em>
          </button>
        ))}

        <div className={`${styles.deckCard} ${styles.mutedCard}`} aria-hidden="true">
          <span className={`${styles.deckCardMark} ${styles.muted}`}>
            <Plus aria-hidden="true" size={23} />
          </span>
          <span>
            <strong>다음 자료</strong>
            <small>추가 강의 자료를 data 폴더에 연결할 수 있습니다.</small>
          </span>
        </div>
      </section>
    </main>
  )
}
