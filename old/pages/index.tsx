import { FC } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Leaderboard from '../components/leaderboard/leaderboard'
import { useLeaderboard } from '../queries'
import Header from '../components/header/header'

const Home: FC = () => {
  const rankings = useLeaderboard()

  return (
    <div>
      <Head>
        <title>Zetaboard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='max-w-4xl mx-auto mt-8 px-8 py-4 text-center'>
        <Header subheading='Top 20 scorers'>
          <div className='py-2 flex flex-col justify-center items-end'>
            <Link href='/add'>
              <a className='font-medium text-mustard hover:text-yellow-400 block'>Add your score</a>
            </Link>
            <Link href='/generate/token'>
              <a className='mt-1 font-medium text-mustard hover:text-yellow-400 block'>
                Generate submission token
              </a>
            </Link>
          </div>
        </Header>

        <div className='max-w-4xl mx-auto my-0'>
          {rankings.length === 0 && <div className='text-center'>Loading...</div>}
          <Leaderboard data={rankings} />
        </div>

        <div className='mt-4'></div>
      </main>
    </div>
  )
}

export default Home
