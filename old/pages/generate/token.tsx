import { FC, useState } from 'react'
import Head from 'next/head'
import Header from '../../components/header/header'
import firebase, { githubAuthProvider } from '../../firebase-client'

const Token: FC = () => {
  const [username, setUsername] = useState<string>(null)
  const [authError, setAuthError] = useState<string>(null)
  const [linkError, setLinkError] = useState<string>(null)
  const [newToken, setNewToken] = useState<string>('No token yet.')
  const signIn = async () => {
    const authResult = await firebase.auth().signInWithPopup(githubAuthProvider)
    const ghToken = authResult.credential['accessToken']
    const user = authResult.additionalUserInfo.username
    console.log(authResult)
    if (!user) {
      setAuthError('Something went wrong with the GitHub API. Try again later.')
    } else {
      setAuthError(null)
      setUsername(user)
    }
    linkUsername(ghToken)
    setToken()
  }
  const linkUsername = async (ghToken: string) => {
    const token = await firebase.auth().currentUser.getIdToken()
    const linkRes = await fetch('/api/link-username', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ github_token: ghToken }),
    })
    if (linkRes.status !== 200) setLinkError('Username link API failure. Try again later.')
    else setToken()
  }
  const setToken = async () => {
    const token = await firebase.auth().currentUser.getIdToken(true)
    setNewToken(token)
  }
  return (
    <div>
      <Head>
        <title>Zetaboard: Generate Token</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='max-w-4xl mx-auto mt-8 px-8 py-4'>
        <Header subheading='Generate extension token'></Header>
        <section className='mb-16'>Generate a token for auto-submission extensions.</section>
        <section className='mb-4'>
          <h3 className='font-semibold text-2xl'>Step 1: Verify username</h3>
          {authError && <h4 className='text-md font-medium text-red-500'>{authError}</h4>}
          {!username ? (
            <button
              className='button px-4 py-3 flex flex-row justify-between items-center rounded-full bg-black hover:bg-gray-900 my-8'
              onClick={signIn}>
              <img src='/static/github-icon.svg' color='white' className='h-full' />
              <span className='ml-4 font-medium'>Sign in with GitHub</span>
            </button>
          ) : (
            <div className='py-3 my-8 font-medium'>✅&emsp;Signed in as @{username}.</div>
          )}
        </section>
        <section className='mb-4'>
          <h3 className='font-semibold text-2xl'>Step 2: Copy generated token</h3>
          {linkError && <h4 className='text-md font-medium text-red-500'>{linkError}</h4>}
          <div className='mt-4 p-4 bg-gray-900 text-white font-mono w-full break-all'>
            {newToken}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Token
