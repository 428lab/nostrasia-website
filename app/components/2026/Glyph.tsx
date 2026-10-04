import { CSSProperties, ReactNode } from 'react'

import { useRevealOnce } from '~/hooks/useRevealOnce'

import { FACE, GL, LOOSE, Loose, OST, Piece } from './glyphs'

/** 1 格子 = 10、字間 0.6 格子 */
const U = 10
const TR = 0.6

const n = (v: number) => Math.round(v * U * 100) / 100
const pt = (cx: number, cy: number, r: number, deg: number) => {
  const a = (deg * Math.PI) / 180
  return `${n(cx + r * Math.cos(a))} ${n(cy + r * Math.sin(a))}`
}

/**
 * 固定シードの擬似乱数（SSR とクライアントで同じ散らばり位置になるように）。
 * 描画のたびに同じ列を返すよう、コンポーネントの中で毎回作る。
 */
const seeded = (seed: number) => {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

/** 文字列から決まるシード（同じ文字列なら同じ散らばりになる） */
const seedOf = (text: string, offset: number) =>
  Array.from(text).reduce((sum, ch) => sum + ch.charCodeAt(0), 7 + offset * 31)

const Shape = ({ p }: { p: Piece }) => {
  if (p[0] === 'r')
    return <rect x={n(p[1])} y={n(p[2])} width={n(p[3])} height={n(p[4])} />
  if (p[0] === 'c') return <circle cx={n(p[1])} cy={n(p[2])} r={n(p[3])} />
  if (p[0] === 'a') {
    const [, cx, cy, ro, ri, start] = p
    const R = n(ro)
    const r = n(ri)
    return (
      <path
        d={`M${pt(cx, cy, ro, start)}A${R} ${R} 0 0 1 ${pt(cx, cy, ro, start + 180)}L${pt(cx, cy, ri, start + 180)}A${r} ${r} 0 0 0 ${pt(cx, cy, ri, start)}Z`}
      />
    )
  }
  const v = p.slice(1) as number[]
  let d = ''
  for (let i = 0; i < v.length; i += 6)
    d += `M${n(v[i])} ${n(v[i + 1])}L${n(v[i + 2])} ${n(v[i + 3])}L${n(v[i + 4])} ${n(v[i + 5])}Z`
  return <path fillRule="evenodd" d={d} />
}

const mid = (p: Piece) =>
  p[0] === 'r'
    ? [p[1] + p[3] / 2, p[2] + p[4] / 2]
    : p[0] === 't'
      ? [(p[1] + p[3] + p[5]) / 3, (p[2] + p[4] + p[6]) / 3]
      : [p[1], p[2]]

type Scatter = { dx: number; dy: number; r: number }

/** 散らばり位置を 1 ピースぶん引く（親の描画中に順番どおり呼ぶ） */
const scatterOf = (rnd: () => number, scale: number): Scatter => ({
  dx: Math.round((rnd() - 0.5) * 2 * scale),
  dy: Math.round((rnd() - 0.5) * 2 * scale),
  r: Math.round((rnd() - 0.5) * 480),
})

/** 1 ピース = <g class="pc">。散らばり位置（--dx / --dy / --r）は登場演出にだけ使う */
const PieceG = ({
  className,
  gi,
  j,
  s,
  children,
}: {
  className: string
  gi: number
  j: number
  s: Scatter
  children: ReactNode
}) => (
  <g
    className={className}
    style={
      {
        '--gi': gi,
        '--j': j,
        '--dx': `${s.dx}px`,
        '--dy': `${s.dy}px`,
        '--r': `${s.r}deg`,
      } as CSSProperties
    }
  >
    {children}
  </g>
)

const Placed = ({ p, lo }: { p: Piece; lo: Loose }) => {
  if (!lo) return <Shape p={p} />
  const c = mid(p)
  return (
    <g
      transform={`translate(${n(lo[0])} ${n(lo[1])}) rotate(${lo[2]} ${n(c[0])} ${n(c[1])})`}
    >
      <Shape p={p} />
    </g>
  )
}

/**
 * 図形で組んだ文字列（N O S T R A I、0〜9、?、.）。
 * acc: 字ごとの色ピース（. = なし、w 白 / y 黄 / p 紫）
 * gi: 登場演出の順番の開始番号（左の字から 60ms ずつ遅らせる）
 * loose: true なら「?」のピースをばらけたまま置く（未定の日付など）
 */
export const GlyphWord = ({
  text,
  acc = '',
  gi = 0,
  loose = false,
  className,
}: {
  text: string
  acc?: string
  gi?: number
  loose?: boolean
  className?: string
}) => {
  const rnd = seeded(seedOf(text, gi))
  let x = 0
  const chars = Array.from(text).map((ch, i) => {
    const g = GL[ch]
    if (!g) return null
    const a = acc.charAt(i)
    const gx = x
    x += (g.w ?? 3) + TR
    return (
      <g key={`${ch}-${i}`} transform={`translate(${n(gx)} 0)`}>
        {g.p.map((p, j) => (
          <PieceG
            key={j}
            className={`pc${a && a !== '.' && j === g.k ? ` a${a}` : ''}`}
            gi={gi + i}
            j={j}
            s={scatterOf(rnd, 150)}
          >
            <Placed p={p} lo={loose && ch === '?' ? LOOSE[i % 2][j] : null} />
          </PieceG>
        ))}
      </g>
    )
  })
  const w = n(x - TR)
  return (
    <span className={className ? `gw ${className}` : 'gw'} aria-hidden="true">
      <svg
        viewBox={`0 0 ${w} 60`}
        width={w}
        height={60}
        preserveAspectRatio="xMinYMin meet"
        aria-hidden="true"
        focusable="false"
      >
        {chars}
      </svg>
    </span>
  )
}

const Q_COLORS = ['pc ap', 'pc ay', 'pc aw']

/**
 * 図形の「？」。
 * t = 墨の札に色ピース（問いの見出し）、c = 色ピースだけ（墨の帯の上）、
 * k = 文字色（メニュー）、f = 登壇者の顔の枠（組みかけ）
 */
export const QGlyph = ({
  v,
  face = 0,
}: {
  v: 't' | 'c' | 'k' | 'f'
  face?: number
}) => {
  const rnd = seeded(11)
  const lo = v === 'f' ? FACE[face % FACE.length] : null
  const vb =
    v === 't'
      ? [-7, -7, 44, 74]
      : v === 'f'
        ? [-16, -9, 62, 78]
        : [0, 0, 30, 60]
  return (
    <svg
      viewBox={vb.join(' ')}
      width={vb[2]}
      height={vb[3]}
      aria-hidden="true"
      focusable="false"
    >
      {v === 't' && (
        <rect className="qtile" x={-7} y={-7} width={44} height={74} />
      )}
      {GL['?'].p.map((p, j) => (
        <PieceG
          key={j}
          className={v === 'k' ? 'pc' : Q_COLORS[j]}
          gi={0}
          j={j}
          s={scatterOf(rnd, 60)}
        >
          <Placed p={p} lo={lo ? lo[j] : null} />
        </PieceG>
      ))}
    </svg>
  )
}

/** 文中の「？」を図形にした部品（帯・メニュー） */
export const QMark = ({ v }: { v: 'c' | 'k' }) => (
  <span className={`qm ${v}`} aria-hidden="true">
    <QGlyph v={v} />
  </span>
)

const OstShape = ({ o }: { o: (typeof OST)[number] }) => {
  const [kind, , , w, h] = o
  if (kind === 'c') return <circle r={w / 2} />
  if (kind === 'q') return <rect x={-w / 2} y={-h / 2} width={w} height={h} />
  if (kind === 't')
    return <path d={`M0 ${-h / 2}L${w / 2} ${h / 2}L${-w / 2} ${h / 2}Z`} />
  return (
    <path
      d={`M${-w / 2} ${h / 2}A${w / 2} ${w / 2} 0 0 1 ${w / 2} ${h / 2}Z`}
    />
  )
}

/** フッター手前のダチョウ。画面に入ったとき 1 回だけ 12 ピースが組み上がる */
export const Ostrich = () => {
  const [ref, shown] = useRevealOnce<HTMLDivElement>(0.4)
  const rnd = seeded(23)
  return (
    <div ref={ref} className={shown ? 'ostrich io in' : 'ostrich io'}>
      <svg
        viewBox="-38 -48 70 92"
        width={70}
        height={92}
        aria-hidden="true"
        focusable="false"
      >
        {OST.map((o, j) => (
          <PieceG
            key={j}
            className={`pc ${o[6]}`}
            gi={j}
            j={j}
            s={scatterOf(rnd, 70)}
          >
            <g transform={`translate(${o[1]} ${o[2]}) rotate(${o[5]})`}>
              <OstShape o={o} />
            </g>
          </PieceG>
        ))}
      </svg>
    </div>
  )
}
