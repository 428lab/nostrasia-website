import type { i18n as I18n } from 'i18next'

import type { Localized } from '~/data/2026'

/**
 * 問い（Q.01〜Q.09）の並び。
 * nav: ヘッダー・メニュー・フッターのリンクに出すか（いくら？ は参加ボタンから飛ぶので出さない）
 * jaBreak: JA の問いを何文字目で 2 つの字群に分けるか（狭い画面ではここで改行する）
 */
export const SECTIONS = [
  { id: 'about', no: '01', nav: true },
  { id: 'program', no: '02', nav: true },
  { id: 'timetable', no: '03', nav: true },
  { id: 'speakers', no: '04', nav: true },
  { id: 'price', no: '05', nav: false },
  { id: 'sponsors', no: '06', nav: true, jaBreak: 5 },
  { id: 'access', no: '07', nav: true },
  { id: 'faq', no: '08', nav: true, jaBreak: 4 },
  { id: 'archive', no: '09', nav: true, jaBreak: 4 },
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
