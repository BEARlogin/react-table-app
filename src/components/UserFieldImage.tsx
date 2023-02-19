import { FC, ImgHTMLAttributes } from 'react'

const UserFieldImage: FC<ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  return (
        <img className={'avatar w-32'} {...props} />
  )
}

export default UserFieldImage
