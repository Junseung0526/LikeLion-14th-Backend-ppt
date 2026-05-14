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

  if (type === 'web-evolution') {
    return (
      <svg className={styles.deckVisual} viewBox="0 0 540 330">
        <rect className={styles.svgBg} height="330" rx="12" width="540" />
        <text fill="#1a202c" fontSize="16" fontWeight="900" textAnchor="middle" x="270" y="40">실시간성 구현 기술의 진화</text>
        
        {/* Polling Section */}
        <g transform="translate(40, 70)">
          <rect fill="#f8fafc" height="100" rx="8" stroke="#cbd5e0" strokeWidth="1.5" width="220" />
          <text fill="#4a5568" fontSize="11" fontWeight="900" x="15" y="25">Polling (과거)</text>
          
          <g transform="translate(30, 45)">
            {[0, 20, 40].map(y => (
              <g key={y} transform={`translate(0, ${y})`}>
                <path d="M0 0 h140" fill="none" stroke="#3182ce" strokeDasharray="2 2" strokeWidth="1" />
                <path d="M140 5 h-140" fill="none" stroke="#38a169" strokeWidth="1" />
                <circle cx="0" cy="2.5" fill="#3182ce" r="2" />
                <circle cx="140" cy="2.5" fill="#38a169" r="2" />
              </g>
            ))}
          </g>
          <text fill="#718096" fontSize="9" fontWeight="700" textAnchor="middle" x="110" y="90">무의미한 요청/응답 반복</text>
        </g>

        {/* WebSocket Section */}
        <g transform="translate(280, 70)">
          <rect fill="#fff9f3" height="100" rx="8" stroke="#f58220" strokeWidth="2" width="220" />
          <text fill="#9a4c0f" fontSize="11" fontWeight="900" x="15" y="25">WebSocket (현재)</text>
          
          <g transform="translate(30, 45)">
            <path d="M0 20 h160" fill="none" stroke="#f58220" strokeWidth="3" />
            <path d="M0 20 l7 -5 M0 20 l7 5" fill="none" stroke="#f58220" strokeWidth="2" />
            <path d="M160 20 l-7 -5 M160 20 l-7 5" fill="none" stroke="#f58220" strokeWidth="2" />
            
            {/* Moving Data dots */}
            <circle cx="40" cy="20" fill="#fff" r="3">
              <animate attributeName="cx" dur="1s" repeatCount="indefinite" values="20;140" />
            </circle>
            <circle cx="120" cy="20" fill="#fff" r="3">
              <animate attributeName="cx" dur="1s" repeatCount="indefinite" values="140;20" />
            </circle>
          </g>
          <text fill="#c05621" fontSize="9" fontWeight="800" textAnchor="middle" x="110" y="90">단 한 번의 연결로 자유로운 통신</text>
        </g>

        {/* Description Table-like info */}
        <g transform="translate(40, 190)">
          <rect fill="#243447" height="100" rx="8" width="460" />
          <g transform="translate(30, 30)">
            <text fill="#fff" fontSize="10" fontWeight="800" x="0" y="0">Short Polling: 정기적인 확인 (낭비 심함)</text>
            <text fill="#fff" fontSize="10" fontWeight="800" x="0" y="25">Long Polling: 무기한 대기 (응답 지연)</text>
            <text fill="#fff" fontSize="10" fontWeight="800" x="0" y="50">WebSocket: 실시간 양방향 (최적화)</text>
          </g>
        </g>
      </svg>
    )
  }

  if (type === 'messaging-comparison') {
    return (
      <svg className={styles.deckVisual} viewBox="0 0 540 330">
        <rect className={styles.svgBg} height="330" rx="12" width="540" />
        {/* HTTP Side */}
        <g transform="translate(40, 60)">
          <rect fill="#f8fafc" height="200" rx="10" stroke="#cbd5e0" strokeWidth="2" width="220" />
          <text fill="#4a5568" fontSize="14" fontWeight="900" textAnchor="middle" x="110" y="30">HTTP (Rest)</text>
          <g transform="translate(30, 60)">
            <path d="M0 20 h100" fill="none" stroke="#3182ce" strokeDasharray="4 4" strokeWidth="2" />
            <path d="M100 20 l-10 -5 M100 20 l-10 5" fill="none" stroke="#3182ce" strokeWidth="2" />
            <text fill="#3182ce" fontSize="10" fontWeight="800" x="0" y="10">Request</text>
            <g transform="translate(0, 40)">
              <path d="M100 20 h-100" fill="none" stroke="#38a169" strokeWidth="2" />
              <path d="M0 20 l10 -5 M0 20 l10 5" fill="none" stroke="#38a169" strokeWidth="2" />
              <text fill="#38a169" fontSize="10" fontWeight="800" x="60" y="45">Response</text>
            </g>
          </g>
          <text fill="#718096" fontSize="11" fontWeight="700" textAnchor="middle" x="110" y="170">단방향 / 비연결성</text>
        </g>
        {/* WebSocket Side */}
        <g transform="translate(280, 60)">
          <rect fill="#fff9f3" height="200" rx="10" stroke="#f58220" strokeWidth="2" width="220" />
          <text fill="#9a4c0f" fontSize="14" fontWeight="900" textAnchor="middle" x="110" y="30">WebSocket</text>
          <g transform="translate(30, 80)">
            <rect fill="none" height="40" rx="20" stroke="#f58220" strokeWidth="3" width="160" />
            <path d="M10 20 h140" fill="none" stroke="#f58220" strokeWidth="2" />
            <path d="M10 20 l7 -5 M10 20 l7 5" fill="none" stroke="#f58220" strokeWidth="2" />
            <path d="M150 20 l-7 -5 M150 20 l-7 5" fill="none" stroke="#f58220" strokeWidth="2" />
            <text fill="#f58220" fontSize="10" fontWeight="900" textAnchor="middle" x="80" y="15">Full-Duplex</text>
          </g>
          <text fill="#c05621" fontSize="11" fontWeight="700" textAnchor="middle" x="110" y="170">양방향 / 연결 유지</text>
        </g>
      </svg>
    )
  }

  if (type === 'stomp-concept') {
    return (
      <svg className={styles.deckVisual} viewBox="0 0 540 330">
        <rect className={styles.svgBg} height="330" rx="12" width="540" />
        <text fill="#1a202c" fontSize="16" fontWeight="900" textAnchor="middle" x="270" y="40">STOMP: 라디오 방송국 모델</text>
        
        {/* DJ (Publisher) */}
        <g transform="translate(40, 100)">
          <rect fill="#fff" height="120" rx="8" stroke="#243447" strokeWidth="2" width="100" />
          <circle cx="50" cy="40" fill="#243447" r="15" />
          <rect fill="#243447" height="10" width="40" x="30" y="65" />
          <text fill="#243447" fontSize="11" fontWeight="900" textAnchor="middle" x="50" y="100">DJ (발행자)</text>
          <path d="M110 60 h50" fill="none" stroke="#f58220" strokeWidth="3" />
        </g>

        {/* Radio Tower (Broker) */}
        <g transform="translate(220, 80)">
          <path d="M50 0 L100 150 L0 150 Z" fill="#f8fafc" stroke="#f58220" strokeWidth="2" />
          <circle cx="50" cy="20" fill="#f58220" r="8" />
          <circle cx="50" cy="20" fill="none" r="15" stroke="#f58220" strokeWidth="1">
            <animate attributeName="r" from="15" to="40" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="1" to="0" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <text fill="#9a4c0f" fontSize="12" fontWeight="900" textAnchor="middle" x="50" y="175">Broker (방송국)</text>
        </g>

        {/* Listeners (Subscribers) */}
        <g transform="translate(400, 100)">
          {[0, 1, 2].map(i => (
            <g key={i} transform={`translate(0, ${i * 45})`}>
              <rect fill="#fff" height="35" rx="4" stroke="#e2e8f0" strokeWidth="2" width="100" />
              <text fill="#4a5568" fontSize="10" fontWeight="800" textAnchor="middle" x="50" y="22">청취자 {i + 1}</text>
              <path d="M-40 -20 Q-20 0 0 15" fill="none" stroke="#cbd5e0" strokeWidth="1.5" />
            </g>
          ))}
          <text fill="#718096" fontSize="11" fontWeight="900" textAnchor="middle" x="50" y="145">Subscribers (구독자)</text>
        </g>
      </svg>
    )
  }

  if (type === 'ws-handshake') {
    return (
      <svg className={styles.deckVisual} viewBox="0 0 540 330">
        <rect className={styles.svgBg} height="330" rx="12" width="540" />
        <g transform="translate(60, 80)">
          {/* Client & Server */}
          <rect fill="#fff" height="150" rx="8" stroke="#e2e8f0" strokeWidth="2" width="100" />
          <rect fill="#fff" height="150" rx="8" stroke="#e2e8f0" strokeWidth="2" width="100" x="320" />
          <text fill="#2d3748" fontSize="12" fontWeight="800" textAnchor="middle" x="50" y="175">Client</text>
          <text fill="#2d3748" fontSize="12" fontWeight="800" textAnchor="middle" x="370" y="175">Server</text>

          {/* Steps */}
          <g transform="translate(110, 30)">
            <path d="M0 10 h300" fill="none" stroke="#3182ce" strokeWidth="2" />
            <text fill="#3182ce" fontSize="10" fontWeight="800" x="10" y="0">1. HTTP Upgrade Request</text>
            
            <g transform="translate(0, 40)">
              <path d="M300 10 h-300" fill="none" stroke="#38a169" strokeWidth="2" />
              <text fill="#38a169" fontSize="10" fontWeight="800" x="140" y="0">2. 101 Switching Protocols</text>
            </g>

            <g transform="translate(0, 90)">
              <rect fill="#fff9f3" height="30" rx="15" stroke="#f58220" strokeWidth="2.5" width="300" />
              <text fill="#9a4c0f" fontSize="11" fontWeight="900" textAnchor="middle" x="150" y="20">WebSocket Connection Established!</text>
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </g>
          </g>
        </g>
      </svg>
    )
  }

  if (type === 'ws-security') {
    return (
      <svg className={styles.deckVisual} viewBox="0 0 540 330">
        <rect className={styles.svgBg} height="330" rx="12" width="540" />
        <g transform="translate(60, 100)">
          {/* Incoming Message */}
          <rect fill="#fff" height="40" rx="4" stroke="#cbd5e0" strokeWidth="2" width="100" />
          <text fill="#4a5568" fontSize="11" fontWeight="800" textAnchor="middle" x="50" y="25">STOMP Message</text>
          
          {/* The Gate (Interceptor) */}
          <g transform="translate(160, -30)">
            <rect fill="#243447" height="160" width="40" x="0" y="0" />
            <text fill="#fff" fontSize="10" fontWeight="900" transform="rotate(90, 20, 80)" x="20" y="80">INTERCEPTOR</text>
            
            {/* JWT Check */}
            <circle cx="20" cy="40" fill="#f58220" r="12" />
            <text fill="#fff" fontSize="8" fontWeight="900" textAnchor="middle" x="20" y="43">JWT</text>
          </g>

          {/* Success Path */}
          <g transform="translate(200, 20)">
            <path d="M10 0 h150" fill="none" stroke="#38a169" strokeDasharray="4 4" strokeWidth="3" />
            <path d="M160 0 l-10 -5 M160 0 l-10 5" fill="none" stroke="#38a169" strokeWidth="2" />
            <rect fill="#f0fff4" height="60" rx="8" stroke="#38a169" strokeWidth="2" width="100" x="170" y="-30" />
            <text fill="#2f855a" fontSize="11" fontWeight="900" textAnchor="middle" x="220" y="5">Controller</text>
          </g>
        </g>
        <text fill="#1a202c" fontSize="18" fontWeight="850" textAnchor="middle" x="270" y="50">웹소켓 보안: 문지기(Interceptor) 전략</text>
      </svg>
    )
  }

  if (type === 'websocket-flow') {
    return (
      <svg className={styles.deckVisual} viewBox="0 0 540 330" role="img" aria-label="WebSocket Flow">
        <rect className={styles.svgBg} height="330" rx="12" width="540" />
        <g transform="translate(60, 100)">
          {/* Client */}
          <rect fill="#fff" height="60" rx="8" stroke="#e2e8f0" strokeWidth="2" width="100" />
          <text fill="#2d3748" fontSize="12" fontWeight="800" textAnchor="middle" x="50" y="35">Client</text>
          
          {/* Bi-directional Arrow */}
          <g transform="translate(110, 30)">
            <line stroke="#f58220" strokeWidth="3" x1="5" x2="145" y1="0" y2="0" />
            <path d="M5 -5 l-7 5 l7 5" fill="none" stroke="#f58220" strokeWidth="2" />
            <path d="M145 -5 l7 5 l-7 5" fill="none" stroke="#f58220" strokeWidth="2" />
            <text fill="#f58220" fontSize="10" fontWeight="800" textAnchor="middle" x="75" y="-10">Full-Duplex</text>
          </g>
          
          {/* Server */}
          <g transform="translate(260, -20)">
            <rect fill="#fff9f3" height="100" rx="8" stroke="#f58220" strokeWidth="2" width="140" />
            <text fill="#9a4c0f" fontSize="12" fontWeight="800" textAnchor="middle" x="70" y="40">Spring Boot</text>
            <text fill="#c05621" fontSize="10" fontWeight="700" textAnchor="middle" x="70" y="60">WebSocket Server</text>
            
            {/* STOMP Broker */}
            <rect fill="#f58220" height="20" rx="4" width="100" x="20" y="70" />
            <text fill="#fff" fontSize="9" fontWeight="800" textAnchor="middle" x="70" y="83">STOMP Broker</text>
          </g>
        </g>
        <text fill="#1a202c" fontSize="18" fontWeight="850" textAnchor="middle" x="270" y="50">웹소켓 양방향 통신 구조</text>
      </svg>
    )
  }

  if (type === 'redis-pubsub') {
    return (
      <svg className={styles.deckVisual} viewBox="0 0 540 330" role="img" aria-label="Redis Pub/Sub">
        <rect className={styles.svgBg} height="330" rx="12" width="540" />
        
        {/* Servers */}
        <g transform="translate(50, 60)">
          <rect fill="#fff" height="60" rx="8" stroke="#e2e8f0" strokeWidth="2" width="100" />
          <text fill="#2d3748" fontSize="10" fontWeight="800" textAnchor="middle" x="50" y="35">Server A</text>
        </g>
        
        <g transform="translate(390, 60)">
          <rect fill="#fff" height="60" rx="8" stroke="#e2e8f0" strokeWidth="2" width="100" />
          <text fill="#2d3748" fontSize="10" fontWeight="800" textAnchor="middle" x="50" y="35">Server B</text>
        </g>
        
        {/* Arrows to Redis */}
        <path d="M150 90 Q270 90 270 150" fill="none" stroke="#cbd5e0" strokeDasharray="4 4" strokeWidth="2" />
        <path d="M390 90 Q270 90 270 150" fill="none" stroke="#cbd5e0" strokeDasharray="4 4" strokeWidth="2" />
        
        {/* Redis */}
        <g transform="translate(210, 160)">
          <rect fill="#fef2f2" height="100" rx="12" stroke="#dc2626" strokeWidth="2.5" width="120" />
          <text fill="#dc2626" fontSize="14" fontWeight="900" textAnchor="middle" x="60" y="45">REDIS</text>
          <rect fill="#dc2626" height="20" rx="4" width="80" x="20" y="60" />
          <text fill="#fff" fontSize="10" fontWeight="800" textAnchor="middle" x="60" y="73">Pub / Sub</text>
        </g>
        
        <text fill="#1a202c" fontSize="18" fontWeight="850" textAnchor="middle" x="270" y="40">Redis를 이용한 서버 간 메시지 공유</text>
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
          ].map((item) => {
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
    </svg>
  )
}
