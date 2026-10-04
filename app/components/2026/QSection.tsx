import { CSSProperties, Fragment, ReactNode } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { useRevealOnce } from '~/hooks/useRevealOnce'

import { QGlyph, QMark } from './Glyph'
import { joinLines, SECTIONS, SectionId, splitQuestion } from './sections'

/** 全角を 1、半角を 0.7 文字ぶんとして数える（問いの文字を 1 行に収める font-size の計算用） */
const width = (text: string) =>
  Array.from(text).reduce(
    (sum, ch) => sum + (/[\u2e80-\u9fff\uff00-\uffef]/.test(ch) ? 1 : 0.7),
    0,
  )

/** 図形の「？」の札の幅（文字幅に対する割合） */
const MARK_W = 0.6

/**
 * 問いの巨大文字。画面に入ったとき 1 回だけ、1 文字ずつスタンプのように押され、
 * 続いて「？」の札の 3 ピースが落ちてはまる。
 * 読み上げ用には全文を視覚的に隠して置き、1 文字ずつの span 群は読み上げから外す。
 */
const Question = ({ id, text }: { id: string; text: string }) => {
  const [ref, shown] = useRevealOnce<HTMLHeadingElement>(0.4)
  const { body, mark } = splitQuestion(text)
  const lines = body.split('\n')
  // 1 行に収める文字数ぶん。最後の行には「？」の札が付く
  const nChars = Math.max(
    ...lines.map(
      (l, i) => width(l) + (mark && i === lines.length - 1 ? MARK_W : 0),
    ),
  )
  let i = 0

  return (
    <h2
      ref={ref}
      id={id}
      className={shown ? 'q in' : 'q'}
      style={{ '--n': Math.round(nChars * 10) / 10 } as CSSProperties}
    >
      <span className="sr">{joinLines(text)}</span>
      <span aria-hidden="true">
        {lines.map((line, li) => (
          <Fragment key={li}>
            {li > 0 && <br />}
            {Array.from(line).map((ch) => (
              <span
                key={i}
                className="ch"
                style={{ '--i': i++ } as CSSProperties}
              >
                {ch}
              </span>
            ))}
          </Fragment>
        ))}
        {mark && (
          <span
            className="qm t ch"
            style={{ '--i': i, '--qd': `${i * 110 + 360}ms` } as CSSProperties}
          >
            <QGlyph v="t" />
          </span>
        )}
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
  const band = splitQuestion(question, true)
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
          <span>
            {band.body}
            {band.mark && <QMark v="c" />}
          </span>
          <small>{t(`q.${id}.band`)}</small>
        </p>
        <div className="qb">
          <Question id={headingId} text={question} />
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
