import type { i18n as I18n } from 'i18next'

import type { Localized } from '~/data/2026'

/**
 * 問い（Q.01〜Q.09）の並び。面の色（o: オレンジ / p: 紫）を交互に割り当てる。
 * nav: ヘッダー・メニュー・フッターのリンクに出すか（いくら？ は参加ボタンから飛ぶので出さない）
 */
export const SECTIONS = [
  { id: 'about', no: '01', tone: 'p', nav: true },
  { id: 'program', no: '02', tone: 'o', nav: true },
  { id: 'timetable', no: '03', tone: 'p', nav: true },
  { id: 'speakers', no: '04', tone: 'o', nav: true },
  { id: 'price', no: '05', tone: 'p', nav: false },
  { id: 'sponsors', no: '06', tone: 'o', nav: true },
  { id: 'access', no: '07', tone: 'p', nav: true },
  { id: 'faq', no: '08', tone: 'o', nav: true },
  { id: 'archive', no: '09', tone: 'p', nav: true },
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

/**
 * 見出し用の改行（\n）を取り除いて 1 行にする（帯・メニュー・読み上げ用）。
 * 英字どうしの間の改行は空白にし（"Before\nthis?" → "Before this?"）、和文では詰める。
 */
export const joinLines = (text: string) =>
  text.replace(/(.)\n(.)/g, (_, a: string, b: string) =>
    /[\x21-\x7e]/.test(a) && /[\x21-\x7e]/.test(b) ? `${a} ${b}` : a + b,
  )

/**
 * 問いの文言を「本文」と末尾の「？」に分ける（「？」は図形で描くため）。
 * oneLine: 見出し用の改行を取り除く
 */
export const splitQuestion = (text: string, oneLine = false) => {
  const body = oneLine ? joinLines(text) : text
  const m = /[？?]$/.exec(body)
  return m ? { body: body.slice(0, -1), mark: true } : { body, mark: false }
}
