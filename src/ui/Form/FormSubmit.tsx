import { ButtonHTMLAttributes, forwardRef } from 'react'

export const FormSubmit = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(({ children, ...props }, ref) => {
  return (
        <button className={'btn btn-primary'} {...props} ref={ref}>{children}</button>
  )
})

FormSubmit.displayName = 'FormSubmit'
