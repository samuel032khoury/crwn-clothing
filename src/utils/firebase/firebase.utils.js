import {initializeApp} from "firebase/app"; // app wise
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth' // auth wise
import {collection, doc, getDoc, getDocs, getFirestore, query, setDoc} from 'firebase/firestore' // database wise

// config object
const firebaseConfig = {
  apiKey: "AIzaSyB6WbfFF9tz8iDYXqMb6sIoSXHCmnfMo1c",
  authDomain: "crwn-clothing-732bb.firebaseapp.com",
  projectId: "crwn-clothing-732bb",
  storageBucket: "crwn-clothing-732bb.appspot.com",
  messagingSenderId: "1073324392202",
  appId: "1:1073324392202:web:3a65daf32b1e08e45244f3",
  measurementId: "G-NG8NJ8DNZ8"
};

// initialize the firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Authentication state / memory bank
export const auth = getAuth(firebaseApp);

// create google login provider
const authGoogleProvider = new GoogleAuthProvider();
authGoogleProvider.setCustomParameters({prompt: "select_account"})

// assemble the Google pop up
export const signInWithGooglePopup = () => signInWithPopup(auth, authGoogleProvider);

export const db = getFirestore(firebaseApp);

export const getQueryDocumentsData = async (collectionKey) => {
  const collectionRef = collection(db, collectionKey);
  const q = query(collectionRef);
  try {
    const snapshots = await getDocs(q);
    return snapshots.docs.map(snapshot => snapshot.data())
  } catch (e) {
    console.log(e);
  }
  return null;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      })
    } catch (e) {
      console.log('Error creating the user', e.message);
    }
  }
  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)