import type { LectureDeck } from '../types'
import { springBootCrudDeck } from './springBootCrudSlides'
import { gitDeck } from './gitSlides'
import { javaSyntaxDeck } from './javaSyntaxSlides'
import { javaOOPDeck } from './javaOOPSlides'
import { javaAdvancedDeck } from './javaAdvancedSlides'

export const lectureDecks: LectureDeck[] = [
  springBootCrudDeck,
  javaSyntaxDeck,
  javaOOPDeck,
  javaAdvancedDeck,
  gitDeck,
]
