import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

type ButtonProps<T extends string> = {
  color?: Color
  textOnly?: boolean
  href?: T
} & Omit<
  T extends string
    ? AnchorHTMLAttributes<HTMLAnchorElement>
    : ButtonHTMLAttributes<HTMLButtonElement>,
  'color'
>

const getColorClass = (color: Color) => {
  switch (color) {
    case 'primary':
      return {
        default:
          'bg-transparent border-primary hover:bg-primary text-primary hover:text-white',
        textOnly: 'hover:text-primary',
      }
    case 'secondary':
      return {
        default:
          'dark:text-default bg-secondary border-secondary hover:bg-secondary-active hover:border-secondary-active',
        textOnly: 'hover:text-secondary',
      }
  }
}

export const Button = (props: ButtonProps<string>) => {
  const colorClassNames = getColorClass(props.color || 'primary')
  const className = `inline-block leading-none transition ${
    props.textOnly
      ? colorClassNames.textOnly
      : `font-bold border px-6 py-3 rounded-full ${colorClassNames.default}`
  }`

  if (props.href) {
    const newProps = { ...props }
    delete newProps.textOnly
    return (
      <a
        {...newProps}
        className={className}
        target={props.href.match('http') ? '_blank' : undefined}
        rel={props.href.match('http') ? 'noopener noreferrer' : undefined}
      >
        {props.children}
      </a>
    )
  }

  return (
    <button
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      className={className}
    >
      {props.children}
    </button>
  )
}
