import firebase, { app } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import fbConfig from './../firebase-config.json';

const firebaseApp: app.App = firebase.initializeApp(fbConfig);

const db = firebaseApp.firestore();
const tasksCollection = db.collection('tasks');
const userCollection = db.collection('users');
const auth = firebase.auth();

export { tasksCollection, auth, userCollection };
