import React, { FC, ReactNode } from 'react'

const TableFooter: FC<{children: ReactNode}> = ({ children }) => {
  return (
        <tbody>
            {children}
        </tbody>
  )
}

export default TableFooter
