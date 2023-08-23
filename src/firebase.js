import firebase, { FirebaseError } from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import {Timestamp} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD7yqPUPyyJiVSSksJMapgmWj8-tlaqtlI",
    authDomain: "reelclone-d92ea.firebaseapp.com",
    projectId: "reelclone-d92ea",
    storageBucket: "reelclone-d92ea.appspot.com",
    messagingSenderId: "174842543539",
    appId: "1:174842543539:web:3da28b6938d7056c835fc6"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth=firebase.auth();

const firestore=firebase.firestore();
export const database={
    users:firestore.collection('users'),
    posts: firestore.collection('posts'),
    comments: firestore.collection('comments'),
    getTimeStamp : Timestamp.now()
}

export const storage = firebase.storage()

