export type SlideVisual = 'overview' | 'layers' | 'swagger' | 'terms' | 'goals'

export type Slide = {
  eyebrow: string
  title: string
  summary?: string
  visual?: SlideVisual
  bullets?: string[]
  code?: {
    title: string
    language: string
    body: string
  }
  table?: {
    headers: string[]
    rows: string[][]
  }
  checklist?: string[]
  tip?: string
}

export type LectureDeck = {
  id: string
  title: string
  description: string
  slides: Slide[]
  presenterScripts?: string[][]
}
