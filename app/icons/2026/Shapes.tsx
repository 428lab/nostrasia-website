import type { SectionId } from '~/components/2026/sections'
import { EVENT_2026 } from '~/data/2026'

/*
 * 図形アイコン。意味は固定: 円＝人・鍵 / 四角＝時間・リレー / 三角＝場所 / 半円＝ステージ。白抜き＝未定。
 * 墨のふちは .ico（2026.css）の stroke で付く。
 */
const WH = '#F5F5F5'
export const PU = '#8E30EB'
export const YE = '#FFD400'
export const TE = '#0E7C7B'

type HollowProps = {
  kind: 'rect' | 'circle'
  /** 墨の線の太さ */
  outer: number
  /** 白の線の太さ */
  inner: number
  x?: number
  y?: number
  width?: number
  height?: number
  cx?: number
  cy?: number
  r?: number
}

/** 白抜き（中が空）の四角・円。墨の太い線の上に白の細い線を重ねる */
export const Hollow = ({ kind, outer, inner, ...attrs }: HollowProps) => {
  const Tag = kind
  return (
    <>
      <Tag {...attrs} fill="none" strokeWidth={outer} />
      <Tag {...attrs} fill="none" stroke={WH} strokeWidth={inner} />
    </>
  )
}

const SHAPES = {
  half: (c: string) => <path d="M3 34a17 17 0 0 1 34 0z" fill={c} />,
  circ: (c: string) => <circle cx="20" cy="20" r="15" fill={c} />,
  tri: (c: string) => <path d="M20 4l17 31H3z" fill={c} />,
  sq: (c: string) => <rect x="6" y="6" width="28" height="28" fill={c} />,
  sqh: () => (
    <Hollow
      kind="rect"
      x={8}
      y={8}
      width={24}
      height={24}
      outer={9}
      inner={4}
    />
  ),
  ring: () => (
    <Hollow kind="circle" cx={20} cy={20} r={12} outer={9} inner={4} />
  ),
  man: (c: string) => (
    <>
      <path d="M6 37a14 14 0 0 1 28 0z" fill={c} />
      <circle cx="20" cy="12" r="7" fill={WH} />
    </>
  ),
}

export type ShapeKind = keyof typeof SHAPES

/** 1 つの図形（キャプション・カード・アバター用） */
export const Shape = ({
  kind,
  color = PU,
  className,
}: {
  kind: ShapeKind
  color?: string
  className?: string
}) => (
  <svg
    className={className ? `ico ${className}` : 'ico'}
    viewBox="0 0 40 40"
    aria-hidden="true"
    focusable="false"
  >
    {SHAPES[kind](color)}
  </svg>
)

/** 各面の印（帯・メニュー・ヘッダーの現在地）。その面の答えの図形を小さくしたもの */
const MARKS: Record<SectionId, JSX.Element> = {
  about: (
    <>
      <path d="M5 31a15 15 0 0 1 30 0z" fill={TE} />
      <circle cx="10" cy="32" r="5.5" fill={WH} />
      <circle cx="20" cy="32" r="5.5" fill={PU} />
      <circle cx="30" cy="32" r="5.5" fill={YE} />
    </>
  ),
  program: (
    <>
      <path d="M1 33a8 8 0 0 1 16 0z" fill={TE} />
      <circle cx="21" cy="27.5" r="5.5" fill={PU} />
      <path d="M33 18l6.5 15h-13z" fill={YE} />
    </>
  ),
  timetable: (
    <>
      {[3, 15.5, 28].map((x) => (
        <Hollow
          key={x}
          kind="rect"
          x={x}
          y={15}
          width={9}
          height={9}
          outer={7}
          inner={2.5}
        />
      ))}
    </>
  ),
  speakers: (
    <>
      <path d="M6 37a14 14 0 0 1 28 0z" fill={PU} />
      <circle cx="20" cy="12" r="7" fill={WH} />
    </>
  ),
  price: (
    <>
      <path d="M1 37a9 9 0 0 1 18 0z" fill={PU} />
      <circle cx="10" cy="22" r="5" fill={WH} />
      <Hollow
        kind="rect"
        x={24}
        y={16}
        width={13}
        height={13}
        outer={7}
        inner={2.5}
      />
    </>
  ),
  sponsors: (
    <>
      {[9, 20, 31].map((cx) => (
        <Hollow
          key={cx}
          kind="circle"
          cx={cx}
          cy={31}
          r={4.5}
          outer={7}
          inner={2.5}
        />
      ))}
      <path d="M6 23a14 14 0 0 1 28 0z" fill={TE} />
    </>
  ),
  access: (
    <>
      <path d="M10 18h20L20 39z" fill={TE} />
      <Hollow kind="circle" cx={20} cy={13} r={8} outer={10} inner={5} />
    </>
  ),
  faq: (
    <>
      <circle cx="12" cy="26" r="9" fill={PU} />
      <rect x="24" y="19" width="14" height="14" fill={YE} />
    </>
  ),
  archive: (
    <>
      <rect x="1.5" y="22" width="8" height="8" fill={PU} />
      <rect x="11.5" y="22" width="8" height="8" fill={YE} />
      <rect x="21.5" y="22" width="8" height="8" fill={TE} />
      <Hollow
        kind="rect"
        x={31.5}
        y={22}
        width={7}
        height={7}
        outer={6}
        inner={2}
      />
    </>
  ),
}

/** 値が決まったときの印。白抜きだったところを黄で塗る（外形の大きさは白抜きと揃える） */
const MARKS_FILLED: Partial<Record<SectionId, JSX.Element>> = {
  timetable: (
    <>
      <Hollow
        kind="rect"
        x={3}
        y={15}
        width={9}
        height={9}
        outer={7}
        inner={2.5}
      />
      <rect x={14} y={13.5} width={12} height={12} fill={YE} />
      <Hollow
        kind="rect"
        x={28}
        y={15}
        width={9}
        height={9}
        outer={7}
        inner={2.5}
      />
    </>
  ),
  price: (
    <>
      <path d="M1 37a9 9 0 0 1 18 0z" fill={PU} />
      <circle cx="10" cy="22" r="5" fill={WH} />
      <rect x={22.5} y={14.5} width={16} height={16} fill={YE} />
    </>
  ),
  access: (
    <>
      <path d="M10 18h20L20 39z" fill={TE} />
      <circle cx={20} cy={13} r={11} fill={YE} />
    </>
  ),
}

/** その面の値（日付・参加費・会場）が決まっているか。決まっていれば印を塗りにする */
export const markFilled = (id: SectionId) => {
  const { date, fee, venue } = EVENT_2026
  if (id === 'timetable') return !!date
  if (id === 'price') return !!fee
  if (id === 'access') return !!venue
  return false
}

export const Mark = ({
  id,
  filled = false,
  className,
}: {
  id: SectionId
  /** 白抜きの部分を塗りにする（値が決まったとき） */
  filled?: boolean
  className?: string
}) => (
  <svg
    className={className ? `ico ${className}` : 'ico'}
    viewBox="0 0 40 40"
    aria-hidden="true"
    focusable="false"
  >
    {(filled && MARKS_FILLED[id]) || MARKS[id]}
  </svg>
)
