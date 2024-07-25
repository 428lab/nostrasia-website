import { useSearchParams } from '@remix-run/react'

export const useTo = () => {
  const [params] = useSearchParams()
  const lng = `?lng=${params.get('lng')}` || ''

  const to = (path: string) => {
    return `${path}${lng}`
  }

  return to
}
