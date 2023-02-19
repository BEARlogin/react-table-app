import { FC, ReactNode } from 'react'

const TableHeader: FC<{children?: ReactNode}> = ({ children }) => {
  return (
        <th>
            {children}
        </th>
  )
}

export default TableHeader
