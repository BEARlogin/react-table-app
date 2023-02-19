import { FC, ReactNode } from 'react'

const Table: FC<{children?: ReactNode}> = ({ children }) => {
  return (
      <div className="overflow-x-auto">
          <table className={'table table-compact w-full'}>
              {children}
          </table>
      </div>
  )
}

export default Table
