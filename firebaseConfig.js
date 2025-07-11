import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYQ_FHJB2OQ_IMLfYlzyqocBCKn64POVw",
  authDomain: "projetonative.firebaseapp.com",
  projectId: "projetonative",
  storageBucket: "projetonative.firebasestorage.app",
  messagingSenderId: "628720397297",
  appId: "1:628720397297:web:ccab68d9605112075f7250",
  measurementId: "G-3XNFYY54DJ"
};
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export const database = firebase.firestore()
export const auth = firebase.auth()