import { FC, ReactNode } from 'react'

export type TableRowProps = {
    children: ReactNode
}

const TableRow: FC<TableRowProps> = ({ children }) => {
  return (
        <tr>
            {children}
        </tr>
  )
}

export default TableRow
