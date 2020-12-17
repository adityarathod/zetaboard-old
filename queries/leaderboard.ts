import { useState, useEffect } from 'react'
import LeaderEntry from '../interfaces/LeaderEntry'
import firebase from '../firebase'

const useLeaderboard = (): LeaderEntry[] => {
  const [leaders, setLeaders] = useState<LeaderEntry[]>([])
  const getLeaderboard = async () => {
    const querySnapshot = await firebase
      .firestore()
      .collection('rankings')
      .orderBy('score', 'desc')
      .limit(20)
      .get()
    const retrievedDocs = querySnapshot.docs.map(doc => doc.data())
    setLeaders(retrievedDocs as LeaderEntry[])
  }
  useEffect(() => {
    getLeaderboard()
  }, [firebase])
  return leaders
}

export default useLeaderboard
