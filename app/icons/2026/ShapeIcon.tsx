import { SVGAttributes } from 'react'

/** BB 面の見出しとメニューで共通に使う図形アイコン（viewBox 44×44） */
const SHAPES = {
  nostr: (
    <>
      <circle cx="14" cy="22" r="11" fill="#8E30EB" />
      <rect x="24" y="12" width="18" height="18" fill="#FFD400" />
    </>
  ),
  timetable: (
    <>
      <rect x="2" y="6" width="26" height="9" fill="#8E30EB" />
      <rect x="12" y="18" width="30" height="9" fill="#FF5A1F" />
      <rect x="6" y="30" width="20" height="9" fill="#0E7C7B" />
    </>
  ),
  price: (
    <>
      <circle cx="22" cy="22" r="20" fill="#FFD400" />
      <circle
        cx="22"
        cy="22"
        r="11"
        fill="none"
        stroke="#1B0B2E"
        strokeWidth="4"
      />
    </>
  ),
  sponsors: <path d="M22 2l20 38H2z" fill="#FF5A1F" />,
  faq: (
    <>
      <path d="M4 30a18 18 0 0 1 36 0z" fill="#0E7C7B" />
      <rect x="18" y="34" width="8" height="8" fill="#1B0B2E" />
    </>
  ),
}

export type ShapeName = keyof typeof SHAPES

export const ShapeIcon = ({
  name,
  ...props
}: { name: ShapeName } & SVGAttributes<SVGElement>) => (
  <svg viewBox="0 0 44 44" aria-hidden="true" {...props}>
    {SHAPES[name]}
  </svg>
)
