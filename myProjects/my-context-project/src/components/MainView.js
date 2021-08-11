import React, { useContext } from 'react';

import NestedView from './NestedView';

import AuthContextProvider from '../store/auth-context';

const MainView = () => {
  const ctx = useContext(AuthContextProvider);
  return (
    <div>
      <button onClick={ctx.onLogin}>Login</button>
      <button onClick={ctx.onLogout}>Logout</button>
      <h2>Main View</h2>
      <h3
        style={
          ctx.isLoggedIn
            ? { backgroundColor: '#00ff00' }
            : { backgroundColor: '#ffffff' }
        }
      >
        {ctx.isLoggedIn ? 'Logged in' : 'Logged out'}
      </h3>
      <NestedView />
    </div>
  );
};

export default MainView;
