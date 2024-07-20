import { RemixServer } from '@remix-run/react'
import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend' // バックエンド
import { renderToString } from 'react-dom/server'
import { I18nextProvider, initReactI18next } from 'react-i18next'

import i18n from './i18n'
import i18next from './i18next.server'
import enCommon from '../public/locales/en/common.json'
import jaCommon from '../public/locales/ja/common.json'

import type { EntryContext } from '@remix-run/server-runtime'

const lngs = {
  en: {
    common: enCommon,
  },
  ja: {
    common: jaCommon,
  },
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

  await instance
    .use(initReactI18next)
    .use(resourcesToBackend(lngs)) // バックエンドを適用
    .init({
      ...i18n,
      lng,
      ns,
    })

  const markup = renderToString(
    <I18nextProvider i18n={instance}>
      <RemixServer context={remixContext} url={request.url} />
    </I18nextProvider>,
  )

  responseHeaders.set('Content-Type', 'text/html')

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
