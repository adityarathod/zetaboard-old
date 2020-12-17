import { FC, ReactNode } from 'react'

interface HeaderProps {
  title?: string
  children?: ReactNode
  subheading?: string
}

const Header: FC<HeaderProps> = (props: HeaderProps) => {
  return (
    <div className='w-full flex flex-row justify-between items-center mb-10'>
      <div>
        <h1 className='text-5xl text-left font-bold'>{props.title ?? 'Zetaboard'}</h1>
        {props.subheading && (
          <h2 className='mt-2 text-lg opacity-80 font-medium text-left'>{props.subheading}</h2>
        )}
      </div>
      {props.children}
    </div>
  )
}

export default Header
