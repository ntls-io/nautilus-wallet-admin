import Vue from "vue";
import { firestorePlugin } from "vuefire";

import { initializeApp } from "firebase/app";

initializeApp({
  projectId: "wallet-setup",
  appId: "1:907972056790:web:18c0095eccf21eedf15b77",
  storageBucket: "wallet-setup.appspot.com",
  apiKey: "AIzaSyDPq5JcM2dVVYisvvqANjJipKInkMdy_zc",
  authDomain: "wallet-setup.firebaseapp.com",
  messagingSenderId: "907972056790",
  measurementId: "G-TW4DGPTJ62"
});

Vue.use(firestorePlugin);
