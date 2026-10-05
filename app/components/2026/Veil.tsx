import { ReactNode } from 'react'

/**
 * 未定の内容をすりガラス状に覆う。下の中身はぼかした飾りとして見せるだけで、読み上げない。
 * 中身にリンクやボタンを入れないこと（膜で押せなくなる）。
 */
export const Veil = ({
  title,
  sub,
  children,
}: {
  title: string
  sub: string
  children: ReactNode
}) => (
  <div className="veiled">
    <div className="veiled-body" aria-hidden="true">
      {children}
    </div>
    <p className="veil">
      <b>{title}</b>
      <span>{sub}</span>
    </p>
  </div>
)
