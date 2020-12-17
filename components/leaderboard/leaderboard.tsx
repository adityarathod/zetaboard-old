import Link from 'next/link'
import { FC } from 'react'
import LeaderEntry from '../../interfaces/LeaderEntry'

interface LeaderboardEntryProps {
  data: LeaderEntry
}

const LeaderboardEntry: FC<LeaderboardEntryProps> = ({ data }: LeaderboardEntryProps) => {
  return (
    <div className='my-1 w-full flex flex-row text-left'>
      <div className='flex-1 font-medium'>
        <Link href={`/user/${data.user}`}>
          <a className='text-mustard hover:text-fire cursor-pointer'>{data.user}</a>
        </Link>
      </div>
      <div className='px-2'>{data.score}</div>
    </div>
  )
}

interface LeaderboardProps {
  data: LeaderEntry[]
}

const Leaderboard: FC<LeaderboardProps> = ({ data }: LeaderboardProps) => {
  return (
    <div className='p-2'>
      {data && data.map((leader, idx) => <LeaderboardEntry data={leader} key={idx} />)}
    </div>
  )
}

export default Leaderboard
