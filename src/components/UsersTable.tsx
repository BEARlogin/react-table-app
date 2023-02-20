import Table from '../ui/Table/Table'
import TableHead from '../ui/Table/TableHead'
import TableBody from '../ui/Table/TableBody'
import TableRow from '../ui/Table/TableRow'
import { ChangeEvent, useEffect, useRef, useState, MouseEvent as ME, FC } from 'react'
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
import UsersSearch from './UsersSearch'

const UsersTable: FC = () => {
  const [users, setUsers] = useState<Entity<User>[]>([])
  const [editUserId, setEditUserId] = useState<Id | null>(null)
  const editUser = useRef<Partial<User> | null>(null)
  const [hoverIndex, setHoverIndex] = useState<number|null>(null)

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
    },
    {
      header: {
        title: 'Actions'
      },
      key: 'actions'
    }
  ]

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

  function filterField (search: string) {
    const searches = search.split(' ')

    setUsers(usersRepository.get().filter(user => [user.firstName, user.lastName].some(field => searches.some(s => field.indexOf(s) !== -1))))
  }

  function onMouseEnter (index: number) {
    console.log('onMouseEnter')
    setHoverIndex(index)
  }

  function onMouseLeave () {
    console.log('onMouseLeave')
    setHoverIndex(null)
  }

  return (
        <div>
            <UsersSearch onChange={(e) => filterField(e.target.value)} />
            <Table>
                <TableHead>
                  {dataSchema.map(({ header: { title, filter, sort }, code }, index) =>
                    (<TableHeader key={index}>{title}</TableHeader>))}
                </TableHead>
                <TableBody>
                  {users.length > 0 && users.map((user, index) => <TableRow onMouseEnter={(e) => onMouseEnter(index)} onMouseLeave={() => onMouseLeave()} key={user.id}>
                    {dataSchema.filter(item => item.code).map(item => <TableCol key={item.code}>
                      {item.code && <UserField
                          onChange={item.code === 'id'
                            ? undefined
                            : (e) => onChange(e, item.code as keyof User)}
                          edit={!item.readonly && editUserId === user.id}
                          type={item.type} value={user[item.code]} />}
                    </TableCol>)}
                    <TableCol key={'actions'}>
                      <button className={'btn btn-error'} onClick={() => deleteUser(user.id)}>delete</button><br />
                      {!editUserId
                        ? <button className={'btn'} onClick={() => setEditUserId(user.id)}>edit </button>
                        : <button className={'btn'} onClick={() => saveUser()}>save </button>}
                    </TableCol>
                  </TableRow>)}
                </TableBody>
            </Table>
            { hoverIndex !== null && <div className={'alert alert-info'}>Вы навели на ячейку {hoverIndex}</div> }
            <UserFormCreate onCreate={user => onAddUser(user)} />
        </div>
  )
}

export default UsersTable
