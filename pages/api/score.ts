/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { NextApiRequest, NextApiResponse } from 'next'
import ZetaboardApiError, { isFirebaseAuthError } from '../../util/api-errors'
import MissingParameterError from '../../util/api-errors/missing-param'
import admin from '../../firebase-server'

const rootResolver = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') await get(req, res)
  else if (req.method === 'POST') await post(req, res)
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
  const querySnapshot = await admin
    .firestore()
    .collection('rankings')
    .where('user', '==', username)
    .orderBy('score', 'desc')
    .get()
  const retrievedDocs = querySnapshot.docs.map(doc => doc.data())
  res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate')
  res.status(200).json(retrievedDocs)
}

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { score, token } = req.body
  let payload
  let status = 200

  try {
    if (!score || !token) throw new MissingParameterError('missing required score or token in body')
    const parsedToken = await admin.auth().verifyIdToken(token)
    const username: string = parsedToken.username
    if (!username) throw new MissingParameterError('token does not contain username')
    const docData = {
      score,
      addedat: admin.firestore.Timestamp.now(),
      user: username,
    }
    await admin.firestore().collection('rankings').add(docData)
    payload = docData
  } catch (err) {
    if (err instanceof ZetaboardApiError) {
      status = err.status
      payload = { error: err.name, details: err.message }
    } else if (isFirebaseAuthError(err)) {
      status = 401
      payload = { error: 'unauthorized', details: 'improper Authorization header token' }
    } else {
      status = 500
      payload = { error: 'internal-server-error', details: 'unknown error' }
    }
  } finally {
    res.status(status).json(payload)
  }

  if (!score || !token) {
    res.status(400).json({
      error: 'missing-required-body',
      details: 'missing required score or token parameter',
    })
    return
  }
}

export default rootResolver
