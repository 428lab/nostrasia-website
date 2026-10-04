import { SVGAttributes } from 'react'

/** リレー（墨の筐体 3 段＋灰白のスロット＋ランプ）。lit で投稿を預かった印にランプを黄にする */
export const Relay = ({
  lit = false,
  ...props
}: SVGAttributes<SVGElement> & { lit?: boolean }) => (
  <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
    {[6, 19, 32].map((y) => (
      <g key={y}>
        <rect x="9" y={y} width="30" height="10" fill="var(--ink)" />
        <rect x="12" y={y + 4} width="12" height="2" fill="var(--bg)" />
        <circle
          cx="34"
          cy={y + 5}
          r="2"
          fill={lit ? 'var(--ye)' : 'var(--bg)'}
        />
      </g>
    ))}
  </svg>
)
