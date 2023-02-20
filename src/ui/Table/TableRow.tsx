import { FC, MouseEventHandler, ReactNode } from 'react'

export type TableRowProps = {
    children: ReactNode;
    onMouseEnter?: MouseEventHandler<HTMLTableRowElement>,
    onMouseLeave?: MouseEventHandler<HTMLTableRowElement>,
}

const TableRow: FC<TableRowProps> = ({ children, onMouseEnter, onMouseLeave }) => {
  return (
        <tr onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
            {children}
        </tr>
  )
}

export default TableRow
