import { forwardRef, InputHTMLAttributes } from 'react'

export const FormInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  return (
        <input className={'input'} {...props} ref={ref} />
  )
})

FormInput.displayName = 'FormInput'
