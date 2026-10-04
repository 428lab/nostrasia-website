import { SVGAttributes } from 'react'

/** 署名 sig をロゼット（認証印）として描く（朱の印とリボン＋灰白の抜き＋朱の菱形） */
export const Sig = (props: SVGAttributes<SVGElement>) => (
  <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
    <path d="M16 26h6l-5 14z" fill="var(--or)" />
    <path d="M26 26h6l-1 14z" fill="var(--or)" />
    <circle cx="24" cy="20" r="10" fill="var(--or)" />
    <circle cx="24" cy="20" r="5" fill="var(--bg)" />
    <rect
      x="22"
      y="18"
      width="4"
      height="4"
      transform="rotate(45 24 20)"
      fill="var(--or)"
    />
  </svg>
)
