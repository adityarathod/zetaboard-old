import { FC, useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Leaderboard from '../../components/leaderboard/leaderboard'
import Header from '../../components/header/header'
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

      <main className='max-w-4xl mx-auto mt-8 px-8 py-4'>
        <Header subheading={`Scores for ${router ? '@' + router.query.username : 'loading'}`}>
          <div className='py-2'>
            <Link href='/add'>
              <a className='font-medium text-mustard hover:text-yellow-400'>
                Add your score &rarr;
              </a>
            </Link>
          </div>
        </Header>
        <div className='max-w-4xl mx-auto my-0'>
          {scores.length === 0 && <div className='text-center'>Loading...</div>}
          <Leaderboard data={scores} />
        </div>
        {scores.length !== 0 && (
          <div className='mt-16'>
            <Link href={`/api/score?username=${username}`}>
              <a className='font-medium text-mustard hover:text-yellow-400'>
                Download all scores &rarr;
              </a>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}

export default UserPage
