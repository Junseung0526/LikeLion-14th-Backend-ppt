import type { SlideVisual } from '../types'
import styles from './DeckVisual.module.css'

type DeckVisualProps = {
  type: SlideVisual
}

export function DeckVisual({ type }: DeckVisualProps) {
  if (type === 'terms') {
    return (
      <svg className={styles.deckVisual} viewBox="0 0 540 330" role="img" aria-label="Key Terms">
        <rect className={styles.svgBg} height="330" rx="12" width="540" />
        <g transform="translate(40, 60)">
          <rect fill="#f8fafc" height="210" rx="12" stroke="#e2e8f0" strokeWidth="2" width="460" />
          {[
            { label: 'REST API', desc: '주소 + Method', color: '#3182ce' },
            { label: 'Entity', desc: 'DB 테이블 구조', color: '#38a169' },
            { label: 'DTO', desc: '데이터 전달 박스', color: '#d69e2e' },
            { label: 'Service', desc: '비즈니스 로직', color: '#805ad5' },
          ].map((term, i) => (
            <g key={term.label} transform={`translate(20, ${20 + i * 45})`}>
              <rect fill={term.color} height="32" rx="6" width="100" />
              <text fill="#fff" fontSize="12" fontWeight="800" textAnchor="middle" x="50" y="21">{term.label}</text>
              <text fill="#4a5568" fontSize="13" fontWeight="600" x="115" y="21">{term.desc}</text>
            </g>
          ))}
        </g>
      </svg>
    )
  }

  if (type === 'goals') {
    return (
      <svg className={styles.deckVisual} viewBox="0 0 540 330" role="img" aria-label="Project Goals">
        <rect className={styles.svgBg} height="330" rx="12" width="540" />
        
        {/* Connection Path */}
        <path d="M100 165 h340" fill="none" stroke="#e2e8f0" strokeDasharray="8 8" strokeWidth="2" />
        
        {/* Client Side */}
        <g transform="translate(60, 125)">
          <rect fill="#fff" height="80" rx="8" stroke="#e2e8f0" strokeWidth="2" width="80" />
          <rect fill="#edf2f7" height="10" rx="2" width="40" x="20" y="15" />
          <rect fill="#edf2f7" height="6" rx="1" width="50" x="15" y="35" />
          <rect fill="#edf2f7" height="6" rx="1" width="50" x="15" y="48" />
          <text fill="#718096" fontSize="10" fontWeight="800" textAnchor="middle" x="40" y="72">Client</text>
        </g>
        
        {/* Server Side (The Goal) */}
        <g transform="translate(210, 85)">
          <rect fill="#fff9f3" height="160" rx="12" stroke="#f58220" strokeWidth="2.5" width="120" />
          <circle cx="60" cy="45" fill="#f58220" r="25" />
          <path d="M50 45 l7 7 l14 -14" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          
          <g transform="translate(15, 85)">
            {['CREATE API', 'READ API', 'UPDATE API', 'DELETE API'].map((op, i) => (
              <g key={op} transform={`translate(0, ${i * 18})`}>
                <circle cx="5" cy="0" fill="#2e9d74" r="3" />
                <text fill="#2d3748" fontSize="9" fontWeight="800" x="15" y="3">{op}</text>
              </g>
            ))}
          </g>
          <text fill="#9a4c0f" fontSize="12" fontWeight="850" textAnchor="middle" x="60" y="152">Board CRUD</text>
        </g>
        
        {/* DB Side */}
        <g transform="translate(400, 125)">
          <rect fill="#fff" height="80" rx="8" stroke="#e2e8f0" strokeWidth="2" width="80" />
          <path d="M20 25 h40 M20 40 h40 M20 55 h40" fill="none" stroke="#edf2f7" strokeLinecap="round" strokeWidth="6" />
          <text fill="#718096" fontSize="10" fontWeight="800" textAnchor="middle" x="40" y="72">Database</text>
        </g>

        <text fill="#1a202c" fontSize="18" fontWeight="850" textAnchor="middle" x="270" y="50">오늘의 최종 목표: API 서버 구축</text>
      </svg>
    )
  }

  if (type === 'overview') {
    return (
      <svg className={styles.deckVisual} viewBox="0 0 540 330" role="img" aria-label="System Overview">
        <defs>
          <marker id="simpleArrow" markerHeight="6" markerWidth="6" orient="auto" refX="5" refY="3">
            <path d="M0,0 L6,3 L0,6" fill="none" stroke="#cbd5e0" strokeWidth="1.5" />
          </marker>
        </defs>
        <rect className={styles.svgBg} height="330" rx="12" width="540" />
        
        {/* Simple Grid Based Layout */}
        <g transform="translate(60, 100)">
          {/* Client */}
          <rect fill="#fff" height="60" rx="8" stroke="#e2e8f0" strokeWidth="2" width="100" />
          <text fill="#2d3748" fontWeight="800" textAnchor="middle" x="50" y="35">Client</text>
          
          {/* Arrow */}
          <line markerEnd="url(#simpleArrow)" stroke="#cbd5e0" strokeWidth="2" x1="110" x2="160" y1="30" y2="30" />
          
          {/* API Server */}
          <g transform="translate(170, -30)">
            <rect fill="#fff9f3" height="120" rx="8" stroke="#f58220" strokeWidth="2" width="120" />
            <text fill="#9a4c0f" fontWeight="800" textAnchor="middle" x="60" y="55">Spring Boot</text>
            <text fill="#c05621" fontSize="12" fontWeight="600" textAnchor="middle" x="60" y="75">API Server</text>
          </g>
          
          {/* Arrow */}
          <line markerEnd="url(#simpleArrow)" stroke="#cbd5e0" strokeWidth="2" x1="300" x2="350" y1="30" y2="30" />
          
          {/* Database */}
          <g transform="translate(360, 0)">
            <rect fill="#fff" height="60" rx="8" stroke="#e2e8f0" strokeWidth="2" width="100" />
            <text fill="#2d3748" fontWeight="800" textAnchor="middle" x="50" y="35">Database</text>
          </g>
        </g>
        
        {/* Bottom Flow Indicators */}
        <g transform="translate(60, 240)">
          <text fill="#718096" fontSize="13" fontWeight="700">핵심 기능:</text>
          <g transform="translate(70, -15)">
            {['CREATE', 'READ', 'UPDATE', 'DELETE'].map((label, i) => (
              <g key={label} transform={`translate(${i * 85}, 0)`}>
                <rect fill="#243447" height="28" rx="4" width="75" />
                <text fill="#fff" fontSize="11" fontWeight="800" textAnchor="middle" x="37.5" y="18">{label}</text>
              </g>
            ))}
          </g>
        </g>
      </svg>
    )
  }

  if (type === 'layers') {
    const layers = ['Controller', 'Service', 'Repository', 'Entity']
    return (
      <svg className={styles.deckVisual} viewBox="0 0 540 330" role="img" aria-label="Layers">
        <rect className={styles.svgBg} height="330" rx="12" width="540" />
        <text className={styles.svgTitle} x="50" y="50">Request Flow</text>
        
        <g transform="translate(50, 70)">
          {layers.map((layer, i) => (
            <g key={layer} transform={`translate(0, ${i * 60})`}>
              <rect 
                className={i === 1 ? styles.layerActive : ''}
                fill={i === 1 ? '#fff9f3' : '#fff'} 
                height="45" 
                rx="6" 
                stroke={i === 1 ? '#f58220' : '#e2e8f0'} 
                strokeWidth="2" 
                width="440" 
              />
              <text 
                fill={i === 1 ? '#9a4c0f' : '#2d3748'} 
                fontSize="14" 
                fontWeight="800" 
                x="20" 
                y="28"
              >
                {i + 1}. {layer}
              </text>
              {i < layers.length - 1 && (
                <path d="M465 45 v15" fill="none" stroke="#cbd5e0" strokeWidth="2" />
              )}
            </g>
          ))}
        </g>
      </svg>
    )
  }

  return (
    <svg className={styles.deckVisual} viewBox="0 0 540 330" role="img" aria-label="Swagger UI">
      <rect className={styles.svgBg} height="330" rx="12" width="540" />
      
      {/* Mock Browser */}
      <g transform="translate(40, 40)">
        <rect fill="#fff" height="250" rx="8" stroke="#e2e8f0" strokeWidth="2" width="460" />
        <rect fill="#f7fafc" height="40" rx="8" width="460" />
        <circle cx="20" cy="20" fill="#cbd5e0" r="4" />
        <circle cx="35" cy="20" fill="#cbd5e0" r="4" />
        <circle cx="50" cy="20" fill="#cbd5e0" r="4" />
        
        <g transform="translate(20, 60)">
          <text fill="#1a202c" fontSize="16" fontWeight="850">Board API</text>
          
          <g transform="translate(0, 30)">
            {/* POST */}
            <rect fill="#fffaf0" height="45" rx="4" stroke="#fbd38d" strokeWidth="1" width="420" />
            <rect fill="#f58220" height="25" rx="4" width="60" x="10" y="10" />
            <text fill="#fff" fontSize="12" fontWeight="800" textAnchor="middle" x="40" y="27">POST</text>
            <text fill="#2d3748" fontSize="13" fontWeight="600" x="80" y="28">/api/boards</text>
            
            {/* GET */}
            <g transform="translate(0, 55)">
              <rect fill="#f0fff4" height="45" rx="4" stroke="#c6f6d5" strokeWidth="1" width="420" />
              <rect fill="#2f7d5c" height="25" rx="4" width="60" x="10" y="10" />
              <text fill="#fff" fontSize="12" fontWeight="800" textAnchor="middle" x="40" y="27">GET</text>
              <text fill="#2d3748" fontSize="13" fontWeight="600" x="80" y="28">/api/boards</text>
            </g>
          </g>
          
          <rect fill="#243447" height="35" rx="17.5" width="100" x="320" y="150" />
          <text fill="#fff" fontSize="12" fontWeight="800" textAnchor="middle" x="370" y="172">Try it out</text>
        </g>
      </g>
    </svg>
  )
}
