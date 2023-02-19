import { User, UserRole } from '../models/User'
import { Entity } from '../types/Entity'
import { IRepository } from './IRepository'
import { Id } from '../types/Id'
import { v4 as uuid } from 'uuid'
import { EntityNotFoundException } from '../../infrastructure/exceptions/EntityNotFoundException'
import moment from 'moment'

export class UsersLocalRepository implements IRepository<User> {
  entities: Entity<User>[] = this.loadFromStorage().length
    ? this.loadFromStorage()
    : [
        {
          id: uuid(),
          birthdate: moment('28.06.1971', 'DD.MM.YYYY').toDate(),
          firstName: 'Elon',
          lastName: 'Musk',
          role: UserRole.ADMIN,
          photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg'
        }
      ]

  private static localStorageKey = 'USERS'

  constructor () {
    this.loadFromStorage()
  }

  create (input: User): Entity<User> {
    const entity = { id: uuid(), ...input }
    this.entities.push(entity)
    this.saveToStorage()
    return entity
  }

  delete (id: Id): Id {
    this.entities = this.entities.filter((entity) => entity.id !== id)
    this.saveToStorage()
    return id
  }

  update (id: Id, data: Partial<User>): Entity<User> {
    const indexCandidate = this.findEntityIndexById(id)

    this.entities[indexCandidate] = { ...this.entities[indexCandidate], ...data }
    this.saveToStorage()
    return this.entities[indexCandidate]
  }

  get (): Entity<User>[] {
    return this.entities
  }

  private findEntityIndexById (id: Id): number {
    const indexCandidate = this.entities.findIndex((e) => e.id === id)

    if (indexCandidate < 0) {
      throw new EntityNotFoundException(`Entity with id = ${id} not found`)
    }

    return indexCandidate
  }

  private saveToStorage () {
    localStorage.setItem(UsersLocalRepository.localStorageKey, JSON.stringify(this.entities))
  }

  private loadFromStorage () {
    const result = localStorage.getItem(UsersLocalRepository.localStorageKey)
    if (!result) {
      return []
    }

    return JSON.parse(result)
  }
}

export const usersRepository = new UsersLocalRepository()
