import * as firebase from 'firebase';
import "firebase/auth";
import 'firebase/firestore';

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAGY_fm6kPdpgxrG7vz4epTtFgTaYvORg4",
  authDomain: "campusthreadflutter.firebaseapp.com",
  databaseURL: "https://campusthreadflutter.firebaseio.com",
  projectId: "campusthreadflutter",
  storageBucket: "campusthreadflutter.appspot.com",
  messagingSenderId: "546695835211",
  appId: "1:546695835211:web:8f76783205af6c5389e7ce",
  measurementId: "G-0RZP5M1CH5"
});
export default firebaseApp;