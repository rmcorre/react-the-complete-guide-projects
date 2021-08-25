import React, { useContext } from 'react';

import AuthContextProvider from '../store/auth-context';
import NestedView from './NestedView';

import classes from './View.module.css';

const MainView = () => {
  const ctx = useContext(AuthContextProvider);
  return (
    <div>
      <button onClick={ctx.onLogin}>Login</button>
      <button onClick={ctx.onLogout}>Logout</button>
      <h2>Main View</h2>
      <h3 className={ctx.isLoggedIn ? classes.loggedIn : classes.loggedOut}>
        {ctx.isLoggedIn ? 'Logged in' : 'Logged out'}
      </h3>
      <NestedView />
    </div>
  );
};

export default MainView;
