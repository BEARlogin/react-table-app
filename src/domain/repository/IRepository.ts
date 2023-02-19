import { Entity } from '../types/Entity'
import { Id } from '../types/Id'

export interface IRepository<T> {
    entities: Entity<T>[]

    create(input: T): Entity<T>

    get(): Entity<T>[]

    update(id: Id, data: Partial<T>): Entity<T>

    delete(id: Id): Id
}
