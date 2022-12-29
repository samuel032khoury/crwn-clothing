import './sign-up-form.styles.scss'

import {useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const initialFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(initialFormFields)
  const {displayName, email, password, confirmPassword} = formFields

  const resetFormFields = () => {
    setFormFields(initialFormFields)
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    try {
      const {user} = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, {displayName})
      resetFormFields()
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("This email has already been in use!")
      }
    }
  }

  const onchangeHandler = (event) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value})
  }

  return (
    <div className={'sign-up-container'}>
      <h2> Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form className={'sign-up-form'} onSubmit={submitHandler}>
        <FormInput onChange={onchangeHandler} className={'form-input'} label={'Username'} type={'text'}
                   name={'displayName'} value={displayName}/>
        <FormInput onChange={onchangeHandler} className={'form-input'} label={'Email'} type={'email'} name={'email'}
                   value={email}/>
        <FormInput onChange={onchangeHandler} className={'form-input'} label={'Password'} type={'password'}
                   name={'password'} value={password}/>
        <FormInput onChange={onchangeHandler} className={'form-input'} label={'Confirm password'} type={'password'}
                   name={'confirmPassword'} value={confirmPassword}/>
        <Button onClickHandler={submitHandler} submit={true}>SIGN UP</Button>
      </form>
    </div>
  );
};

export default SignUpForm;