import type { i18n as I18n } from 'i18next'

import { formatDate2026, weekday2026 } from '~/data/2026'
import type { Localized } from '~/data/2026'

/**
 * 問い（Q.01〜Q.09）の並び。面の色（o: オレンジ / p: 紫）と、問いの文字の登場演出（jump / stamp）を交互に割り当てる。
 * nav: ヘッダー・メニュー・フッターのリンクに出すか（いくら？ は参加ボタンから飛ぶので出さない）
 * minN: 問いの文字の大きさを何文字ぶんで計算するかの下限（Q.01 の「何？」は 3 文字ぶんの大きさにする）
 */
export const SECTIONS = [
  { id: 'about', no: '01', tone: 'p', anim: 'jump', nav: true, minN: 3 },
  { id: 'program', no: '02', tone: 'o', anim: 'stamp', nav: true },
  { id: 'timetable', no: '03', tone: 'p', anim: 'jump', nav: true },
  { id: 'speakers', no: '04', tone: 'o', anim: 'stamp', nav: true },
  { id: 'price', no: '05', tone: 'p', anim: 'jump', nav: false },
  { id: 'sponsors', no: '06', tone: 'o', anim: 'stamp', nav: true },
  { id: 'access', no: '07', tone: 'p', anim: 'jump', nav: true },
  { id: 'faq', no: '08', tone: 'o', anim: 'stamp', nav: true },
  { id: 'archive', no: '09', tone: 'p', anim: 'jump', nav: true },
] as const

export type SectionId = (typeof SECTIONS)[number]['id']

export const NAV_IDS = SECTIONS.filter((s) => s.nav).map((s) => s.id)

type LanguageSource = Pick<I18n, 'language' | 'resolvedLanguage'>

/**
 * 表示中の言語が日本語か。初回訪問では 'ja-JP' のように地域つきで入ることがあるので、
 * 'ja' との完全一致ではなく前方一致で見る（SSR とクライアントで判定を揃える）
 */
export const isJa = (i18n: LanguageSource) =>
  (i18n.resolvedLanguage ?? i18n.language ?? '').startsWith('ja')

/** app/data/2026.ts の Localized を表示中の言語で取り出す */
export const localize = (value: Localized, i18n: LanguageSource) =>
  isJa(i18n) ? value.ja : value.en

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

/** 曜日つきの日付（ja: 2026.11.29（日） / en: Sun, Nov 29, 2026）。未定は '2026.??.??' */
export const formatDateLong = (date: string | null, i18n: LanguageSource) => {
  if (!date) return formatDate2026(date)
  if (isJa(i18n)) return `${formatDate2026(date)}（${weekday2026(date, 'ja')}）`
  const [y, m, d] = date.split('-').map(Number)
  return `${weekday2026(date, 'en')}, ${MONTHS[m - 1]} ${d}, ${y}`
}
