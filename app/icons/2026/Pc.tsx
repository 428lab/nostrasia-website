import { SVGAttributes } from 'react'

import { Screen } from './Phone'

/** PC（墨のモニター枠・スタンド・台座＋灰白の画面） */
export const Pc = ({
  screen = 'empty',
  ...props
}: SVGAttributes<SVGElement> & { screen?: Screen }) => (
  <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
    <rect x="5" y="8" width="38" height="25" fill="var(--ink)" />
    <rect x="8" y="11" width="32" height="19" fill="var(--bg)" />
    <path d="M24 31l7 9H17z" fill="var(--ink)" />
    <rect x="12" y="40" width="24" height="3" fill="var(--ink)" />
    {screen !== 'empty' && (
      <rect x="20" y="16" width="8" height="8" fill="var(--te)" />
    )}
    {screen === 'signed' && <circle cx="28" cy="24" r="3" fill="var(--or)" />}
  </svg>
)
