import {initializeApp} from "firebase/app";
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB6WbfFF9tz8iDYXqMb6sIoSXHCmnfMo1c",
  authDomain: "crwn-clothing-732bb.firebaseapp.com",
  projectId: "crwn-clothing-732bb",
  storageBucket: "crwn-clothing-732bb.appspot.com",
  messagingSenderId: "1073324392202",
  appId: "1:1073324392202:web:3a65daf32b1e08e45244f3",
  measurementId: "G-NG8NJ8DNZ8"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (e) {
      console.log('error creating the user', e.message);
    }
  }
  return userDocRef
}