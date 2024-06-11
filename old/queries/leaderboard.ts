import { useState, useEffect } from 'react'
import LeaderEntry from '../interfaces/LeaderEntry'
import app from '../firebase-client'
import { getFirestore, collection, query, orderBy, limit } from 'firebase/firestore'
import mockLeaderboard from '../util/mock-data/leaderboard'

const useLeaderboard = (mocked?: boolean): LeaderEntry[] => {
  const [leaders, setLeaders] = useState<LeaderEntry[]>([])
  const getLeaderboard = async () => {
    if (mocked) {
      if (process.env.NODE_ENV === 'production') console.error('Using mocked data in production!')
      setLeaders(mockLeaderboard)
      return
    }

    const store = getFirestore(app)
    const rankingsCollection = await collection(store, 'rankings')
    const q = query(rankingsCollection, orderBy('score', 'desc'), limit(20))
    const retrievedDocs = .map(doc => doc.data())
    console.log(JSON.stringify(retrievedDocs))
    setLeaders(retrievedDocs as LeaderEntry[])
  }
  useEffect(() => {
    getLeaderboard()
  }, [firebase])
  return leaders
}

export default useLeaderboard
