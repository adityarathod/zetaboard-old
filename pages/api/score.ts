/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { NextApiRequest, NextApiResponse } from 'next'
import firebase from '../../firebase-server'

const rootResolver = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') await get(req, res)
  else res.status(405).json({ error: 'method-not-allowed' })
}

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username } = req.query
  if (!username) {
    res.status(400).json({
      error: 'missing-required-parameter',
      details: 'missing required username parameter',
    })
    return
  }
  const querySnapshot = await firebase
    .firestore()
    .collection('rankings')
    .where('user', '==', username)
    .orderBy('score', 'desc')
    .get()
  const retrievedDocs = querySnapshot.docs.map(doc => doc.data())
  res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate')
  res.status(200).json(retrievedDocs)
}

export default rootResolver
