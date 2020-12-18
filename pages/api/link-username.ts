/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { NextApiRequest, NextApiResponse } from 'next'
import ZetaboardApiError from '../../api_errors'
import MissingParameterError from '../../api_errors/missing-param'
import UnauthorizedError from '../../api_errors/unauthorized'
import admin from '../../firebase-server'

const isFirebaseError = err => {
  if (err.code) return err.code.startsWith('auth/')
  return false
}

const rootResolver = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') await post(req, res)
  else res.status(405).json({ error: 'method-not-allowed' })
}

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  let payload
  let status = 200

  try {
    const { github_token } = req.body
    const { authorization } = req.headers
    if (!github_token) {
      throw new MissingParameterError('missing required github_token body')
    } else if (!authorization || authorization.length === 0) {
      throw new UnauthorizedError('missing required post body: username and github_token')
    }
    const token = authorization.replace('Bearer', '').trim()
    console.log(token)
    const validatedToken = await admin.auth().verifyIdToken(token)
    const uid = validatedToken.uid
    const user = await admin.auth().getUser(uid)
    let ghUsername = user.customClaims?.username
    if (!ghUsername) {
      const ghRes = await fetch('https://api.github.com/user', {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          Authorization: `token ${github_token}`,
        },
      })
      switch (ghRes.status) {
        case 401:
          throw new UnauthorizedError('invalid github_token')
        case 200:
          break
        default:
          throw new ZetaboardApiError('unknown GitHub API response', 500, 'internal-server-error')
      }
      const ghJSON = await ghRes.json()
      ghUsername = ghJSON.login
      await admin.auth().setCustomUserClaims(uid, { username: ghUsername })
    }
  } catch (err) {
    console.log(err)
    if (err instanceof ZetaboardApiError) {
      status = err.status
      payload = { error: err.name, details: err.message }
    } else if (isFirebaseError(err)) {
      status = 401
      payload = { error: 'unauthorized', details: 'improper Authorization header token' }
    } else {
      status = 500
      payload = { error: 'internal-server-error', details: 'unknown error' }
    }
  } finally {
    if (!payload) payload = { completed: true }
    res.status(status).json(payload)
  }
}

export default rootResolver
