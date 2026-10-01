import { About, Program } from '~/components/2026/About'
import { Access } from '~/components/2026/Access'
import { Archive } from '~/components/2026/Archive'
import { Faq } from '~/components/2026/Faq'
import { Hero } from '~/components/2026/Hero'
import { Layout } from '~/components/2026/Layout'
import { Price } from '~/components/2026/Price'
import { Speakers } from '~/components/2026/Speakers'
import { Sponsors } from '~/components/2026/Sponsors'
import { TimeTable } from '~/components/2026/TimeTable'

import type { LinksFunction, MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [{ title: 'Nostrasia 2026' }]
}

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  // functions/[[path]].ts が build/server を型チェックに含めるので、ビルド後の JS からの型推論でも
  // crossOrigin が string に広がらないよう Object.freeze でリテラル型のまま残す
  Object.freeze({
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  }),
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Anton&family=BIZ+UDPGothic:wght@400;700&family=Dela+Gothic+One&family=Train+One&display=swap',
  },
]

export default function Index() {
  return (
    <Layout>
      <Hero />
      <About />
      <Program />
      <TimeTable />
      <Speakers />
      <Price />
      <Sponsors />
      <Access />
      <Faq />
      <Archive />
    </Layout>
  )
}
