import { CSSProperties, ReactNode } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { useRevealOnce } from '~/hooks/useRevealOnce'
import { ShapeIcon, ShapeName } from '~/icons/2026/ShapeIcon'

import { Arch, Diag } from './Seams'

/** 全角を 1、半角を 0.7 文字ぶんとして数える（問いの文字を 1 行に収める font-size の計算用） */
const width = (text: string) =>
  Array.from(text).reduce(
    (sum, ch) => sum + (/[⺀-鿿＀-￯]/.test(ch) ? 1 : 0.7),
    0,
  )

/**
 * GT 面の問い。1 文字ずつ span に分け、画面に入ったとき 1 回だけ跳ねる / 押される。
 * 読み上げ用には全文を視覚的に隠して置き、1 文字ずつの span 群は読み上げから外す。
 */
const Question = ({
  id,
  text,
  anim,
}: {
  id: string
  text: string
  anim: 'jump' | 'stamp'
}) => {
  const [ref, shown] = useRevealOnce<HTMLHeadingElement>()
  return (
    <h2
      ref={ref}
      id={id}
      className={`q ${anim}${shown ? ' in' : ''}`}
      style={
        {
          '--n': Math.max(2, Math.round(width(text) * 10) / 10),
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
 * GT 面（橙地・墨の字）。幅いっぱいの問い → sticky の帯（Q.0N 問い LABEL）→ 本文。
 * locale の q.<id>.q / q.<id>.en / q.<id>.band を使う。
 */
export const GtFace = ({
  id,
  no,
  anim,
  children,
}: {
  id: string
  no: string
  anim: 'jump' | 'stamp'
  children: ReactNode
}) => {
  const { t } = useTranslation()
  const question = t(`q.${id}.q`)
  const headingId = `q-${id}`
  return (
    <section className="gt" id={id} data-camp="gt" aria-labelledby={headingId}>
      <div className="qb">
        <Question id={headingId} text={question} anim={anim} />
        <p className="qen">{t(`q.${id}.en`)}</p>
      </div>
      {/* 直後の問いと同じ文なので読み上げない */}
      <p className="band" aria-hidden="true">
        <b>Q.{no}</b>
        {question}
        <small>{t(`q.${id}.band`)}</small>
      </p>
      <div className="wrap">{children}</div>
    </section>
  )
}

/** BB 面の見出し。画面に入ったときに 1 回だけ図形アイコンがポンと出る */
export const BbHead = ({
  icon,
  headingId,
  sub,
}: {
  /** アイコンの形。見出しの文言も locale の bb.<icon>.en / bb.<icon>.ja から出す */
  icon: ShapeName
  headingId: string
  sub?: boolean
}) => {
  const { t } = useTranslation()
  const [ref, shown] = useRevealOnce<HTMLDivElement>()
  return (
    <div ref={ref} className={`sh${sub ? ' sub' : ''}${shown ? ' in' : ''}`}>
      <ShapeIcon name={icon} className="ic" />
      <h2 id={headingId}>
        <span className="en">{t(`bb.${icon}.en`)}</span>
        <span className="ja">{t(`bb.${icon}.ja`)}</span>
      </h2>
    </div>
  )
}

/**
 * BB 面（灰白の方眼・図形）。先頭に GT→BB の斜めの境目、末尾に BB→GT のアーチを置く。
 */
export const BbFace = ({
  id,
  headingId,
  diag,
  arch,
  children,
}: {
  id: string
  headingId: string
  diag: Parameters<typeof Diag>[0]
  arch: Parameters<typeof Arch>[0]
  children: ReactNode
}) => (
  <section className="bb" id={id} data-camp="bb" aria-labelledby={headingId}>
    <Diag {...diag} />
    <div className="wrap">{children}</div>
    <Arch {...arch} />
  </section>
)

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
        // 値はエスケープして差し込み、タグとして解釈させない。表示時に戻すので「A & B」が「A &amp; B」にならない
        shouldUnescape
      />
    </p>
  )
}
