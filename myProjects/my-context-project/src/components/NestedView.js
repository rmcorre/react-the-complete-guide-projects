import React, { useContext } from 'react';

import AuthContextProvider from '../store/auth-context';
import NestedNestedView from './NestedNestedView';

import classes from './View.module.css';

const NestedView = () => {
  const ctx = useContext(AuthContextProvider);

  return (
    <div>
      <h2>Nested View</h2>
      <h3 className={ctx.isLoggedIn ? classes.loggedIn : classes.loggedOut}>
        {ctx.isLoggedIn ? 'Logged in' : 'Logged out'}
      </h3>
      <NestedNestedView />
    </div>
  );
};

export default NestedView;
