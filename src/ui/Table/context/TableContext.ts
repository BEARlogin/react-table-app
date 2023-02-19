import { createContext } from 'react'
import { TableSchema } from '../types/TableSchema'

export const TableContext = createContext<{
    schema: TableSchema<any>,
}>({ schema: [] })
