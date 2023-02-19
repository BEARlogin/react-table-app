import { Id } from './Id'

export type Entity<T> = T & {id: Id}
