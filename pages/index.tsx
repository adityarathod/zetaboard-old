import { FC } from 'react'
import Head from 'next/head'
import Leaderboard from '../components/leaderboard/leaderboard'
import { useLeaderboard } from '../queries'

const Home: FC = () => {
  const rankings = useLeaderboard()

  return (
    <div>
      <Head>
        <title>Zetaboard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='max-w-7xl mx-auto my-0 p-4'>
        <h1 className='mt-4 text-4xl text-center font-bold mb-16'>Zetaboard</h1>
        <div className='max-w-3xl mx-auto my-0'>
          {rankings.length === 0 && <div className='text-center'>Loading...</div>}
          <Leaderboard data={rankings} />
        </div>
      </main>
    </div>
  )
}

export default Home
