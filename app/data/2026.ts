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

export type Seller = {
  /** 'planned' は出店予定（確定前）。札を出す */
  status: 'confirmed' | 'planned'
  /** 出店名。無ければ出店者の名前を看板に出す */
  shop?: string
  /** 出店者の名前。無ければ出さない */
  name?: string
  /** npub1... 表示は https://njump.me/<npub> */
  npub?: string
  /** 出すもの。1 品目 1 つ */
  items: Localized[]
  /** ひとこと。空行（\n\n）で段落を分け、[文字](URL) でリンクにできる */
  message: Localized
  payment: ('lightning' | 'cash')[]
  /** Nostr 以外のリンク */
  links?: { label: string; url: string }[]
  /** /2026/market/ 以下に置いた画像。比率のまま切らずに出す */
  images?: { src: string; alt: Localized }[]
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

/** フリーマーケットの出店者（出店募集フォームの回答から）。空のあいだはセクションを出さない */
export const FLEA_MARKET_2026: Seller[] = [
  {
    status: 'confirmed',
    shop: 'ものや',
    npub: 'npub1sjcvg64knxkrt6ev52rywzu9uzqakgy8ehhk8yezxmpewsthst6sw3jqcw',
    items: [
      { ja: 'お手製ステッカー', en: 'Handmade stickers' },
      { ja: 'お手製キーホルダー', en: 'Handmade key chains' },
      { ja: 'キーホルダー（ロクヨウ）', en: 'Key chains (Lokuyow)' },
      { ja: 'ステッカー（ロクヨウ）', en: 'Stickers (Lokuyow)' },
      { ja: 'ステッカー（けだまメイズ）', en: 'Stickers (Kedama Maze)' },
    ],
    message: {
      ja: 'ステッカーとキーホルダーとお品書きを頑張って作りました。\n\n当日は、ものグッズに加えて、[ロクヨウ](https://lokuyow.github.io/)グッズと、[けだまメイズ](https://open.spotify.com/show/0yTcypvuUHOiR1kJa7ihvW)のステッカーも販売します。\n\nよろしくお願いします！',
      en: 'We worked hard on the stickers, the key chains and our menu.\n\nOn the day we will also sell [Lokuyow](https://lokuyow.github.io/) goods and [Kedama Maze](https://open.spotify.com/show/0yTcypvuUHOiR1kJa7ihvW) stickers, along with our Mono goods.\n\nSee you there!',
    },
    payment: ['lightning', 'cash'],
    images: [
      {
        src: '/2026/market/monoya-menu-2.webp',
        alt: {
          ja: 'ものやのおしながき。お手製反射ステッカー 500 円（限定 3 枚）、お手製キーホルダー 300 円',
          en: 'Monoya menu: handmade reflective stickers ¥500 (3 only), handmade key chains ¥300',
        },
      },
    ],
  },
  {
    status: 'confirmed',
    shop: '四谷ラボ',
    name: 'しのさん',
    npub: 'npub1l60d6h2uvdwa9yq0r7r2suhgrnsadcst6nsx2j03xwhxhu2cjyascejxe5',
    items: [{ ja: 'Nostr 関連の技術同人誌', en: 'Nostr tech zines' }],
    message: {
      ja: '早いものでもう 4 年、技術書典で販売してきた Nostr に関連する同人誌を販売します！',
      en: 'Four years of Nostr tech zines we have sold at Gijutsushoten.',
    },
    payment: ['lightning', 'cash'],
  },
  {
    status: 'confirmed',
    name: '小牧りら',
    npub: 'npub1tuqsl6l8xzly95vv80um7wsnt7gxy8w9wgt4khp4wyv4xwhfw44slm93e9',
    items: [
      { ja: 'ハンドドリップコーヒー', en: 'Hand-drip coffee' },
      { ja: 'ドリップバッグ', en: 'Drip bags' },
    ],
    message: {
      ja: 'エルサルバドルコーヒーで BTC を盛り上げよう！',
      en: 'Cheer on BTC with El Salvador coffee!',
    },
    payment: ['lightning', 'cash'],
  },
  {
    status: 'confirmed',
    name: 'koyy_ya（コイイ_ヤ）',
    npub: 'npub178takzd7kyxec2drcnjczxhvkpx2yry0dvraaj7ydf3xv0m4wqpspgnjhp',
    items: [{ ja: 'PVC リストバンド', en: 'PVC wristbands' }],
    message: {
      ja: 'Nostrasia 2026 の公式ロゴを使った PVC リストバンドです。10 個限定、1 個 300 円。',
      en: 'PVC wristbands with the official Nostrasia 2026 logo. 10 only, ¥300 each.',
    },
    payment: ['lightning', 'cash'],
    images: [
      {
        src: '/2026/market/koyy-ya-wristband.webp',
        alt: {
          ja: 'Nostrasia 2026 ロゴ入りの PVC リストバンド。限定 10 個、現金 300 円',
          en: 'PVC wristbands with the Nostrasia 2026 logo. 10 only, ¥300 in cash',
        },
      },
    ],
  },
  {
    status: 'confirmed',
    name: 'しおん',
    npub: 'npub1pjd3a8l0wmygkclcvezacvamwamlqfv7cs0xwjmp7n7920mdkrsq9hpeqp',
    items: [
      { ja: '写真集（Photozine）', en: 'Photozine' },
      { ja: 'カレンダー', en: 'Calendar' },
      { ja: 'シール', en: 'Stickers' },
    ],
    message: {
      ja: '趣味で写真を撮っています。せっかくなのでモノとして残せたらと思い、今回グッズを作ってみました。',
      en: 'I take photos as a hobby, and made goods so they can stay with you as things.',
    },
    payment: ['lightning', 'cash'],
    links: [
      { label: 'Instagram', url: 'https://instagram.com/shi_on_72' },
      { label: 'potofu', url: 'https://potofu.me/shion72' },
    ],
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
