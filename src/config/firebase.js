import * as firebase from "firebase";

export const firebaseConfig = {
  apiKey: "AIzaSyDN8vw4ERZRVR_HawQCeeezraNpPp68O4w",
  authDomain: "growit-165d1.firebaseapp.com",
  projectId: "growit-165d1",
  storageBucket: "growit-165d1.appspot.com",
  messagingSenderId: "72635043982",
  appId: "1:72635043982:web:9d28bb06d798699b23f9df",
  measurementId: "G-MT6W0MCTXR",
};

const initializeFirebase = () => firebase.initializeApp(firebaseConfig);

export default initializeFirebase;
