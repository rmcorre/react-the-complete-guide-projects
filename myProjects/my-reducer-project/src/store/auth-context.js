import React, { useReducer } from 'react';

//Default context
const AuthContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  onLogout: () => {},
  onLogin: (email, password) => {},
});

const defaultAuthState = {
  isLoggedIn: false,
};

const authReducer = (prevState, action) => {
  if (action.type === 'LOGIN') {
    return {
      isLoggedIn: true,
    };
  }

  if (action.type === 'LOGOUT') {
    return {
      isLoggedIn: false,
    };
  }

  return defaultAuthState;
};

//Exporting a named export
export const AuthContextProvider = (props) => {
  const [authState, dispatch] = useReducer(authReducer, defaultAuthState);

  const loginHandler = () => {
    dispatch({ type: 'LOGIN' });
  };

  const logoutHandler = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const authContext = {
    isLoggedIn: authState.isLoggedIn,
    onLogout: logoutHandler,
    onLogin: loginHandler,
  };

  //Remember: you can also have useEffect() hook in here
  //if you are doing something with side-effects

  return (
    <AuthContext.Provider
      //Updating default context
      value={authContext}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
