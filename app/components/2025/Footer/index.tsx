import { Link } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import { useTo } from '~/hooks/useTo'
import { LinkArrow } from '~/icons/2025/LinkArrow'

export const Footer = () => {
  const fullPath = useTo()
  const { t } = useTranslation()
  return (
    <footer className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-x-10">
        <Link to="/2024" className="flex items-center">
          2024
          <LinkArrow width={24} />
        </Link>
        <a
          href="https://nostr.world/nostrasia/index.html"
          className="flex items-center"
        >
          2023
          <LinkArrow width={24} />
        </a>
      </div>
      <div className="flex items-center gap-x-4">
        <a href="#">{t('contact')}</a>
        <Link to={fullPath('/privacy-policy')}>{t('privacyPolicy')}</Link>
      </div>
      <p>© Nostrasia 2025</p>
    </footer>
  )
}
