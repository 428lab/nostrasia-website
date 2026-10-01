/**
 * Nostrasia 2026 のイベント情報。
 *
 * 未定の値は null にしておき、画面側で「調整中」「TBA」「近日公開」を出す。
 * 決まったらこのファイルだけを書き換える（画面側のコードは触らなくてよい）。
 * 推測で値を埋めないこと。
 */

export type Localized = { ja: string; en: string }

export type Venue = {
  name: Localized
  address: Localized
  /** Google マップ等の URL */
  mapUrl: string
}

export type Speaker = {
  name: string
  /** 肩書き・所属など */
  title?: Localized
  /** njump.me 等のプロフィール URL */
  profileUrl?: string
  /** /2026/speakers/ 以下に置いた画像のパス */
  image?: string
}

export type Sponsor = {
  name: string
  url: string
  /** /2026/sponsors/ 以下に置いたロゴのパス。無ければ名前を文字で出す */
  logo?: string
}

export type SponsorTier = {
  id: 'tier1' | 'tier2' | 'tier3'
  sponsors: Sponsor[]
  /** sponsors が空のときに出す「募集中」枠の数 */
  openSlots: number
}

export const EVENT_2026 = {
  /** 開催日 'YYYY-MM-DD'。未定は null → 「2026.??.??」 */
  date: null as string | null,
  /** 開始・終了・開場時刻 'HH:MM'。未定は null → 「--:--」 */
  startTime: null as string | null,
  endTime: null as string | null,
  doorsOpen: null as string | null,
  /** 会場。未定は null → 「会場 調整中」 */
  venue: null as Venue | null,
  /** 参加費の表記。未定は null → 「詳細は後日」 */
  fee: null as Localized | null,
  /** 参加登録フォーム。未定は null → ボタンは「近日公開」でページ内の開催概要へ */
  registrationUrl: null as string | null,
  /**
   * お問い合わせフォーム。2025 年版と同じフォーム。
   * TODO(要確認): 2026 年も同じフォームを使うか。
   */
  contactUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSfOPMX1EwMlH5J9BsPft2yylspYeNoBScf0kAzN8ETUX-CBcg/viewform',
  /** ハッシュタグ（案）。TODO(要確認) */
  hashtag: 'nostrasia2026',
  /**
   * ヒーロー背面に重ねる生成動画。未作成のあいだは null（video 要素を出さない）。
   * 置くときは public/2026/ 以下に置き、パスを書く。
   */
  heroVideo: null as null | { webm?: string; mp4?: string; poster?: string },
}

/** 登壇者。未発表のあいだは空配列 → 「Speaker TBA」のカードを placeholderCount 枚出す */
export const SPEAKERS_2026: Speaker[] = []
export const SPEAKER_PLACEHOLDER_COUNT = 6

/** スポンサー。未決定のあいだは空配列 → 「募集中」枠を openSlots 個出す */
export const SPONSOR_TIERS_2026: SponsorTier[] = [
  { id: 'tier1', sponsors: [], openSlots: 1 },
  { id: 'tier2', sponsors: [], openSlots: 2 },
  { id: 'tier3', sponsors: [], openSlots: 3 },
]

/** 過去回。/2024 と /2025 はこのアプリ内のアーカイブ（年ごとに locale が違うので必ず全ページ遷移で開く） */
export const ARCHIVES = [
  {
    year: 2023,
    href: 'https://nostr.world/nostrasia/index.html',
    external: true,
  },
  { year: 2024, href: '/2024', external: false },
  { year: 2025, href: '/2025', external: false },
] as const

/** 公式アカウント（2025 年版と同じ） */
export const SNS = [
  {
    id: 'nostr',
    label: 'Nostr',
    url: 'https://njump.me/nprofile1qqs82r4f0jrrxcrwg0amxvy53yvzpzcsma7apj0uqvhkl8x28n4ddnspzpmhxue69uhkummnw3ezumt0d5hszrnhwden5te0dehhxtnvdakz7qgawaehxw309ahx7um5wghxy6t5vdhkjmn9wgh8xmmrd9skctclpm2nx',
  },
  { id: 'x', label: 'X @nostrasia', url: 'https://x.com/nostrasia' },
  {
    id: 'bluesky',
    label: 'Bluesky nostrasia.com',
    url: 'https://bsky.app/profile/nostrasia.com',
  },
  { id: 'note', label: 'note nostrasia', url: 'https://note.com/nostrasia' },
] as const

/** 表示用ヘルパー: 'YYYY-MM-DD' → 'YYYY.MM.DD'、未定は '2026.??.??' */
export const formatDate2026 = (date: string | null) =>
  date ? date.replaceAll('-', '.') : '2026.??.??'

/** 表示用ヘルパー: 'HH:MM'、未定は '--:--' */
export const formatTime = (time: string | null) => time ?? '--:--'
