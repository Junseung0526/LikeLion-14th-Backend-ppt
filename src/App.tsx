import { useEffect, useState } from 'react'
import { Library } from './components/Library'
import { PresenterPage } from './components/PresenterPage'
import { SlideDeck } from './components/SlideDeck'
import { lectureDecks } from './data/decks'
import './App.css'

type Route =
  | { kind: 'library' }
  | { kind: 'deck'; deckId: string }
  | { kind: 'presenter'; deckId: string }

const DEFAULT_DECK_ID = lectureDecks[0]?.id ?? 'spring-boot-crud'

function normalizeHash(hash: string) {
  return hash.replace(/^#\/?/, '').trim()
}

function getRoute(): Route {
  const hash = normalizeHash(window.location.hash)
  if (!hash) {
    return { kind: 'library' }
  }

  if (hash === 'presenter') {
    return { kind: 'presenter', deckId: DEFAULT_DECK_ID }
  }

  return { kind: 'deck', deckId: hash }
}

function pushRoute(path: string) {
  window.location.hash = `/${path}`.replace(/\/+$/, '')
}

function App() {
  const [route, setRoute] = useState<Route>(() => getRoute())
  const defaultDeck = lectureDecks[0]

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const selectedDeck =
    route.kind === 'library'
      ? null
      : lectureDecks.find((deck) => deck.id === route.deckId) ?? defaultDeck ?? null

  if (route.kind === 'presenter') {
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

  return (
    <Library
      decks={lectureDecks}
      onSelectDeck={(deckId) => {
        pushRoute(deckId)
      }}
    />
  )
}

export default App
