import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //Code to skip the login if the user is logged in already
  //const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
  // if (storedUserLoggedInInformation === '1') {
  //   setIsLoggedIn(true);
  // }

  //The above code will create an infinite loop
  //App runs from beginning and in order ->
  //The if statement always evaluates to true and
  //setIsLoggedIn() triggers a re-render ->
  //App runs from beginning and in order ->
  //...

  //Using useEffect as below with no dependencies ensures that the code
  //inside useEffect runs only once after App runs for the first time.
  useEffect(() => {
    //getting data is a side-effect and should be controlled with useEffect()
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', 1);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
