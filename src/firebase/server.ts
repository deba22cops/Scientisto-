
import { initializeApp, getApp, getApps, App } from 'firebase-admin/app';
import { firebaseConfig } from './config';

let adminApp: App;

if (typeof window !== 'undefined') {
  throw new Error('Firebase Admin SDK can only be used on the server.');
}

export function getAdminApp(): App {
  if (getApps().some(app => app.name === 'admin')) {
    return getApp('admin');
  }

  try {
    // First, try to initialize using Application Default Credentials
    // This is the recommended way for server environments like Cloud Run
    adminApp = initializeApp({ projectId: firebaseConfig.projectId }, 'admin');
  } catch (e) {
    console.warn('Admin SDK initialization with default credentials failed, falling back to service account. Error:', e);
    // Fallback for local development or environments without ADC
    // Ensure you have the service account key file configured via environment variables
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
      : undefined;

    if (!serviceAccount) {
      throw new Error(
        'Firebase Admin SDK initialization failed. Missing FIREBASE_SERVICE_ACCOUNT environment variable.'
      );
    }

    adminApp = initializeApp({
      credential: {
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key.replace(/\\n/g, '\n'),
      },
      databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`
    }, 'admin');
  }

  return adminApp;
}
