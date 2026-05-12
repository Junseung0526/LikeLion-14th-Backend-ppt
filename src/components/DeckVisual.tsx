import type { SlideVisual } from '../types'

type DeckVisualProps = {
  type: SlideVisual
}

export function DeckVisual({ type }: DeckVisualProps) {
  if (type === 'overview') {
    return (
      <svg className="deck-visual" viewBox="0 0 520 300" role="img" aria-label="Board CRUD API 전체 흐름">
        <rect className="svg-bg" x="8" y="8" width="504" height="284" rx="18" />
        <g className="svg-card">
          <rect x="42" y="62" width="120" height="70" rx="12" />
          <text x="102" y="93" textAnchor="middle">Client</text>
          <text x="102" y="116" textAnchor="middle">React / Swagger</text>
        </g>
        <path className="svg-arrow" d="M170 97H230" />
        <g className="svg-card accent">
          <rect x="238" y="52" width="132" height="90" rx="12" />
          <text x="304" y="86" textAnchor="middle">Spring Boot</text>
          <text x="304" y="111" textAnchor="middle">REST API</text>
        </g>
        <path className="svg-arrow" d="M378 97H438" />
        <g className="svg-card">
          <rect x="444" y="62" width="46" height="70" rx="10" />
          <ellipse cx="467" cy="72" rx="23" ry="8" />
          <path d="M444 72v48c0 4 10 8 23 8s23-4 23-8V72" />
          <text x="467" y="162" textAnchor="middle">H2 DB</text>
        </g>
        <g className="crud-row">
          <rect x="62" y="210" width="84" height="38" rx="10" />
          <rect x="158" y="210" width="84" height="38" rx="10" />
          <rect x="254" y="210" width="84" height="38" rx="10" />
          <rect x="350" y="210" width="84" height="38" rx="10" />
          <text x="104" y="235" textAnchor="middle">Create</text>
          <text x="200" y="235" textAnchor="middle">Read</text>
          <text x="296" y="235" textAnchor="middle">Update</text>
          <text x="392" y="235" textAnchor="middle">Delete</text>
        </g>
      </svg>
    )
  }

  if (type === 'layers') {
    const layers = ['Controller', 'Service', 'Repository', 'H2 Database']

    return (
      <svg className="deck-visual" viewBox="0 0 520 300" role="img" aria-label="계층 구조">
        <rect className="svg-bg" x="8" y="8" width="504" height="284" rx="18" />
        <text className="svg-title" x="42" y="48">요청 처리 순서</text>
        {layers.map((layer, index) => (
          <g className={index === 1 ? 'svg-layer active' : 'svg-layer'} key={layer}>
            <rect x={70 + index * 78} y={76 + index * 34} width="260" height="48" rx="10" />
            <text x={200 + index * 78} y={106 + index * 34} textAnchor="middle">{layer}</text>
          </g>
        ))}
        <path className="svg-arrow down" d="M420 80v150" />
        <text className="svg-small" x="420" y="260" textAnchor="middle">역할별로 나누면 수정 위치가 명확해집니다</text>
      </svg>
    )
  }

  return (
    <svg className="deck-visual" viewBox="0 0 520 300" role="img" aria-label="Swagger UI 테스트 화면">
      <rect className="svg-bg" x="8" y="8" width="504" height="284" rx="18" />
      <rect className="browser" x="42" y="44" width="436" height="214" rx="12" />
      <circle cx="66" cy="66" r="5" />
      <circle cx="84" cy="66" r="5" />
      <circle cx="102" cy="66" r="5" />
      <text className="svg-title" x="130" y="72">Swagger UI</text>
      <g className="endpoint post">
        <rect x="72" y="104" width="376" height="38" rx="8" />
        <text x="96" y="128">POST</text>
        <text x="166" y="128">/api/boards</text>
      </g>
      <g className="endpoint get">
        <rect x="72" y="154" width="376" height="38" rx="8" />
        <text x="96" y="178">GET</text>
        <text x="166" y="178">/api/boards</text>
      </g>
      <rect className="try-button" x="334" y="208" width="114" height="34" rx="8" />
      <text className="try-text" x="391" y="230" textAnchor="middle">Try it out</text>
    </svg>
  )
}
