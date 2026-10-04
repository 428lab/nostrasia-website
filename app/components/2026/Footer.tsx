import { useTranslation } from 'react-i18next'

import { EVENT_2026, SNS } from '~/data/2026'
import { useTo } from '~/hooks/useTo'

import { NAV_IDS } from './sections'

export const Footer = () => {
  const { t } = useTranslation()
  const to = useTo()

  return (
    <footer className="foot" id="footer">
      <p className="fl">
        NOSTRASIA
        <br />
        2026
      </p>
      <nav aria-label={t('a11y.footerNav')}>
        <ul>
          {NAV_IDS.map((id) => (
            <li key={id}>
              <a href={`#${id}`}>{t(`nav.${id}`)}</a>
            </li>
          ))}
        </ul>
      </nav>
      <ul aria-label={t('a11y.sns')}>
        {SNS.map((s) => (
          <li key={s.id}>
            <a href={s.url} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          </li>
        ))}
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
      <p>#{EVENT_2026.hashtag} / © Nostrasia 2026</p>
    </footer>
  )
}
