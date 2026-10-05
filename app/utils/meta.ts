import type { MetaDescriptor } from '@remix-run/node'

type RootData = { language?: string; siteUrl?: string }
type Match = { id: string; data: unknown }

/** root の loader が返す言語とサイトの URL。meta 関数の matches から取り出す */
export const rootMeta = (matches: Match[]) => {
  const data = (matches.find((m) => m.id === 'root')?.data ?? {}) as RootData
  return {
    ja: (data.language ?? '').startsWith('ja'),
    siteUrl: data.siteUrl || 'https://nostrasia.com',
  }
}

/** og:image と twitter:image をまとめて返す。image はサイトのルートからのパス */
export const ogImage = (
  siteUrl: string,
  image: string,
  size?: { width: number; height: number; alt: string },
): MetaDescriptor[] => [
  { property: 'og:image', content: `${siteUrl}${image}` },
  { name: 'twitter:image', content: `${siteUrl}${image}` },
  ...(size
    ? [
        { property: 'og:image:width', content: String(size.width) },
        { property: 'og:image:height', content: String(size.height) },
        { property: 'og:image:alt', content: size.alt },
        { name: 'twitter:image:alt', content: size.alt },
      ]
    : []),
]
