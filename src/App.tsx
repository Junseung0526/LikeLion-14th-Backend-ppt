import { useEffect, useState } from 'react'
import { Library } from './components/Library'
import { PresenterPage } from './components/PresenterPage'
import { SlideDeck } from './components/SlideDeck'
import { NotFound } from './components/NotFound'
import { PresenterAuth } from './components/PresenterAuth'
import { lectureDecks } from './data/decks'
import './App.css'

type Route =
  | { kind: 'library' }
  | { kind: 'deck'; deckId: string }
  | { kind: 'presenter'; deckId: string }
  | { kind: 'not-found' }

const DEFAULT_DECK_ID = lectureDecks[0]?.id ?? 'spring-boot-crud'

const LOADING_TIPS = [
  "자바에서 String은 불변(Immutable) 객체입니다.",
  "Spring Boot의 @SpringBootApplication은 세 가지 어노테이션의 합체입니다.",
  "Git 커밋 메시지는 '왜' 변경했는지를 설명하는 것이 좋습니다.",
  "MVC 패턴에서 Controller는 비즈니스 로직을 직접 처리하지 않는 것이 좋습니다.",
  "멋쟁이사자처럼의 슬로건은 'POSSIBILITY TO REALITY'입니다.",
  "REST API에서 GET 메서드는 데이터를 조회할 때 사용합니다.",
  "JPA 사용 시 N+1 문제를 주의해야 합니다.",
  "Clean Code의 핵심은 '읽기 쉬운 코드'를 작성하는 것입니다.",
  "연암공과대학교 멋사는 여러분의 성장을 응원합니다!",
  "데드락(Deadlock)을 방지하려면 자원 할당 순서를 정하는 것이 좋습니다.",
  "HTTP 상태 코드 404는 'Not Found'를 의미합니다.",
  "Docker는 컨테이너 기반의 가상화 기술입니다.",
  "테스트 코드는 리팩토링의 안정성을 보장해줍니다.",
  "멋쟁이사자처럼 14기 화이팅!"
]

function normalizeHash(hash: string) {
  return hash.replace(/^#\/?/, '').trim()
}

function getRoute(): Route {
  const hash = normalizeHash(window.location.hash)
  if (!hash) {
    return { kind: 'library' }
  }

  // Handle #/deck-id/presenter or #/deck-id
  const parts = hash.split('/')
  const deckId = parts[0]
  const isPresenter = parts[1] === 'presenter'

  const selectedDeck = lectureDecks.find((deck) => deck.id === deckId)
  
  if (selectedDeck) {
    if (isPresenter) {
      return { kind: 'presenter', deckId }
    }
    return { kind: 'deck', deckId }
  }

  // Legacy support for #/presenter
  if (hash === 'presenter') {
    return { kind: 'presenter', deckId: DEFAULT_DECK_ID }
  }

  return { kind: 'not-found' }
}

function pushRoute(path: string) {
  window.location.hash = `/${path}`.replace(/\/+$/, '')
}

function App() {
  const [route, setRoute] = useState<Route>(() => getRoute())
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [currentTip, setCurrentTip] = useState('')
  const defaultDeck = lectureDecks[0]

  useEffect(() => {
    // Prevent browser from restoring scroll position automatically
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    // Always start at the top when the route changes
    window.scrollTo(0, 0)

    if (route.kind === 'presenter') {
      const deck = lectureDecks.find(d => d.id === route.deckId)
      document.title = `발표자 | LIKELION 14기 | ${deck?.title ?? ''}`
      return
    }

    if (route.kind === 'deck') {
      const deck = lectureDecks.find(d => d.id === route.deckId)
      document.title = `${deck?.title ?? ''} | LIKELION 14기`
      return
    }

    if (route.kind === 'not-found') {
      document.title = '404 | 페이지를 찾을 수 없습니다'
      return
    }

    document.title = 'LIKELION 14기 | 강의 라이브러리'
  }, [route])

  useEffect(() => {
    const onHashChange = () => {
      const nextRoute = getRoute()
      setRoute(nextRoute)
      // Reset auth state when leaving presenter mode
      if (nextRoute.kind !== 'presenter') {
        setIsAuthenticated(false)
      }
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const startTransition = (path: string) => {
    const randomTip = LOADING_TIPS[Math.floor(Math.random() * LOADING_TIPS.length)]
    setCurrentTip(randomTip)
    setIsTransitioning(true)
    
    // The "curtain" stays at center from 40% to 60% of the duration
    // With 2500ms total, this is from 1000ms to 1500ms
    setTimeout(() => {
      pushRoute(path)
    }, 1250)

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 2500)
  }

  const selectedDeck =
    route.kind === 'library' || route.kind === 'not-found'
      ? null
      : lectureDecks.find((deck) => deck.id === route.deckId) ?? defaultDeck ?? null

  const renderContent = () => {
    if (route.kind === 'presenter') {
      if (!isAuthenticated) {
        return (
          <PresenterAuth
            onAuthenticated={() => setIsAuthenticated(true)}
            onBack={() => startTransition(route.deckId)}
          />
        )
      }

      return (
        <PresenterPage
          deck={selectedDeck ?? defaultDeck!}
          onBack={() => {
            startTransition('')
          }}
        />
      )
    }

    if (route.kind === 'deck') {
      return (
        <SlideDeck
          deck={selectedDeck ?? defaultDeck!}
          onBack={() => {
            startTransition('')
          }}
        />
      )
    }

    if (route.kind === 'not-found') {
      return (
        <NotFound
          onBack={() => {
            startTransition('')
          }}
        />
      )
    }

    return (
      <Library
        decks={lectureDecks}
        currentDeckId={DEFAULT_DECK_ID}
        onSelectDeck={(deckId) => {
          startTransition(deckId)
        }}
      />
    )
  }

  return (
    <>
      <div className={`page-wrapper ${isTransitioning ? 'page-exit' : 'page-enter'}`}>
        {renderContent()}
      </div>
      <div className={`transition-overlay ${isTransitioning ? 'curtain-active' : ''}`}>
        {isTransitioning && (
          <div className="loading-tip-container">
            <span className="loading-tip-label">TIP</span>
            <p className="loading-tip-text">{currentTip}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default App
