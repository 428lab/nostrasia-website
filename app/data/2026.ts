/**
 * Nostrasia 2026 のイベント情報。
 *
 * 未定の値は null にしておき、画面側で「調整中」「未定」「TBA」を出す。
 * 決まったらこのファイルだけを書き換える（画面側のコードは触らなくてよい）。
 * 推測で値を埋めないこと。
 *
 * 値を入れたら、public/locales/2026/{ja,en}/common.json の FAQ などに書いてある
 * 「調整中です」「決まり次第お知らせします」系の文言も合わせて見直すこと。
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
  /** リンク先。無ければリンクにしない */
  url?: string
  /** /2026/sponsors/ 以下に置いたロゴのパス。無ければ名前を文字で出す */
  logo?: string
}

export const EVENT_2026 = {
  /** 開催日 'YYYY-MM-DD'。未定は null → 「2026.??.??」 */
  date: '2026-11-29' as string | null,
  /** 開始・終了・開場時刻 'HH:MM'。未定は null → 「--:--」 */
  startTime: null as string | null,
  endTime: null as string | null,
  doorsOpen: null as string | null,
  /** 会場。未定は null → 「会場 調整中」 */
  venue: {
    name: { ja: 'Crypto Lounge GOX', en: 'Crypto Lounge GOX' },
    // 住所と地図は 2025 年版と同じ会場のもの。TODO(要確認): 2026 年も同じフロアか
    address: {
      ja: '〒160-0021 東京都新宿区歌舞伎町2丁目19-15 てなむタウンビル 6F',
      en: '6F Tenam Town Building, 2-19-15 Kabukicho, Shinjuku-ku, Tokyo 160-0021',
    },
    mapUrl: 'https://maps.app.goo.gl/6Ux4pcr7VozUYfQc6',
  } as Venue | null,
  /** 参加費の表記。未定は null → 「未定」 */
  fee: { ja: '無料', en: 'Free' } as Localized | null,
  /** 参加費に添える注記。無ければ null */
  feeNote: {
    ja: 'ドリンク飲み放題つき',
    en: 'All-you-can-drink included',
  } as Localized | null,
  /**
   * 参加には事前エントリーが必要か。true なら開催概要・参加ボタンのそばに「事前エントリーが必要です」を出す。
   * エントリーの受付先（registrationUrl）が決まるまでは「受付開始は決まり次第お知らせします」を添える。
   */
  entryRequired: true,
  /** 参加登録フォーム。未定は null → ボタンは「準備中」でページ内の開催概要へ */
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

/** スポンサー。tier は分けず、この順に並べる */
export const SPONSORS_2026: Sponsor[] = [{ name: 'Shino3' }, { name: 'kojira' }]

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

/** 表示用ヘルパー: 'YYYY-MM-DD' の曜日。タイムゾーンに左右されないよう UTC で計算する。未定は null */
export const weekday2026 = (date: string | null, lang: 'ja' | 'en') => {
  if (!date) return null
  const [y, m, d] = date.split('-').map(Number)
  const w = new Date(Date.UTC(y, m - 1, d)).getUTCDay()
  return lang === 'ja'
    ? ['日', '月', '火', '水', '木', '金', '土'][w]
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][w]
}
