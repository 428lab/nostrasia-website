import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

type ButtonColor = 'primary' | 'secondary'

type ButtonProps<T extends string> = {
  color?: ButtonColor
  textOnly?: boolean
  href?: T
} & Omit<
  T extends string
    ? AnchorHTMLAttributes<HTMLAnchorElement>
    : ButtonHTMLAttributes<HTMLButtonElement>,
  'color'
>

const getColorClass = (color: ButtonColor) => {
  switch (color) {
    case 'primary':
      return {
        default:
          'bg-transparent border-primary hover:bg-primary text-primary hover:border-color-primary hover:text-white',
        textOnly: 'text-primary border-primary',
      }
    case 'secondary':
      return {
        default:
          'bg-secondary border-secondary hover:bg-secondary-active hover:border-color-secondary-active',
        textOnly: 'text-secondary border-secondary',
      }
  }
}

export const Button = (props: ButtonProps<string>) => {
  const colorClassNames = getColorClass(props.color || 'primary')
  const className = `font-bold leading-none transition ${
    props.textOnly
      ? `border-b border-opacity-0 hover:border-opacity-100 ${colorClassNames.textOnly}`
      : `border px-6 py-3 rounded-full ${colorClassNames.default}`
  }`

  if (props.href) {
    return (
      <a {...props} className={className}>
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
