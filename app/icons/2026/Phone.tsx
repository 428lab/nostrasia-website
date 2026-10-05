import { SVGAttributes } from 'react'

/** 端末の画面の中身。empty＝空、post＝書いた投稿、signed＝署名済みの投稿 */
export type Screen = 'empty' | 'post' | 'signed'

/** スマホ（墨の本体＋灰白の画面・カメラ・ホームボタン） */
export const Phone = ({
  screen = 'empty',
  ...props
}: SVGAttributes<SVGElement> & { screen?: Screen }) => (
  <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
    <rect x="14" y="4" width="20" height="40" fill="var(--ink)" />
    <rect x="16" y="9" width="16" height="28" fill="var(--bg)" />
    <circle cx="24" cy="6.5" r="1.2" fill="var(--bg)" />
    <circle cx="24" cy="40.5" r="1.6" fill="var(--bg)" />
    {screen !== 'empty' && (
      <rect x="20" y="19" width="8" height="8" fill="var(--te)" />
    )}
    {screen === 'signed' && <circle cx="28" cy="27" r="3" fill="var(--or)" />}
  </svg>
)
