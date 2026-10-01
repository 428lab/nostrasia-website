import { Link } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import { useTo } from '~/hooks/useTo'
import { LinkArrow } from '~/icons/2025/LinkArrow'
import { ShareSNS } from '../ShareSNS'

export const Footer = () => {
  const fullPath = useTo()
  const { t } = useTranslation()
  return (
    <footer className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-x-10">
        <a
          href="/2024"
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center hover:underline"
        >
          2024
          <LinkArrow width={24} />
        </a>
        <a
          href="https://nostr.world/nostrasia/index.html"
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center hover:underline"
        >
          2023
          <LinkArrow width={24} />
        </a>
      </div>
      <div className="flex items-center gap-x-4">
        <a
          className="hover:underline"
          href="https://docs.google.com/forms/d/e/1FAIpQLSfOPMX1EwMlH5J9BsPft2yylspYeNoBScf0kAzN8ETUX-CBcg/viewform"
          target="_blank"
          rel="noreferrer noopener"
        >
          {t('contact')}
        </a>
        <Link className="hover:underline" to={fullPath('/2025/privacy-policy')}>
          {t('privacyPolicy')}
        </Link>
      </div>
      <ShareSNS />
      <p>© Nostrasia 2025</p>
    </footer>
  )
}
