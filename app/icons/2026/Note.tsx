import { SVGAttributes } from 'react'

/** 投稿 note（青緑の紙＋折り返しの角＋灰白の本文の行） */
export const Note = (props: SVGAttributes<SVGElement>) => (
  <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
    <rect x="10" y="5" width="28" height="38" fill="var(--te)" />
    <path d="M30 5h8v8z" fill="var(--bg)" />
    <path d="M30 5v8h8z" fill="var(--ink)" />
    <rect x="14" y="16" width="20" height="3" fill="var(--bg)" />
    <rect x="14" y="23" width="20" height="3" fill="var(--bg)" />
    <rect x="14" y="30" width="12" height="3" fill="var(--bg)" />
  </svg>
)
