import { CSSProperties, ReactNode } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { useRevealOnce } from '~/hooks/useRevealOnce'
import { Mark } from '~/icons/2026/Shapes'

import { Answer } from './Answers'
import { SECTIONS, SectionId, isJa } from './sections'

/** EN の 1 字の幅（em）の見積もり。問いを画面幅に収める font-size の計算用 */
const latWidth = (text: string) =>
  Array.from(text).reduce((sum, ch) => sum + (ch === ' ' ? 0.3 : 0.9), 0)

/**
 * 問いを字群に分ける。JA は sections.ts の jaBreak で 2 つに、EN は単語ごとに分ける。
 * 字群の中では改行せず、狭い画面では字群の間で改行する。
 */
const splitQuestion = (text: string, ja: boolean, jaBreak?: number) => {
  if (!ja) return text.split(' ')
  const chars = Array.from(text)
  return jaBreak
    ? [chars.slice(0, jaBreak).join(''), chars.slice(jaBreak).join('')]
    : [text]
}

/**
 * 問いの巨大文字と答えの図形。画面に入ったとき 1 回だけ、字が跳ねる → 答えの図形が落ちて弾む。
 * 読み上げ用には全文を視覚的に隠して置き、1 文字ずつの span 群は読み上げから外す。
 */
const Question = ({ id, headingId }: { id: SectionId; headingId: string }) => {
  const { t, i18n } = useTranslation()
  const [ref, shown] = useRevealOnce<HTMLDivElement>(0.3)
  const s = SECTIONS.find((x) => x.id === id)!
  const ja = isJa(i18n)
  const text = t(`q.${id}.q`)
  const groups = splitQuestion(text, ja, 'jaBreak' in s ? s.jaBreak : undefined)
  // --n: 狭い画面で 1 行に収める字数（いちばん長い字群）、--nw: 広い画面で 1 行に収める字数（全体）
  const n = ja
    ? Math.max(...groups.map((g) => Array.from(g).length))
    : Math.max(3, ...groups.map(latWidth))
  const nw = ja ? Array.from(text).length : Math.max(3, latWidth(text))
  let i = 0

  return (
    <div
      ref={ref}
      className={shown ? 'qw in' : 'qw'}
      style={
        {
          '--n': Math.round(n * 10) / 10,
          '--nw': Math.round(nw * 10) / 10,
          '--qc': Array.from(text).length,
        } as CSSProperties
      }
    >
      <h2 className={ja ? 'q' : 'q lat'} id={headingId}>
        <span className="sr">{text}</span>
        <span aria-hidden="true">
          {groups.map((g, gi) => (
            <span key={`${g}-${gi}`}>
              {!ja && gi > 0 && ' '}
              <span className="ql">
                {Array.from(g).map((ch) => (
                  <span
                    key={i}
                    className="ch"
                    style={{ '--i': i++ } as CSSProperties}
                  >
                    {ch}
                  </span>
                ))}
                {gi === groups.length - 1 && <Answer id={id} />}
              </span>
            </span>
          ))}
        </span>
      </h2>
    </div>
  )
}

/**
 * 1 つの問いのセクション: 帯（Q.0N 印 問い LABEL、ヘッダー直下に sticky）
 * → 橙の問いの面（問い・答えの図形・キャプション）→ 灰白の本文の面。
 */
export const QSection = ({
  id,
  marks,
  caption,
  children,
}: {
  id: SectionId
  /** キャプションに並べる図形とその意味 */
  marks: { icon: ReactNode; label: string }[]
  caption: ReactNode
  children: ReactNode
}) => {
  const { t } = useTranslation()
  const s = SECTIONS.find((x) => x.id === id)!
  const headingId = `q-${id}`

  return (
    <section className="sec" id={id} aria-labelledby={headingId}>
      <p className="band">
        <b>Q.{s.no}</b>
        <Mark id={id} />
        {t(`q.${id}.q`)}
        <small>{t(`q.${id}.band`)}</small>
      </p>
      <div className="qf">
        <Question id={id} headingId={headingId} />
        <p className="qen">{t(`q.${id}.en`)}</p>
        <div className="cap">
          <b className="ck">A.</b>
          <ul>
            {marks.map((m, i) => (
              <li key={`${m.label}-${i}`}>
                {m.icon}
                {m.label}
              </li>
            ))}
          </ul>
          <p>{caption}</p>
        </div>
      </div>
      <div className="bf">
        <div className="body">{children}</div>
      </div>
    </section>
  )
}

/** リード文。locale の <m>…</m> を黄色のマーカーにする。改行は \n */
export const Lead = ({
  i18nKey,
  values,
}: {
  i18nKey: string
  values?: Record<string, string | number>
}) => {
  const { t } = useTranslation()
  return (
    <p className="lead">
      <Trans
        t={t}
        i18nKey={i18nKey}
        values={values}
        components={{ m: <mark /> }}
        tOptions={{ interpolation: { escapeValue: false } }}
      />
    </p>
  )
}
