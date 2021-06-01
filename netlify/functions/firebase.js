const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
<<<<<<< HEAD
  apiKey: "AIzaSyDpTEYLGJ5ENqmLRswui9heynZepmWlAeM",
  authDomain: "finalkieiproject.firebaseapp.com",
  projectId: "finalkieiproject",
  storageBucket: "finalkieiproject.appspot.com",
  messagingSenderId: "571182565488",
  appId: "1:571182565488:web:a2808fb1bc8b4c9bc20cb5"
}
=======
    apiKey: "AIzaSyBvKFBcV-fCeZb51JqS0rSq3_N_h4sQbSw",
    authDomain: "nft-marketplace-70a38.firebaseapp.com",
    projectId: "nft-marketplace-70a38",
    storageBucket: "nft-marketplace-70a38.appspot.com",
    messagingSenderId: "425588971380",
    appId: "1:425588971380:web:1b8e567fda1d39e3853e21",
} // replace
>>>>>>> 75e1beb76182e762da3c1dcde286dcdf0357f16a

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase