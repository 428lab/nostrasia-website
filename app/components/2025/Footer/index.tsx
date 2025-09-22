import { Link } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import { useTo } from '~/hooks/useTo'
import { BlueSky } from '~/icons/2025/Bluesky'
import { LinkArrow } from '~/icons/2025/LinkArrow'
import { Nostr } from '~/icons/2025/Nostr'
import { Note } from '~/icons/2025/Note'
import { X } from '~/icons/2025/X'

export const Footer = () => {
  const fullPath = useTo()
  const { t } = useTranslation()
  return (
    <footer className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-x-10">
        <Link to="/2024" className="flex items-center hover:underline">
          2024
          <LinkArrow width={24} />
        </Link>
        <a
          href="https://nostr.world/nostrasia/index.html"
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
        >
          {t('contact')}
        </a>
        <Link className="hover:underline" to={fullPath('/privacy-policy')}>
          {t('privacyPolicy')}
        </Link>
      </div>
      <div className="flex items-center gap-6">
        {[
          {
            icon: Nostr,
            url: 'https://njump.me/nprofile1qqs82r4f0jrrxcrwg0amxvy53yvzpzcsma7apj0uqvhkl8x28n4ddnspzpmhxue69uhkummnw3ezumt0d5hszrnhwden5te0dehhxtnvdakz7qgawaehxw309ahx7um5wghxy6t5vdhkjmn9wgh8xmmrd9skctclpm2nx',
          },
          {
            icon: X,
            url: 'https://x.com/nostrasia',
          },
          {
            icon: BlueSky,
            url: 'https://bsky.app/profile/nostrasia.bsky.social',
          },
          {
            icon: Note,
            url: 'https://note.com/nostrasia',
          },
        ].map(({ icon: Icon, url }, i) => (
          <a key={i} href={url} target="_blank" rel="noreferrer noopener">
            <Icon width={24} />
          </a>
        ))}
      </div>
      <p>© Nostrasia 2025</p>
    </footer>
  )
}
