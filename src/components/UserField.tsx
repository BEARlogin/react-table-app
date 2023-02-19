import { ChangeEvent, FC, SyntheticEvent } from 'react'
import { UserFieldType } from './types/UserFieldType'
import UserFieldDate from './UserFieldDate'
import UserFieldImage from './UserFieldImage'
import { FormInput } from '../ui/Form'
import moment from 'moment'

const UserField: FC<{type?: UserFieldType, value: any, edit?: boolean, onChange?: (e: ChangeEvent<HTMLInputElement>) => void}> =
  ({ type, value, onChange, edit }) => {
    if (edit) {
      switch (type) {
        case UserFieldType.DATE:
          return (<FormInput type={'date'} defaultValue={moment(value).format('YYYY-MM-DD')} onChange={onChange} />)
        default:
          return (<FormInput defaultValue={value} onChange={onChange} />)
      }
    }

    switch (type) {
      case UserFieldType.IMAGE:
        return (<UserFieldImage src={value} alt={'user photo'} />)
      case UserFieldType.DATE:
        return (<UserFieldDate input={value} format={'DD.MM.YYYY'} />)
      default:
        return (<div>{value}</div>)
    }
  }

export default UserField
