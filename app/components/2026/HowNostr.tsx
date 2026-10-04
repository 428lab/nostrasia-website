import { CSSProperties, useEffect, useRef, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { hydratedLate } from '~/hooks/useRevealOnce'

import { BbFace, BbHead } from './Faces'

type Step = 1 | 2 | 3 | 4
/** [x(%), y(%), 拡大率, 不透明度] */
type Place = readonly [number, number, number, number]

/** 図の部品ごとの、ステップ 1〜4 での配置 */
// prettier-ignore
const PLACES: Record<string, readonly [Place, Place, Place, Place]> = {
  nsec: [[34, 52, 1.4, 1], [20, 34, 0.85, 1], [12, 18, 0.55, 0.6], [12, 22, 0.55, 0.6]],
  npub: [[68, 52, 1.2, 1], [20, 76, 0.7, 0.6], [12, 86, 0.55, 0.5], [12, 84, 0.55, 0.6]],
  note: [[50, 52, 0.4, 0], [60, 56, 1.3, 1], [24, 50, 0.9, 1], [20, 50, 0.75, 1]],
  sig: [[50, 52, 0.3, 0], [62, 38, 1.1, 1], [30, 40, 0.7, 1], [24, 38, 0.55, 1]],
  r1: [[86, 20, 0.4, 0], [86, 20, 0.4, 0], [76, 20, 1, 1], [50, 20, 0.8, 1]],
  r2: [[86, 50, 0.4, 0], [86, 50, 0.4, 0], [76, 50, 1, 1], [50, 50, 0.8, 1]],
  r3: [[86, 80, 0.4, 0], [86, 80, 0.4, 0], [76, 80, 1, 1], [50, 80, 0.8, 1]],
  cl: [[92, 50, 0.4, 0], [92, 50, 0.4, 0], [94, 50, 0.5, 0], [82, 52, 1, 1]],
}

/** 図の部品（id は PLACES のキー、kind は形のクラス） */
const ITEMS = [
  { id: 'nsec', kind: 'k' },
  { id: 'npub', kind: 'k2' },
  { id: 'note', kind: 'n' },
  { id: 'sig', kind: 'g' },
  { id: 'r1', kind: 'r' },
  { id: 'r2', kind: 'r' },
  { id: 'r3', kind: 'r' },
  { id: 'cl', kind: 'cl' },
] as const

const STEPS: Step[] = [1, 2, 3, 4]

/**
 * Nostr、はじめて？ 図は sticky で固定し、本文のステップは普通にスクロールする。
 * どのステップが画面中央付近にあるかを IntersectionObserver で見て、図を離散的に切り替える。
 * JS が動かないあいだと no-hydrate では全体図（ステップ 4）のまま切り替えない。
 */
export const HowNostr = () => {
  const { t } = useTranslation()
  const [step, setStep] = useState<Step | null>(null)
  const stepsRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const list = stepsRef.current
    if (!list || !('IntersectionObserver' in window) || hydratedLate()) return
    setStep(1)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const s = Number((entry.target as HTMLElement).dataset.s)
          if (s >= 1 && s <= 4) setStep(s as Step)
        })
      },
      { rootMargin: '-50% 0px -40% 0px' },
    )
    list.querySelectorAll('.step').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const figStep: Step = step ?? 4

  return (
    <BbFace
      id="nostr"
      headingId="h-nostr"
      diag={{ dir: 'l', f: 0.8, piece: 'circle' }}
      arch={{ side: -1, rotate: -14 }}
    >
      <BbHead icon="nostr" headingId="h-nostr" />
      <p className="bl">{t('how.lead')}</p>
      <div className="how-w">
        <div className="fig" aria-hidden="true">
          <p className="lbl">
            {t('how.figStep', { n: figStep })}
            <b>{t(`how.steps.${figStep}.name`)}</b>
          </p>
          <svg className="ln" viewBox="0 0 100 100" preserveAspectRatio="none">
            <g style={{ opacity: figStep === 3 ? 1 : 0 }}>
              <line x1="28" y1="50" x2="74" y2="20" />
              <line x1="28" y1="50" x2="74" y2="50" />
              <line x1="28" y1="50" x2="74" y2="80" />
            </g>
            <g style={{ opacity: figStep === 4 ? 1 : 0 }}>
              <line x1="50" y1="20" x2="80" y2="50" />
              <line x1="50" y1="50" x2="80" y2="50" />
              <line x1="50" y1="80" x2="80" y2="50" />
              <line x1="22" y1="50" x2="50" y2="20" />
              <line x1="22" y1="50" x2="50" y2="50" />
              <line x1="22" y1="50" x2="50" y2="80" />
            </g>
          </svg>
          {ITEMS.map(({ id, kind }) => {
            const [x, y, s, o] = PLACES[id][figStep - 1]
            return (
              <div
                key={id}
                className={`it ${kind}`}
                style={
                  { '--x': x, '--y': y, '--s': s, '--o': o } as CSSProperties
                }
              >
                <i />
                <span>{t(`how.fig.${id}`)}</span>
              </div>
            )
          })}
        </div>
        <ol className="steps" ref={stepsRef}>
          {STEPS.map((n) => (
            <li key={n} className={step === n ? 'step on' : 'step'} data-s={n}>
              <h3>
                <em>{`0${n}`}</em>
                {t(`how.steps.${n}.title`)}
              </h3>
              <p>
                <Trans
                  i18nKey={`how.steps.${n}.body`}
                  components={{ c: <code /> }}
                />
              </p>
            </li>
          ))}
        </ol>
      </div>
    </BbFace>
  )
}
