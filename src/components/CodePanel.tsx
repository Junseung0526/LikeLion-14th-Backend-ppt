import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import type { Slide } from '../types'
import styles from './CodePanel.module.css'

type CodePanelProps = {
  code: NonNullable<Slide['code']>
}

export function CodePanel({ code }: CodePanelProps) {
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    await navigator.clipboard.writeText(code.body)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  const highlight = (text: string) => {
    // Escape HTML first to prevent XSS and tag confusion
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    // Combined regex for all tokens to ensure single-pass processing
    // Groups: 1:Attr, 2:Comment, 3:String, 4:Keyword, 5:Method, 6:Type, 7:Number
    const tokens = [
      '(@\\w+)',                                     // Annotations
      '(\\/\\/.*)',                                 // Comments
      '("[^"]*")',                                  // Strings
      '\\b(public|private|protected|class|interface|extends|implements|return|new|import|package|void|final|static|if|else|for|while|try|catch|finally|throw|throws|instanceof|boolean|int|long|float|double|char|byte|short)\\b', // Keywords
      '\\b(\\w+)(?=\\s*\\()',                       // Methods
      '\\b([A-Z][a-zA-Z0-9]+)\\b',                  // Types
      '\\b(\\d+)\\b'                                // Numbers
    ]
    const combinedRegex = new RegExp(tokens.join('|'), 'g')

    const html = escaped.replace(combinedRegex, (match, attr, comment, str, keyword, method, type, num) => {
      if (attr) return `<span class="${styles.codeAttr}">${attr}</span>`
      if (comment) return `<span class="${styles.codeComment}">${comment}</span>`
      if (str) return `<span class="${styles.codeString}">${str}</span>`
      if (keyword) return `<span class="${styles.codeKeyword}">${keyword}</span>`
      if (method) return `<span class="${styles.codeMethod}">${method}</span>`
      if (type) return `<span class="${styles.codeType}">${type}</span>`
      if (num) return `<span class="${styles.codeNumber}">${num}</span>`
      return match
    })

    return <code dangerouslySetInnerHTML={{ __html: html }} />
  }

  return (
    <section className={styles.codePanel} aria-label={code.title}>
      <header>
        <span>{code.title}</span>
        <div className={styles.codeActions}>
          <em>{code.language}</em>
          <button onClick={copyCode} type="button">
            {copied ? <Check aria-hidden="true" size={15} /> : <Copy aria-hidden="true" size={15} />}
            <span>{copied ? '복사됨' : '복사'}</span>
          </button>
        </div>
      </header>
      <pre>
        {highlight(code.body)}
      </pre>
    </section>
  )
}
