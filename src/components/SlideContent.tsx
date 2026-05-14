import type { Slide } from '../types'
import { CodePanel } from './CodePanel'
import { DeckVisual } from './DeckVisual'
import styles from './SlideContent.module.css'

type SlideContentProps = {
  slide: Slide
  index: number
  showCodeOnly?: boolean
}

export function SlideContent({ slide, index }: SlideContentProps) {
  const hasVisual = !!(slide.visual || slide.checklist)
  const isCodeSlide = !!slide.code

  return (
    <article 
      className={`
        ${styles.slide} 
        ${isCodeSlide ? styles.slideWithCode : ''} 
        ${hasVisual ? styles.slideWithVisual : ''}
      `} 
      key={index}
    >
      <div className={styles.slideCopy}>
        <p className={styles.eyebrow}>{slide.eyebrow}</p>
        <h1 className={styles.title}>{slide.title}</h1>
        {slide.summary && <p className={styles.summary}>{slide.summary}</p>}

        {slide.bullets && (
          <ul className={styles.bullets}>
            {slide.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        )}
      </div>

      {(slide.visual || slide.checklist) && !isCodeSlide && (
        <aside className={styles.visualPanel} aria-label="시각 자료">
          {slide.visual && <DeckVisual terms={slide.bullets} type={slide.visual} />}

          {slide.checklist && (
            <div className={styles.checkGrid}>
              {slide.checklist.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          )}
        </aside>
      )}

      {slide.table && (
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                {slide.table.headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slide.table.rows.map((row) => (
                <tr key={row.join('-')}>
                  {row.map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {slide.code && (
        <div className={styles.codePanelWrap}>
          <CodePanel code={slide.code} />
        </div>
      )}
    </article>
  )
}
