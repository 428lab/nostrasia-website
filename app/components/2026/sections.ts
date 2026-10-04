import type { i18n as I18n } from 'i18next'

import type { Localized } from '~/data/2026'

export type Camp = 'gt' | 'bb'

/**
 * 面の並び（GT と BB が必ず交互）。id はセクションの id。
 * camp: 陣営（gt = 橙地に問い / bb = 灰白の方眼に図形）
 * nav: ヘッダー・フッターのどの項目の現在地にするか（Nostr、はじめて？ は About に含める）
 */
export const SECTIONS: { id: string; camp: Camp; nav: NavId }[] = [
  { id: 'about', camp: 'gt', nav: 'about' },
  { id: 'nostr', camp: 'bb', nav: 'about' },
  { id: 'program', camp: 'gt', nav: 'program' },
  { id: 'timetable', camp: 'bb', nav: 'timetable' },
  { id: 'speakers', camp: 'gt', nav: 'speakers' },
  { id: 'sponsors', camp: 'bb', nav: 'sponsors' },
  { id: 'access', camp: 'gt', nav: 'access' },
  { id: 'faq', camp: 'bb', nav: 'faq' },
  { id: 'archive', camp: 'gt', nav: 'archive' },
]

/** ヘッダー・フッターに並べる 8 項目 */
export const NAV_IDS = [
  'about',
  'program',
  'timetable',
  'speakers',
  'sponsors',
  'access',
  'faq',
  'archive',
] as const

export type NavId = (typeof NAV_IDS)[number]

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
