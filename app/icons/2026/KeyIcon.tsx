import { SVGAttributes } from 'react'

/** 秘密鍵 nsec（紫の持ち手・軸・歯＋灰白の穴） */
export const KeyIcon = (props: SVGAttributes<SVGElement>) => (
  <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
    <circle cx="14" cy="24" r="9" fill="var(--pu)" />
    <circle cx="14" cy="24" r="3.5" fill="var(--bg)" />
    <rect x="21" y="22" width="22" height="4" fill="var(--pu)" />
    <rect x="33" y="26" width="4" height="5" fill="var(--pu)" />
    <rect x="39" y="26" width="4" height="7" fill="var(--pu)" />
  </svg>
)
