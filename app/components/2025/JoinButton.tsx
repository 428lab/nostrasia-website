import { useTranslation } from 'react-i18next'

export const JoinButton = () => {
  const { t, i18n } = useTranslation()
  return (
    // FIXME: link to the registration page
    <a
      className="bg-primary rounded-full border border-foreground font-serif w-[120px] h-[120px] flex items-center justify-center text-lg hover:bg-primary/60 cursor-pointer"
      href={
        i18n.language === 'ja'
          ? 'https://docs.google.com/forms/d/e/1FAIpQLSfV1xJGGAeleEL12BQm1rDYddzw7zAvwbpcbTaXH3n6bJzBtw/viewform?usp=header'
          : 'https://docs.google.com/forms/d/e/1FAIpQLSexa5Q4Wh0Ph_EFmmnHR3nxxefiShL2tHWJ8hwPSk8_iiAAmg/viewform?usp=header'
      }
    >
      {t('join')}
    </a>
  )
}
