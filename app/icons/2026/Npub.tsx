import { SVGAttributes } from 'react'

/** 公開鍵 npub を名札として描く（紫の札＋墨の吊り穴＋灰白の顔と名前の行） */
export const Npub = (props: SVGAttributes<SVGElement>) => (
  <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
    <rect x="6" y="14" width="36" height="24" fill="var(--pu)" />
    <path d="M20 14a4 4 0 0 1 8 0z" fill="var(--ink)" />
    <circle cx="16" cy="26" r="5" fill="var(--bg)" />
    <rect x="25" y="21" width="12" height="3" fill="var(--bg)" />
    <rect x="25" y="28" width="8" height="3" fill="var(--bg)" />
  </svg>
)
