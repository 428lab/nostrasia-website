import { CSSProperties, RefObject, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FLEA_MARKET_2026, PROGRAMS_2026, Seller } from '~/data/2026'
import { useLocalized } from '~/hooks/useLocalized'

import { SectionHead } from './SectionHead'

/** 見出しの上に吊るす提灯の数。狭い画面では CSS で間引く */
const LANTERNS = 9

type Images = NonNullable<Seller['images']>

/** ひとことの中の [文字](URL) をリンクにする */
const withLinks = (text: string) =>
  text.split(/(\[[^\]]+\]\([^)]+\))/).map((part, i) => {
    const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part)
    return m ? (
      <a key={i} href={m[2]} target="_blank" rel="noopener noreferrer">
        {m[1]}
      </a>
    ) : (
      part
    )
  })

/** 屋台に出す写真は 3 枚まで（3 枚なら左に 1 枚、右に 2 枚を縦に） */
const MAX_IMAGES = 3

/** 3 枚並びで左の 1 枚の縦横比が分かるまでの仮の値（A4 縦） */
const LEAD_RATIO = 1 / Math.SQRT2

const Stall = ({
  seller,
  index,
  onOpen,
}: {
  seller: Seller
  index: number
  onOpen: (images: Images, at: number) => void
}) => {
  const { t } = useTranslation()
  const localized = useLocalized()
  const sign = seller.shop ?? seller.name
  const images = (seller.images ?? []).slice(0, MAX_IMAGES)
  // 3 枚並びは「左の 1 枚の高さ = 右の正方形 2 枚の高さ」になるよう、左の比率から列幅を決める
  const [lead, setLead] = useState(LEAD_RATIO)
  const measure = (img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalHeight)
      setLead(img.naturalWidth / img.naturalHeight)
  }

  return (
    <li className={`stall c${index % 4}`}>
      <div className="awn" aria-hidden="true" />
      <div className="stall-b">
        <div className="info">
          <div className="sign">
            <h3>
              {sign}
              {seller.shop && seller.name && (
                <small className="by">{seller.name}</small>
              )}
            </h3>
            {seller.status === 'planned' && (
              <span className="fuda">{t('market.planned')}</span>
            )}
          </div>
          <ul className="goods">
            {seller.items.map((item) => (
              <li key={item.ja}>{localized(item)}</li>
            ))}
          </ul>
          <div className="say">
            <span className="vh">{t('market.say')}: </span>
            {localized(seller.message)
              .split('\n\n')
              .map((para) => (
                <p key={para}>{withLinks(para)}</p>
              ))}
          </div>
          <div className="ft">
            <span className="pay">
              {seller.payment.map((p) => (
                <i key={p} className={p}>
                  {t(`market.${p}`)}
                </i>
              ))}
            </span>
            <span className="lk">
              {seller.npub && (
                <a
                  href={`https://njump.me/${seller.npub}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('market.nostrProfile')}
                </a>
              )}
              {seller.links?.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </span>
          </div>
        </div>
        <div className="media">
          {images.length === 0 ? (
            // 写真が届くまでの仮の枠
            <div className="ph-tbd">{t('market.photoSoon')}</div>
          ) : (
            <div
              className={`ph n${images.length}`}
              style={
                images.length === 3
                  ? ({ '--lead': `${lead * 2}fr` } as CSSProperties)
                  : undefined
              }
            >
              {images.map((image, i) => (
                <a
                  key={image.src}
                  href={image.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault()
                    onOpen(images, i)
                  }}
                >
                  <img
                    src={image.src}
                    alt={localized(image.alt)}
                    loading="lazy"
                    // 水和前に読み込み終わっていると onLoad が来ないので ref でも測る
                    ref={i === 0 ? measure : undefined}
                    onLoad={
                      i === 0 ? (e) => measure(e.currentTarget) : undefined
                    }
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

/** 写真をタップしたときの拡大表示。dialog なので Esc と背景タップで閉じる */
const Lightbox = ({
  dialog,
  images,
  at,
  onMove,
}: {
  dialog: RefObject<HTMLDialogElement>
  images: Images
  at: number
  onMove: (at: number) => void
}) => {
  const { t } = useTranslation()
  const localized = useLocalized()
  const image = images[at]
  const many = images.length > 1
  const move = (d: number) => onMove((at + d + images.length) % images.length)

  return (
    // 背景タップで閉じる。キーボードは dialog 標準の Esc と左右キー
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={dialog}
      className="lb"
      aria-label={t('market.lightbox')}
      onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      onKeyDown={(e) => {
        if (!many) return
        if (e.key === 'ArrowRight') move(1)
        if (e.key === 'ArrowLeft') move(-1)
      }}
    >
      {/* 開いたときのフォーカスは「閉じる」に置く（dialog は先頭の操作要素にフォーカスする） */}
      <button
        type="button"
        className="lb-x"
        onClick={() => dialog.current?.close()}
      >
        {t('market.close')}
      </button>
      {image &&
        (many ? (
          <button
            type="button"
            className="lb-img"
            aria-label={t('market.next')}
            onClick={() => move(1)}
          >
            <img src={image.src} alt={localized(image.alt)} />
          </button>
        ) : (
          <img src={image.src} alt={localized(image.alt)} />
        ))}
      {many && (
        <div className="lb-nav">
          <button
            type="button"
            aria-label={t('market.prev')}
            onClick={() => move(-1)}
          >
            ‹
          </button>
          <span>
            {at + 1} / {images.length}
          </span>
          <button
            type="button"
            aria-label={t('market.next')}
            onClick={() => move(1)}
          >
            ›
          </button>
        </div>
      )}
    </dialog>
  )
}

export const FleaMarket = () => {
  const { t } = useTranslation()
  const dialog = useRef<HTMLDialogElement>(null)
  const [box, setBox] = useState<{ images: Images; at: number }>({
    images: [],
    at: 0,
  })
  const open = (images: Images, at: number) => {
    setBox({ images, at })
    dialog.current?.showModal()
  }

  if (FLEA_MARKET_2026.length === 0) return null

  const total = FLEA_MARKET_2026.length
  const planned = FLEA_MARKET_2026.filter((s) => s.status === 'planned').length
  const callUrl = PROGRAMS_2026.find((p) => p.id === 'fleaMarket')?.url
  const payAll = FLEA_MARKET_2026.every(
    (s) => s.payment.includes('lightning') && s.payment.includes('cash'),
  )

  return (
    <section className="sec mkt" id="market">
      <div className="lanterns" aria-hidden="true">
        {Array.from({ length: LANTERNS }, (_, i) => (
          <span key={i} className={`ln c${i % 4}`} />
        ))}
      </div>
      <div className="wrap">
        <SectionHead label={t('market.label')} title={t('market.title')} />
        <p className="lead">{t('market.lead')}</p>
        <ul className="mk-facts">
          <li>
            {t('market.count', { count: total - planned })}
            {planned > 0 && ` ${t('market.countPlanned', { count: planned })}`}
          </li>
          {payAll && <li>{t('market.payAll')}</li>}
        </ul>
        <ul className="stalls">
          {FLEA_MARKET_2026.map((seller, i) => (
            <Stall
              key={seller.npub ?? i}
              seller={seller}
              index={i}
              onOpen={open}
            />
          ))}
        </ul>
        {callUrl && (
          <div className="mk-cta">
            <p className="ptl">{t('market.ctaTitle')}</p>
            <p>{t('market.ctaText')}</p>
            <a
              className="btn2"
              href={callUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('market.callForSellers')}
            </a>
          </div>
        )}
      </div>
      <Lightbox
        dialog={dialog}
        images={box.images}
        at={box.at}
        onMove={(at) => setBox((b) => ({ ...b, at }))}
      />
    </section>
  )
}
