/** セクション見出し。小さな英字ラベルと題 */
export const SectionHead = ({
  label,
  title,
}: {
  label: string
  title: string
}) => (
  <div className="sh">
    <h2>
      <small>{label}</small>
      {title}
    </h2>
  </div>
)
