import { useState, useEffect } from 'react'
import LeaderEntry from '../interfaces/LeaderEntry'
import firebase from '../firebase'
import mockLeaderboard from '../mock-data/leaderboard'

const useLeaderboard = (mocked?: boolean): LeaderEntry[] => {
  const [leaders, setLeaders] = useState<LeaderEntry[]>([])
  const getLeaderboard = async () => {
    if (mocked) {
      if (process.env.NODE_ENV === 'production') console.error('Using mocked data in production!')
      setLeaders(mockLeaderboard)
      return
    }
    const querySnapshot = await firebase
      .firestore()
      .collection('rankings')
      .orderBy('score', 'desc')
      .limit(20)
      .get()
    const retrievedDocs = querySnapshot.docs.map(doc => doc.data())
    console.log(JSON.stringify(retrievedDocs))
    setLeaders(retrievedDocs as LeaderEntry[])
  }
  useEffect(() => {
    getLeaderboard()
  }, [firebase])
  return leaders
}

export default useLeaderboard
