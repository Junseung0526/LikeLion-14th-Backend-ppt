export type SlideVisual = 'overview' | 'layers' | 'swagger' | 'terms' | 'goals' | 'git-flow' | 'java-box' | 'stream' | 'jvm' | 'java-intro' | 'websocket-flow' | 'redis-pubsub' | 'messaging-comparison' | 'stomp-concept' | 'ws-handshake' | 'ws-security' | 'web-evolution' | 'exception-flow' | 'jpa-persistence' | 'jpa-nplusone' | 'error-pyramid' | 'jpa-proxy' | 'jpa-cycle'

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
