import { useRevealOnce } from '~/hooks/useRevealOnce'
import { ShapeIcon, ShapeName } from '~/icons/2026/ShapeIcon'

/** セクション見出し。画面に入ったときに 1 回だけ図形アイコンがポンと出る */
export const SectionHead = ({
  icon,
  label,
  title,
}: {
  icon: ShapeName
  label: string
  title: string
}) => {
  const [ref, shown] = useRevealOnce<HTMLDivElement>()
  return (
    <div ref={ref} className={shown ? 'sh in' : 'sh'}>
      <ShapeIcon name={icon} className="ic" />
      <h2>
        <small>{label}</small>
        {title}
      </h2>
    </div>
  )
}
