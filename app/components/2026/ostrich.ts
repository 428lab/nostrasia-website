/**
 * ダチョウを組み上げる 12 個の図形。
 * k: 形（c 円 / t 三角 / h 半円 / q 四角）、c: 色、w・h: 大きさ、
 * fx・fy・fr: 組み上がったあとの位置と回転、sx・sy・sr・ss: 飛んでくる前の位置・回転・拡大率
 */
// prettier-ignore
export const SHAPES = [
  { k: 'c', c: '#8E30EB', w: 32, h: 32, fx: -4, fy: 6, fr: 0, sx: -0.62, sy: -0.62, sr: 0, ss: 1.25 },
  { k: 't', c: '#F2542D', w: 14, h: 18, fx: -23, fy: -3, fr: -55, sx: 0.75, sy: -0.72, sr: 20, ss: 1.6 },
  { k: 'h', c: '#0E7C7B', w: 22, h: 11, fx: -6, fy: 4, fr: 195, sx: 0.66, sy: 0.64, sr: -30, ss: 1.4 },
  { k: 'q', c: '#F6C324', w: 8, h: 8, fx: 8, fy: 5, fr: 45, sx: -0.95, sy: 0.15, sr: 15, ss: 1.8 },
  { k: 'q', c: '#F6C324', w: 5, h: 28, fx: 11.5, fy: -17.5, fr: 20, sx: 0.97, sy: -0.1, sr: 70, ss: 1.1 },
  { k: 'c', c: '#8E30EB', w: 10, h: 10, fx: 16, fy: -30, fr: 0, sx: -0.15, sy: 0.84, sr: 0, ss: 2 },
  { k: 't', c: '#F2542D', w: 7, h: 8, fx: 22.5, fy: -30, fr: 90, sx: -0.7, sy: 0.78, sr: 200, ss: 2.4 },
  { k: 'c', c: '#161616', w: 2.4, h: 2.4, fx: 17.5, fy: -31.5, fr: 0, sx: 0.25, sy: -0.86, sr: 0, ss: 3.5 },
  { k: 'q', c: '#161616', w: 2.6, h: 26, fx: -9, fy: 33, fr: 6, sx: -0.97, sy: -0.32, sr: 35, ss: 1 },
  { k: 'q', c: '#161616', w: 2.6, h: 26, fx: 1, fy: 33, fr: -8, sx: 0.52, sy: 0.88, sr: -50, ss: 1 },
  { k: 'h', c: '#0E7C7B', w: 8, h: 4, fx: -10.5, fy: 47, fr: 0, sx: -0.36, sy: -0.86, sr: 30, ss: 2.2 },
  { k: 'h', c: '#0E7C7B', w: 8, h: 4, fx: 3, fy: 47, fr: 0, sx: 0.95, sy: 0.4, sr: 90, ss: 2.2 },
] as const

/**
 * 歩くときの各図形の役割（SHAPES と同じ並び）。CSS のクラス名になる。
 * l1・l2 は左右の脚と足の組で、半周期ずらして交互に振る。
 */
export const ROLES = [
  'body',
  'body',
  'body',
  'body',
  'neck',
  'head',
  'head',
  'head',
  'leg l1',
  'leg l2',
  'foot l1',
  'foot l2',
] as const

/** 脚（SHAPES[8]・[9]）の長さ。足を脚の先に追従させる計算に使う */
export const LEG_LEN = 26
/** 足の裏の高さ（fy の単位）。ここが地面になる */
export const FOOT_Y = 49
