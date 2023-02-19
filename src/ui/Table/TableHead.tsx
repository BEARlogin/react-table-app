import { FC, ReactNode } from 'react'

const TableHead: FC<{children: ReactNode}> = ({ children }) => {
  return (
      <thead>
          <tr>
              {children}
          </tr>
      </thead>
  )
}

export default TableHead
