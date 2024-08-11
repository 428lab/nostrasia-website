type TimeScheduleProgramProps = {
  place: 'main' | 'lounge1' | 'lounge2' | 'vipRoom'
  start: React.ReactNode
  end: React.ReactNode
  title: React.ReactNode
}

const getColor = (place: TimeScheduleProgramProps['place']) => {
  switch (place) {
    case 'main':
      return 'bg-primary text-white'
    case 'lounge1':
      return 'bg-secondary text-foreground'
    case 'lounge2':
      return 'bg-turquoise text-foreground'
    case 'vipRoom':
      return 'bg-pink text-white'
  }
}

const convertPlace = (place: TimeScheduleProgramProps['place']) => {
  switch (place) {
    case 'main':
      return 'Main'
    case 'lounge1':
      return 'Lounge 1'
    case 'lounge2':
      return 'Lounge 2'
    case 'vipRoom':
      return 'VIP Room'
  }
}

export const TimeScheduleProgram = (props: TimeScheduleProgramProps) => {
  return (
    <div
      className={`p-4 flex flex-col gap-4 justify-between rounded-xl ${getColor(props.place)}`}
    >
      <div>
        <p className="font-bold text-sm">
          {props.start} ~ {props.end}
        </p>
        <p className="mt-4 text-wrap">{props.title}</p>
      </div>
      <div>
        <p className="font-bold text-right text-sm">
          {convertPlace(props.place)}
        </p>
      </div>
    </div>
  )
}
