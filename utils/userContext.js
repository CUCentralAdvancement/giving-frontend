import React from 'react';
import auth0 from './auth0';

export const UserContext = React.createContext(() => {
  let user = { name: 'John Doe', roles: [] };
});
