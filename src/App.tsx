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
  const defaultDeck = lectureDecks[0]

  useEffect(() => {
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
    setIsTransitioning(true)
    
    // The "curtain" hits the middle at 400ms (half of 800ms)
    setTimeout(() => {
      pushRoute(path)
    }, 400)

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 800)
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
      <div className={`transition-overlay ${isTransitioning ? 'curtain-active' : ''}`} />
    </>
  )
}

export default App
