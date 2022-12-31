import {createContext, useEffect, useReducer} from "react";

import {createUserDocumentFromAuth, onAuthStateChangedListener} from "../utils/firebase/firebase.utils";

const INITIAL_STATE = {currentUser: null}

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

const userReducer = (state, action) => {
  const {type, payload} = action;
  switch (type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`)
  }
}

export const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE)
  const {currentUser} = state
  const setCurrentUser = (user)=>{
    dispatch({
      type: "SET_CURRENT_USER",
      payload: user
    });
  }
  const value = {currentUser, setCurrentUser}

  useEffect(() => {
    return onAuthStateChangedListener(async (user) => {
      if (user) {
        await createUserDocumentFromAuth(user)
      }
      setCurrentUser(user)
    });
  }, [])
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
