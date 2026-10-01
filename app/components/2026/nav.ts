import type { ShapeName } from '~/icons/2026/ShapeIcon'

/** ヘッダー・メニュー・フッターで共通のナビ項目（id はセクションの id） */
export const NAV_ITEMS: { id: ShapeName; label: string }[] = [
  { id: 'about', label: 'nav.about' },
  { id: 'program', label: 'nav.program' },
  { id: 'timetable', label: 'nav.timetable' },
  { id: 'speakers', label: 'nav.speakers' },
  { id: 'sponsors', label: 'nav.sponsors' },
  { id: 'access', label: 'nav.access' },
  { id: 'faq', label: 'nav.faq' },
  { id: 'archive', label: 'nav.archive' },
]

/** 現在地表示: セクションの id → ナビ項目の id（Nostr はじめては About に含める） */
export const SECTION_TO_NAV: Record<string, string> = {
  about: 'about',
  how: 'about',
  program: 'program',
  timetable: 'timetable',
  speakers: 'speakers',
  sponsors: 'sponsors',
  access: 'access',
  faq: 'faq',
  archive: 'archive',
}
