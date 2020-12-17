import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import fb from '../../firebase'
import Leaderboard from '../../components/leaderboard/leaderboard'
import LeaderEntry from '../../interfaces/LeaderEntry'

const UserPage: FC = () => {
  const router = useRouter()
  const { username } = router.query
  const [rankings, setRankings] = useState<LeaderEntry[]>(null)

  const getRankings = async () => {
    if (!username) return
    const docs = await fb
      .firestore()
      .collection('rankings')
      .where('user', '==', router.query.username)
      .orderBy('score', 'desc')
      .get()
    const data = docs.docs.map(x => x.data())
    setRankings(data as LeaderEntry[])
  }

  useEffect(() => {
    getRankings()
  }, [fb, username])

  return (
    <div>
      <Head>
        <title>Zetaboard: {router ? router.query.username : 'User Page'}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='max-w-7xl mx-auto my-0 p-4'>
        <h1 className='mt-4 text-4xl text-center font-bold'>Zetaboard</h1>
        <h1 className='mt-1 text-xl text-center mb-16'>
          Scores for {router ? router.query.username : 'loading'}
        </h1>
        <div className='max-w-3xl mx-auto my-0'>
          {!rankings && <div className='text-center'>Loading...</div>}
          <Leaderboard data={rankings} />
        </div>
      </main>
    </div>
  )
}

export default UserPage
