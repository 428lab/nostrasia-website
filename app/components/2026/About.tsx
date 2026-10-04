import { useTranslation } from 'react-i18next'

import { Mark, PU, Shape, ShapeKind, TE, YE } from '~/icons/2026/Shapes'

import { Lead, QSection } from './QSection'

export const About = () => {
  const { t } = useTranslation()
  return (
    <QSection
      id="about"
      marks={[
        { icon: <Shape kind="half" color={TE} />, label: t('about.capStage') },
        { icon: <Shape kind="circ" color={PU} />, label: t('about.capPeople') },
      ]}
      caption={t('about.cap')}
    >
      <Lead i18nKey="about.lead" />
      <div className="two">
        <div className="panel">
          <Mark id="about" className="pi" />
          <h3>
            Nostrasia<small>NOSTR × ASIA</small>
          </h3>
          <p>{t('about.nostrasiaText')}</p>
        </div>
        <div className="panel">
          <Mark id="faq" className="pi" />
          <h3>
            Nostr<small>NOTES AND OTHER STUFF TRANSMITTED BY RELAYS</small>
          </h3>
          <p>{t('about.nostrText')}</p>
        </div>
      </div>
    </QSection>
  )
}

/** 過去回の企画。図形はその企画の種類（半円＝ステージ、円＝人、三角＝場所） */
const PROGRAM: { key: string; en: string; kind: ShapeKind; color: string }[] = [
  { key: 'talk', en: 'TALK / LT', kind: 'half', color: TE },
  { key: 'handson', en: 'HANDS-ON', kind: 'circ', color: PU },
  { key: 'market', en: 'MARKET', kind: 'tri', color: YE },
  { key: 'shrine', en: 'NOSTR SHRINE', kind: 'tri', color: PU },
  { key: 'show', en: 'HERO SHOW', kind: 'half', color: PU },
  { key: 'dj', en: 'DJ / SOCIAL', kind: 'circ', color: TE },
]

export const Program = () => {
  const { t } = useTranslation()
  return (
    <QSection
      id="program"
      marks={[
        {
          icon: <Shape kind="half" color={TE} />,
          label: t('program.capStage'),
        },
        {
          icon: <Shape kind="circ" color={PU} />,
          label: t('program.capHandson'),
        },
        {
          icon: <Shape kind="tri" color={YE} />,
          label: t('program.capMarket'),
        },
      ]}
      caption={t('program.cap')}
    >
      <span className="kick">{t('program.kick')}</span>
      <Lead i18nKey="program.lead" />
      <p className="pnote">{t('program.note')}</p>
      <div className="cg">
        {PROGRAM.map((p) => (
          <article key={p.key} className="cc">
            <Shape kind={p.kind} color={p.color} />
            <h3>
              <small>{p.en}</small>
              {t(`program.items.${p.key}.title`)}
            </h3>
            <p>{t(`program.items.${p.key}.text`)}</p>
          </article>
        ))}
      </div>
    </QSection>
  )
}
