import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAPsRQjNG1LcFJSrhgeFLt0uWTurgFp2VI',
  authDomain: 'zetaboardapp.firebaseapp.com',
  projectId: 'zetaboardapp',
  storageBucket: 'zetaboardapp.appspot.com',
  messagingSenderId: '693677923348',
  appId: '1:693677923348:web:19f583b189b49bd8a65b01',
}

if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
