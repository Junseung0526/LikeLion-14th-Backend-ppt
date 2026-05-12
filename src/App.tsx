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
  const defaultDeck = lectureDecks[0]

  useEffect(() => {
    const deckTitle = defaultDeck?.title ?? 'Spring Boot CRUD'
    if (route.kind === 'presenter') {
      document.title = `발표자 | LIKELION 14기 | ${deckTitle}`
      return
    }

    if (route.kind === 'deck') {
      document.title = `${deckTitle} | LIKELION 14기`
      return
    }

    if (route.kind === 'not-found') {
      document.title = '404 | 페이지를 찾을 수 없습니다'
      return
    }

    document.title = 'LIKELION 14기 | Spring Boot CRUD'
  }, [defaultDeck, route.kind])

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

  const selectedDeck =
    route.kind === 'library' || route.kind === 'not-found'
      ? null
      : lectureDecks.find((deck) => deck.id === route.deckId) ?? defaultDeck ?? null

  if (route.kind === 'presenter') {
    if (!isAuthenticated) {
      return (
        <PresenterAuth
          onAuthenticated={() => setIsAuthenticated(true)}
          onBack={() => pushRoute(route.deckId)}
        />
      )
    }

    return (
      <PresenterPage
        deck={selectedDeck ?? defaultDeck!}
        onBack={() => {
          pushRoute('')
        }}
      />
    )
  }

  if (route.kind === 'deck') {
    return (
      <SlideDeck
        deck={selectedDeck ?? defaultDeck!}
        onBack={() => {
          pushRoute('')
        }}
      />
    )
  }

  if (route.kind === 'not-found') {
    return (
      <NotFound
        onBack={() => {
          pushRoute('')
        }}
      />
    )
  }

  return (
    <Library
      decks={lectureDecks}
      currentDeckId={DEFAULT_DECK_ID}
      onSelectDeck={(deckId) => {
        pushRoute(deckId)
      }}
    />
  )
}

export default App
