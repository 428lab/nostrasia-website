import { LoaderFunctionArgs } from '@remix-run/node'
import { json, MetaFunction, useLoaderData } from '@remix-run/react'
import ReactMarkdown from 'react-markdown'

import { Layout } from '~/components/2024/Layout'
import { Logo } from '~/components/2024/Logo'
import { useTo } from '~/hooks/useTo'
import i18next from '~/i18next.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const language =
    new URL(request.url).searchParams.get('lng') ||
    (await i18next.getLocale(request))

  const title = `Privacy Policy | Nostrasia 2024`

  const md =
    language === 'ja'
      ? (await import('../../public/2024/md/ja/privacy-policy.md?raw')).default
      : (await import('../../public/2024/md/en/privacy-policy.md?raw')).default

  return json({ title, md })
}

const linkBlock = (props: { href?: string; children?: React.ReactNode }) => {
  const { href, children } = props

  if (href?.match('http')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return <a href={href}>{children}</a>
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data?.title }]
}

export default function PrivacyPolicy() {
  const { md } = useLoaderData<typeof loader>()

  const to = useTo()

  return (
    <Layout>
      <header className="py-10">
        <a href={to('/2024')}>
          <Logo size="small" />
        </a>
      </header>
      <div className="space-y-6">
        <ReactMarkdown
          className="prose max-w-none prose-h1:text-lg prose-h1:text-primary prose-h2:text-base prose-headings:text-default dark:prose-headings:text-dark text-default dark:text-dark prose-strong:text-default dark:prose-strong:text-dark prose-primary prose-a:no-underline prose-a:text-primary"
          components={{
            link: linkBlock,
            a: linkBlock,
          }}
        >
          {md}
        </ReactMarkdown>
      </div>
    </Layout>
  )
}
