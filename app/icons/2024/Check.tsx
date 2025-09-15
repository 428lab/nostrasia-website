import type { SVGAttributes } from 'react'

export const CheckIcon = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#DDE20A"
      {...props}
    >
      <path
        d="M13 1L4.42857 11L1 7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <title>Check Icon</title>
    </svg>
  )
}
