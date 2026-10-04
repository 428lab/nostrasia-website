import { CSSProperties, ReactNode } from 'react'

import { EVENT_2026 } from '~/data/2026'

import type { SectionId } from './sections'

/*
 * 問いの「？」と字の下 3 分の 1 に重ねる、答えの図形。
 * 座標は 1 字 = 100 × 105 の箱。最初の 1 字には重ねない。
 * 意味は固定: 円＝人・鍵 / 四角＝時間・リレー / 三角＝場所 / 半円＝ステージ。白抜き＝未定。
 * k: 墨のふち、fp / fy / ft / fw: 紫・黄・青緑・白、hk + hw: 白抜き（墨の太線 + 白の細線）
 */

/** 白抜きの四角。filled なら黄で塗る（日付・参加費が決まったとき） */
const Sq = ({
  x,
  y,
  s,
  filled = false,
}: {
  x: number
  y: number
  s: number
  filled?: boolean
}) =>
  filled ? (
    <rect className="k fy" x={x} y={y} width={s} height={s} />
  ) : (
    <>
      <rect className="hk" x={x} y={y} width={s} height={s} />
      <rect className="hw" x={x} y={y} width={s} height={s} />
    </>
  )

const Ring = ({
  cx,
  cy,
  r,
  outer,
  inner,
}: {
  cx: number
  cy: number
  r: number
  outer?: number
  inner?: number
}) => (
  <>
    <circle
      className="hk"
      cx={cx}
      cy={cy}
      r={r}
      style={outer ? { strokeWidth: outer } : undefined}
    />
    <circle
      className="hw"
      cx={cx}
      cy={cy}
      r={r}
      style={inner ? { strokeWidth: inner } : undefined}
    />
  </>
)

/** 円（頭）と半円（胴）の人型 */
const Person = ({
  x,
  body,
  head,
}: {
  x: number
  body: string
  head: string
}) => (
  <>
    <path
      className={`k ${body}`}
      d={`M${x - 16} 103A16 16 0 0 1 ${x + 16} 103Z`}
    />
    <circle className={`k ${head}`} cx={x} cy="78" r="7.5" />
  </>
)

/** 「いつ？」の 7 つの四角。日付が決まったら（例として）中央の 1 つを黄で塗る */
const WEEK_X = [112, 139, 166, 193, 220, 247, 274]

const SPEAKER_SHAPES = [
  { x: 145, body: 'fp', head: 'fw' },
  { x: 230, body: 'ft', head: 'fy' },
  { x: 315, body: 'fp', head: 'fw' },
  { x: 400, body: 'ft', head: 'fy' },
  { x: 470, body: 'fp', head: 'fw' },
]

/** 答えの図形。w は最後の字群の字数 × 100（viewBox の幅） */
const answers = (): Record<SectionId, { w: number; pieces: ReactNode[] }> => {
  const { date, venue, fee } = EVENT_2026
  return {
    about: {
      w: 200,
      pieces: [
        <path key="s" className="k ft" d="M120 101A30 30 0 0 1 180 101Z" />,
        <circle key="a" className="k fw" cx="128" cy="93" r="8.5" />,
        <circle key="b" className="k fp" cx="150" cy="93" r="8.5" />,
        <circle key="c" className="k fy" cx="172" cy="93" r="8.5" />,
      ],
    },
    program: {
      w: 400,
      pieces: [
        <path key="s" className="k ft" d="M124 102A26 26 0 0 1 176 102Z" />,
        <circle key="c" className="k fp" cx="250" cy="89" r="13" />,
        <path key="t" className="k fy" d="M326 102H374L350 60Z" />,
      ],
    },
    timetable: {
      w: 300,
      pieces: WEEK_X.map((x, i) => (
        // 日付が決まったら、例として中央の 1 つを塗る（曜日とは対応させない）
        <Sq key={x} x={x} y={77} s={22} filled={!!date && i === 3} />
      )),
    },
    speakers: {
      w: 500,
      pieces: SPEAKER_SHAPES.map((p) => <Person key={p.x} {...p} />),
    },
    price: {
      w: 400,
      pieces: [
        <Person key="p" x={250} body="fp" head="fw" />,
        <Sq key="q" x={326} y={56} s={46} filled={!!fee} />,
      ],
    },
    sponsors: {
      w: 300,
      pieces: [
        ...[150, 226, 250, 274].map((cx) => (
          <Ring key={cx} cx={cx} cy={93} r={9} />
        )),
        <path key="s" className="k ft" d="M224 82A26 26 0 0 1 276 82Z" />,
      ],
    },
    access: {
      w: 300,
      pieces: [
        <path key="t" className="k ft" d="M229 58H271L250 102Z" />,
        // ピンの円: 会場が未定のあいだは中を空ける
        venue ? (
          <circle
            key="c"
            className="k fy"
            cx="250"
            cy="48"
            r="16"
            style={{ strokeWidth: 7 }}
          />
        ) : (
          <Ring key="c" cx={250} cy={48} r={16} outer={15} inner={8} />
        ),
      ],
    },
    faq: {
      w: 400,
      pieces: [
        <circle key="c" className="k fp" cx="150" cy="90" r="12" />,
        ...[318, 341, 364].map((x) => (
          <rect key={x} className="k fy" x={x} y="84" width="18" height="18" />
        )),
      ],
    },
    archive: {
      w: 200,
      pieces: [
        <rect key="a" className="k fp" x="14" y="82" width="20" height="20" />,
        <rect key="b" className="k fy" x="40" y="82" width="20" height="20" />,
        <rect key="c" className="k ft" x="66" y="82" width="20" height="20" />,
        // 2026 年はまだ開催していないので白抜き
        <Sq key="d" x={137} y={74} s={26} />,
      ],
    },
  }
}

export const Answer = ({ id }: { id: SectionId }) => {
  const { w, pieces } = answers()[id]
  return (
    <svg
      className="ans"
      viewBox={`0 0 ${w} 105`}
      style={{ '--aw': w / 100 } as CSSProperties}
      aria-hidden="true"
      focusable="false"
    >
      {pieces.map((piece, j) => (
        <g key={j} className="pc" style={{ '--j': j } as CSSProperties}>
          {piece}
        </g>
      ))}
    </svg>
  )
}
