import { useTranslation } from 'react-i18next'

import { EVENT_2026, SNS } from '~/data/2026'
import { useTo } from '~/hooks/useTo'

import { NAV_ITEMS } from './nav'

export const Footer = () => {
  const { t } = useTranslation()
  const to = useTo()

  return (
    <footer id="footer">
      <div className="wrap">
        <p className="fl">NOSTRASIA 2026</p>
        <ul>
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`}>{t(label)}</a>
            </li>
          ))}
        </ul>
        <ul>
          {SNS.map(({ id, label, url }) => (
            <li key={id}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            </li>
          ))}
          <li>#{EVENT_2026.hashtag}</li>
        </ul>
        <ul>
          <li>
            <a
              href={EVENT_2026.contactUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('footer.contact')}
            </a>
          </li>
          <li>
            {/* 年ごとに locale と CSS が違うので全ページ遷移にする */}
            <a href={to('/privacy-policy')}>{t('footer.privacy')}</a>
          </li>
        </ul>
        <p>{t('footer.copyright')}</p>
      </div>
    </footer>
  )
}
