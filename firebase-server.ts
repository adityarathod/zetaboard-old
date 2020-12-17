import admin from 'firebase-admin'

const firebaseAdminConfig = {
  type: process.env.FIREBASE_ADMIN_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: JSON.parse(process.env.FIREBASE_PRIVATE_KEY),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
}

const serviceAccount: admin.ServiceAccount = {
  projectId: firebaseAdminConfig.project_id,
  clientEmail: firebaseAdminConfig.client_email,
  privateKey: firebaseAdminConfig.private_key,
}

if (typeof window === 'undefined' && !admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
}

export default admin
