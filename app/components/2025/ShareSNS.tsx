import { BlueSky } from '~/icons/2025/Bluesky'
import { Nostr } from '~/icons/2025/Nostr'
import { Note } from '~/icons/2025/Note'
import { X } from '~/icons/2025/X'

export const ShareSNS = () => {
  return (
    <div className="flex items-center gap-6">
      {[
        {
          icon: Nostr,
          url: 'https://njump.me/nprofile1qqs82r4f0jrrxcrwg0amxvy53yvzpzcsma7apj0uqvhkl8x28n4ddnspzpmhxue69uhkummnw3ezumt0d5hszrnhwden5te0dehhxtnvdakz7qgawaehxw309ahx7um5wghxy6t5vdhkjmn9wgh8xmmrd9skctclpm2nx',
        },
        {
          icon: X,
          url: 'https://x.com/nostrasia',
        },
        {
          icon: BlueSky,
          url: 'https://bsky.app/profile/nostrasia.bsky.social',
        },
        {
          icon: Note,
          url: 'https://note.com/nostrasia',
        },
      ].map(({ icon: Icon, url }, i) => (
        <a key={i} href={url} target="_blank" rel="noreferrer noopener">
          <Icon width={24} />
        </a>
      ))}
    </div>
  )
}
