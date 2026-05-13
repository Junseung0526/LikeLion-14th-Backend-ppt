import type { SlideVisual } from '../types'
import styles from './DeckVisual.module.css'

type DeckVisualProps = {
  type: SlideVisual
  terms?: string[]
}

export function DeckVisual({ type, terms }: DeckVisualProps) {
  if (type === 'terms') {
    const displayTerms = terms?.map(t => {
      const [label, ...descParts] = t.split(':')
      return {
        label: label.trim(),
        desc: descParts.join(':').trim(),
        color: '#3182ce' // Default color
      }
    }).slice(0, 4) || [
      { label: 'REST API', desc: '주소 + Method', color: '#3182ce' },
      { label: 'Entity', desc: 'DB 테이블 구조', color: '#38a169' },
      { label: 'DTO', desc: '데이터 전달 박스', color: '#d69e2e' },
      { label: 'Service', desc: '비즈니스 로직', color: '#805ad5' },
    ]

    const colors = ['#3182ce', '#38a169', '#d69e2e', '#805ad5']

    return (
      <svg className={styles.deckVisual} viewBox="0 0 540 330" role="img" aria-label="Key Terms">
        <rect className={styles.svgBg} height="330" rx="12" width="540" />
        <g transform="translate(40, 60)">
          <rect fill="#f8fafc" height="210" rx="12" stroke="#e2e8f0" strokeWidth="2" width="460" />
          {displayTerms.map((term, i) => (
            <g key={term.label} transform={`translate(20, ${20 + i * 45})`}>
              <rect fill={term.color || colors[i % colors.length]} height="32" rx="6" width="100" />
              <text fill="#fff" fontSize="11" fontWeight="800" textAnchor="middle" x="50" y="21">{term.label}</text>
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

  if (type === 'git-flow') {
    return (
      <svg className={styles.deckVisual} viewBox="0 0 540 330" role="img" aria-label="Git Flow">
        <rect className={styles.svgBg} height="330" rx="12" width="540" />
        <g transform="translate(60, 165)">
          {/* Main line */}
          <line stroke="#cbd5e0" strokeDasharray="4 4" strokeWidth="2" x1="0" x2="420" y1="0" y2="0" />
          
          {/* Main nodes */}
          {[0, 140, 280, 420].map((x, i) => (
            <circle key={i} cx={x} cy="0" fill="#243447" r="6" />
          ))}
          
          {/* Feature branch */}
          <path d="M140 0 Q210 -80 280 0" fill="none" stroke="#f58220" strokeWidth="3" />
          <circle cx="210" cy="-40" fill="#f58220" r="6" />
          
          <text fill="#243447" fontSize="12" fontWeight="800" x="0" y="25">main</text>
          <text fill="#f58220" fontSize="12" fontWeight="800" x="180" y="-55">feature</text>
        </g>
        <text fill="#1a202c" fontSize="18" fontWeight="850" textAnchor="middle" x="270" y="60">Git Branch & Merge Flow</text>
      </svg>
    )
  }

  if (type === 'java-box') {
    return (
      <svg className={styles.deckVisual} viewBox="0 0 540 330" role="img" aria-label="Java OOP">
        <rect className={styles.svgBg} height="330" rx="12" width="540" />
        <g transform="translate(120, 100)">
          {/* Class (The Mold) */}
          <rect fill="#fff" height="120" rx="8" stroke="#243447" strokeWidth="2" width="100" />
          <text fill="#243447" fontSize="12" fontWeight="800" textAnchor="middle" x="50" y="-15">Class (설계도)</text>
          <path d="M20 30 h60 M20 50 h60 M20 70 h60" fill="none" stroke="#edf2f7" strokeWidth="4" />
          
          {/* Arrow */}
          <line stroke="#cbd5e0" strokeWidth="2" x1="110" x2="190" y1="60" y2="60" />
          <path d="M185 55 l10 5 l-10 5" fill="none" stroke="#cbd5e0" strokeWidth="2" />
          
          {/* Objects (The Instances) */}
          <g transform="translate(210, 0)">
            <rect fill="#fff9f3" height="50" rx="6" stroke="#f58220" strokeWidth="2" width="80" />
            <rect fill="#fff9f3" height="50" rx="6" stroke="#f58220" strokeWidth="2" width="80" y="70" />
            <text fill="#9a4c0f" fontSize="12" fontWeight="800" textAnchor="middle" x="40" y="-15">Objects (실체)</text>
            <text fill="#c05621" fontSize="10" fontWeight="700" textAnchor="middle" x="40" y="30">Instance 1</text>
            <text fill="#c05621" fontSize="10" fontWeight="700" textAnchor="middle" x="40" y="100">Instance 2</text>
          </g>
        </g>
      </svg>
    )
  }

  if (type === 'stream') {
    return (
      <svg className={styles.deckVisual} viewBox="0 0 540 330" role="img" aria-label="Java Stream">
        <rect className={styles.svgBg} height="330" rx="12" width="540" />
        <g transform="translate(60, 80)">
          {/* Source */}
          <rect fill="#edf2f7" height="180" rx="8" width="80" />
          <text fill="#4a5568" fontSize="11" fontWeight="800" textAnchor="middle" x="40" y="-15">Source</text>
          {[0, 1, 2, 3].map(i => <circle key={i} cx="40" cy={30 + i * 40} fill="#cbd5e0" r="12" />)}
          
          {/* Pipeline */}
          <g transform="translate(100, 90)">
            <path d="M0 0 h240" fill="none" stroke="#f58220" strokeDasharray="6 4" strokeWidth="2" />
            <rect fill="#f58220" height="40" rx="20" width="100" x="20" y="-20" />
            <text fill="#fff" fontSize="10" fontWeight="800" textAnchor="middle" x="70" y="5">Filter</text>
            
            <rect fill="#805ad5" height="40" rx="20" width="100" x="140" y="-20" />
            <text fill="#fff" fontSize="10" fontWeight="800" textAnchor="middle" x="190" y="5">Map</text>
          </g>
          
          {/* Result */}
          <g transform="translate(360, 0)">
            <rect fill="#f0fff4" height="180" rx="8" width="80" />
            <text fill="#2f855a" fontSize="11" fontWeight="800" textAnchor="middle" x="40" y="-15">Result</text>
            {[0, 1].map(i => <circle key={i} cx="40" cy={50 + i * 80} fill="#38a169" r="12" />)}
          </g>
        </g>
      </svg>
    )
  }
  if (type === 'jvm') {
    return (
      <svg className={styles.deckVisual} viewBox="0 0 540 330" role="img" aria-label="JVM Architecture">
        <rect className={styles.svgBg} height="330" rx="12" width="540" />
        <g transform="translate(40, 60)">
          {/* JDK Outer Box */}
          <rect fill="none" height="210" rx="12" stroke="#cbd5e0" strokeDasharray="4 4" strokeWidth="2" width="460" />
          <text fill="#718096" fontSize="12" fontWeight="800" x="10" y="-10">JDK (Development Kit)</text>
          
          {/* JRE Box */}
          <g transform="translate(20, 30)">
            <rect fill="#f8fafc" height="150" rx="10" stroke="#a0aec0" strokeWidth="2" width="420" />
            <text fill="#4a5568" fontSize="12" fontWeight="800" x="10" y="-10">JRE (Runtime Environment)</text>
            
            {/* JVM Box */}
            <g transform="translate(20, 30)">
              <rect fill="#fff9f3" height="90" rx="8" stroke="#f58220" strokeWidth="2" width="380" />
              <text fill="#9a4c0f" fontSize="14" fontWeight="900" textAnchor="middle" x="190" y="50">JVM (Virtual Machine)</text>
              <text fill="#c05621" fontSize="11" fontWeight="700" textAnchor="middle" x="190" y="70">Bytecode Execution Engine</text>
            </g>
          </g>
        </g>
      </svg>
    )
  }

  if (type === 'java-intro') {
    return (
      <svg className={styles.deckVisual} viewBox="0 0 540 330" role="img" aria-label="Java Introduction">
        <rect className={styles.svgBg} height="330" rx="12" width="540" />
        <g transform="translate(270, 165)">
          {/* Central Sun/Java Icon style */}
          <circle fill="#f58220" opacity="0.1" r="100" />
          <circle fill="#f58220" opacity="0.2" r="70" />
          
          {/* Floating Elements */}
          {[
            { label: 'Security', angle: 0 },
            { label: 'Portable', angle: 72 },
            { label: 'Robust', angle: 144 },
            { label: 'OOP', angle: 216 },
            { label: 'Scale', angle: 288 },
          ].map((item, i) => {
            const rad = (item.angle * Math.PI) / 180
            const x = Math.cos(rad) * 90
            const y = Math.sin(rad) * 90
            return (
              <g key={item.label} transform={`translate(${x}, ${y})`}>
                <rect fill="#fff" height="24" rx="4" stroke="#e2e8f0" width="60" x="-30" y="-12" />
                <text fill="#2d3748" fontSize="10" fontWeight="800" textAnchor="middle" y="4">{item.label}</text>
              </g>
            )
          })}
          
          {/* Center Logo Placeholder */}
          <rect fill="#243447" height="40" rx="6" width="60" x="-30" y="-20" />
          <text fill="#fff" fontSize="14" fontWeight="900" textAnchor="middle" y="5">JAVA</text>
        </g>
      </svg>
    )
  }

  return (
    <svg className={styles.deckVisual} viewBox="0 0 540 330" role="img" aria-label="Swagger UI">
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
