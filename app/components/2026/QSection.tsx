import { CSSProperties, ReactNode } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { useRevealOnce } from '~/hooks/useRevealOnce'

import { SECTIONS, SectionId } from './sections'

/** 全角を 1、半角を 0.85 文字ぶんとして数える（問いの文字を 1 行に収める font-size の計算用） */
const width = (text: string) =>
  Array.from(text).reduce(
    (sum, ch) => sum + (/[\u2e80-\u9fff\uff00-\uffef]/.test(ch) ? 1 : 0.85),
    0,
  )

/**
 * 問いの巨大文字。1 文字ずつ span に分け、画面に入ったとき 1 回だけ跳ねる / 押される。
 * 読み上げ用には全文を視覚的に隠して置き、1 文字ずつの span 群は読み上げから外す。
 */
const Question = ({
  id,
  text,
  anim,
  minN,
}: {
  id: string
  text: string
  anim: 'jump' | 'stamp'
  minN: number
}) => {
  const [ref, shown] = useRevealOnce<HTMLHeadingElement>()
  return (
    <h2
      ref={ref}
      id={id}
      className={`q ${anim}${shown ? ' in' : ''}`}
      style={
        {
          '--n': Math.max(minN, Math.round(width(text) * 10) / 10),
        } as CSSProperties
      }
    >
      <span className="sr">{text}</span>
      <span aria-hidden="true">
        {Array.from(text).map((ch, i) => (
          <span key={i} className="ch" style={{ '--i': i } as CSSProperties}>
            {ch}
          </span>
        ))}
      </span>
    </h2>
  )
}

/**
 * 斜めカット + 問いのセクション。
 * 先頭の帯（Q.0N 問い LABEL）だけがヘッダー直下に sticky で残る。
 */
export const QSection = ({
  id,
  children,
}: {
  id: SectionId
  children: ReactNode
}) => {
  const { t } = useTranslation()
  const s = SECTIONS.find((x) => x.id === id)!
  const question = t(`q.${id}.q`)
  const headingId = `q-${id}`
  // 紫の面へは左下がり、オレンジの面へは右下がりのカット
  const cutClass = s.tone === 'p' ? 'cut o to-p' : 'cut r p to-o'

  return (
    <>
      <div className={cutClass} aria-hidden="true">
        <span>Q.{s.no}</span>
      </div>
      <section className={`sec ${s.tone}`} id={id} aria-labelledby={headingId}>
        <p className="band">
          <b>Q.{s.no}</b>
          {question}
          <small>{t(`q.${id}.band`)}</small>
        </p>
        <div className="qb">
          <Question
            id={headingId}
            text={question}
            anim={s.anim}
            minN={'minN' in s ? s.minN : 2}
          />
          <p className="qen">{t(`q.${id}.en`)}</p>
        </div>
        <div className="body">{children}</div>
      </section>
    </>
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
