import { FC, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Leaderboard from '../../components/leaderboard/leaderboard'
import { useUserScores } from '../../queries'

const UserPage: FC = () => {
  const [username, setUsername] = useState<string>(undefined)
  const router = useRouter()

  useEffect(() => {
    if (Array.isArray(router.query.username)) return
    setUsername(router.query.username)
  }, [router.query.username])

  const scores = useUserScores(username)
  return (
    <div>
      <Head>
        <title>Zetaboard: {username ? username : 'User Page'}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='max-w-7xl mx-auto my-0 p-4'>
        <h1 className='mt-4 text-4xl text-center font-bold'>Zetaboard</h1>
        <h1 className='mt-1 text-xl text-center mb-16'>
          Scores for {router ? router.query.username : 'loading'}
        </h1>
        <div className='max-w-3xl mx-auto my-0'>
          {scores.length === 0 && <div className='text-center'>Loading...</div>}
          <Leaderboard data={scores} />
        </div>
      </main>
    </div>
  )
}

export default UserPage
