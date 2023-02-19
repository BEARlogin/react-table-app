import { FC } from 'react'
import moment from 'moment'

const UserFieldDate: FC<{input: Date, format: string}> = ({ input, format }) => {
  const dateFormatted = moment(input).format(format)
  return (
        <div>
            {dateFormatted}
        </div>
  )
}

export default UserFieldDate
