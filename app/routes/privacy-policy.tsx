import { LoaderFunctionArgs } from '@remix-run/node'
import { json, MetaFunction, useLoaderData } from '@remix-run/react'
import ReactMarkdown from 'react-markdown'

import { Logo } from '~/components/Logo'
import { useTo } from '~/hooks/useTo'
import i18next from '~/i18next.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const language =
    new URL(request.url).searchParams.get('lng') ||
    (await i18next.getLocale(request))

  const title = `Privacy Policy | Nostrasia 2024`

  const md =
    language === 'ja'
      ? (await import('../../public/md/ja/privacy-policy.md?raw')).default
      : (await import('../../public/md/en/privacy-policy.md?raw')).default

  return json({ title, md })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data?.title }]
}

export default function PrivacyPolicy() {
  const { md } = useLoaderData<typeof loader>()

  const to = useTo()

  return (
    <>
      <header className="py-10">
        <a href={to('/')}>
          <Logo size="small" />
        </a>
      </header>
      <div className="space-y-6">
        <ReactMarkdown className="prose max-w-none prose-h1:text-lg prose-h1:text-primary prose-h2:text-base prose-headings:text-default dark:prose-headings:text-dark text-default dark:text-dark prose-strong:text-default dark:prose-strong:text-dark prose-primary prose-a:no-underline prose-a:text-primary">
          {md}
        </ReactMarkdown>
      </div>
    </>
  )
}
