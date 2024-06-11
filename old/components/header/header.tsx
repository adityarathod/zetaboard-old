import { FC, ReactNode } from 'react'
import Link from 'next/link'

interface HeaderProps {
  title?: string
  children?: ReactNode
  subheading?: string
}

const Header: FC<HeaderProps> = (props: HeaderProps) => {
  return (
    <div className='w-full flex flex-row justify-between items-center mb-10'>
      <div>
        <Link href='/'>
          <h1 className='cursor-pointer hover:opacity-75 text-5xl text-left font-bold'>
            {props.title ?? 'Zetaboard'}
          </h1>
        </Link>
        {props.subheading && (
          <h2 className='mt-2 text-lg opacity-80 font-medium text-left'>{props.subheading}</h2>
        )}
      </div>
      {props.children}
    </div>
  )
}

export default Header
