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

import type { LinksFunction, MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [
    { title: 'Nostrasia 2026' },
    { property: 'og:title', content: 'Nostrasia 2026' },
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
