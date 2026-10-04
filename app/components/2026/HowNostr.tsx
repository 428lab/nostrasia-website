import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { hydratedLate } from '~/hooks/useRevealOnce'
import { KeyIcon } from '~/icons/2026/KeyIcon'
import { Note } from '~/icons/2026/Note'
import { Npub } from '~/icons/2026/Npub'
import { Pc } from '~/icons/2026/Pc'
import { Phone } from '~/icons/2026/Phone'
import { Relay } from '~/icons/2026/Relay'
import { Sig } from '~/icons/2026/Sig'

import { SectionHead } from './SectionHead'

type Step = 1 | 2 | 3 | 4
/** [x(%), y(%), 拡大率, 不透明度] */
type Place = readonly [number, number, number, number]

/** 図の部品ごとの、ステップ 1〜4 での配置 */
// prettier-ignore
const PLACES: Record<string, readonly [Place, Place, Place, Place]> = {
  phone: [[28, 55, 1.8, 1], [16, 55, 0.9, 1], [14, 50, 1, 1], [14, 50, 1, 0.4]],
  nsec: [[66, 38, 1.1, 1], [30, 30, 0.8, 1], [30, 30, 0.6, 0], [30, 30, 0.6, 0]],
  npub: [[66, 70, 1.1, 1], [82, 78, 0.7, 1], [82, 78, 0.6, 0], [82, 78, 0.6, 0]],
  note: [[55, 50, 0.6, 0], [55, 50, 1.6, 1], [34, 50, 0.8, 1], [34, 50, 0.6, 0]],
  sig: [[55, 50, 0.3, 0], [55, 50, 0.8, 1], [34, 50, 0.4, 1], [34, 50, 0.3, 0]],
  r1: [[74, 18, 0.6, 0], [74, 18, 0.6, 0], [74, 18, 0.9, 1], [50, 18, 0.9, 1]],
  r2: [[74, 50, 0.6, 0], [74, 50, 0.6, 0], [74, 50, 0.9, 1], [50, 50, 0.9, 1]],
  r3: [[74, 82, 0.6, 0], [74, 82, 0.6, 0], [74, 82, 0.9, 1], [50, 82, 0.9, 1]],
  pc: [[84, 30, 0.6, 0], [84, 30, 0.6, 0], [84, 30, 0.6, 0], [84, 30, 1.2, 1]],
  phone2: [[84, 72, 0.6, 0], [84, 72, 0.6, 0], [84, 72, 0.6, 0], [84, 72, 1.2, 1]],
}

/** 署名ロゼットをノートの右下に重ねるずらし量（ノートの 48 単位座標で、ノート中心から） */
const SIG_OFFSET = 12

/** 図の部品（id は PLACES のキー）。hint はステップ 1 だけ説明つきのラベルにする */
const ITEMS: readonly {
  id: string
  icon: (step: Step) => ReactNode
  hint?: boolean
}[] = [
  { id: 'phone', icon: (s) => <Phone screen={s === 1 ? 'empty' : 'post'} /> },
  { id: 'nsec', icon: () => <KeyIcon />, hint: true },
  { id: 'npub', icon: () => <Npub />, hint: true },
  { id: 'note', icon: () => <Note /> },
  { id: 'sig', icon: () => <Sig /> },
  { id: 'r1', icon: (s) => <Relay lit={s >= 3} /> },
  { id: 'r2', icon: (s) => <Relay lit={s >= 3} /> },
  { id: 'r3', icon: (s) => <Relay lit={s >= 3} /> },
  { id: 'pc', icon: () => <Pc screen="signed" /> },
  { id: 'phone2', icon: () => <Phone screen="signed" /> },
]

const STEPS: Step[] = [1, 2, 3, 4]

/**
 * Nostr はじめて。図は sticky で固定し、本文のステップは普通にスクロールする。
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
    <section className="sec" id="how">
      <div className="wrap">
        <SectionHead label={t('how.label')} title={t('how.title')} />
        <p className="lead mb">{t('how.lead')}</p>
        <div className="how-w">
          <div className="fig" data-step={figStep} aria-hidden="true">
            <p className="lbl">
              {t('how.figStep', { n: figStep })}
              <b>{t(`how.steps.${figStep}.name`)}</b>
            </p>
            <svg
              className="ln"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <g style={{ opacity: figStep === 3 ? 1 : 0 }}>
                <line x1="14" y1="50" x2="74" y2="18" />
                <line x1="14" y1="50" x2="74" y2="50" />
                <line x1="14" y1="50" x2="74" y2="82" />
              </g>
              <g style={{ opacity: figStep === 4 ? 1 : 0 }}>
                <line x1="50" y1="18" x2="84" y2="30" />
                <line x1="50" y1="50" x2="84" y2="30" />
                <line x1="50" y1="82" x2="84" y2="30" />
                <line x1="50" y1="18" x2="84" y2="72" />
                <line x1="50" y1="50" x2="84" y2="72" />
                <line x1="50" y1="82" x2="84" y2="72" />
              </g>
            </svg>
            {ITEMS.map(({ id, icon, hint }) => {
              const [x, y, s, o] = PLACES[id][figStep - 1]
              // 署名はノートと同じ位置を基準に、ノートの拡大率に合わせて右下へずらす
              const d =
                id === 'sig' ? SIG_OFFSET * PLACES.note[figStep - 1][2] : 0
              return (
                <div
                  key={id}
                  className={`it i-${id}`}
                  style={
                    {
                      '--x': x,
                      '--y': y,
                      '--s': s,
                      '--o': o,
                      '--d': d,
                    } as CSSProperties
                  }
                >
                  <i>{icon(figStep)}</i>
                  <span>
                    {t(
                      hint && figStep === 1
                        ? `how.fig.${id}Hint`
                        : `how.fig.${id}`,
                    )}
                  </span>
                </div>
              )
            })}
          </div>
          <ol className="steps" ref={stepsRef}>
            {STEPS.map((n) => (
              <li
                key={n}
                className={step === n ? 'step on' : 'step'}
                data-s={n}
              >
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
      </div>
    </section>
  )
}
