// 2026 年版のプライバシーポリシーができるまでの一時リダイレクト
import { LoaderFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/react'

export async function loader({ request }: LoaderFunctionArgs) {
  const { search } = new URL(request.url)
  return redirect(`/2025/privacy-policy${search}`, 302)
}

// loader で必ずリダイレクトするので描画はされない。
// default export が無いと functions/[[path]].ts の型（ServerRouteModule）に合わないため置いている。
export default function Redirect() {
  return null
}
