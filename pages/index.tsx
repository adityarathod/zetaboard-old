import Head from 'next/head'
import { FC, useEffect, useState } from 'react'
import fb from '../firebase'
import Leaderboard from '../components/leaderboard/leaderboard'
import LeaderEntry from '../interfaces/LeaderEntry'

const Home: FC = () => {
  const [rankings, setRankings] = useState<LeaderEntry[]>(null)

  const getRankings = async () => {
    const docs = await fb
      .firestore()
      .collection('rankings')
      .orderBy('score', 'desc')
      .limit(20)
      .get()
    const data = docs.docs.map(x => x.data())
    setRankings(data as LeaderEntry[])
  }

  useEffect(() => {
    getRankings()
  }, [fb])

  return (
    <div>
      <Head>
        <title>Zetaboard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='max-w-7xl mx-auto my-0 p-4'>
        <h1 className='mt-4 text-4xl text-center font-bold mb-16'>Zetaboard</h1>
        <div className='max-w-3xl mx-auto my-0'>
          {!rankings && <div className='text-center'>Loading...</div>}
          <Leaderboard data={rankings} />
        </div>
      </main>
    </div>
  )
}

export default Home
