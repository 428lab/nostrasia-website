import { SVGAttributes } from 'react'

/** セクション見出しとメニューで共通に使う図形アイコン（viewBox 44×44） */
const SHAPES = {
  about: <circle cx="22" cy="22" r="20" fill="#8E30EB" />,
  how: (
    <>
      <circle cx="14" cy="22" r="11" fill="#8E30EB" />
      <rect x="24" y="12" width="18" height="18" fill="#F6C324" />
    </>
  ),
  program: <rect x="3" y="3" width="38" height="38" fill="#F6C324" />,
  timetable: (
    <>
      <rect x="2" y="6" width="26" height="9" fill="#8E30EB" />
      <rect x="12" y="18" width="30" height="9" fill="#F2542D" />
      <rect x="6" y="30" width="20" height="9" fill="#0E7C7B" />
    </>
  ),
  speakers: (
    <>
      <circle cx="22" cy="14" r="10" fill="#8E30EB" />
      <path d="M4 42a18 18 0 0 1 36 0z" fill="#0E7C7B" />
    </>
  ),
  sponsors: <path d="M22 2l20 38H2z" fill="#F2542D" />,
  access: (
    <>
      <path
        d="M22 2a14 14 0 0 1 14 14c0 10-14 26-14 26S8 26 8 16A14 14 0 0 1 22 2z"
        fill="#8E30EB"
      />
      <circle cx="22" cy="16" r="5" fill="#E9ECEF" />
    </>
  ),
  faq: (
    <>
      <path d="M4 30a18 18 0 0 1 36 0z" fill="#0E7C7B" />
      <rect x="18" y="34" width="8" height="8" fill="#161616" />
    </>
  ),
  archive: (
    <>
      <rect x="2" y="2" width="12" height="40" fill="#8E30EB" />
      <rect x="16" y="10" width="12" height="32" fill="#F2542D" />
      <rect x="30" y="18" width="12" height="24" fill="#F6C324" />
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
