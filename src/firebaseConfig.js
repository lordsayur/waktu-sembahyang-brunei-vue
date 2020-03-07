import firebase from "firebase/app";
import "firebase/firestore";

// firebase init goes here
const config = {
  apiKey: "AIzaSyBqFq91f9216GkBFVSAzFG1Qfck7PdzKIo",
  authDomain: "waktu-sembahyang-brunei.firebaseapp.com",
  databaseURL: "https://waktu-sembahyang-brunei.firebaseio.com",
  projectId: "waktu-sembahyang-brunei",
  storageBucket: "waktu-sembahyang-brunei.appspot.com",
  messagingSenderId: "754965478900",
  appId: "1:754965478900:web:5eae067867fc6a771e4da1"
};
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
// const auth = firebase.auth();
// const currentUser = auth.currentUser;

// date issue fix according to firebase
const settings = {
  // timestampsInSnapshots: true
};
db.settings(settings);

// firebase collections
const waktuCollection = db.collection("waktu");
const DatabaseMetaData = db.collection("metadata");

export {
  db,
  // auth,
  // currentUser,
  waktuCollection,
  DatabaseMetaData
};
