const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
    apiKey: "AIzaSyBvKFBcV-fCeZb51JqS0rSq3_N_h4sQbSw",
    authDomain: "nft-marketplace-70a38.firebaseapp.com",
    projectId: "nft-marketplace-70a38",
    storageBucket: "nft-marketplace-70a38.appspot.com",
    messagingSenderId: "425588971380",
    appId: "1:425588971380:web:1b8e567fda1d39e3853e21",
} // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase