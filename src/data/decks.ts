import type { LectureDeck } from '../types'
import { springBootCrudDeck } from './springBootCrudSlides'
import { gitDeck } from './gitSlides'
import { javaSyntaxDeck } from './javaSyntaxSlides'
import { javaOOPDeck } from './javaOOPSlides'
import { javaAdvancedDeck } from './javaAdvancedSlides'

import { websocketDeck } from './websocketSlides'

export const lectureDecks: LectureDeck[] = [
  springBootCrudDeck,
  websocketDeck,
  javaSyntaxDeck,
  javaOOPDeck,
  javaAdvancedDeck,
  gitDeck,
]
