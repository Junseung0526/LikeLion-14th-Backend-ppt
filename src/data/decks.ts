import type { LectureDeck } from '../types'
import { springBootCrudDeck } from './springBootCrudSlides'
import { gitDeck } from './gitSlides'
import { javaSyntaxDeck } from './javaSyntaxSlides'
import { javaOOPDeck } from './javaOOPSlides'
import { javaAdvancedDeck } from './javaAdvancedSlides'

import { websocketDeck } from './websocketSlides'

import { exceptionHandlingDeck } from './exceptionHandlingSlides'
import { jpaDeepDiveDeck } from './jpaDeepDiveSlides'

export const lectureDecks: LectureDeck[] = [
  springBootCrudDeck,
  websocketDeck,
  jpaDeepDiveDeck,
  exceptionHandlingDeck,
  javaSyntaxDeck,
  javaOOPDeck,
  javaAdvancedDeck,
  gitDeck,
]
