import React, { FC, ReactNode } from 'react'

export const FormLabel: FC<{children?: ReactNode}> = ({ children }) => {
  return (
        <label className={'label'}>
            {children}
        </label>
  )
}
