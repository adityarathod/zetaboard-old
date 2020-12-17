import Head from 'next/head'
import { FC } from 'react'
import fb from '../firebase'

const Home: FC = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='max-w-7xl mx-auto my-0 p-4'>
        <h1 className='mt-4 text-4xl text-center font-bold'>Zetaboard</h1>
      </main>
    </div>
  )
}

export default Home
