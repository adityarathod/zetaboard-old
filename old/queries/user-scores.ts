import { useState, useEffect } from 'react'
import LeaderEntry from '../interfaces/LeaderEntry'
import firebase from '../firebase-client'

const useUserScores = (username?: string): LeaderEntry[] => {
  const [scores, setScores] = useState<LeaderEntry[]>([])
  const getUserScores = async () => {
    if (!username) return
    const querySnapshot = await firebase
      .firestore()
      .collection('rankings')
      .where('user', '==', username)
      .orderBy('score', 'desc')
      .get()
    const retrievedDocs = querySnapshot.docs.map(doc => doc.data())
    setScores(retrievedDocs as LeaderEntry[])
  }
  useEffect(() => {
    getUserScores()
  }, [firebase, username])
  return scores
}

export default useUserScores
