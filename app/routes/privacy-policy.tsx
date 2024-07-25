import { useTranslation } from 'react-i18next'

import { Logo } from '~/components/Logo'

export default function PrivacyPolicy() {
  const { t } = useTranslation()
  return (
    <div className="max-w-[832px] px-4">
      <header>
        <Logo size="small" />
      </header>
    </div>
  )
}
