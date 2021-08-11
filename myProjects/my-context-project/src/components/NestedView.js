import React, { useContext } from 'react';

import AuthContextProvider from '../store/auth-context';
import NestedNestedView from './NestedNestedView';

const NestedView = () => {
  const ctx = useContext(AuthContextProvider);

  return (
    <div>
      <h2>Nested View</h2>
      <h3
        style={
          ctx.isLoggedIn
            ? { backgroundColor: '#00ff00' }
            : { backgroundColor: '#ffffff' }
        }
      >
        {ctx.isLoggedIn ? 'Logged in' : 'Logged out'}
      </h3>
      <NestedNestedView />
    </div>
  );
};

export default NestedView;
