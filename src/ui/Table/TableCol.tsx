import React, { FC, ReactNode } from 'react'

const TableCol: FC<{children: ReactNode}> = ({ children }) => {
  return (
        <td>
            {children}
        </td>
  )
}

export default TableCol
