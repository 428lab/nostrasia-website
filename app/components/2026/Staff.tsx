import { useTranslation } from 'react-i18next'

import { STAFF_2026 } from '~/data/2026'
import { useLocalized } from '~/hooks/useLocalized'

import { Avatar } from './Avatar'
import { SectionHead } from './SectionHead'

export const Staff = () => {
  const { t } = useTranslation()
  const localized = useLocalized()

  if (STAFF_2026.length === 0) return null

  return (
    <section className="sec" id="staff">
      <div className="wrap">
        <SectionHead label={t('staff.label')} title={t('staff.title')} />
        <div className="sg staff-g">
          {STAFF_2026.map((staff, i) => (
            <div className="sp" key={staff.name}>
              {staff.image ? (
                <img src={staff.image} alt="" />
              ) : (
                <Avatar index={i} />
              )}
              <b>{staff.name}</b>
              {staff.role && <small>{localized(staff.role)}</small>}
              {(staff.npub || staff.x) && (
                <span className="lk">
                  {staff.npub && (
                    <a
                      href={`https://njump.me/${staff.npub}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Nostr
                    </a>
                  )}
                  {staff.x && (
                    <a
                      href={`https://x.com/${staff.x}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      X
                    </a>
                  )}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
