import {signInWithGooglePopup, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUSer = async () => {
    try {
      const {user} = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user)
    } catch (e) {
      console.log("Invalid Sign in");
    }
  }
  return (
    <>
      <h1>This is the SignIn Component</h1>
      <button onClick={logGoogleUSer}>Log in with google</button>
    </>
  );
};

export default SignIn;