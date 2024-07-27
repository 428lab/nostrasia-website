type LogoProps = {
  size?: 'small' | 'large'
}

export const Logo = ({ size = 'small' }: LogoProps) => {
  return (
    <picture className="inline-block">
      <source
        srcSet="/logo-dark.svg"
        className={`w-full ${size === 'large' ? 'max-w-[574px]' : 'max-w-[196px]'}`}
        media="(prefers-color-scheme: dark)"
      />
      <source
        srcSet="/logo.svg"
        className={`w-full ${size === 'large' ? 'max-w-[574px]' : 'max-w-[196px]'}`}
        media="(prefers-color-scheme: light)"
      />
      <img
        className={`w-full ${size === 'large' ? 'max-w-[574px]' : 'max-w-[196px]'}`}
        src="/logo.svg"
        alt="Nostrasia 2024"
      />
    </picture>
  )
}
