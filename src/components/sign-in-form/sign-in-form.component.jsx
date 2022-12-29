import {useState} from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  signInAuthUserWithEmailAndPassword, signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss'

const SignInForm = () => {
  const initialFormFields = {email: '', password: ''};
  const [formFields, setFormFields] = useState(initialFormFields);
  const {email, password} = formFields;

  const onchangeHandler = (event) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value})
  }

  const resetFormFields = () => {
    setFormFields(initialFormFields)
  }

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
    } catch (e) {

    }
  }

  const loginWithEmailAndPassword = async (event) => {
    event.preventDefault();
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case 'auth/wrong-password':
          alert("Wrong password!")
          break
        case 'auth/user-not-found':
          alert("This email has not been registered!")
          break
        default:
          console.log(err);
      }
    }
  }

  return (<div className={'sign-in-container'}>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form>
        <FormInput onChange={onchangeHandler} className={'form-input'} label={'Email'} type={'email'} name={'email'}
                   value={email}/>
        <FormInput onChange={onchangeHandler} className={'form-input'} label={'Password'} type={'password'}
                   name={'password'} value={password}/>
        <div className={'buttons-container'}>
          <Button onClickHandler={loginWithEmailAndPassword} submit={true}>SIGN IN</Button>
          <Button onClickHandler={signInWithGoogle} extraClassName={"google-sign-in"}>SIGN IN WITH GOOGLE</Button>
        </div>
      </form>
    </div>);
};

export default SignInForm;