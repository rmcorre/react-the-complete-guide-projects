import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  //This isLoggedIn state is used in other components
  //Right now we are forwarding this state through props
  //causing what is called "prop drilling"
  //To avoid prop-drilling, we can use the ContextAPI to
  //create a global state that is directly available to
  //other components.

  //Therefore we can move the state and the code that operates
  //on that state to the auth-context file where it is all
  //managed in one place.

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
  //   if (storedUserLoggedInInformation === '1') {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  // const loginHandler = (email, password) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways
  //   localStorage.setItem('isLoggedIn', 1);
  //   setIsLoggedIn(true);
  // };

  // const logoutHandler = () => {
  //   localStorage.removeItem('isLoggedIn');
  //   setIsLoggedIn(false);
  // };

  //Use the useContext hook to tie this component with the
  //AuthContextProvider
  const ctx = useContext(AuthContext);

  return (
    //All these components and their children, and the children's children...
    //will have access to the context
    // <AuthContext.Provider
    //   value={{
    //     isLoggedIn: isLoggedIn,
    //     onLogout: logoutHandler,
    //   }}
    // >
    <>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </>
    // </AuthContext.Provider>
  );
}

export default App;
