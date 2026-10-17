// LAK SAREES — Firebase Integration Layer
// Automatically detects environment variables or safely falls back to local demo storage.
// Does NOT pretend Firebase is connected if keys are missing.

const env = import.meta.env || {}

export const isFirebaseConfigured = Boolean(
  env.VITE_FIREBASE_API_KEY &&
  env.VITE_FIREBASE_PROJECT_ID &&
  env.VITE_FIREBASE_API_KEY !== 'YOUR_FIREBASE_API_KEY_HERE'
)

export const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || '',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: env.VITE_FIREBASE_APP_ID || ''
}

// Diagnostics log to keep developer fully informed:
if (isFirebaseConfigured) {
  console.info('✦ LAK SAREES: Cloud Firebase service detected & initialized.')
} else {
  console.info('✦ LAK SAREES: Running in Local Demo Mode (in-memory & local persistence). Configure .env with Firebase credentials to enable live Cloud Firestore & Auth.')
}
