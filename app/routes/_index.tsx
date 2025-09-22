import { useTranslation } from 'react-i18next'

import { JoinButton } from '~/components/2025/JoinButton'
import { Layout } from '~/components/2025/Layout'

import { Access } from '~/icons/2025/Access'
import { Contents } from '~/icons/2025/Contents'
import { EventDate } from '~/icons/2025/EventDate'
import { Hanashi } from '~/icons/2025/Hanashi'
import { Ichi } from '~/icons/2025/Ichi'
import { Inori } from '~/icons/2025/Inori'
import { Matsuri } from '~/icons/2025/Matsuri'
import { Overview } from '~/icons/2025/Overview'
import { Sponsors } from '~/icons/2025/Sponsors'
import { TextileLogo } from '~/icons/2025/TextileLogo'
import { Waza } from '~/icons/2025/Waza'

import type { MetaFunction } from '@remix-run/node'
import { LinkArrow } from '~/icons/2025/LinkArrow'

export const meta: MetaFunction = () => {
  return [{ title: 'Nostrasia 2025' }]
}

export default function Index() {
  return (
    <Layout>
      <div className="space-y-20 sm:space-y-40 mt-20 sm:mt-40">
        <Top />
        <AboutSection />
        <OverViewSection />
        <ContentsSection />
        <SponsorsSection />
        <AccessSection />
      </div>
    </Layout>
  )
}

const Top = () => (
  <div className="flex flex-col gap-12 w-full items-end">
    <h1 className="w-full max-w-[800px]">
      <TextileLogo />
    </h1>
    <EventDate className="w-full max-w-[326px]" />
    <JoinButton />
  </div>
)

const AboutSection = () => {
  const { t } = useTranslation()
  return (
    <div className="">
      <div
        className="relative -ml-4 sm:-ml-8 -mr-4 sm:-mr-8 overflow-hidden"
        id="about"
      >
        <div className="absolute -z-10 w-screen opacity-30 min-w-[1280px]">
          <svg
            viewBox="0 0 1280 784"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1304.81 22.0581C1119.12 21.6482 934.161 11.5884 749.199 7.40049C710.493 6.55848 670.346 6.55848 631.944 11.4333C602.81 14.2141 574.245 18.1694 546.021 22.9112C433.125 41.8675 325.746 73.3321 210.083 92.8867C131.23 106.292 50.9372 110.491 -29.3559 98.7586C-30.7965 98.7586 -29.3559 93.7287 -29.3559 91.2137C158.468 113.837 330.541 56.0155 504.017 21.6593C539.14 14.5354 574.624 8.67458 610.752 4.66395C840.979 -11.024 1073.25 18.3134 1304.81 14.4025V22.0803V22.0581ZM1304.81 55.8936C1091.89 57.6884 881.106 40.9258 670.119 46.3324C644.53 47.9942 619.244 50.5757 594.185 53.844C493.99 66.9173 397.433 90.9368 298.981 110.491C192.872 131.442 81.0376 141.491 -29.3559 130.6V137.303C76.7538 149.035 174.239 139.818 274.605 123.055C367.807 107.134 452.403 86.1838 545.604 70.2521C579.306 64.8012 612.629 60.8238 646.179 58.2313C865.355 46.7866 1084.72 67.7372 1304.83 65.1447V55.8825L1304.81 55.8936ZM1304.83 96.5982C1107.66 94.5596 911.207 86.1838 712.673 88.3775C682.895 88.5437 653.306 90.0837 623.641 92.8534C593.977 95.6121 564.218 99.6006 534.117 104.619C346.293 134.788 164.212 175.858 -29.3559 160.768V166.64C65.2671 175.858 151.304 170.828 245.946 159.937C382.156 143.873 503.429 113.848 633.46 103.046C659.466 100.886 685.814 99.5009 712.711 99.1353C911.245 97.0746 1107.67 103.777 1304.92 107.699L1304.84 96.5982H1304.83ZM1305.39 137.402C1123.43 131.431 941.345 123.886 757.71 125.581C714.739 125.16 672.469 126.412 630.37 129.547C588.272 132.694 546.324 137.713 504.036 144.837C327.66 173.343 151.304 196.808 -29.3559 186.749V194.294C60.9833 200.165 147.001 198.481 238.762 189.264C386.439 175.016 522.65 146.521 669.626 139.707C704.996 138.466 740.347 137.835 775.717 137.502C952.813 135.619 1129.17 138.976 1305.79 150.531L1305.41 137.402H1305.39ZM1306.87 179.292C1159.27 168.313 1010.15 159.095 861.564 158.696C824.412 158.342 787.223 158.364 749.938 158.818C627.338 158.264 511.201 175.016 390.742 193.463C250.229 215.255 111.138 217.77 -29.3749 213.571V223.631C85.3214 228.661 195.734 228.661 311.871 214.413C455.246 196.808 587.172 172.512 729.486 171.005C761.766 170.341 793.989 169.997 826.156 169.997C852.958 169.997 879.742 170.23 906.487 170.673C1041.69 172.501 1175.04 180.888 1307.54 194.947L1306.87 179.292ZM1308.73 224.539C1193.69 214.413 1080.42 199.323 965.153 190.881C936.36 188.82 907.473 187.225 878.434 186.328C849.395 185.43 820.204 185.22 790.805 185.918C765.235 186.472 739.911 187.546 714.739 189.031C684.714 190.106 656.035 192.621 625.916 196.808C402.21 226.135 194.312 257.145 -29.3559 246.254V258.829C214.386 276.434 442.375 233.691 673.209 201.949C710.019 198.36 746.413 196.487 782.503 195.922C962.916 193.064 1135.29 222.501 1309.3 241.967L1308.73 224.551V224.539ZM1309.89 269.853C1145.32 245.235 982.382 212.685 811.409 211.743C782.92 211.588 754.184 212.308 725.202 214.081C693.301 215.244 661.76 218.601 630.219 224.462C412.256 263.017 197.174 295.7 -29.3559 284.799V303.234C82.4782 302.392 194.312 309.106 306.165 291.501C446.678 270.551 577.164 240.383 717.677 228.96C747.341 226.578 777.044 224.916 806.784 224.174C895.986 221.936 985.453 227.907 1074.69 247.085C1152.12 263.006 1230.98 277.254 1310.02 289.54L1309.9 269.842L1309.89 269.853ZM1309.77 316.717C1219.51 301.572 1133.47 280.622 1046.01 260.502C961.058 241.014 875.496 235.796 790.388 239.264C762.012 240.416 733.694 242.543 705.47 245.424C569.98 258.829 448.1 291.512 316.192 314.147C202.918 334.256 86.781 330.068 -29.3559 328.395C-29.3559 335.94 -30.7965 348.503 -29.3559 348.503C212.964 371.969 429.467 316.662 643.108 263.017C672.867 257.145 702.267 253.234 731.381 250.963C935.166 235.065 1124.09 299.689 1309.3 339.341L1309.77 316.717ZM1308.58 365.931C1213.77 348.503 1129.17 320.008 1040.27 294.027C926.769 261.2 801.306 256.314 681.321 273.542C657.324 276.988 633.555 281.32 610.127 286.483C409.394 342.631 198.615 392.908 -28.6546 376.29V400.708H70.1196C100.978 400.708 138.111 400.475 180.343 398.791C326.22 391.224 452.403 347.65 581.448 308.253C793.648 243.717 1005.87 291.49 1195.13 363.56C1230.98 376.965 1268.26 384.51 1307.91 391.468L1308.6 365.908L1308.58 365.931ZM1307.42 416.595C1193.69 399.622 1104.79 357.721 1002.99 322.523C879.685 278.949 737.731 283.968 612.989 318.335C438.054 366.939 270.303 433.147 70.1196 424.639H-28.6546V450.974H70.1196C169.936 452.414 267.44 440.681 359.201 415.543C498.274 377.83 620.154 318.324 776.437 308.275C932.721 297.384 1040.25 366.939 1164.99 411.355C1210.88 426.445 1258.2 435.662 1307.08 444.293L1307.4 416.595H1307.42ZM1306.93 467.426C1249.61 459.128 1195.11 448.226 1142.06 428.948C1050.3 395.423 981.473 348.492 879.666 328.384C786.464 310.779 691.841 328.384 608.667 354.364C436.613 407.998 271.724 477.564 70.1006 472.977H-28.6546V501.228C-28.6546 501.228 8.38335 501.228 70.1954 501.129C263.119 501.86 422.283 438.166 587.172 382.859C660.3 357.721 736.291 337.601 822.327 343.473C922.693 351.018 990.078 393.761 1064.65 430.633C1136.33 464.989 1218.07 487.623 1306.7 497.118L1306.93 467.437V467.426ZM1306.47 518.124C1218.07 510.236 1136.33 488.454 1064.65 454.929C994.381 422.246 937.042 382.859 852.446 365.255C773.594 349.334 693.301 365.255 623.035 388.72C446.678 446.542 277.486 517.781 71.0673 520.207C8.40231 521.315 -28.6356 521.315 -28.6356 521.315V551.483C-28.6356 551.483 8.4023 551.483 72.1477 549.289C284.651 543.761 458.146 471.692 641.687 412.186C732.026 382.018 842.419 382.017 922.712 423.919C1035.99 482.582 1152.12 542.088 1306 549.555L1306.47 518.124ZM1305.75 564.279C1142.08 558.84 1023.06 493.473 899.758 434.809C820.905 397.938 720.539 402.968 637.365 428.937C455.265 486.759 281.77 555.483 72.6785 562.972C8.49708 565.609 -28.6356 565.698 -28.6356 565.698V597.86C214.405 600.741 426.605 533.69 638.805 470.839C711.934 449.046 795.089 445.7 868.217 474.195C1010.17 530.344 1133.47 594.88 1305.24 597.306L1305.75 564.279ZM1305.09 609.748C1136.33 608.297 1007.29 547.118 865.355 495.157C704.769 435.651 548.485 516.95 403.669 553.821C266.019 589.019 122.644 600.752 -26.4748 614.158C-29.337 614.158 -27.9153 632.593 -27.9153 644.326C184.285 644.326 386.458 604.94 578.586 553.81C734.869 511.909 883.988 558.84 1021.64 604.098C1109.1 632.593 1206.6 642.653 1304.83 644.282L1305.09 609.748ZM1304.81 654.508C1130.59 657.743 980.051 605.782 823.768 567.227C760.686 552.137 690.42 552.137 625.897 564.712C409.394 604.098 200.056 656.901 -27.9343 654.386C-27.9343 666.118 -29.3749 686.227 -26.4937 686.227C185.707 701.317 379.275 656.89 594.356 631.751C677.511 621.691 754.942 624.206 835.235 636.781C959.978 657.732 1078.98 686.227 1207.72 688.941C1267.79 690.692 1304.83 690.703 1304.83 690.703V654.496L1304.81 654.508ZM1304.81 698.901C1304.81 698.901 1267.77 698.901 1207.36 697.55C1086.16 694.614 970.024 673.663 851.006 653.555C754.942 638.465 661.741 635.95 562.815 648.525C360.642 672.832 172.817 700.486 -28.5977 698.879L-28.6356 737.124C-28.6356 737.124 8.44022 737.102 70.9725 736.393C230.175 734.842 386.458 718.921 547.045 709.704C617.311 705.516 686.117 704.674 756.383 708.031C908.364 717.248 1054.62 737.368 1206.28 736.914C1267.77 737.135 1304.81 737.135 1304.81 737.135V698.924V698.901ZM1304.81 743.306C1304.81 743.306 1267.77 743.306 1206.2 743.162C1058.92 744.06 915.528 727.297 767.851 718.079C700.466 714.722 633.062 714.722 565.677 717.237C399.348 724.782 237.34 742.376 70.8019 742.708C8.42126 743.284 -28.6356 743.295 -28.6356 743.295V783.523C-28.6356 783.523 8.40231 783.523 70.1954 783.479C403.669 778.416 734.888 766.683 1071.83 782.604C1116.28 785.119 1162.17 783.446 1206.05 783.523H1304.83V743.295L1304.81 743.306Z"
              fill="url(#paint0_linear_2071_244)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2071_244"
                x1="640"
                y1="-0.000340663"
                x2="640"
                y2="784"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4C0000" />
                <stop offset="0.04" stopColor="#69120F" />
                <stop offset="0.11" stopColor="#902A22" />
                <stop offset="0.17" stopColor="#AF3C32" />
                <stop offset="0.24" stopColor="#C54A3D" />
                <stop offset="0.3" stopColor="#D25243" />
                <stop offset="0.35" stopColor="#D75546" />
                <stop offset="0.52" stopColor="#D45747" />
                <stop offset="0.63" stopColor="#CB5F4E" />
                <stop offset="0.72" stopColor="#BC6C59" />
                <stop offset="0.8" stopColor="#AA7C66" />
                <stop offset="1" stopColor="#395B4B" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="space-y-5 z-10 px-4 sm:px-8 py-16 mx-0">
          <Matsuri className="max-w-[120px] max-h-[120px] sm:max-w-[160px] sm:max-h-[160px]" />
          <div className="max-w-screen-sm whitespace-pre-line space-y-5">
            <p className="leading-[1.7]">{t('about.description')}</p>
            <p className="font-bold font-serif text-2xl">
              {t('about.catchphrase')}
            </p>
          </div>
          <JoinButton />
        </div>
      </div>
    </div>
  )
}

const OverViewSection = () => {
  const { t } = useTranslation()

  const list = [
    {
      label: t('overview.eventName.label'),
      value: t('overview.eventName.value'),
      action: t('overview.eventName.share'),
      onAction: () =>
        window.navigator.share({
          title: 'Nostrasia 2025',
          url: 'https://nostrasia.com',
        }),
    },
    {
      label: t('overview.date.label'),
      value: t('overview.date.value'),
      action: t('overview.date.calendar'),
      href: 'https://www.google.com/calendar/render?action=TEMPLATE&text=Nostrasisa 2025&dates=20251122T033000Z/20251122T120000Z&location= 東京都新宿区歌舞伎町２丁目１９−１５てなむタウンビル 6F Crypto Lounge GOX&trp=true&trp=undefined&trp=true&sprop=https://nostrasia.com',
    },
    {
      label: t('overview.place.label'),
      value: `${t('overview.place.name')}\n\n${t('overview.place.address.address1')}\n${t('overview.place.address.address2')}\n${t('overview.place.address.postalCode')}`,
      action: t('overview.place.maps'),
      href: 'https://maps.app.goo.gl/6Ux4pcr7VozUYfQc6',
    },
    {
      label: t('overview.fees.label'),
      value: t('overview.fees.value'),
    },
  ]

  return (
    <section id="overview" className="max-w-[800px] mx-auto">
      <h2>
        <Overview className="h-12 sm:h-20 mx-auto" />
      </h2>
      <div className="mt-10">
        {list.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-stretch sm:gap-0 py-10 border-b border-foreground"
          >
            <span className="font-bold w-36">{item.label}</span>
            <div className="space-y-4">
              <p className="whitespace-pre-line">{item.value}</p>
              {item.action && (
                <>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center hover:underline"
                    >
                      {item.action}
                      <LinkArrow width={24} />
                    </a>
                  ) : (
                    <button
                      onClick={item.onAction}
                      className="flex items-center hover:underline"
                    >
                      {item.action}
                      <LinkArrow width={24} />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const ContentsSection = () => {
  const { t, i18n } = useTranslation()

  const list = [
    {
      key: 'waza',
      titleComponent: Waza,
      value: t('contents.waza'),
    },
    {
      key: 'ichi',
      titleComponent: Ichi,
      value: t('contents.ichi'),
    },
    {
      key: 'inori',
      titleComponent: Inori,
      value: t('contents.inori'),
    },
    {
      key: 'hanashi',
      titleComponent: Hanashi,
      value: t('contents.hanashi'),
    },
  ]

  return (
    <section id="contents" className="max-w-[1200px] mx-auto">
      <h2>
        <Contents className="h-12 sm:h-20 mx-auto" />
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-20">
        {list.map((item, index) => {
          const TitleComponent = item.titleComponent
          return (
            <div key={index} className="grid-1 px-5 py-5 lg:py-0 space-y-4">
              <TitleComponent className="h-20 leading-none" />
              {i18n.language !== 'ja' && (
                <p className="font-serif text-xl">
                  {t(`contents.headers.${item.key}`)}
                </p>
              )}
              <p className="whitespace-pre-line leading-[1.7]">{item.value}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

const SponsorsSection = () => {
  const { i18n } = useTranslation()
  const sponsors = [
    {
      name: '全力機械 zenryokukikai',
      url: 'https://zenryokukikai.com/',
      logo: `/2025/${i18n.language}/zenryokukikai.webp`,
      width: 400,
      height: 80,
    },
    {
      name: '日本ビットコイン産業 Japan Bitcoin Industry',
      url: 'https://jbi.co.jp/',
      logo: '/2025/japan-bitcoin-industry.webp',
      width: 140,
      height: 140,
    },
    {
      name: 'Momoko Kuratani',
      url: 'https://apco.dev/',
    },
    {
      name: 'Shino3 (しのさん)',
      url: 'https://shino3.net/',
    },
  ]
  return (
    <section id="sponsors" className="flex flex-col items-center">
      <h2>
        <Sponsors className="h-[68px] sm:h-[107px] mx-auto" />
      </h2>
      <div className="mt-20 flex flex-col items-center gap-10">
        {sponsors.map((sponsor, index) => (
          <a
            key={index}
            href={sponsor.url}
            target="_blank"
            rel="noreferrer noopener"
          >
            {sponsor.logo ? (
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                width={sponsor.width}
                height={sponsor.height}
                loading="lazy"
              />
            ) : (
              <span className="font-bold text-2xl">{sponsor.name}</span>
            )}
          </a>
        ))}
      </div>
    </section>
  )
}

const AccessSection = () => {
  const { t } = useTranslation()
  return (
    <section id="access">
      <h2>
        <Access className="h-12 sm:h-20 mx-auto" />
      </h2>
      <div className="overflow-hidden w-full h-[320px] mt-10">
        <iframe
          title="Crypto Lounge GOX - Google Map"
          className="w-[800px] h-[320px] scale-[1.015] mx-auto"
          src="https://maps.google.co.jp/maps?output=embed&q=東京都新宿区歌舞伎町２丁目１９−１５てなむタウンビル6FCrypto Lounge GOX"
        />
      </div>
      <div className="space-y-4 mt-6 text-center whitespace-pre-line">
        <p>{t('access.name')}</p>
        <p>{t('access.address')}</p>
      </div>
    </section>
  )
}
