import React, { useContext } from 'react';

import AuthContextProvider from '../store/auth-context';
import classes from './NestedNested.module.css';

const NestedNestedView = () => {
  const ctx = useContext(AuthContextProvider);

  return (
    <div>
      <h2>Nested Nested View</h2>
      <h3 className={ctx.isLoggedIn ? classes.loggedIn : classes.loggedOut}>
        {ctx.isLoggedIn ? 'Logged in' : 'Logged out'}
      </h3>
    </div>
  );
};

export default NestedNestedView;
