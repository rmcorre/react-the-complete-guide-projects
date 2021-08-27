import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './contextApi/App';
import { AuthContextProvider } from './contextApi/store/auth-context';

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById('root')
);
