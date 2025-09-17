import { SVGAttributes } from 'react'

export const Hamburger = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="#FFF8F8"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M6.66663 28.7821V27.1154H33.3333V28.7821H6.66663ZM6.66663 20.8333V19.1667H33.3333V20.8333H6.66663ZM6.66663 12.8846V11.2179H33.3333V12.8846H6.66663Z" />
    </svg>
  )
}
