import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import type { Slide } from '../types'

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

  return (
    <section className="code-panel" aria-label={code.title}>
      <header>
        <span>{code.title}</span>
        <div className="code-actions">
          <em>{code.language}</em>
          <button onClick={copyCode} type="button">
            {copied ? <Check aria-hidden="true" size={15} /> : <Copy aria-hidden="true" size={15} />}
            <span>{copied ? '복사됨' : '복사'}</span>
          </button>
        </div>
      </header>
      <pre>
        <code>{code.body}</code>
      </pre>
    </section>
  )
}
