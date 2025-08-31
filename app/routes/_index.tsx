import { Link } from '@remix-run/react'

import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [{ title: 'Nostrasia' }]
}

export default function Index() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Nostrasia</h1>
        <p className="text-lg">Coming soon...</p>
        <Link 
          to="/2024" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          View 2024 Event
        </Link>
      </div>
    </div>
  )
}