import { useMemo, useState } from 'react'
import { Library } from './components/Library'
import { PresenterPage } from './components/PresenterPage'
import { SlideDeck } from './components/SlideDeck'
import { lectureDecks } from './data/decks'
import './App.css'

function App() {
  const isPresenterPath = window.location.pathname === '/presenter'
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(
    isPresenterPath ? lectureDecks[0]?.id ?? null : null,
  )
  const selectedDeck = useMemo(
    () => lectureDecks.find((deck) => deck.id === selectedDeckId) ?? null,
    [selectedDeckId],
  )

  if (isPresenterPath && selectedDeck) {
    return (
      <PresenterPage
        deck={selectedDeck}
        onBack={() => {
          window.history.pushState(null, '', '/')
          setSelectedDeckId(null)
        }}
      />
    )
  }

  if (selectedDeck) {
    return (
      <SlideDeck
        deck={selectedDeck}
        onBack={() => {
          setSelectedDeckId(null)
        }}
      />
    )
  }

  return <Library decks={lectureDecks} onSelectDeck={setSelectedDeckId} />
}

export default App
