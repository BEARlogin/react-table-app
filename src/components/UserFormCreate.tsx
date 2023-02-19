import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { FormInput, FormError, FormSubmit } from '../ui/Form'
import { usersRepository } from '../domain/repository/UsersLocalRepository'
import { User } from '../domain/models/User'
import { Entity } from '../domain/types/Entity'

const UserFormCreate:FC<{onCreate: (user: Entity<User>) => void }> = ({ onCreate }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<User>()
  const onSubmit = (data: User) => {
    onCreate(usersRepository.create(data))
  }

  function createInput (code: keyof User, label: string, type: 'text' | 'date' = 'text') {
    return (
          <div className={'mb-3'}>
              <FormInput placeholder={label} type={type} aria-invalid={errors[code] ? 'true' : 'false'}
                         {...register(code, { required: true })} />
              {errors[code] && <FormError>{errors[code]?.type === 'required' && <p role="alert">
                  {label} is required</p>}</FormError>}
          </div>
    )
  }

  return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {createInput('firstName', 'Firstname')}
            {createInput('lastName', 'Lastname')}
            {createInput('role', 'Role')}
            {createInput('birthdate', 'Birthdate', 'date')}
            {createInput('photo', 'Photo')}
            <FormSubmit>Create user</FormSubmit>
        </form>
  )
}

export default UserFormCreate
