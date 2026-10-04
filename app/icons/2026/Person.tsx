import { SVGAttributes } from 'react'

/** 人（登壇者の仮アバター）。灰白の背景＋半円の体＋円の頭＋小物 1 つ（帽子・名札・なし） */
export const Person = ({
  body,
  head,
  acc,
  accColor,
  ...props
}: SVGAttributes<SVGElement> & {
  body: string
  head: string
  acc?: 'hat' | 'badge'
  accColor?: string
}) => (
  <svg viewBox="0 0 84 84" aria-hidden="true" {...props}>
    <rect width="84" height="84" fill="var(--bg)" />
    <path d="M14 84a28 28 0 0 1 56 0z" fill={body} />
    <circle cx="42" cy="34" r="13" fill={head} />
    {acc === 'hat' && <path d="M32 23h20L42 9z" fill={accColor} />}
    {acc === 'badge' && (
      <rect
        x="48"
        y="62"
        width="8"
        height="8"
        transform="rotate(45 52 66)"
        fill={accColor}
      />
    )}
  </svg>
)
