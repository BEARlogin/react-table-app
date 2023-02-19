import Table from '../ui/Table/Table'
import TableHead, { TableHeadItem } from '../ui/Table/TableHead'
import TableBody from '../ui/Table/TableBody'
import TableRow from '../ui/Table/TableRow'
import { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from 'react'
import { User } from '../domain/models/User'
import { Entity } from '../domain/types/Entity'
import { usersRepository } from '../domain/repository/UsersLocalRepository'
import TableCol from '../ui/Table/TableCol'
import UserField from './UserField'
import { UsersTableSchema } from './types/UsersTableSchema'
import { UserFieldType } from './types/UserFieldType'
import UserFormCreate from './UserFormCreate'
import { Id } from '../domain/types/Id'
import TableHeader from '../ui/Table/TableHeader'
import { FormInput } from '../ui/Form'

const UsersTable = () => {
  const [users, setUsers] = useState<Entity<User>[]>([])
  const [editUserId, setEditUserId] = useState<Id | null>(null)
  const editUser = useRef<Partial<User> | null>(null)

  useEffect(() => {
    setUsers(usersRepository.get())
  }, [])

  function onAddUser (userEntity: Entity<User>) {
    setUsers([...usersRepository.get()])
  }

  function deleteUser (id: Id) {
    usersRepository.delete(id)
    setUsers([...usersRepository.get()])
  }

  const dataSchema: UsersTableSchema = [
    {
      code: 'id',
      header: {
        title: 'id'
      },
      readonly: true
    },
    {
      header: {
        title: 'First Name'
      },
      code: 'firstName'
    },
    {
      header: {
        title: 'Last Name',
        filter: true
      },
      code: 'lastName'
    },
    {
      header: {
        title: 'Role'
      },
      code: 'role'
    },
    {
      header: {
        title: 'Birthdate'
      },
      code: 'birthdate',
      type: UserFieldType.DATE
    },
    {
      header: {
        title: 'Photo'
      },
      code: 'photo',
      type: UserFieldType.IMAGE
    }
  ]

  function getHeaders () {
    return [...dataSchema.map(item => item.header), {
      title: 'Actions'
    }]
  }

  function onChange (e: ChangeEvent<HTMLInputElement>, code: keyof User) {
    if (!editUser.current) {
      editUser.current = {}
    }
    editUser.current[code] = e.target.value as any
  }

  function saveUser () {
    if (editUserId && editUser.current) {
      usersRepository.update(editUserId, editUser.current)
    }
    setEditUserId(null)
  }

  // type KeysWithValsOfType<T, V> = keyof { [ K in keyof T as T[K] extends V ? K : never ] : K };

  function filterField (search: string, field: 'firstName' | 'lastName') {
    setUsers(usersRepository.get().filter(user => user[field].indexOf(search) !== -1))
  }

  return (
        <div>
            <Table>
                <TableHead>
                  {dataSchema.map(({ header: { title, filter, sort }, code }, index) => (<TableHeader key={index}>
                    {title}
                    {filter && <FormInput onChange={(e) => filterField(e.target.value, code)} />}
                  </TableHeader>))}
                </TableHead>
                <TableBody>
                  {users.length > 0 && users.map((user) => <TableRow key={user.id}>
                    {dataSchema.map(item => <TableCol key={item.code}>
                      <UserField
                          onChange={item.code === 'id'
                            ? undefined
                            : (e) => onChange(e, item.code as keyof User)}
                          edit={!item.readonly && editUserId === user.id}
                          type={item.type} value={user[item.code]} />
                    </TableCol>)}
                    <TableCol>
                      <button className={'button'} onClick={() => deleteUser(user.id)}>delete</button><br />
                      {!editUserId
                        ? <button className={'button'} onClick={() => setEditUserId(user.id)}>edit </button>
                        : <button className={'button'} onClick={() => saveUser()}>save </button>}
                    </TableCol>
                  </TableRow>)}
                </TableBody>
            </Table>
            <UserFormCreate onCreate={user => onAddUser(user)} />
        </div>
  )
}

export default UsersTable
