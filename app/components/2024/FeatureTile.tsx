type FeatureTileProps = {
  title: string
  description: string
  backgroundIcon: string
  color: Color
}

export const FeatureTile = ({
  title,
  description,
  backgroundIcon,
  color,
}: FeatureTileProps) => {
  return (
    <div
      className={`flex flex-col justify-center px-3 py-6 rounded-lg relative ${color === 'primary' ? 'bg-primary/20' : 'bg-secondary/20'}`}
    >
      <h3 className="font-bold mt-4 text-left z-10 text-wrap break-words">
        {title}
      </h3>
      <p className="text-xs mt-2 z-10 text-wrap">{description}</p>
      <img
        className="absolute top-0 right-0 z-0"
        src={backgroundIcon}
        alt={title}
      />
    </div>
  )
}
