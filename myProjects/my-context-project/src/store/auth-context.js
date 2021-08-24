import React, { useState } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  onLogout: () => {},
  onLogin: (email, password) => {},
});

//Exporting a named export
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Remember: you can also have useEffect() hook in here
  //if you are doing something with side-effects

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
