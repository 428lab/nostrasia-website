// eslint-disable-next-line import/order
import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from '@remix-run/react'

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useChangeLanguage } from 'remix-i18next/react'

import i18next from '~/i18next.server'

import type { LoaderFunctionArgs } from '@remix-run/node'

import './tailwind.css'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const language =
    url.searchParams.get('lng') || (await i18next.getLocale(request))

  const siteUrl = url.origin

  return json({ language, siteUrl })
}

export const handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: 'common',
}

export function Layout({ children }: { children: React.ReactNode }) {
  const root = useRouteLoaderData<typeof loader>('root')
  const { i18n } = useTranslation()

  useChangeLanguage(root?.language || 'en')

  return (
    // js クラスは下のスクリプトがハイドレーション前に付けるので、属性の不一致警告を抑える
    <html lang={root?.language} dir={i18n.dir()} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/*
          初回表示の登場演出用。JS が動く環境でだけ要素を隠してから表示する。
          3 秒たってもハイドレーションが終わらなければ no-hydrate を付けて、隠した要素を全部出す。
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');setTimeout(function(){if(!window.__nostrasiaHydrated)document.documentElement.classList.add('no-hydrate')},3000)`,
          }}
        />
        <Meta />
        <Links />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-S1JVJM16FR"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-S1JVJM16FR');
          `,
          }}
        />
        <meta property="og:title" content="Nostrasia 2026" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={root?.siteUrl || 'https://nostrasia.com'}
        />
        <meta property="og:image" content={`${root?.siteUrl}/ogp.webp`} />
        <meta property="twitter:card" content="summary_large_image" />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  useEffect(() => {
    ;(
      window as Window & { __nostrasiaHydrated?: boolean }
    ).__nostrasiaHydrated = true
  }, [])
  return <Outlet />
}
