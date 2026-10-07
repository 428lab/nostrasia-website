import { About } from '~/components/2026/About'
import { Access } from '~/components/2026/Access'
import { Archive } from '~/components/2026/Archive'
import { Faq } from '~/components/2026/Faq'
import { Hero } from '~/components/2026/Hero'
import { HowNostr } from '~/components/2026/HowNostr'
import { Layout } from '~/components/2026/Layout'
import { Program } from '~/components/2026/Program'
import { Speakers } from '~/components/2026/Speakers'
import { Sponsors } from '~/components/2026/Sponsors'
import { TimeTable } from '~/components/2026/TimeTable'

import { rootMeta, ogImage } from '~/utils/meta'

import type { LinksFunction, MetaFunction } from '@remix-run/node'

// 共有されたときに出る説明。app/data/2026.ts の確定情報（日付・会場・参加費・事前エントリー）と揃える
const DESCRIPTION = {
  ja: 'Nostr のカンファレンス Nostrasia 2026。2026 年 11 月 29 日（日）、Crypto Lounge GOX で開催。参加費無料（ドリンク飲み放題つき）、参加には事前エントリーが必要です。',
  en: 'Nostrasia 2026, a Nostr conference in Asia. Sunday, November 29, 2026 at Crypto Lounge GOX. Free entry with all-you-can-drink included. Pre-registration required.',
}
const OG_ALT = {
  ja: 'NOSTRASIA 2026。2026.11.29（日）、Crypto Lounge GOX、参加費無料、事前エントリー制',
  en: 'NOSTRASIA 2026. Sun, Nov 29, 2026, Crypto Lounge GOX. Free entry, pre-registration required',
}

export const meta: MetaFunction = ({ matches }) => {
  const { ja, siteUrl } = rootMeta(matches)
  const lang = ja ? 'ja' : 'en'
  return [
    { title: 'Nostrasia 2026' },
    { name: 'description', content: DESCRIPTION[lang] },
    { property: 'og:title', content: 'Nostrasia 2026' },
    { property: 'og:description', content: DESCRIPTION[lang] },
    { property: 'og:locale', content: ja ? 'ja_JP' : 'en_US' },
    { name: 'twitter:title', content: 'Nostrasia 2026' },
    { name: 'twitter:description', content: DESCRIPTION[lang] },
    ...ogImage(siteUrl, `/2026/ogp-${lang}.png`, {
      width: 1200,
      height: 630,
      alt: OG_ALT[lang],
    }),
  ]
}

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  // functions/[[path]].ts はビルド後の JS（build/server）から型を推論するので、
  // そのままだと crossOrigin が string に広がって typecheck が通らない。
  // Object.freeze で包むとリテラル型（'anonymous'）のまま推論される。
  Object.freeze({
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  }),
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400;700&family=Unbounded:wght@600;900&family=Zen+Kaku+Gothic+New:wght@400;700;900&display=swap',
  },
]

export default function Index() {
  return (
    <Layout>
      <Hero />
      <About />
      <HowNostr />
      <Program />
      <TimeTable />
      <Speakers />
      <Sponsors />
      <Access />
      <Faq />
      <Archive />
    </Layout>
  )
}
