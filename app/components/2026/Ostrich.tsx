import { CSSProperties } from 'react'

/**
 * ヒーローの 12 ピースのダチョウ（単位 u は .stage の大きさから CSS で決まる）。
 * 首と頭（NECK）は境目を越えて橙側に入るので、墨と白だけで描く。
 * k: 形（c 円 / t 三角 / h 半円 / 無し 四角）、w h: 大きさ、fx fy fr: 定位置と回転、
 * sx sy sr ss: 読み込み時に飛んでくる元の位置・回転・拡大率
 */
type Piece = {
  k?: 'c' | 't' | 'h'
  c: string
  w: number
  h: number
  fx: number
  fy: number
  fr: number
}
type FlyPiece = Piece & { sx: number; sy: number; sr: number; ss: number }

// prettier-ignore
const BODY: FlyPiece[] = [
  { k: 'c', c: '#8E30EB', w: 32, h: 32, fx: -4, fy: 6, fr: 0, sx: -0.62, sy: -0.62, sr: 0, ss: 1.25 },
  { k: 't', c: '#FF5A1F', w: 14, h: 18, fx: -23, fy: -3, fr: -55, sx: 0.75, sy: -0.72, sr: 20, ss: 1.6 },
  { k: 'h', c: '#0E7C7B', w: 22, h: 11, fx: -6, fy: 4, fr: 195, sx: 0.66, sy: 0.64, sr: -30, ss: 1.4 },
  { c: '#FFD400', w: 8, h: 8, fx: 8, fy: 5, fr: 45, sx: -0.95, sy: 0.15, sr: 15, ss: 1.8 },
  { c: '#1B0B2E', w: 2.6, h: 26, fx: -9, fy: 33, fr: 6, sx: -0.97, sy: -0.32, sr: 35, ss: 1 },
  { c: '#1B0B2E', w: 2.6, h: 26, fx: 1, fy: 33, fr: -8, sx: 0.52, sy: 0.88, sr: -50, ss: 1 },
  { k: 'h', c: '#0E7C7B', w: 8, h: 4, fx: -10.5, fy: 47, fr: 0, sx: -0.36, sy: -0.86, sr: 30, ss: 2.2 },
  { k: 'h', c: '#0E7C7B', w: 8, h: 4, fx: 3, fy: 47, fr: 0, sx: 0.95, sy: 0.4, sr: 90, ss: 2.2 },
]

// prettier-ignore
const NECK: (Piece & { ring?: boolean })[] = [
  { c: '#1B0B2E', w: 5, h: 28, fx: 11.5, fy: -17.5, fr: 20 },
  { k: 'c', c: '#F5F5F5', w: 10, h: 10, fx: 16, fy: -30, fr: 0, ring: true },
  { k: 't', c: '#1B0B2E', w: 7, h: 8, fx: 22.5, fy: -30, fr: 90 },
  { k: 'c', c: '#1B0B2E', w: 2.4, h: 2.4, fx: 17.5, fy: -31.5, fr: 0 },
]

const vars = (p: Piece) => ({
  '--c': p.c,
  '--w': p.w,
  '--h': p.h,
  '--fx': p.fx,
  '--fy': p.fy,
  '--fr': p.fr,
})

/** 胴の 1 個目（円）。ヒーローの境目の計算で大きさの基準にする */
export const OSTRICH_BASE_CLASS = 'b0'

export const Ostrich = () => (
  <>
    {BODY.map((p, i) => (
      <i
        key={i}
        className={['s', p.k, 'f', i === 0 && OSTRICH_BASE_CLASS]
          .filter(Boolean)
          .join(' ')}
        style={
          {
            ...vars(p),
            '--i': i,
            '--sx': p.sx,
            '--sy': p.sy,
            '--sr': p.sr,
            '--ss': p.ss,
          } as CSSProperties
        }
      />
    ))}
    <span className="hg">
      {NECK.map((p, i) => (
        <i
          key={i}
          className={['s', p.k, p.ring && 'ring'].filter(Boolean).join(' ')}
          style={vars(p) as CSSProperties}
        />
      ))}
    </span>
  </>
)
