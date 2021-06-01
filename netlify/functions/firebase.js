const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyDpTEYLGJ5ENqmLRswui9heynZepmWlAeM",
  authDomain: "finalkieiproject.firebaseapp.com",
  projectId: "finalkieiproject",
  storageBucket: "finalkieiproject.appspot.com",
  messagingSenderId: "571182565488",
  appId: "1:571182565488:web:a2808fb1bc8b4c9bc20cb5"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase