import { LoaderFunctionArgs } from '@remix-run/node'
import { json, Link, MetaFunction, useLoaderData } from '@remix-run/react'
import { PrivacyPolicy as PrivacyPolicyTitle } from '~/icons/2025/PrivacyPolicy'
import ReactMarkdown from 'react-markdown'

import { Layout } from '~/components/2025/Layout'
import i18next from '~/i18next.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const language =
    new URL(request.url).searchParams.get('lng') ||
    (await i18next.getLocale(request))

  const title = `Privacy Policy | Nostrasia 2025`

  const md =
    language === 'ja'
      ? (await import('../../public/2025/md/ja/privacy-policy.md?raw')).default
      : (await import('../../public/2025/md/en/privacy-policy.md?raw')).default

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

  return (
    <Layout>
      <div className="space-y-10 sm:space-y-20 mx-auto max-w-[800px]">
        <div className="flex items-center gap-2">
          <Link to="/" className="underline">
            Home
          </Link>
          <span>/</span>
          <span>Privacy Policy</span>
        </div>
        <h1 className="flex justify-center">
          <PrivacyPolicyTitle width={513} />
        </h1>
        <ReactMarkdown
          className="prose max-w-none prose-h2:text-base prose-headings:text-default text-default prose-strong:text-default prose:text-default prose-a:text-default prose-a:underline"
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
