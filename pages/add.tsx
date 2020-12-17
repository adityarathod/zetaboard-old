import { FC, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '../components/header/header'
import firebase, { githubAuthProvider } from '../firebase'

const Add: FC = () => {
  const [username, setUsername] = useState<string>(null)
  const [scores, setScores] = useState<string>('')
  const [authError, setAuthError] = useState<string>(null)
  const [scoresError, setScoresError] = useState<string>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const signIn = async () => {
    const authResult = await firebase.auth().signInWithPopup(githubAuthProvider)
    const user = authResult.additionalUserInfo.username
    console.log(authResult)
    if (!user) {
      setAuthError('Something went wrong with the GitHub API. Try again later.')
    } else {
      setAuthError(null)
      setUsername(user)
    }
  }
  const submit = async () => {
    if (!username) setAuthError('Verify your GitHub username by clicking the button.')
    const splitScores = scores.split(',')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (splitScores.some(val => isNaN(val as any) || val === '')) {
      setScoresError('There was an issue parsing your scores.')
    } else {
      setScoresError(null)
    }
    if (authError || scoresError) return
    const allScores = splitScores.map(score => parseInt(score))
    const docData = allScores.map(score => {
      return { score, addedat: firebase.firestore.Timestamp.now(), user: username }
    })
    try {
      setLoading(true)
      await Promise.all(docData.map(doc => firebase.firestore().collection('rankings').add(doc)))
      router.push(`/user/${username}`)
    } catch (err) {
      console.error(err)
      alert(`Error: saving failed. Error printed to console.`)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <Head>
        <title>Zetaboard: Submit</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='max-w-4xl mx-auto mt-8 px-8 py-4'>
        <Header subheading='Score submission' />
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
          <h3 className='font-semibold text-2xl'>Step 2: Enter Zetamac scores</h3>
          <h4 className='text-md'>Separated by commas. Numbers only.</h4>
          {scoresError && <h4 className='text-md font-medium text-red-500'>{scoresError}</h4>}
          <textarea
            className='w-full max-w-1/2 my-8 h-14 text-black p-2'
            onChange={e => setScores(e.target.value)}
            value={scores}></textarea>
        </section>
        <section className='mb-4'>
          <h3 className='font-semibold text-2xl'>Step 3: Submit</h3>
          {!loading ? (
            <button
              className='button px-4 py-2 flex flex-row justify-between items-center rounded-full text-black bg-mustard hover:bg-yellow-400 my-8'
              onClick={submit}
              disabled={loading}>
              <span className='font-medium'>Submit scores</span>
            </button>
          ) : (
            <button
              className='button px-4 py-2 flex flex-row justify-between items-center rounded-full text-black bg-mustard opacity-75 my-8'
              disabled>
              <span className='font-medium'>Submitting...</span>
            </button>
          )}
        </section>
      </main>
    </div>
  )
}

export default Add
