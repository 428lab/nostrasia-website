import { CSSProperties, ReactNode } from 'react'

import { useRevealOnce } from '~/hooks/useRevealOnce'

/**
 * 陣地の境目。GT→BB は斜め（Diag）、BB→GT は半円のアーチ（Arch）で切る。
 * 境目ごとに越境ピースを 1 個だけ置き、境目が画面に入ったとき 1 回だけ相手の陣地へ転がり込ませる。
 */

/** 越境ピースが転がり込むタイミング（境目の半分が画面の下 15% より上に入ったとき） */
const useSeamReveal = <T extends Element>() =>
  useRevealOnce<T>(0.5, '0px 0px -15% 0px')

/** GT→BB の越境ピース（墨の影＋色の図形。viewBox 60×60） */
const DIAG_PIECES: Record<
  'circle' | 'square' | 'triangle' | 'half',
  ReactNode
> = {
  circle: (
    <>
      <circle cx="33" cy="33" r="26" fill="#1B0B2E" />
      <circle
        cx="30"
        cy="30"
        r="26"
        fill="#8E30EB"
        stroke="#1B0B2E"
        strokeWidth="3"
      />
      <circle cx="39" cy="20" r="6" fill="#F5F5F5" />
    </>
  ),
  square: (
    <>
      <rect x="9" y="9" width="48" height="48" fill="#1B0B2E" />
      <rect
        x="6"
        y="6"
        width="48"
        height="48"
        fill="#FFD400"
        stroke="#1B0B2E"
        strokeWidth="3"
      />
      <rect x="14" y="14" width="10" height="10" fill="#1B0B2E" />
    </>
  ),
  triangle: (
    <>
      <path d="M33 7L59 57H7z" fill="#1B0B2E" />
      <path
        d="M30 4L56 54H4z"
        fill="#0E7C7B"
        stroke="#1B0B2E"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </>
  ),
  half: (
    <>
      <path d="M7 47a26 26 0 0 1 52 0z" fill="#1B0B2E" />
      <path
        d="M4 44a26 26 0 0 1 52 0z"
        fill="#8E30EB"
        stroke="#1B0B2E"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </>
  ),
}

/**
 * GT→BB の斜めの境目（BB 面の先頭に置く）。
 * dir: l = 左下がり（橙の三角が左に残る）/ r = 右下がり
 * f: 越境ピースを置く横位置（0〜1）
 */
export const Diag = ({
  dir,
  f,
  piece,
}: {
  dir: 'l' | 'r'
  f: number
  piece: keyof typeof DIAG_PIECES
}) => {
  const [ref, shown] = useSeamReveal<HTMLDivElement>()
  return (
    <>
      <div ref={ref} className={`in-diag ${dir}`} aria-hidden="true" />
      <i
        className={`xp xd ${dir}${shown ? ' in' : ''}`}
        style={{ '--f': f } as CSSProperties}
        aria-hidden="true"
      >
        <svg viewBox="0 0 60 60">{DIAG_PIECES[piece]}</svg>
      </i>
    </>
  )
}

/**
 * BB→GT の半円アーチの境目（BB 面の末尾に置く）。越境ピースは「？」。
 * side: 1 = 右から転がり込む / -1 = 左から。rotate: 止まったときの傾き（deg）
 */
export const Arch = ({ side, rotate }: { side: 1 | -1; rotate: number }) => {
  const [ref, shown] = useSeamReveal<HTMLDivElement>()
  return (
    <div className="in-arch" aria-hidden="true">
      <div ref={ref} className="dome">
        <i
          className={`xp xa${shown ? ' in' : ''}`}
          style={
            {
              '--c': 0.788 * side,
              '--s': 0.616,
              '--fr': `${rotate}deg`,
              '--sx0': `${-57 * side}px`,
              '--sy0': '44px',
              '--sr0': `${-290 * side}deg`,
            } as CSSProperties
          }
        >
          ？
        </i>
      </div>
    </div>
  )
}
