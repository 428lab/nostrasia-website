import { useTranslation } from 'react-i18next'

export const JoinButton = () => {
  const { t } = useTranslation()
  return (
    // FIXME: link to the registration page
    <a
      className="bg-primary rounded-full border border-foreground font-serif w-[120px] h-[120px] flex items-center justify-center text-lg hover:bg-primary/60 cursor-pointer"
      href="#"
    >
      {t('join')}
    </a>
  )
}
