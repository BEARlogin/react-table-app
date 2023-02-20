import { ChangeEvent, FC } from 'react'
import { FormInput } from '../ui/Form'

const UsersSearch: FC<{onChange: (event: ChangeEvent<HTMLInputElement>) => void}> = ({ onChange }) => {
  return (
        <div>
            <FormInput placeholder={'Search'} onChange={onChange} />
        </div>
  )
}

export default UsersSearch
