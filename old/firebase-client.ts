import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, GithubAuthProvider } from 'firebase/auth'
// import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
}

let app: FirebaseApp
if (typeof window !== 'undefined' && !getApps().length) {
  app = initializeApp(firebaseConfig)
  // TODO: remove
  getAuth(app).onAuthStateChanged(user => {
    console.log(JSON.stringify(user))
  })
}

const githubAuthProvider = new GithubAuthProvider()

export { githubAuthProvider }
export default app
