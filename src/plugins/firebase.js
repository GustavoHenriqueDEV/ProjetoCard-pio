import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACGIiv9-PNv-K7JGduRbPkiR6zeTey7ug",
  authDomain: "projetocardapio-acb8f.firebaseapp.com",
  databaseURL: "https://projetocardapio-acb8f-default-rtdb.firebaseio.com",
  projectId: "projetocardapio-acb8f",
  storageBucket: "projetocardapio-acb8f.appspot.com",
  messagingSenderId: "722448702075",
  appId: "1:722448702075:web:d90dc76be2577827eb20de",
  measurementId: "G-KEB3KBK7PS",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const profileCollection = db.collection("profile");
const tasksCollection = db.collection("tasks");

export { db, auth, profileCollection, tasksCollection };
