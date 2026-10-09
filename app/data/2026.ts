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
  /** 旧称。会場名に併記する */
  formerName?: Localized
  address: Localized
  /** Google マップ等の URL */
  mapUrl: string
  /** 埋め込み地図（iframe）の URL。言語は表示側で hl を足す */
  embedUrl?: string
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
  startTime: '13:00' as string | null,
  endTime: '20:00' as string | null,
  doorsOpen: null as string | null,
  /** 会場。未定は null → 「会場 調整中」 */
  venue: {
    name: { ja: 'GOX Tokyo', en: 'GOX Tokyo' },
    formerName: {
      ja: '旧: Crypto Lounge GOX',
      en: 'formerly Crypto Lounge GOX',
    },
    // 住所と地図は 2025 年版と同じ会場のもの。2026 年も同じ住所・フロア（確認済み）
    address: {
      ja: '〒160-0021 東京都新宿区歌舞伎町2丁目19-15 てなむタウンビル 6F',
      en: '6F Tenam Town Building, 2-19-15 Kabukicho, Shinjuku-ku, Tokyo 160-0021',
    },
    mapUrl: 'https://maps.app.goo.gl/6Ux4pcr7VozUYfQc6',
    // 「Crypto Lounge GOX 東京都新宿区歌舞伎町2-19-15」で検索した地図
    embedUrl:
      'https://maps.google.com/maps?q=Crypto%20Lounge%20GOX%20%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%96%B0%E5%AE%BF%E5%8C%BA%E6%AD%8C%E8%88%9E%E4%BC%8E%E7%94%BA2-19-15&output=embed',
  } as Venue | null,
  /** 参加費の表記。未定は null → 「未定」 */
  fee: { ja: '無料', en: 'Free' } as Localized | null,
  /** 参加費に添える注記。無ければ null */
  feeNote: {
    ja: 'ソフトドリンク・アルコール飲み放題つき',
    en: 'Unlimited soft drinks and alcohol',
  } as Localized | null,
  /**
   * 参加には事前エントリーが必要か。true なら開催概要・参加ボタンのそばに「事前エントリーが必要です」を出す。
   * エントリーの受付先（registrationUrl）が決まるまでは「受付開始は決まり次第お知らせします」を添える。
   */
  entryRequired: true,
  /**
   * 参加登録先（events lab のイベントページ。サイト公開時にはイベントも公開される）。
   * 未定は null → ボタンは「受付は調整中」を添えてページ内の開催概要へ
   */
  registrationUrl: 'https://events.kojira.io/e/2bab2e62' as string | null,
  /** ハッシュタグ */
  hashtag: 'nostrasia2026',
  /**
   * ヒーロー背面に重ねる生成動画。未作成のあいだは null（video 要素を出さない）。
   * 置くときは public/2026/ 以下に置き、パスを書く。
   */
  heroVideo: null as null | { webm?: string; mp4?: string; poster?: string },
}

/** 2026 年に開催が決まっている企画。開催概要の「決まっている企画」に並べる */
export const PROGRAMS_2026: {
  id: string
  title: Localized
  desc: Localized
  /** 詳細の記事など */
  url: string
  linkLabel: Localized
}[] = [
  {
    id: 'fleaMarket',
    title: { ja: 'フリーマーケット', en: 'Flea market' },
    desc: {
      ja: '出店者を募集しています。',
      en: 'Sellers wanted (details in Japanese).',
    },
    // リレーヒント付き（wss://yabu.me / wss://r.kojira.io / wss://nostr.compile-error.net）
    url: 'https://lumilumi.app/naddr1qqxnzdec8ymnzd35xucrwd3jqgswcsk8v4qck0deepdtluag3a9rh0jh2d0wh0w9g53qg8a9x2xqvqqrqsqqqa28qyxhwumn8ghj77tpvf6jumt9qyghwumn8ghj7u3wddhk56tjvyhxjmcpr4mhxue69uhkummnw3ezucm0d4cxjmr994jhyun0wghxuet5fz52nl',
    linkLabel: {
      ja: '募集要項を読む →',
      en: 'Read the call for sellers →',
    },
  },
]

/** スポンサーの相談先。FAQ に出す。Nostr のメンションか X の DM で */
export const SPONSOR_CONTACTS = [
  {
    name: 'kojira',
    npub: 'npub1k0jrarx8um0lyw3nmysn50539ky4k8p7gfgzgrsvn8d7lccx3d0s38dczd',
    x: 'kojira',
  },
  {
    name: 'Shino3',
    npub: 'npub1l60d6h2uvdwa9yq0r7r2suhgrnsadcst6nsx2j03xwhxhu2cjyascejxe5',
    x: 'SHINOHARATTT',
  },
] as const

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

/** 開始〜終了（例 13:00–20:00）。どちらかが未定なら null */
export const timeRange2026 = () =>
  EVENT_2026.startTime && EVENT_2026.endTime
    ? `${EVENT_2026.startTime}–${EVENT_2026.endTime}`
    : null

/** 表示用ヘルパー: 'YYYY-MM-DD' の曜日。タイムゾーンに左右されないよう UTC で計算する。未定は null */
export const weekday2026 = (date: string | null, lang: 'ja' | 'en') => {
  if (!date) return null
  const [y, m, d] = date.split('-').map(Number)
  const w = new Date(Date.UTC(y, m - 1, d)).getUTCDay()
  return lang === 'ja'
    ? ['日', '月', '火', '水', '木', '金', '土'][w]
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][w]
}
