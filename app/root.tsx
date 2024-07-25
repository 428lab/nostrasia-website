// eslint-disable-next-line import/order
import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'

import { useTranslation } from 'react-i18next'
import { useChangeLanguage } from 'remix-i18next/react'

import i18next from '~/i18next.server'

import { Footer } from './components/Footer'

import type { LoaderFunctionArgs } from '@remix-run/node'

export async function loader({ request }: LoaderFunctionArgs) {
  const language =
    new URL(request.url).searchParams.get('lng') ||
    (await i18next.getLocale(request))
  return json({ language })
}

export const handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: 'common',
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { language } = useLoaderData<typeof loader>()
  const { i18n } = useTranslation()

  useChangeLanguage(language)

  return (
    <html lang={language} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
      </head>
      <body>
        <div className="max-w-[832px] px-4 min-h-screen mx-auto relative">
          <div className="pb-40">{children}</div>
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
