import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import firebaseClient from 'firebase';
import * as firebaseClientConfig from './firebase.client.json';
@Injectable()
export class FirebaseService {
  defaultApp: firebase.app.App = firebase.initializeApp({
    credential: firebase.credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
  });

  clientApp: firebaseClient.app.App =
    firebaseClient.initializeApp(firebaseClientConfig);
}
