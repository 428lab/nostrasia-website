import { ComponentProps } from 'react'

import { Person } from '~/icons/2026/Person'

/** 画像が無い登壇者の仮アバターの配色（体・頭・小物）。並び順で回す */
// prettier-ignore
const AVATARS: readonly ComponentProps<typeof Person>[] = [
  { body: 'var(--pu)', head: 'var(--ye)' },
  { body: 'var(--te)', head: 'var(--or)', acc: 'hat', accColor: 'var(--ink)' },
  { body: 'var(--or)', head: 'var(--pu)', acc: 'badge', accColor: 'var(--ye)' },
  { body: 'var(--ye)', head: 'var(--te)' },
  { body: 'var(--ink)', head: 'var(--ye)', acc: 'hat', accColor: 'var(--or)' },
  { body: 'var(--pu)', head: 'var(--or)', acc: 'badge', accColor: 'var(--te)' },
]

export const Avatar = ({ index }: { index: number }) => (
  <Person {...AVATARS[index % AVATARS.length]} />
)
