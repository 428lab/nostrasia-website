import { RemixServer } from '@remix-run/react'
import { createInstance, ResourceLanguage } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend' // バックエンド
import { isbot } from 'isbot'
import { renderToReadableStream } from 'react-dom/server'
import { I18nextProvider, initReactI18next } from 'react-i18next'

import i18n from './i18n'
import i18next from './i18next.server'
import { getLocaleYearFromRequest } from './utils/localeYear'
import enCommon2024 from '../public/locales/2024/en/common.json'
import jaCommon2024 from '../public/locales/2024/ja/common.json'
import enCommon2025 from '../public/locales/2025/en/common.json'
import jaCommon2025 from '../public/locales/2025/ja/common.json'
import enCommon2026 from '../public/locales/2026/en/common.json'
import jaCommon2026 from '../public/locales/2026/ja/common.json'

import type { EntryContext } from '@remix-run/server-runtime'

// Resource mappings for different years
const resourceMap: Record<string, { [key in 'en' | 'ja']: ResourceLanguage }> =
  {
    '2024': {
      en: { common: enCommon2024 },
      ja: { common: jaCommon2024 },
    },
    '2025': {
      en: { common: enCommon2025 },
      ja: { common: jaCommon2025 },
    },
    '2026': {
      en: { common: enCommon2026 },
      ja: { common: jaCommon2026 },
    },
  }

// Dynamic resource loader function
const getLocaleResources = (year: string) => {
  // Return resources for the specified year, fallback to default year
  return (
    resourceMap[year] || resourceMap[i18n.localeYear] || resourceMap['2024']
  )
}

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const instance = createInstance()
  const lng = await i18next.getLocale(request)
  const ns = i18next.getRouteNamespaces(remixContext)

  // Get locale year based on request path
  const localeYear = getLocaleYearFromRequest(request)
  const lngs = getLocaleResources(localeYear)

  await instance
    .use(initReactI18next)
    .use(resourcesToBackend(lngs)) // バックエンドを適用
    .init({
      ...i18n,
      lng,
      ns,
    })

  const body = await renderToReadableStream(
    <I18nextProvider i18n={instance}>
      <RemixServer context={remixContext} url={request.url} />
    </I18nextProvider>,
    {
      signal: request.signal,
      onError(error: unknown) {
        // Log streaming rendering errors from inside the shell
        console.error(error)
        responseStatusCode = 500
      },
    },
  )

  if (isbot(request.headers.get('user-agent') || '')) {
    await body.allReady
  }

  responseHeaders.set('Content-Type', 'text/html')
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  })
}
