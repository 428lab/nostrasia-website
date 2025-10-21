type TimeTableProgramProps = {
  place: 'main' | 'lounge' | 'shrine' | 'vipRoom'
  placeName?: string
  start: React.ReactNode
  end: React.ReactNode
  title: React.ReactNode
}

const getColor = (place: TimeTableProgramProps['place']) => {
  switch (place) {
    case 'main':
      return 'bg-transparent'
    case 'lounge':
      return 'bg-mosgreen'
    case 'shrine':
      return 'bg-turquoise'
    case 'vipRoom':
      return 'bg-brown'
  }
}

export const TimeTableProgram = (props: TimeTableProgramProps) => {
  return (
    <div
      className={`p-4 flex flex-col gap-4 justify-between border border-foreground ${getColor(props.place)}`}
    >
      <div>
        <p className="font-semibold text-sm">
          {props.start} - {props.end}
        </p>
        <p className="mt-4 text-wrap whitespace-pre-line">{props.title}</p>
      </div>
      <div>
        <p className="font-semibold text-right text-sm">
          {props.placeName || props.place}
        </p>
      </div>
    </div>
  )
}
