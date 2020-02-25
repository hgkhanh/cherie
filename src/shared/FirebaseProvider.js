import React, { createContext } from 'react'
import app from 'firebase/app';
const FirebaseContext = createContext(null)
export { FirebaseContext }

const FirebaseProvider = ({ children }) => {
  if (!app.apps.length) {
    app.initializeApp({
      apiKey: process.env.GATSBY_FIREBASE_API_KEY,
      authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
      projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
      storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.GATSBY_FIREBASE_APP_ID,
      measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
    })
  }
  return (
    <FirebaseContext.Provider value={ app }>
      { children }
    </FirebaseContext.Provider>
  )
}

export default FirebaseProvider;