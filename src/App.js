import {useEffect} from "react";
import {Routes, Route} from "react-router-dom";

import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener
} from "./utils/firebase/firebase.utils";
import Home from "./routes/home/home.component";
import Navigation from "./components/navigation/navigation.component";
import Shop from "./routes/shop/shop.component";
import Authentication from "./routes/authentication/authentication.component";
import Checkout from "./routes/checkout/checkout.component";
import {setCurrentUser} from "./store/slices/user.slice";
import {useDispatch} from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  // update user
  useEffect(() => {
    return onAuthStateChangedListener(async (user) => {
      if (user) {
        await createUserDocumentFromAuth(user)
      }
      dispatch(setCurrentUser(user));
    });
  }, [dispatch])

  return (
    <Routes>
      <Route path={'/'} element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path={'shop/*'} element={<Shop/>}/>
        <Route path={'login'} element={<Authentication/>}/>
        <Route path={'checkout'} element={<Checkout/>}/>
      </Route>
    </Routes>)
}

export default App;
